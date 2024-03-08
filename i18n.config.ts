import en from './locales/en.json'
import ua from './locales/ua.json'

export default {
  legacy: false,
  locale: 'uk-UK', // default locale
  locales: ['uk-UK', 'en-US'],
  messages: {
    'en-US': en,
    'uk-UK': ua,
  },
}
