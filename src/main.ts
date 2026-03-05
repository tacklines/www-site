import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');

import { detectLocale, setLocale, isRtl } from './lib/i18n.js';

const locale = detectLocale();
setLocale(locale);

document.documentElement.lang = locale;
document.documentElement.dir = isRtl() ? 'rtl' : 'ltr';

import './tl-site.js';
