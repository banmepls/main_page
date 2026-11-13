# Main Page

Hi, I'm Bogdan and this is my portfolio site :)

Link: https://banmepls.github.io/main_page/

## Pages

| File | Page |
|---|---|
| `index.html` | Home: intro, key numbers, selected work, experience snapshot, recommendations (each opens to its full text) |
| `work.html` | 9 project cards; the case studies open in a drawer from the right |
| `about.html` | Personal story |
| `contact.html` | Email, LinkedIn, GitHub, CV download |
| `404.html` | Not-found page served by GitHub Pages |

The four case studies (OneBCN, CMI, the internal platform, the AI workshop system) live in one file,
`assets/scripts/case-studies.js`, which the Home and Work pages load before `script.js`. A case study
opens in place on either page, and `index.html#cmi` or `work.html#cmi` opens it directly.

## Styles

Styles are written in LESS (`assets/styles/style.less` plus one file per block in
`assets/styles/blocks/`, design tokens in `vars.less`) and compiled to
`assets/styles/style.css`, which is the file the pages load. After editing a `.less` file,
recompile with the Easy LESS extension in VS Code, or:

```sh
npx lessc --compress assets/styles/style.less assets/styles/style.css
```

## Motion

`assets/styles/blocks/motion.less` holds how things arrive: the Home introduction on load (the
headline word by word), page and section titles rising into place, rows of cards and figures
arriving one after another, the experience timeline drawing its lines and the case-study content
following its panel. `script.js` marks elements with `.reveal` as they scroll into view. Photos
have no motion of their own, and everything is off for visitors who ask for reduced motion.

## Project previews

`images/previews/` holds the card images. The `.jpg` files (OneBCN, CMI and the Proceedit site
and store) are real screenshots in device frames; the `.svg` files are illustrations of projects
without public screens and can be edited directly. A card is listed only when it has a result or
achievement to show. To use a real screenshot instead, save it as a 16:10 image
(1280×800 works well) and point the card's `<img>` at it.

## CV

`files/Bogdan_Svet_CV.pdf` is the CV every page offers for download. To update it, replace that
file with the new PDF.

The full experience, skills and education live only in the CV; the Home timeline and the
work highlights repeat parts of it, so update them together.
