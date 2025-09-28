const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

function stripTrailingSlash(value) {
  if (!value || value === '/') {
    return value;
  }
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function resolveBaseConfiguration(rawBase) {
  const base = rawBase ?? '';

  if (!base) {
    return { primaryBase: '', fallbackBase: null };
  }

  let normalized = base.trim();

  if (normalized.startsWith('//') && typeof window !== 'undefined') {
    normalized = `${window.location.protocol}${normalized}`;
  }

  if (/^https?:\/\//i.test(normalized)) {
    normalized = stripTrailingSlash(normalized);

    if (typeof window !== 'undefined' && window.location.protocol === 'https:' && normalized.startsWith('http://')) {
      const secureCandidate = `https://${normalized.slice('http://'.length)}`;
      return {
        primaryBase: stripTrailingSlash(secureCandidate),
        fallbackBase: normalized,
      };
    }

    return {
      primaryBase: normalized,
      fallbackBase: null,
    };
  }

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  normalized = stripTrailingSlash(normalized);

  if (normalized === '/') {
    return { primaryBase: '', fallbackBase: null };
  }

  return {
    primaryBase: normalized,
    fallbackBase: null,
  };
}

function isNetworkError(error) {
  if (!error) return false;
  if (error.name === 'TypeError') return true;
  return error.message?.toLowerCase().includes('failed to fetch');
}

export class ApiService {
  constructor(baseURL = DEFAULT_BASE_URL, fetchImpl = fetch) {
    if (!fetchImpl || typeof fetchImpl !== 'function') {
      throw new TypeError('A valid fetch implementation must be provided');
    }

    this.baseURL = baseURL;
    this.baseConfig = resolveBaseConfiguration(baseURL);

    const context = typeof window !== 'undefined' ? window : globalThis;
    this.fetchImpl = typeof fetchImpl.bind === 'function' ? fetchImpl.bind(context) : (...args) => fetchImpl(...args);
    this.authToken = null;
  }

  setAuthToken(token) {
    this.authToken = token ?? null;
  }

  setBaseURL(baseURL) {
    this.baseURL = baseURL;
    this.baseConfig = resolveBaseConfiguration(baseURL);
  }

  async request(path, options = {}) {
    const { token: explicitToken, ...requestOptions } = options;
    const token = explicitToken ?? this.authToken;
    const requestUrls = this.composeRequestUrls(path);
    const fetchOptions = this.buildFetchOptions(requestOptions, token);

    let response;
    let lastNetworkError;

    for (const url of requestUrls) {
      try {
        response = await this.fetchImpl(url, fetchOptions);
        lastNetworkError = undefined;
        if (response) break;
      } catch (error) {
        if (!isNetworkError(error)) {
          throw error;
        }
        lastNetworkError = error;
      }
    }

    if (!response) {
      throw new Error('Unable to reach the server. Please check your connection and try again.', {
        cause: lastNetworkError,
      });
    }

    if (!response.ok) {
      const message = await this.extractErrorMessage(response);
      throw new Error(message);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  composeRequestUrls(path) {
    const resourcePath = path.startsWith('/') ? path : `/${path}`;
    const urls = [];

    const normalizeJoin = (base) => {
      if (!base) {
        return resourcePath;
      }
      return `${base}${resourcePath}`;
    };

    urls.push(normalizeJoin(this.baseConfig.primaryBase));

    if (this.baseConfig.fallbackBase && this.baseConfig.fallbackBase !== this.baseConfig.primaryBase) {
      urls.push(normalizeJoin(this.baseConfig.fallbackBase));
    }

    return urls;
  }

  buildFetchOptions(options, token) {
    const headers = {
      ...(options.headers ?? {}),
    };

    const hasContentType = Object.keys(headers).some((key) => key.toLowerCase() === 'content-type');

    if (options.body && !hasContentType) {
      headers['Content-Type'] = 'application/json';
    }

    if (token && !Object.keys(headers).some((key) => key.toLowerCase() === 'authorization')) {
      headers.Authorization = `Bearer ${token}`;
    }

    return {
      ...options,
      headers,
    };
  }

  async getProducts() {
    return this.request('/products');
  }

  async createPreorder(payload) {
    return this.request('/preorder', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async sendContact(payload) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async extractErrorMessage(response) {
    try {
      const data = await response.json();
      return data?.message ?? response.statusText;
    } catch {
      return response.statusText || 'Unexpected API error';
    }
  }
}

export const apiService = new ApiService();
