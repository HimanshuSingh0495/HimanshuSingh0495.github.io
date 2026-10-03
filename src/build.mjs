// Generates the static site into the repo root. Run: node src/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { apps, developer, effective, supportEmail } from "./apps.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const year = new Date().getFullYear();

function page({ title, description, depth, accent, body, current }) {
  const up = "../".repeat(depth);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,500..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}style.css">
${accent ? `<style>:root{--accent:${accent}}</style>` : ""}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site"><a href="${up}" class="home">Duo apps</a>${current ? `<span class="crumb">${current}</span>` : ""}</header>
<main id="main">
${body}
</main>
<footer class="site"><p>© ${year} ${developer}. Made for iPhone, and for the iPhone Duo folded into a tent.</p></footer>
</body>
</html>
`;
}

// The signature: the name, then the same name turned to face the other side of the table.
const tent = (name) =>
  `<div class="tent" aria-hidden="true"><span class="near">${esc(name)}</span><span class="hinge"></span><span class="far">${esc(name)}</span></div>`;

const paras = (list) => list.map((p) => `<p>${esc(p)}</p>`).join("\n");
const out = (rel, html) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

function appNav(app, here) {
  const links = [
    ["", "About"],
    ["privacy/", "Privacy policy"],
    ["support/", "Support"],
    ["terms/", "Terms of use"],
  ];
  const depth = here === "" ? 0 : 1;
  const prefix = "../".repeat(depth);
  return `<nav class="app-nav" aria-label="${esc(app.name)}">${links
    .map(([href, label]) =>
      href === here
        ? `<a aria-current="page">${label}</a>`
        : `<a href="${prefix}${href || "./"}">${label}</a>`
    )
    .join("")}</nav>`;
}

// Index
out(
  "index.html",
  page({
    title: "Duo apps",
    description: "Apps for two people and one iPhone, set between them on the table.",
    depth: 0,
    body: `
<section class="intro">
${tent("Duo apps")}
<h1 class="visually-hidden">Duo apps</h1>
<p class="lede">Apps for two people and one iPhone. Fold an iPhone Duo into a tent, or lay any iPhone flat, and each person gets their own side of the screen.</p>
</section>
<ul class="apps">
${apps
  .map(
    (a) => `<li style="--accent:${a.accent}">
<h2><a href="${a.slug}/">${esc(a.name)}</a></h2>
<p>${esc(a.line)}</p>
<p class="links"><a href="${a.slug}/privacy/">Privacy policy</a><a href="${a.slug}/support/">Support</a><a href="${a.slug}/terms/">Terms of use</a></p>
</li>`
  )
  .join("\n")}
</ul>`,
  })
);

for (const a of apps) {
  const email = supportEmail(a.slug);
  const mail = `<a href="mailto:${email}">${email}</a>`;

  out(
    `${a.slug}/index.html`,
    page({
      title: a.name,
      description: a.line,
      depth: 1,
      accent: a.accent,
      current: a.name,
      body: `
<section class="intro">
${tent(a.name)}
<h1 class="visually-hidden">${esc(a.name)}</h1>
<p class="lede">${esc(a.line)}</p>
</section>
${appNav(a, "")}
<article class="prose">
${paras(a.about)}
<p>Works on any iPhone running iOS 26 or later. Free to download.</p>
<p>Questions? Email ${mail}.</p>
</article>`,
    })
  );

  out(
    `${a.slug}/privacy/index.html`,
    page({
      title: `Privacy policy for ${a.name}`,
      description: `How ${a.name} handles your data.`,
      depth: 2,
      accent: a.accent,
      current: a.name,
      body: `
${appNav(a, "privacy/")}
<article class="prose">
<h1>Privacy policy</h1>
<p class="meta">${esc(a.name)}. Effective ${effective}.</p>
${a.privacy.map(([h, ps]) => `<h2>${esc(h)}</h2>\n${paras(ps)}`).join("\n")}
<h2>Apple</h2>
<p>Downloads and updates go through the App Store, which Apple runs under its own privacy policy. We receive only the aggregate statistics Apple provides to all developers.</p>
<h2>Changes</h2>
<p>If this policy changes, the new version will be posted on this page with a new effective date.</p>
<h2>Contact</h2>
<p>${esc(developer)}, ${mail}</p>
</article>`,
    })
  );

  out(
    `${a.slug}/support/index.html`,
    page({
      title: `${a.name} support`,
      description: `Help with ${a.name}.`,
      depth: 2,
      accent: a.accent,
      current: a.name,
      body: `
${appNav(a, "support/")}
<article class="prose">
<h1>Support</h1>
<p>Email ${mail} and you'll get a reply, usually within two working days. Include your iPhone model and what you were doing when the problem happened.</p>
<h2>Common questions</h2>
<dl class="faq">
${a.faq.map(([q, ans]) => `<dt>${esc(q)}</dt><dd>${esc(ans)}</dd>`).join("\n")}
</dl>
</article>`,
    })
  );

  out(
    `${a.slug}/terms/index.html`,
    page({
      title: `Terms of use for ${a.name}`,
      description: `Terms of use for ${a.name}.`,
      depth: 2,
      accent: a.accent,
      current: a.name,
      body: `
${appNav(a, "terms/")}
<article class="prose">
<h1>Terms of use</h1>
<p class="meta">${esc(a.name)}. Effective ${effective}.</p>
<p>${esc(a.name)} is licensed to you under Apple's <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">standard licence agreement for App Store apps</a>. These notes add to it.</p>
${paras(a.terms)}
<p>The app is provided as it is, without warranties beyond those required by law. Keep your own copies of anything important.</p>
<p>Questions about these terms: ${mail}</p>
</article>`,
    })
  );
}

console.log(`Built index + ${apps.length} apps × 4 pages`);
