#!/usr/bin/env python3
"""Batch-translate i18n strings via ollama translategemma:27b."""

import json
import sys
import urllib.request

OLLAMA_URL = "http://192.168.1.14:11434/api/chat"
MODEL = "translategemma:27b"

# English source strings (key -> value)
EN_STRINGS: dict[str, str] = {
    "nav.brand": "tacklines",
    "nav.github": "GitHub",
    "hero.title.line1": "Workflows that",
    "hero.title.line2": "actually work.",
    "hero.subtitle": "Tools, workflows, and shared knowledge for software teams building with AI. Open source, opinionated, practical.",
    "project.tackline.name": "Tackline",
    "project.tackline.subtitle": "Agentic Workflows",
    "project.tackline.description": "A skill and agent framework for Claude Code. Composable primitives, persistent teams, and structured learning loops.",
    "project.seam.name": "Seam",
    "project.seam.subtitle": "Human-AI Collaboration",
    "project.seam.description": "A portal for collaborative sessions between humans and AI agents. Task coordination, shared context, real-time progress.",
    "project.tacks.name": "Tacks",
    "project.tacks.subtitle": "Task Management",
    "project.tacks.description": "Lightweight task tracking built for agentic workflows. Backlogs, sprints, and dependency-aware planning.",
    "about.title": "What is Tacklines?",
    "about.paragraph1": "Tacklines is a collection of open-source tools and conventions that help software teams work effectively with AI agents. Not a framework you install \u2014 a set of patterns you adopt.",
    "about.paragraph2": "Born from real production workflows, each tool solves a specific problem: orchestrating agent work, managing tasks across sessions, and keeping humans in the loop where it matters.",
    "footer.copyright": "\u00a9 {{year}} Tacklines",
    "meta.title": "Tacklines \u2014 Agentic Workflows for Software Teams",
    "meta.description": "Tools, workflows, and knowledge for software developers. Agentic workflows, task management, and human-AI collaboration.",
}

# Keys that should NOT be translated (brand names, proper nouns, format strings)
SKIP_KEYS = {"nav.brand", "nav.github", "project.tackline.name", "project.seam.name", "project.tacks.name", "footer.copyright"}

# Target locales: (locale_code, lang_name, lang_code_bcp47)
TARGETS = [
    ("fr", "French", "fr-FR"),
    ("de", "German", "de-DE"),
    ("it", "Italian", "it-IT"),
    ("pt-br", "Portuguese", "pt-BR"),
    ("sv", "Swedish", "sv-SE"),
    ("uk", "Ukrainian", "uk-UA"),
    ("cs", "Czech", "cs-CZ"),
    ("tr", "Turkish", "tr-TR"),
    ("zh", "Chinese", "zh-CN"),
    ("ja", "Japanese", "ja-JP"),
    ("ko", "Korean", "ko-KR"),
    ("th", "Thai", "th-TH"),
    ("vi", "Vietnamese", "vi-VN"),
    ("id", "Indonesian", "id-ID"),
    ("bn", "Bengali", "bn-BD"),
    ("ta", "Tamil", "ta-IN"),
    ("ar", "Arabic", "ar-SA"),
    ("fa", "Persian", "fa-IR"),
    ("sw", "Swahili", "sw-KE"),
    ("am", "Amharic", "am-ET"),
]


def translate(text: str, target_lang: str, target_code: str) -> str:
    prompt = (
        f'<translate source_lang="English" source_lang_code="en-US" '
        f'target_lang="{target_lang}" target_lang_code="{target_code}">'
        f"{text}</translate>"
    )
    payload = json.dumps({
        "model": MODEL,
        "stream": False,
        "messages": [{"role": "user", "content": prompt}],
    }).encode()
    req = urllib.request.Request(OLLAMA_URL, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read())
    return result["message"]["content"].strip()


def generate_locale_file(locale: str, lang_name: str, lang_code: str) -> str:
    export_name = "messages" + locale.replace("-", "").title()
    # e.g. "pt-br" -> "messagesPtBr", "zh" -> "messagesZh"
    if "-" in locale:
        parts = locale.split("-")
        export_name = "messages" + parts[0].title() + parts[1].title()
    else:
        export_name = "messages" + locale.title()

    translations: dict[str, str] = {}
    total = len(EN_STRINGS)
    for i, (key, en_val) in enumerate(EN_STRINGS.items(), 1):
        if key in SKIP_KEYS:
            translations[key] = en_val
            continue
        print(f"  [{i}/{total}] {key}", end="... ", flush=True)
        translated = translate(en_val, lang_name, lang_code)
        # Preserve {{year}} placeholder if present
        if "{{year}}" in en_val and "{{year}}" not in translated:
            translated = translated.replace("year", "{{year}}")  # best effort
        print(translated[:60])
        translations[key] = translated

    lines = [f"export const {export_name}: Record<string, string> = {{"]
    for key, val in translations.items():
        escaped = val.replace("\\", "\\\\").replace("'", "\\'")
        lines.append(f"  '{key}': '{escaped}',")
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


def main():
    targets = TARGETS
    if len(sys.argv) > 1:
        # Filter to specific locales if provided
        requested = set(sys.argv[1:])
        targets = [t for t in TARGETS if t[0] in requested]

    for locale, lang_name, lang_code in targets:
        print(f"\n=== Translating: {lang_name} ({locale}) ===")
        content = generate_locale_file(locale, lang_name, lang_code)
        path = f"src/lib/i18n.{locale}.ts"
        with open(path, "w") as f:
            f.write(content)
        print(f"  -> Wrote {path}")


if __name__ == "__main__":
    main()
