var _csbRefreshUtils = require("/node_modules/__csb_bust/refresh-helper.js");var prevRefreshReg = window.$RefreshReg$;var prevRefreshSig = window.$RefreshSig$;_csbRefreshUtils.prelude(module);try {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MDXContent;
var _MDXProvider = require("@immediately-run/sdk/MDXProvider");
var _jsxRuntime = require("react/jsx-runtime");
/*@jsxRuntime automatic*/
/*@jsxImportSource react*/

function _createMdxContent(props) {
  const _components = {
      a: "a",
      blockquote: "blockquote",
      h1: "h1",
      p: "p",
      strong: "strong",
      ...(0, _MDXProvider.useMDXComponents)(),
      ...props.components
    },
    {
      Admonition
    } = _components;
  if (!Admonition) _missingMdxReference("Admonition", true);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.h1, {
      children: "Admonitions"
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(Admonition, {
      type: "note",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.p, {
        children: "Useful information the reader should know."
      })
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(Admonition, {
      type: "tip",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
        children: ["A helpful tip with a ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.a, {
          href: "https://example.com",
          children: "link"
        }), " and ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.strong, {
          children: "bold"
        }), "."]
      })
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(Admonition, {
      type: "important",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.p, {
        children: "Key information."
      })
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(Admonition, {
      type: "warning",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.p, {
        children: "Something that could cause a problem."
      })
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(Admonition, {
      type: "caution",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.p, {
        children: "Negative consequences of an action."
      })
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(Admonition, {
      type: "note"
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.blockquote, {
      children: ["\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.p, {
        children: "An ordinary blockquote is left untouched.\nSecond line of the quote."
      }), "\n"]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.blockquote, {
      children: ["\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.p, {
        children: "[!NOTE] this marker is not alone on its line, so it stays a quote."
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = {
    ...(0, _MDXProvider.useMDXComponents)(),
    ...props.components
  };
  return MDXLayout ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MDXLayout, {
    ...props,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
_c = MDXContent;
function _missingMdxReference(id, component, place) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it." + (place ? "\nIt’s referenced in your code at `" + place + "` in `/app/content/admonition.mdx`" : ""));
}
var _c;
$RefreshReg$(_c, "MDXContent");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfTURYUHJvdmlkZXIiLCJyZXF1aXJlIiwiX2pzeFJ1bnRpbWUiLCJfY3JlYXRlTWR4Q29udGVudCIsInByb3BzIiwiX2NvbXBvbmVudHMiLCJhIiwiYmxvY2txdW90ZSIsImgxIiwicCIsInN0cm9uZyIsIl9wcm92aWRlQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJBZG1vbml0aW9uIiwiX21pc3NpbmdNZHhSZWZlcmVuY2UiLCJqc3hzIiwiRnJhZ21lbnQiLCJjaGlsZHJlbiIsImpzeCIsInR5cGUiLCJocmVmIiwiTURYQ29udGVudCIsIndyYXBwZXIiLCJNRFhMYXlvdXQiLCJfYyIsImlkIiwiY29tcG9uZW50IiwicGxhY2UiLCJFcnJvciIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VzIjpbImFkbW9uaXRpb24ubWR4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qQGpzeFJ1bnRpbWUgYXV0b21hdGljKi9cbi8qQGpzeEltcG9ydFNvdXJjZSByZWFjdCovXG5pbXBvcnQge3VzZU1EWENvbXBvbmVudHMgYXMgX3Byb3ZpZGVDb21wb25lbnRzfSBmcm9tIFwiQGltbWVkaWF0ZWx5LXJ1bi9zZGsvTURYUHJvdmlkZXJcIjtcbmZ1bmN0aW9uIF9jcmVhdGVNZHhDb250ZW50KHByb3BzKSB7XG4gIGNvbnN0IF9jb21wb25lbnRzID0ge1xuICAgIGE6IFwiYVwiLFxuICAgIGJsb2NrcXVvdGU6IFwiYmxvY2txdW90ZVwiLFxuICAgIGgxOiBcImgxXCIsXG4gICAgcDogXCJwXCIsXG4gICAgc3Ryb25nOiBcInN0cm9uZ1wiLFxuICAgIC4uLl9wcm92aWRlQ29tcG9uZW50cygpLFxuICAgIC4uLnByb3BzLmNvbXBvbmVudHNcbiAgfSwge0FkbW9uaXRpb259ID0gX2NvbXBvbmVudHM7XG4gIGlmICghQWRtb25pdGlvbikgX21pc3NpbmdNZHhSZWZlcmVuY2UoXCJBZG1vbml0aW9uXCIsIHRydWUpO1xuICByZXR1cm4gPD48X2NvbXBvbmVudHMuaDE+e1wiQWRtb25pdGlvbnNcIn08L19jb21wb25lbnRzLmgxPntcIlxcblwifTxBZG1vbml0aW9uIHR5cGU9XCJub3RlXCI+PF9jb21wb25lbnRzLnA+e1wiVXNlZnVsIGluZm9ybWF0aW9uIHRoZSByZWFkZXIgc2hvdWxkIGtub3cuXCJ9PC9fY29tcG9uZW50cy5wPjwvQWRtb25pdGlvbj57XCJcXG5cIn08QWRtb25pdGlvbiB0eXBlPVwidGlwXCI+PF9jb21wb25lbnRzLnA+e1wiQSBoZWxwZnVsIHRpcCB3aXRoIGEgXCJ9PF9jb21wb25lbnRzLmEgaHJlZj1cImh0dHBzOi8vZXhhbXBsZS5jb21cIj57XCJsaW5rXCJ9PC9fY29tcG9uZW50cy5hPntcIiBhbmQgXCJ9PF9jb21wb25lbnRzLnN0cm9uZz57XCJib2xkXCJ9PC9fY29tcG9uZW50cy5zdHJvbmc+e1wiLlwifTwvX2NvbXBvbmVudHMucD48L0FkbW9uaXRpb24+e1wiXFxuXCJ9PEFkbW9uaXRpb24gdHlwZT1cImltcG9ydGFudFwiPjxfY29tcG9uZW50cy5wPntcIktleSBpbmZvcm1hdGlvbi5cIn08L19jb21wb25lbnRzLnA+PC9BZG1vbml0aW9uPntcIlxcblwifTxBZG1vbml0aW9uIHR5cGU9XCJ3YXJuaW5nXCI+PF9jb21wb25lbnRzLnA+e1wiU29tZXRoaW5nIHRoYXQgY291bGQgY2F1c2UgYSBwcm9ibGVtLlwifTwvX2NvbXBvbmVudHMucD48L0FkbW9uaXRpb24+e1wiXFxuXCJ9PEFkbW9uaXRpb24gdHlwZT1cImNhdXRpb25cIj48X2NvbXBvbmVudHMucD57XCJOZWdhdGl2ZSBjb25zZXF1ZW5jZXMgb2YgYW4gYWN0aW9uLlwifTwvX2NvbXBvbmVudHMucD48L0FkbW9uaXRpb24+e1wiXFxuXCJ9PEFkbW9uaXRpb24gdHlwZT1cIm5vdGVcIiAvPntcIlxcblwifTxfY29tcG9uZW50cy5ibG9ja3F1b3RlPntcIlxcblwifTxfY29tcG9uZW50cy5wPntcIkFuIG9yZGluYXJ5IGJsb2NrcXVvdGUgaXMgbGVmdCB1bnRvdWNoZWQuXFxuU2Vjb25kIGxpbmUgb2YgdGhlIHF1b3RlLlwifTwvX2NvbXBvbmVudHMucD57XCJcXG5cIn08L19jb21wb25lbnRzLmJsb2NrcXVvdGU+e1wiXFxuXCJ9PF9jb21wb25lbnRzLmJsb2NrcXVvdGU+e1wiXFxuXCJ9PF9jb21wb25lbnRzLnA+e1wiWyFOT1RFXSB0aGlzIG1hcmtlciBpcyBub3QgYWxvbmUgb24gaXRzIGxpbmUsIHNvIGl0IHN0YXlzIGEgcXVvdGUuXCJ9PC9fY29tcG9uZW50cy5wPntcIlxcblwifTwvX2NvbXBvbmVudHMuYmxvY2txdW90ZT48Lz47XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNRFhDb250ZW50KHByb3BzID0ge30pIHtcbiAgY29uc3Qge3dyYXBwZXI6IE1EWExheW91dH0gPSB7XG4gICAgLi4uX3Byb3ZpZGVDb21wb25lbnRzKCksXG4gICAgLi4ucHJvcHMuY29tcG9uZW50c1xuICB9O1xuICByZXR1cm4gTURYTGF5b3V0ID8gPE1EWExheW91dCB7Li4ucHJvcHN9PjxfY3JlYXRlTWR4Q29udGVudCB7Li4ucHJvcHN9IC8+PC9NRFhMYXlvdXQ+IDogX2NyZWF0ZU1keENvbnRlbnQocHJvcHMpO1xufVxuZnVuY3Rpb24gX21pc3NpbmdNZHhSZWZlcmVuY2UoaWQsIGNvbXBvbmVudCwgcGxhY2UpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgXCIgKyAoY29tcG9uZW50ID8gXCJjb21wb25lbnRcIiA6IFwib2JqZWN0XCIpICsgXCIgYFwiICsgaWQgKyBcImAgdG8gYmUgZGVmaW5lZDogeW91IGxpa2VseSBmb3Jnb3QgdG8gaW1wb3J0LCBwYXNzLCBvciBwcm92aWRlIGl0LlwiICsgKHBsYWNlID8gXCJcXG5JdOKAmXMgcmVmZXJlbmNlZCBpbiB5b3VyIGNvZGUgYXQgYFwiICsgcGxhY2UgKyBcImAgaW4gYC9hcHAvY29udGVudC9hZG1vbml0aW9uLm1keGBcIiA6IFwiXCIpKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBQUEsWUFBQSxHQUFBQyxPQUFB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
_csbRefreshUtils.postlude(module);} finally {  window.$RefreshReg$ = prevRefreshReg;  window.$RefreshSig$ = prevRefreshSig;}