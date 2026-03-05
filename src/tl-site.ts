import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

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
            tacklines
          </a>
          <div class="flex gap-6 items-center">
            <a href="https://github.com/tacklines" class="text-sm text-slate-400 hover:text-white transition-colors no-underline">
              GitHub
            </a>
          </div>
        </nav>
      </header>

      <main>
        <!-- Hero -->
        <section class="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 class="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Workflows that<br />
            <span class="text-brand-400">actually work.</span>
          </h1>
          <p class="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Tools, workflows, and shared knowledge for software teams
            building with AI. Open source, opinionated, practical.
          </p>
        </section>

        <!-- Projects -->
        <section class="max-w-5xl mx-auto px-6 pb-24">
          <div class="grid gap-6 md:grid-cols-3">
            ${this._projectCard(
              'Tackline',
              'Agentic Workflows',
              'A skill and agent framework for Claude Code. Composable primitives, persistent teams, and structured learning loops.',
              'https://github.com/tyevans/tackline',
              true
            )}
            ${this._projectCard(
              'Seam',
              'Human-AI Collaboration',
              'A portal for collaborative sessions between humans and AI agents. Task coordination, shared context, real-time progress.',
              'https://github.com/tacklines/seam',
              true
            )}
            ${this._projectCard(
              'Tacks',
              'Task Management',
              'Lightweight task tracking built for agentic workflows. Backlogs, sprints, and dependency-aware planning.',
              'https://github.com/srmccray/tacks',
              false
            )}
          </div>
        </section>

        <!-- What is it -->
        <section class="border-t border-slate-800">
          <div class="max-w-5xl mx-auto px-6 py-24">
            <h2 class="text-2xl font-bold text-white mb-8">What is Tacklines?</h2>
            <div class="grid gap-8 md:grid-cols-2">
              <div>
                <p class="text-slate-400 leading-relaxed">
                  Tacklines is a collection of open-source tools and conventions
                  that help software teams work effectively with AI agents.
                  Not a framework you install &mdash; a set of patterns you adopt.
                </p>
              </div>
              <div>
                <p class="text-slate-400 leading-relaxed">
                  Born from real production workflows, each tool solves a
                  specific problem: orchestrating agent work, managing tasks
                  across sessions, and keeping humans in the loop where it matters.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="border-t border-slate-800">
        <div class="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span class="text-sm text-slate-500">&copy; ${new Date().getFullYear()} Tacklines</span>
          <a
            href="https://github.com/tacklines"
            class="text-sm text-slate-500 hover:text-slate-300 transition-colors no-underline"
          >
            GitHub
          </a>
        </div>
      </footer>
    `;
  }

  private _projectCard(
    name: string,
    subtitle: string,
    description: string,
    url: string,
    available: boolean
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
          ${!available
            ? html`<sl-badge variant="neutral" pill>coming soon</sl-badge>`
            : html``}
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
