import i18next from 'i18next';
import { isProduction } from './constants';

export function initLocale() {
	i18next.init({
		lng: 'en',
		fallbackLng: 'en',
		debug: !isProduction,
		ns: ['core'],
		defaultNS: 'core',
		fallbackNS: 'core',
		resources: {
			en: {
				core: require('../locales/en/core.json'),
			},
		},
	});
}
