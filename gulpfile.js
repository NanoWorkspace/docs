const { src, dest, watch: _watch, parallel } = require("gulp")

const markdownIt = require("gulp-markdown-it")
const sass = require('gulp-sass')

const md = require("markdown-it")
const hl = require("highlight.js")

function docs() {
  return src("src/docs/**/*.md")
    .pipe(
      markdownIt({
        highlight: function (str, lang) {
          if (lang && hl.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code>' +
                hl.highlight(lang, str, true).value +
                "</code></pre>"
              )
            } catch (__) {}
          }
          return (
            '<pre class="hljs"><code>' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
          )
        },
      })
    )
    .pipe(dest("dist/docs/"))
}

function style() {
  return src("src/style/**/*.scss")
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(dest("dist/style/"))
}

function build() {
  return parallel(docs, style)
}

function watch() {
  return parallel(
    _watch("src/docs/**/*.md", docs),
    _watch("src/style/**/*.scss", style)
  )
}

exports = {
  build,
  watch,
}
