export class LanguageService {
  constructor(resources = {}, defaultLocale = 'en') {
    this.resources = resources;
    this.locale = defaultLocale;
  }

  setLocale(nextLocale) {
    if (!this.resources[nextLocale]) {
      throw new Error(`Unsupported locale: ${nextLocale}`);
    }
    this.locale = nextLocale;
  }

  t(key, params = {}) {
    const dictionary = this.resources[this.locale] ?? {};
    const template = key.split('.').reduce((acc, part) => acc?.[part], dictionary);

    if (typeof template !== 'string') {
      return key;
    }

    return template.replace(/\{(\w+)\}/g, (_, token) => String(params[token] ?? ''));
  }
}

export const languageService = new LanguageService();
