import i18next from 'i18next';

export function initLocale() {
  i18next.init({
      lng: 'en',
      fallbackLng: 'en',
      debug: true,
      ns: ['core'],
      defaultNS: 'core',
      fallbackNS: 'core',
      resources: {
        en: {
          core: require('../locales/en/core.json'),
        }
      }
    });
}
