import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { t } from './lib/i18n.js';

@customElement('tl-site')
export class TlSite extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <header class="border-b border-slate-800">
        <nav class="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" class="text-xl font-bold tracking-tight text-white no-underline">
            ${t('nav.brand')}
          </a>
          <div class="flex gap-6 items-center">
            <a href="https://github.com/tacklines" class="text-sm text-slate-400 hover:text-white transition-colors no-underline">
              ${t('nav.github')}
            </a>
          </div>
        </nav>
      </header>

      <main>
        <!-- Hero -->
        <section class="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 class="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            ${t('hero.title.line1')}<br />
            <span class="text-brand-400">${t('hero.title.line2')}</span>
          </h1>
          <p class="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            ${t('hero.subtitle')}
          </p>
        </section>

        <!-- Projects -->
        <section class="max-w-5xl mx-auto px-6 pb-24">
          <div class="grid gap-6 md:grid-cols-3">
            ${this._projectCard(
              t('project.tackline.name'),
              t('project.tackline.subtitle'),
              t('project.tackline.description'),
              'https://github.com/tyevans/tackline'
            )}
            ${this._projectCard(
              t('project.seam.name'),
              t('project.seam.subtitle'),
              t('project.seam.description'),
              'https://github.com/tacklines/seam'
            )}
            ${this._projectCard(
              t('project.tacks.name'),
              t('project.tacks.subtitle'),
              t('project.tacks.description'),
              'https://github.com/srmccray/tacks'
            )}
          </div>
        </section>

        <!-- What is it -->
        <section class="border-t border-slate-800">
          <div class="max-w-5xl mx-auto px-6 py-24">
            <h2 class="text-2xl font-bold text-white mb-8">${t('about.title')}</h2>
            <div class="grid gap-8 md:grid-cols-2">
              <div>
                <p class="text-slate-400 leading-relaxed">
                  ${t('about.paragraph1')}
                </p>
              </div>
              <div>
                <p class="text-slate-400 leading-relaxed">
                  ${t('about.paragraph2')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="border-t border-slate-800">
        <div class="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span class="text-sm text-slate-500">${t('footer.copyright', { year: new Date().getFullYear() })}</span>
          <a
            href="https://github.com/tacklines"
            class="text-sm text-slate-500 hover:text-slate-300 transition-colors no-underline"
          >
            ${t('nav.github')}
          </a>
        </div>
      </footer>
    `;
  }

  private _projectCard(
    name: string,
    subtitle: string,
    description: string,
    url: string
  ) {
    return html`
      <a
        href=${url}
        target="_blank"
        rel="noopener noreferrer"
        class="block group rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-brand-500/50 hover:bg-slate-900 transition-all no-underline"
      >
        <div class="flex items-center gap-3 mb-3">
          <h3 class="text-lg font-semibold text-white group-hover:text-brand-400 transition-colors">
            ${name}
          </h3>
        </div>
        <p class="text-sm font-medium text-brand-400 mb-3">${subtitle}</p>
        <p class="text-sm text-slate-400 leading-relaxed">${description}</p>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tl-site': TlSite;
  }
}
