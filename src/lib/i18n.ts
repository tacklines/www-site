/**
 * Lightweight i18n module for Tacklines marketing site.
 * Flat messages object + t() lookup with {{param}} interpolation.
 * Missing keys fall back to English, then to the key itself.
 */

import { messagesEsMx } from './i18n.es-mx.js';
import { messagesNl } from './i18n.nl.js';
import { messagesPl } from './i18n.pl.js';
import { messagesHe } from './i18n.he.js';
import { messagesHi } from './i18n.hi.js';
import { messagesTe } from './i18n.te.js';
import { messagesUr } from './i18n.ur.js';
import { messagesPa } from './i18n.pa.js';
import { messagesFr } from './i18n.fr.js';
import { messagesDe } from './i18n.de.js';
import { messagesIt } from './i18n.it.js';
import { messagesPtBr } from './i18n.pt-br.js';
import { messagesSv } from './i18n.sv.js';
import { messagesUk } from './i18n.uk.js';
import { messagesCs } from './i18n.cs.js';
import { messagesTr } from './i18n.tr.js';
import { messagesZh } from './i18n.zh.js';
import { messagesJa } from './i18n.ja.js';
import { messagesKo } from './i18n.ko.js';
import { messagesTh } from './i18n.th.js';
import { messagesVi } from './i18n.vi.js';
import { messagesId } from './i18n.id.js';
import { messagesBn } from './i18n.bn.js';
import { messagesTa } from './i18n.ta.js';
import { messagesAr } from './i18n.ar.js';
import { messagesFa } from './i18n.fa.js';
import { messagesSw } from './i18n.sw.js';
import { messagesAm } from './i18n.am.js';

export type Locale =
  | 'en' | 'es-mx' | 'nl' | 'pl' | 'he' | 'hi' | 'te' | 'ur' | 'pa'
  | 'fr' | 'de' | 'it' | 'pt-br' | 'sv' | 'uk' | 'cs' | 'tr'
  | 'zh' | 'ja' | 'ko' | 'th' | 'vi' | 'id' | 'bn' | 'ta'
  | 'ar' | 'fa' | 'sw' | 'am';

export const RTL_LOCALES: ReadonlySet<Locale> = new Set(['he', 'ur', 'ar', 'fa']);

let currentLocale: Locale = 'en';

export function setLocale(locale: Locale): void {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function isRtl(): boolean {
  return RTL_LOCALES.has(currentLocale);
}

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const candidates = [...(navigator.languages || []), navigator.language].filter(Boolean);
  const supported = Object.keys(localeMessages) as Locale[];

  for (const tag of candidates) {
    const lower = tag.toLowerCase();
    const exact = supported.find(l => l === lower);
    if (exact) return exact;
    const base = lower.split('-')[0];
    const partial = supported.find(l => l === base || l.startsWith(base + '-'));
    if (partial) return partial;
  }
  return 'en';
}

const localeMessages: Record<Locale, Record<string, string>> = {
  'en': {} as Record<string, string>, // populated below
  'es-mx': messagesEsMx,
  'nl': messagesNl,
  'pl': messagesPl,
  'he': messagesHe,
  'hi': messagesHi,
  'te': messagesTe,
  'ur': messagesUr,
  'pa': messagesPa,
  'fr': messagesFr,
  'de': messagesDe,
  'it': messagesIt,
  'pt-br': messagesPtBr,
  'sv': messagesSv,
  'uk': messagesUk,
  'cs': messagesCs,
  'tr': messagesTr,
  'zh': messagesZh,
  'ja': messagesJa,
  'ko': messagesKo,
  'th': messagesTh,
  'vi': messagesVi,
  'id': messagesId,
  'bn': messagesBn,
  'ta': messagesTa,
  'ar': messagesAr,
  'fa': messagesFa,
  'sw': messagesSw,
  'am': messagesAm,
};

export const messagesEn: Record<string, string> = {
  // nav
  'nav.brand': 'tacklines',
  'nav.github': 'GitHub',

  // hero
  'hero.title.line1': 'Workflows that',
  'hero.title.line2': 'actually work.',
  'hero.subtitle': 'Tools, workflows, and shared knowledge for software teams building with AI. Open source, opinionated, practical.',

  // project cards
  'project.tackline.name': 'Tackline',
  'project.tackline.subtitle': 'Agentic Workflows',
  'project.tackline.description': 'A skill and agent framework for Claude Code. Composable primitives, persistent teams, and structured learning loops.',

  'project.seam.name': 'Seam',
  'project.seam.subtitle': 'Human-AI Collaboration',
  'project.seam.description': 'A portal for collaborative sessions between humans and AI agents. Task coordination, shared context, real-time progress.',

  'project.tacks.name': 'Tacks',
  'project.tacks.subtitle': 'Task Management',
  'project.tacks.description': 'Lightweight task tracking built for agentic workflows. Backlogs, sprints, and dependency-aware planning.',

  // what is it
  'about.title': 'What is Tacklines?',
  'about.paragraph1': 'Tacklines is a collection of open-source tools and conventions that help software teams work effectively with AI agents. Not a framework you install \u2014 a set of patterns you adopt.',
  'about.paragraph2': 'Born from real production workflows, each tool solves a specific problem: orchestrating agent work, managing tasks across sessions, and keeping humans in the loop where it matters.',

  // footer
  'footer.copyright': '\u00a9 {{year}} Tacklines',

  // og / meta
  'meta.title': 'Tacklines \u2014 Agentic Workflows for Software Teams',
  'meta.description': 'Tools, workflows, and knowledge for software developers. Agentic workflows, task management, and human-AI collaboration.',
};

// Wire English into the locale map
localeMessages['en'] = messagesEn;
export const messages = messagesEn;

export function t(key: string, params?: Record<string, string | number>): string {
  const localeMsg = localeMessages[currentLocale];
  let value = localeMsg?.[key] ?? messagesEn[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
    }
  }
  return value;
}
