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

export type Locale = 'en' | 'es-mx' | 'nl' | 'pl' | 'he' | 'hi' | 'te' | 'ur' | 'pa';

export const RTL_LOCALES: ReadonlySet<Locale> = new Set(['he', 'ur']);

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
