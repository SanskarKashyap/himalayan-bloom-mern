const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export class ApiService {
  constructor(baseURL = DEFAULT_BASE_URL, fetchImpl = fetch) {
    this.baseURL = baseURL;
    this.fetchImpl = fetchImpl;
  }

  async request(path, options = {}) {
    const response = await this.fetchImpl(`${this.baseURL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
      ...options,
    });

    if (!response.ok) {
      const message = await this.extractErrorMessage(response);
      throw new Error(message);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
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
    } catch (error) {
      return response.statusText || 'Unexpected API error';
    }
  }
}

export const apiService = new ApiService();
