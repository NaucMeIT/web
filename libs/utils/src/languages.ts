import { t } from 'elysia'
import type { Mutable } from './typescript'

export const languages = {
  aa: 'Afar',
  ab: 'Abkhazian',
  af: 'Afrikaans',
  am: 'Amharic',
  ar: 'Arabic',
  'ar-ae': 'Arabic (U.A.E.)',
  'ar-bh': 'Arabic (Bahrain)',
  'ar-dz': 'Arabic (Algeria)',
  'ar-eg': 'Arabic (Egypt)',
  'ar-iq': 'Arabic (Iraq)',
  'ar-jo': 'Arabic (Jordan)',
  'ar-kw': 'Arabic (Kuwait)',
  'ar-lb': 'Arabic (Lebanon)',
  'ar-ly': 'Arabic (libya)',
  'ar-ma': 'Arabic (Morocco)',
  'ar-om': 'Arabic (Oman)',
  'ar-qa': 'Arabic (Qatar)',
  'ar-sa': 'Arabic (Saudi Arabia)',
  'ar-sy': 'Arabic (Syria)',
  'ar-tn': 'Arabic (Tunisia)',
  'ar-ye': 'Arabic (Yemen)',
  as: 'Assamese',
  ay: 'Aymara',
  az: 'Azeri',
  ba: 'Bashkir',
  be: 'Belarusian',
  bg: 'Bulgarian',
  bh: 'Bihari',
  bi: 'Bislama',
  bn: 'Bengali',
  bo: 'Tibetan',
  br: 'Breton',
  ca: 'Catalan',
  co: 'Corsican',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  'de-at': 'German (Austria)',
  'de-ch': 'German (Switzerland)',
  'de-li': 'German (Liechtenstein)',
  'de-lu': 'German (Luxembourg)',
  div: 'Divehi',
  dz: 'Bhutani',
  el: 'Greek',
  en: 'English',
  'en-au': 'English (Australia)',
  'en-bz': 'English (Belize)',
  'en-ca': 'English (Canada)',
  'en-gb': 'English (United Kingdom)',
  'en-ie': 'English (Ireland)',
  'en-jm': 'English (Jamaica)',
  'en-nz': 'English (New Zealand)',
  'en-ph': 'English (Philippines)',
  'en-tt': 'English (Trinidad)',
  'en-us': 'English (United States)',
  'en-za': 'English (South Africa)',
  'en-zw': 'English (Zimbabwe)',
  eo: 'Esperanto',
  es: 'Spanish',
  'es-ar': 'Spanish (Argentina)',
  'es-bo': 'Spanish (Bolivia)',
  'es-cl': 'Spanish (Chile)',
  'es-co': 'Spanish (Colombia)',
  'es-cr': 'Spanish (Costa Rica)',
  'es-do': 'Spanish (Dominican Republic)',
  'es-ec': 'Spanish (Ecuador)',
  'es-es': 'Spanish (España)',
  'es-gt': 'Spanish (Guatemala)',
  'es-hn': 'Spanish (Honduras)',
  'es-mx': 'Spanish (Mexico)',
  'es-ni': 'Spanish (Nicaragua)',
  'es-pa': 'Spanish (Panama)',
  'es-pe': 'Spanish (Peru)',
  'es-pr': 'Spanish (Puerto Rico)',
  'es-py': 'Spanish (Paraguay)',
  'es-sv': 'Spanish (El Salvador)',
  'es-us': 'Spanish (United States)',
  'es-uy': 'Spanish (Uruguay)',
  'es-ve': 'Spanish (Venezuela)',
  'es-419': 'Spanish (Latin America)',
  et: 'Estonian',
  eu: 'Basque',
  fa: 'Farsi',
  fi: 'Finnish',
  fj: 'Fiji',
  fo: 'Faeroese',
  fr: 'French',
  'fr-be': 'French (Belgium)',
  'fr-ca': 'French (Canada)',
  'fr-ch': 'French (Switzerland)',
  'fr-lu': 'French (Luxembourg)',
  'fr-mc': 'French (Monaco)',
  fy: 'Frisian',
  ga: 'Irish',
  gd: 'Gaelic',
  gl: 'Galician',
  gn: 'Guarani',
  gu: 'Gujarati',
  ha: 'Hausa',
  he: 'Hebrew',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  ia: 'Interlingua',
  id: 'Indonesian',
  ie: 'Interlingue',
  ik: 'Inupiak',
  in: 'Indonesian',
  is: 'Icelandic',
  it: 'Italian',
  'it-ch': 'Italian (Switzerland)',
  iw: 'Hebrew',
  ja: 'Japanese',
  ji: 'Yiddish',
  jw: 'Javanese',
  ka: 'Georgian',
  kk: 'Kazakh',
  kl: 'Greenlandic',
  km: 'Cambodian',
  kn: 'Kannada',
  ko: 'Korean',
  'ko-kr': 'Korean (South Korea)',
  kok: 'Konkani',
  ks: 'Kashmiri',
  ku: 'Kurdish',
  ky: 'Kirghiz',
  kz: 'Kyrgyz',
  la: 'Latin',
  ln: 'Lingala',
  lo: 'Laothian',
  ls: 'Slovenian',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mg: 'Malagasy',
  mi: 'Maori',
  mk: 'FYRO Macedonian',
  ml: 'Malayalam',
  mn: 'Mongolian',
  mo: 'Moldavian',
  mr: 'Marathi',
  ms: 'Malay',
  mt: 'Maltese',
  my: 'Burmese',
  na: 'Nauru',
  'nb-no': 'Norwegian (Bokmal)',
  ne: 'Nepali (India)',
  nl: 'Dutch',
  'nl-be': 'Dutch (Belgium)',
  'nn-no': 'Norwegian',
  no: 'Norwegian (Bokmal)',
  oc: 'Occitan',
  om: '(Afan)/Oromoor/Oriya',
  or: 'Oriya',
  pa: 'Punjabi',
  pl: 'Polish',
  ps: 'Pashto/Pushto',
  pt: 'Portuguese',
  'pt-br': 'Portuguese (Brazil)',
  qu: 'Quechua',
  rm: 'Rhaeto-Romanic',
  rn: 'Kirundi',
  ro: 'Romanian',
  'ro-md': 'Romanian (Moldova)',
  ru: 'Russian',
  'ru-md': 'Russian (Moldova)',
  rw: 'Kinyarwanda',
  sa: 'Sanskrit',
  sb: 'Sorbian',
  sd: 'Sindhi',
  sg: 'Sangro',
  sh: 'Serbo-Croatian',
  si: 'Singhalese',
  sk: 'Slovak',
  sl: 'Slovenian',
  sm: 'Samoan',
  sn: 'Shona',
  so: 'Somali',
  sq: 'Albanian',
  sr: 'Serbian',
  ss: 'Siswati',
  st: 'Sesotho',
  su: 'Sundanese',
  sv: 'Swedish',
  'sv-fi': 'Swedish (Finland)',
  'sv-se': 'Swedish (Sweden)',
  sw: 'Swahili',
  sx: 'Sutu',
  syr: 'Syriac',
  ta: 'Tamil',
  te: 'Telugu',
  tg: 'Tajik',
  th: 'Thai',
  'th-th': 'Thai (Thailand)',
  ti: 'Tigrinya',
  tk: 'Turkmen',
  tl: 'Tagalog',
  tn: 'Tswana',
  to: 'Tonga',
  tr: 'Turkish',
  ts: 'Tsonga',
  tt: 'Tatar',
  tw: 'Twi',
  uk: 'Ukrainian',
  ur: 'Urdu',
  us: 'English',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  vo: 'Volapuk',
  wo: 'Wolof',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zh: 'Chinese',
  'zh-cn': 'Chinese (China)',
  'zh-hk': 'Chinese (Hong Kong SAR)',
  'zh-mo': 'Chinese (Macau SAR)',
  'zh-sg': 'Chinese (Singapore)',
  'zh-tw': 'Chinese (Taiwan)',
  'zh-hans': 'Chinese (Simplified)',
  'zh-hant': 'Chinese (Traditional)',
  zu: 'Zulu',
  'da-dk': 'Danish (Denmark)',
  'en-in': 'English (India)',
} as const

type languagesType = [keyof typeof languages, ...(keyof typeof languages)[]]
export const languagesAsType = t.UnionEnum<languagesType>(Object.keys(languages).map((lang) => lang) as languagesType, {
  default: 'en',
})

export const allowedDeepgramLanguages = [
  'bg',
  'ca',
  'zh',
  'zh-cn',
  'zh-hans',
  'zh-tw',
  'zh-hant',
  'cs',
  'da',
  'da-dk',
  'nl',
  'en',
  'en-us',
  'en-au',
  'en-gb',
  'en-nz',
  'en-in',
  'et',
  'fi',
  'nl-be',
  'fr',
  'fr-ca',
  'de',
  'de-ch',
  'el',
  'hi',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'ko-kr',
  'lv',
  'lt',
  'ms',
  'no',
  'pl',
  'pt',
  'pt-br',
  'ro',
  'ru',
  'sk',
  'es',
  'es-419',
  'sv',
  'sv-se',
  'th',
  'th-th',
  'tr',
  'uk',
  'vi',
] as const

// TODO: Fix Mutable hack after ElysiaJS allows readonly UnionEnum
export const allowedDeepgramLanguagesAsType = t.UnionEnum<Mutable<typeof allowedDeepgramLanguages>>(
  allowedDeepgramLanguages as Mutable<typeof allowedDeepgramLanguages>,
  {
    default: 'en',
  },
)

export const deepgramLanguageNames = Object.fromEntries(
  allowedDeepgramLanguages.map((code) => [code, languages[code.toLowerCase() as keyof typeof languages] || code]),
) as Record<(typeof allowedDeepgramLanguages)[number], string>

export const allowedLlamaParseLanguages = [
  'af',
  'az',
  'bs',
  'cs',
  'cy',
  'da',
  'de',
  'en',
  'es',
  'et',
  'fr',
  'ga',
  'hr',
  'hu',
  'id',
  'is',
  'it',
  'ku',
  'la',
  'lt',
  'lv',
  'mi',
  'ms',
  'mt',
  'nl',
  'no',
  'oc',
  'pi',
  'pl',
  'pt',
  'ro',
  'rs_latin',
  'sk',
  'sl',
  'sq',
  'sv',
  'sw',
  'tl',
  'tr',
  'uz',
  'vi',
  'ar',
  'fa',
  'ug',
  'ur',
  'bn',
  'as',
  'mni',
  'ru',
  'rs_cyrillic',
  'be',
  'bg',
  'uk',
  'mn',
  'abq',
  'ady',
  'kbd',
  'ava',
  'dar',
  'inh',
  'che',
  'lbe',
  'lez',
  'tab',
  'tjk',
  'hi',
  'mr',
  'ne',
  'bh',
  'mai',
  'ang',
  'bho',
  'mah',
  'sck',
  'new',
  'gom',
  'sa',
  'bgc',
  'th',
  'ch_sim',
  'ch_tra',
  'ja',
  'ko',
  'ta',
  'te',
  'kn',
] as const

// TODO: Fix Mutable hack after ElysiaJS allows readonly UnionEnum
export const allowedLlamaParseLanguagesAsType = t.UnionEnum<Mutable<typeof allowedLlamaParseLanguages>>(
  allowedLlamaParseLanguages as Mutable<typeof allowedLlamaParseLanguages>,
  { default: 'en' },
)
