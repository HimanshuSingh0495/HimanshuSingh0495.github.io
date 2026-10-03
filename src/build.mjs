// Generates the static site into the repo root. Run: node src/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { apps, developer, effective, supportEmail } from "./apps.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const year = new Date().getFullYear();
const site = "https://himanshusingh0495.github.io/";
const sitemap = []; // every indexable page's path, in build order

// `<` is escaped so text can never close the script element.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

function page({ title, description, depth, accent, body, current, path, schema = [], index = true }) {
  const up = "../".repeat(depth);
  const url = site + path;
  if (index) sitemap.push(path);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${index ? `<link rel="canonical" href="${url}">` : `<meta name="robots" content="noindex">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Duo apps">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
${schema.map(jsonLd).join("\n")}
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
<footer class="site"><p>© ${year} ${developer}. Made for iPhone and iPhone Duo.</p></footer>
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

const crumbs = (a, label, sub) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Duo apps", item: site },
    { "@type": "ListItem", position: 2, name: a.name, item: `${site}${a.slug}/` },
    ...(label ? [{ "@type": "ListItem", position: 3, name: label, item: `${site}${a.slug}/${sub}` }] : []),
  ],
});

// Index
out(
  "index.html",
  page({
    title: "Duo apps: iPhone apps for two people at one table",
    description: "Apps for two people sharing one iPhone: a date-night game, a card battler, tarot, mentalism, speech therapy and client presentations. Made for iPhone and iPhone Duo.",
    depth: 0,
    path: "",
    schema: [
      { "@context": "https://schema.org", "@type": "WebSite", name: "Duo apps", url: site },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: apps.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${site}${a.slug}/`, name: a.name })),
      },
    ],
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
      title: a.seo.title,
      description: a.seo.description,
      depth: 1,
      path: `${a.slug}/`,
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: a.name,
          description: a.seo.description,
          url: `${site}${a.slug}/`,
          operatingSystem: "iOS 26 or later",
          applicationCategory: a.seo.category,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          author: { "@type": "Person", name: developer },
        },
        crumbs(a),
      ],
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
      path: `${a.slug}/privacy/`,
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
      description: `Help with ${a.name}: answers to common questions and how to contact support.`,
      depth: 2,
      path: `${a.slug}/support/`,
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faq.map(([q, ans]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: ans } })),
        },
        crumbs(a, "Support", "support/"),
      ],
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
      path: `${a.slug}/terms/`,
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

// GitHub Pages serves 404.html for unknown paths at any depth, so it uses absolute links.
out(
  "404.html",
  page({
    title: "Page not found | Duo apps",
    description: "This page doesn't exist.",
    depth: 0,
    path: "404.html",
    index: false,
    body: `
<article class="prose">
<h1>Page not found</h1>
<p>That page doesn't exist. <a href="/">See all the Duo apps</a>.</p>
</article>`,
  }).replace('href="style.css"', 'href="/style.css"').replace('<a href="" class="home">', '<a href="/" class="home">')
);

const today = new Date().toISOString().slice(0, 10);
out(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map((p) => `<url><loc>${site}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`
);
out("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`);

console.log(`Built index + ${apps.length} apps × 4 pages, 404, sitemap (${sitemap.length} URLs), robots`);
