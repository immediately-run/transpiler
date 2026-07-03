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
      h1: "h1",
      p: "p",
      ...(0, _MDXProvider.useMDXComponents)(),
      ...props.components
    },
    {
      WikiLink
    } = _components;
  if (!WikiLink) _missingMdxReference("WikiLink", true, "13:9-13:45");
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.h1, {
      children: "ESM expressions in links"
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["A link whose label is an evaluated expression:\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.a, {
        href: "http://mysite.com",
        children: dynamicLinkLabel()
      })]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["A markdown link whose destination looks dynamic is NOT evaluated — the brace text is\nliteral URL text: ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.a, {
        href: "%7BdynamicUrl()%7D",
        children: "Click here"
      })]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["The supported dynamic-URL form is JSX: ", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        href: dynamicUrl(),
        children: "Click here"
      })]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["A dynamic wiki target is not supported — [[", someFilename(), "]] is not a wiki-link;\nuse JSX ", /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
        target: someFilename()
      }), " instead."]
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
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it." + (place ? "\nIt’s referenced in your code at `" + place + "` in `/app/content/esm-links.mdx`" : ""));
}
var _c;
$RefreshReg$(_c, "MDXContent");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfTURYUHJvdmlkZXIiLCJyZXF1aXJlIiwiX2pzeFJ1bnRpbWUiLCJfY3JlYXRlTWR4Q29udGVudCIsInByb3BzIiwiX2NvbXBvbmVudHMiLCJhIiwiaDEiLCJwIiwiX3Byb3ZpZGVDb21wb25lbnRzIiwiY29tcG9uZW50cyIsIldpa2lMaW5rIiwiX21pc3NpbmdNZHhSZWZlcmVuY2UiLCJqc3hzIiwiRnJhZ21lbnQiLCJjaGlsZHJlbiIsImpzeCIsImhyZWYiLCJkeW5hbWljTGlua0xhYmVsIiwiZHluYW1pY1VybCIsInNvbWVGaWxlbmFtZSIsInRhcmdldCIsIk1EWENvbnRlbnQiLCJ3cmFwcGVyIiwiTURYTGF5b3V0IiwiX2MiLCJpZCIsImNvbXBvbmVudCIsInBsYWNlIiwiRXJyb3IiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlcyI6WyJlc20tbGlua3MubWR4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qQGpzeFJ1bnRpbWUgYXV0b21hdGljKi9cbi8qQGpzeEltcG9ydFNvdXJjZSByZWFjdCovXG5pbXBvcnQge3VzZU1EWENvbXBvbmVudHMgYXMgX3Byb3ZpZGVDb21wb25lbnRzfSBmcm9tIFwiQGltbWVkaWF0ZWx5LXJ1bi9zZGsvTURYUHJvdmlkZXJcIjtcbmZ1bmN0aW9uIF9jcmVhdGVNZHhDb250ZW50KHByb3BzKSB7XG4gIGNvbnN0IF9jb21wb25lbnRzID0ge1xuICAgIGE6IFwiYVwiLFxuICAgIGgxOiBcImgxXCIsXG4gICAgcDogXCJwXCIsXG4gICAgLi4uX3Byb3ZpZGVDb21wb25lbnRzKCksXG4gICAgLi4ucHJvcHMuY29tcG9uZW50c1xuICB9LCB7V2lraUxpbmt9ID0gX2NvbXBvbmVudHM7XG4gIGlmICghV2lraUxpbmspIF9taXNzaW5nTWR4UmVmZXJlbmNlKFwiV2lraUxpbmtcIiwgdHJ1ZSwgXCIxMzo5LTEzOjQ1XCIpO1xuICByZXR1cm4gPD48X2NvbXBvbmVudHMuaDE+e1wiRVNNIGV4cHJlc3Npb25zIGluIGxpbmtzXCJ9PC9fY29tcG9uZW50cy5oMT57XCJcXG5cIn08X2NvbXBvbmVudHMucD57XCJBIGxpbmsgd2hvc2UgbGFiZWwgaXMgYW4gZXZhbHVhdGVkIGV4cHJlc3Npb246XFxuXCJ9PF9jb21wb25lbnRzLmEgaHJlZj1cImh0dHA6Ly9teXNpdGUuY29tXCI+e2R5bmFtaWNMaW5rTGFiZWwoKX08L19jb21wb25lbnRzLmE+PC9fY29tcG9uZW50cy5wPntcIlxcblwifTxfY29tcG9uZW50cy5wPntcIkEgbWFya2Rvd24gbGluayB3aG9zZSBkZXN0aW5hdGlvbiBsb29rcyBkeW5hbWljIGlzIE5PVCBldmFsdWF0ZWQg4oCUIHRoZSBicmFjZSB0ZXh0IGlzXFxubGl0ZXJhbCBVUkwgdGV4dDogXCJ9PF9jb21wb25lbnRzLmEgaHJlZj1cIiU3QmR5bmFtaWNVcmwoKSU3RFwiPntcIkNsaWNrIGhlcmVcIn08L19jb21wb25lbnRzLmE+PC9fY29tcG9uZW50cy5wPntcIlxcblwifTxfY29tcG9uZW50cy5wPntcIlRoZSBzdXBwb3J0ZWQgZHluYW1pYy1VUkwgZm9ybSBpcyBKU1g6IFwifTxhIGhyZWY9e2R5bmFtaWNVcmwoKX0+e1wiQ2xpY2sgaGVyZVwifTwvYT48L19jb21wb25lbnRzLnA+e1wiXFxuXCJ9PF9jb21wb25lbnRzLnA+e1wiQSBkeW5hbWljIHdpa2kgdGFyZ2V0IGlzIG5vdCBzdXBwb3J0ZWQg4oCUIFtbXCJ9e3NvbWVGaWxlbmFtZSgpfXtcIl1dIGlzIG5vdCBhIHdpa2ktbGluaztcXG51c2UgSlNYIFwifTxXaWtpTGluayB0YXJnZXQ9e3NvbWVGaWxlbmFtZSgpfSAvPntcIiBpbnN0ZWFkLlwifTwvX2NvbXBvbmVudHMucD48Lz47XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNRFhDb250ZW50KHByb3BzID0ge30pIHtcbiAgY29uc3Qge3dyYXBwZXI6IE1EWExheW91dH0gPSB7XG4gICAgLi4uX3Byb3ZpZGVDb21wb25lbnRzKCksXG4gICAgLi4ucHJvcHMuY29tcG9uZW50c1xuICB9O1xuICByZXR1cm4gTURYTGF5b3V0ID8gPE1EWExheW91dCB7Li4ucHJvcHN9PjxfY3JlYXRlTWR4Q29udGVudCB7Li4ucHJvcHN9IC8+PC9NRFhMYXlvdXQ+IDogX2NyZWF0ZU1keENvbnRlbnQocHJvcHMpO1xufVxuZnVuY3Rpb24gX21pc3NpbmdNZHhSZWZlcmVuY2UoaWQsIGNvbXBvbmVudCwgcGxhY2UpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgXCIgKyAoY29tcG9uZW50ID8gXCJjb21wb25lbnRcIiA6IFwib2JqZWN0XCIpICsgXCIgYFwiICsgaWQgKyBcImAgdG8gYmUgZGVmaW5lZDogeW91IGxpa2VseSBmb3Jnb3QgdG8gaW1wb3J0LCBwYXNzLCBvciBwcm92aWRlIGl0LlwiICsgKHBsYWNlID8gXCJcXG5JdOKAmXMgcmVmZXJlbmNlZCBpbiB5b3VyIGNvZGUgYXQgYFwiICsgcGxhY2UgKyBcImAgaW4gYC9hcHAvY29udGVudC9lc20tbGlua3MubWR4YFwiIDogXCJcIikpO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxJQUFBQSxZQUFBLEdBQUFDLE9BQUE7QUFBd0YsSUFBQUMsV0FBQSxHQUFBRCxPQUFBO0FBRnhGO0FBQ0E7O0FBRUEsU0FBU0UsaUJBQWlCQSxDQUFDQyxLQUFLLEVBQUU7RUFDaEMsTUFBTUMsV0FBVyxHQUFHO01BQ2xCQyxDQUFDLEVBQUUsR0FBRztNQUNOQyxFQUFFLEVBQUUsSUFBSTtNQUNSQyxDQUFDLEVBQUUsR0FBRztNQUNOLEdBQUcsSUFBQUMsNkJBQWtCLEVBQUMsQ0FBQztNQUN2QixHQUFHTCxLQUFLLENBQUNNO0lBQ1gsQ0FBQztJQUFFO01BQUNDO0lBQVEsQ0FBQyxHQUFHTixXQUFXO0VBQzNCLElBQUksQ0FBQ00sUUFBUSxFQUFFQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQztFQUNuRSxvQkFBTyxJQUFBVixXQUFBLENBQUFXLElBQUEsRUFBQVgsV0FBQSxDQUFBWSxRQUFBO0lBQUFDLFFBQUEsZ0JBQUUsSUFBQWIs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
_csbRefreshUtils.postlude(module);} finally {  window.$RefreshReg$ = prevRefreshReg;  window.$RefreshSig$ = prevRefreshSig;}