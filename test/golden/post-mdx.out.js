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
      del: "del",
      h1: "h1",
      p: "p",
      strong: "strong",
      table: "table",
      tbody: "tbody",
      td: "td",
      th: "th",
      thead: "thead",
      tr: "tr",
      ...(0, _MDXProvider.useMDXComponents)(),
      ...props.components
    },
    {
      Callout
    } = _components;
  if (!Callout) _missingMdxReference("Callout", true, "6:1-6:50");
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.h1, {
      children: props.title ?? 'Hello'
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["This is ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.strong, {
        children: "MDX"
      }), " with a ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.a, {
        href: "https://example.com",
        children: "link"
      }), " and GFM ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.del, {
        children: "strikethrough"
      }), "."]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsx)(Callout, {
      children: "Rendered through the provider."
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.table, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.thead, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.tr, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.th, {
            children: "a"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.th, {
            children: "b"
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.tbody, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.tr, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.td, {
            children: "1"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.td, {
            children: "2"
          })]
        })
      })]
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
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it." + (place ? "\nIt’s referenced in your code at `" + place + "` in `/app/content/post.mdx`" : ""));
}
var _c;
$RefreshReg$(_c, "MDXContent");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfTURYUHJvdmlkZXIiLCJyZXF1aXJlIiwiX2pzeFJ1bnRpbWUiLCJfY3JlYXRlTWR4Q29udGVudCIsInByb3BzIiwiX2NvbXBvbmVudHMiLCJhIiwiZGVsIiwiaDEiLCJwIiwic3Ryb25nIiwidGFibGUiLCJ0Ym9keSIsInRkIiwidGgiLCJ0aGVhZCIsInRyIiwiX3Byb3ZpZGVDb21wb25lbnRzIiwiY29tcG9uZW50cyIsIkNhbGxvdXQiLCJfbWlzc2luZ01keFJlZmVyZW5jZSIsImpzeHMiLCJGcmFnbWVudCIsImNoaWxkcmVuIiwianN4IiwidGl0bGUiLCJocmVmIiwiTURYQ29udGVudCIsIndyYXBwZXIiLCJNRFhMYXlvdXQiLCJfYyIsImlkIiwiY29tcG9uZW50IiwicGxhY2UiLCJFcnJvciIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VzIjpbInBvc3QubWR4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qQGpzeFJ1bnRpbWUgYXV0b21hdGljKi9cbi8qQGpzeEltcG9ydFNvdXJjZSByZWFjdCovXG5pbXBvcnQge3VzZU1EWENvbXBvbmVudHMgYXMgX3Byb3ZpZGVDb21wb25lbnRzfSBmcm9tIFwiQGltbWVkaWF0ZWx5LXJ1bi9zZGsvTURYUHJvdmlkZXJcIjtcbmZ1bmN0aW9uIF9jcmVhdGVNZHhDb250ZW50KHByb3BzKSB7XG4gIGNvbnN0IF9jb21wb25lbnRzID0ge1xuICAgIGE6IFwiYVwiLFxuICAgIGRlbDogXCJkZWxcIixcbiAgICBoMTogXCJoMVwiLFxuICAgIHA6IFwicFwiLFxuICAgIHN0cm9uZzogXCJzdHJvbmdcIixcbiAgICB0YWJsZTogXCJ0YWJsZVwiLFxuICAgIHRib2R5OiBcInRib2R5XCIsXG4gICAgdGQ6IFwidGRcIixcbiAgICB0aDogXCJ0aFwiLFxuICAgIHRoZWFkOiBcInRoZWFkXCIsXG4gICAgdHI6IFwidHJcIixcbiAgICAuLi5fcHJvdmlkZUNvbXBvbmVudHMoKSxcbiAgICAuLi5wcm9wcy5jb21wb25lbnRzXG4gIH0sIHtDYWxsb3V0fSA9IF9jb21wb25lbnRzO1xuICBpZiAoIUNhbGxvdXQpIF9taXNzaW5nTWR4UmVmZXJlbmNlKFwiQ2FsbG91dFwiLCB0cnVlLCBcIjY6MS02OjUwXCIpO1xuICByZXR1cm4gPD48X2NvbXBvbmVudHMuaDE+e3Byb3BzLnRpdGxlID8/ICdIZWxsbyd9PC9fY29tcG9uZW50cy5oMT57XCJcXG5cIn08X2NvbXBvbmVudHMucD57XCJUaGlzIGlzIFwifTxfY29tcG9uZW50cy5zdHJvbmc+e1wiTURYXCJ9PC9fY29tcG9uZW50cy5zdHJvbmc+e1wiIHdpdGggYSBcIn08X2NvbXBvbmVudHMuYSBocmVmPVwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiPntcImxpbmtcIn08L19jb21wb25lbnRzLmE+e1wiIGFuZCBHRk0gXCJ9PF9jb21wb25lbnRzLmRlbD57XCJzdHJpa2V0aHJvdWdoXCJ9PC9fY29tcG9uZW50cy5kZWw+e1wiLlwifTwvX2NvbXBvbmVudHMucD57XCJcXG5cIn08Q2FsbG91dD57XCJSZW5kZXJlZCB0aHJvdWdoIHRoZSBwcm92aWRlci5cIn08L0NhbGxvdXQ+e1wiXFxuXCJ9PF9jb21wb25lbnRzLnRhYmxlPjxfY29tcG9uZW50cy50aGVhZD48X2NvbXBvbmVudHMudHI+PF9jb21wb25lbnRzLnRoPntcImFcIn08L19jb21wb25lbnRzLnRoPjxfY29tcG9uZW50cy50aD57XCJiXCJ9PC9fY29tcG9uZW50cy50aD48L19jb21wb25lbnRzLnRyPjwvX2NvbXBvbmVudHMudGhlYWQ+PF9jb21wb25lbnRzLnRib2R5PjxfY29tcG9uZW50cy50cj48X2NvbXBvbmVudHMudGQ+e1wiMVwifTwvX2NvbXBvbmVudHMudGQ+PF9jb21wb25lbnRzLnRkPntcIjJcIn08L19jb21wb25lbnRzLnRkPjwvX2NvbXBvbmVudHMudHI+PC9fY29tcG9uZW50cy50Ym9keT48L19jb21wb25lbnRzLnRhYmxlPjwvPjtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1EWENvbnRlbnQocHJvcHMgPSB7fSkge1xuICBjb25zdCB7d3JhcHBlcjogTURYTGF5b3V0fSA9IHtcbiAgICAuLi5fcHJvdmlkZUNvbXBvbmVudHMoKSxcbiAgICAuLi5wcm9wcy5jb21wb25lbnRzXG4gIH07XG4gIHJldHVybiBNRFhMYXlvdXQgPyA8TURYTGF5b3V0IHsuLi5wcm9wc30+PF9jcmVhdGVNZHhDb250ZW50IHsuLi5wcm9wc30gLz48L01EWExheW91dD4gOiBfY3JlYXRlTWR4Q29udGVudChwcm9wcyk7XG59XG5mdW5jdGlvbiBfbWlzc2luZ01keFJlZmVyZW5jZShpZCwgY29tcG9uZW50LCBwbGFjZSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBcIiArIChjb21wb25lbnQgPyBcImNvbXBvbmVudFwiIDogXCJvYmplY3RcIikgKyBcIiBgXCIgKyBpZCArIFwiYCB0byBiZSBkZWZpbmVkOiB5b3UgbGlrZWx5IGZvcmdvdCB0byBpbXBvcnQsIHBhc3MsIG9yIHByb3ZpZGUgaXQuXCIgKyAocGxhY2UgPyBcIlxcbkl04oCZcyByZWZlcmVuY2VkIGluIHlvdXIgY29kZSBhdCBgXCIgKyBwbGFjZSArIFwiYCBpbiBgL2FwcC9jb250ZW50L3Bvc3QubWR4YFwiIDogXCJcIikpO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxJQUFBQSxZQUFBLEdBQUFDLE9BQUE7QUFBd0YsSUFBQUMsV0FBQSxHQUFBRCxPQUFBO0FBRnhGO0FBQ0E7O0FBRUEsU0FBU0UsaUJBQWlCQSxDQUFDQyxLQUFLLEVBQUU7RUFDaEMsTUFBTUMsV0FBVyxHQUFHO01BQ2xCQyxDQUFDLEVBQUUsR0FBRztNQUNOQyxHQUFHLEVBQUUsS0FBSztNQUNWQyxFQUFFLEVBQUUsSUFBSTtNQUNSQyxDQUFDLEVBQUUsR0FBRztNQUNOQyxNQUFNLEVBQUUsUUFBUTtNQUNoQkMsS0FBSyxFQUFFLE9BQU87TUFDZEMsS0FBSyxFQUFFLE9BQU87TUFDZEMsRUFBRSxFQUFFLElBQUk7TUFDUkMsRUFBRSxFQUFFLElBQUk7TUFDUkMsS0FBSyxFQUFFLE9B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
_csbRefreshUtils.postlude(module);} finally {  window.$RefreshReg$ = prevRefreshReg;  window.$RefreshSig$ = prevRefreshSig;}