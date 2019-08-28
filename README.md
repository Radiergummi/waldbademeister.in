Waldbademeister.in [![Netlify Status](https://api.netlify.com/api/v1/badges/6fbceca2-5dd0-40d7-98ca-d0b15e8cad92/deploy-status)](https://app.netlify.com/sites/waldbademeisterin/deploys)
==================

## Local Development
Clone this repository, and run `yarn` or `npm install` from the new folder to install all required dependencies.
Then start the development server with `yarn start` or `npm start`.

## Layouts
The template is based on small, content-agnostic partials that can be mixed and matched. The pre-built pages showcase 
just a few of the possible combinations. Refer to the `site/layouts/partials` folder for all available partials.
Use Hugo’s `dict` functionality to feed content into partials and avoid repeating yourself and creating discrepancies.

## CSS
The site uses simple, descriptively CSS classes for all elements. Important values like colors, typography etc. may be 
configured using the `src/css/_variables.css` file.

## SVG
All SVG icons stored in `site/static/img/icons` are automatically optimized with SVGO (gulp-svgmin) and concatenated 
into a single SVG sprite stored as a a partial called `svg.html`. Make sure you use consistent icons in terms of 
viewport and art direction for optimal results. Refer to an SVG via the `<use>` tag like so:

```
<svg width="16px" height="16px" class="db">
  <use xlink:href="#SVG-ID"></use>
</svg>
```
