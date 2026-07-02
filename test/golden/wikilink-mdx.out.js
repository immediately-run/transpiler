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
      code: "code",
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
      WikiLink
    } = _components;
  if (!WikiLink) _missingMdxReference("WikiLink", true);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.h1, {
      children: "WikiLinks"
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["A bare relative link ", /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
        target: "another.mdx",
        from: "/app/content/wikilink.mdx"
      }), " and a nested one ", /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
        target: "sub/dir/page.mdx",
        from: "/app/content/wikilink.mdx"
      }), "."]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["An explicit label: ", /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
        target: "target.mdx",
        label: "My Favorite Link",
        from: "/app/content/wikilink.mdx"
      }), "."]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["An absolute target ", /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
        target: "/app/docs/absolute/link.mdx",
        from: "/app/content/wikilink.mdx"
      }), " taken verbatim."]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["Two on one line: ", /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
        target: "a.mdx",
        from: "/app/content/wikilink.mdx"
      }), " and ", /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
        target: "b.mdx",
        from: "/app/content/wikilink.mdx"
      }), "."]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["A wiki-link inside ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.strong, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
          target: "bold.mdx",
          from: "/app/content/wikilink.mdx"
        })
      }), " phrasing."]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.table, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.thead, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.tr, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.th, {
            children: "Column"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.th, {
            children: "Link"
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.tbody, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.tr, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.td, {
            children: "row"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.td, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(WikiLink, {
              target: "celltarget.mdx",
              label: "label",
              from: "/app/content/wikilink.mdx"
            })
          })]
        })
      })]
    }), "\n", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.p, {
      children: ["An ordinary ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.a, {
        href: "https://example.com",
        children: "markdown link"
      }), " is untouched, and ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.code, {
        children: "[[code]]"
      }), " in\nan inline code span stays literal."]
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
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it." + (place ? "\nIt’s referenced in your code at `" + place + "` in `/app/content/wikilink.mdx`" : ""));
}
var _c;
$RefreshReg$(_c, "MDXContent");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfTURYUHJvdmlkZXIiLCJyZXF1aXJlIiwiX2pzeFJ1bnRpbWUiLCJfY3JlYXRlTWR4Q29udGVudCIsInByb3BzIiwiX2NvbXBvbmVudHMiLCJhIiwiY29kZSIsImgxIiwicCIsInN0cm9uZyIsInRhYmxlIiwidGJvZHkiLCJ0ZCIsInRoIiwidGhlYWQiLCJ0ciIsIl9wcm92aWRlQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJXaWtpTGluayIsIl9taXNzaW5nTWR4UmVmZXJlbmNlIiwianN4cyIsIkZyYWdtZW50IiwiY2hpbGRyZW4iLCJqc3giLCJ0YXJnZXQiLCJmcm9tIiwibGFiZWwiLCJocmVmIiwiTURYQ29udGVudCIsIndyYXBwZXIiLCJNRFhMYXlvdXQiLCJfYyIsImlkIiwiY29tcG9uZW50IiwicGxhY2UiLCJFcnJvciIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VzIjpbIndpa2lsaW5rLm1keCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKkBqc3hSdW50aW1lIGF1dG9tYXRpYyovXG4vKkBqc3hJbXBvcnRTb3VyY2UgcmVhY3QqL1xuaW1wb3J0IHt1c2VNRFhDb21wb25lbnRzIGFzIF9wcm92aWRlQ29tcG9uZW50c30gZnJvbSBcIkBpbW1lZGlhdGVseS1ydW4vc2RrL01EWFByb3ZpZGVyXCI7XG5mdW5jdGlvbiBfY3JlYXRlTWR4Q29udGVudChwcm9wcykge1xuICBjb25zdCBfY29tcG9uZW50cyA9IHtcbiAgICBhOiBcImFcIixcbiAgICBjb2RlOiBcImNvZGVcIixcbiAgICBoMTogXCJoMVwiLFxuICAgIHA6IFwicFwiLFxuICAgIHN0cm9uZzogXCJzdHJvbmdcIixcbiAgICB0YWJsZTogXCJ0YWJsZVwiLFxuICAgIHRib2R5OiBcInRib2R5XCIsXG4gICAgdGQ6IFwidGRcIixcbiAgICB0aDogXCJ0aFwiLFxuICAgIHRoZWFkOiBcInRoZWFkXCIsXG4gICAgdHI6IFwidHJcIixcbiAgICAuLi5fcHJvdmlkZUNvbXBvbmVudHMoKSxcbiAgICAuLi5wcm9wcy5jb21wb25lbnRzXG4gIH0sIHtXaWtpTGlua30gPSBfY29tcG9uZW50cztcbiAgaWYgKCFXaWtpTGluaykgX21pc3NpbmdNZHhSZWZlcmVuY2UoXCJXaWtpTGlua1wiLCB0cnVlKTtcbiAgcmV0dXJuIDw+PF9jb21wb25lbnRzLmgxPntcIldpa2lMaW5rc1wifTwvX2NvbXBvbmVudHMuaDE+e1wiXFxuXCJ9PF9jb21wb25lbnRzLnA+e1wiQSBiYXJlIHJlbGF0aXZlIGxpbmsgXCJ9PFdpa2lMaW5rIHRhcmdldD1cImFub3RoZXIubWR4XCIgZnJvbT1cIi9hcHAvY29udGVudC93aWtpbGluay5tZHhcIiAvPntcIiBhbmQgYSBuZXN0ZWQgb25lIFwifTxXaWtpTGluayB0YXJnZXQ9XCJzdWIvZGlyL3BhZ2UubWR4XCIgZnJvbT1cIi9hcHAvY29udGVudC93aWtpbGluay5tZHhcIiAvPntcIi5cIn08L19jb21wb25lbnRzLnA+e1wiXFxuXCJ9PF9jb21wb25lbnRzLnA+e1wiQW4gZXhwbGljaXQgbGFiZWw6IFwifTxXaWtpTGluayB0YXJnZXQ9XCJ0YXJnZXQubWR4XCIgbGFiZWw9XCJNeSBGYXZvcml0ZSBMaW5rXCIgZnJvbT1cIi9hcHAvY29udGVudC93aWtpbGluay5tZHhcIiAvPntcIi5cIn08L19jb21wb25lbnRzLnA+e1wiXFxuXCJ9PF9jb21wb25lbnRzLnA+e1wiQW4gYWJzb2x1dGUgdGFyZ2V0IFwifTxXaWtpTGluayB0YXJnZXQ9XCIvYXBwL2RvY3MvYWJzb2x1dGUvbGluay5tZHhcIiBmcm9tPVwiL2FwcC9jb250ZW50L3dpa2lsaW5rLm1keFwiIC8+e1wiIHRha2VuIHZlcmJhdGltLlwifTwvX2NvbXBvbmVudHMucD57XCJcXG5cIn08X2NvbXBvbmVudHMucD57XCJUd28gb24gb25lIGxpbmU6IFwifTxXaWtpTGluayB0YXJnZXQ9XCJhLm1keFwiIGZyb209XCIvYXBwL2NvbnRlbnQvd2lraWxpbmsubWR4XCIgLz57XCIgYW5kIFwifTxXaWtpTGluayB0YXJnZXQ9XCJiLm1keFwiIGZyb209XCIvYXBwL2NvbnRlbnQvd2lraWxpbmsubWR4XCIgLz57XCIuXCJ9PC9fY29tcG9uZW50cy5wPntcIlxcblwifTxfY29tcG9uZW50cy5wPntcIkEgd2lraS1saW5rIGluc2lkZSBcIn08X2NvbXBvbmVudHMuc3Ryb25nPjxXaWtpTGluayB0YXJnZXQ9XCJib2xkLm1keFwiIGZyb209XCIvYXBwL2NvbnRlbnQvd2lraWxpbmsubWR4XCIgLz48L19jb21wb25lbnRzLnN0cm9uZz57XCIgcGhyYXNpbmcuXCJ9PC9fY29tcG9uZW50cy5wPntcIlxcblwifTxfY29tcG9uZW50cy50YWJsZT48X2NvbXBvbmVudHMudGhlYWQ+PF9jb21wb25lbnRzLnRyPjxfY29tcG9uZW50cy50aD57XCJDb2x1bW5cIn08L19jb21wb25lbnRzLnRoPjxfY29tcG9uZW50cy50aD57XCJMaW5rXCJ9PC9fY29tcG9uZW50cy50aD48L19jb21wb25lbnRzLnRyPjwvX2NvbXBvbmVudHMudGhlYWQ+PF9jb21wb25lbnRzLnRib2R5PjxfY29tcG9uZW50cy50cj48X2NvbXBvbmVudHMudGQ+e1wicm93XCJ9PC9fY29tcG9uZW50cy50ZD48X2NvbXBvbmVudHMudGQ+PFdpa2lMaW5rIHRhcmdldD1cImNlbGx0YXJnZXQubWR4XCIgbGFiZWw9XCJsYWJlbFwiIGZyb209XCIvYXBwL2NvbnRlbnQvd2lraWxpbmsubWR4XCIgLz48L19jb21wb25lbnRzLnRkPjwvX2NvbXBvbmVudHMudHI+PC9fY29tcG9uZW50cy50Ym9keT48L19jb21wb25lbnRzLnRhYmxlPntcIlxcblwifTxfY29tcG9uZW50cy5wPntcIkFuIG9yZGluYXJ5IFwifTxfY29tcG9uZW50cy5hIGhyZWY9XCJodHRwczovL2V4YW1wbGUuY29tXCI+e1wibWFya2Rvd24gbGlua1wifTwvX2NvbXBvbmVudHMuYT57XCIgaXMgdW50b3VjaGVkLCBhbmQgXCJ9PF9jb21wb25lbnRzLmNvZGU+e1wiW1tjb2RlXV1cIn08L19jb21wb25lbnRzLmNvZGU+e1wiIGluXFxuYW4gaW5saW5lIGNvZGUgc3BhbiBzdGF5cyBsaXRlcmFsLlwifTwvX2NvbXBvbmVudHMucD48Lz47XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNRFhDb250ZW50KHByb3BzID0ge30pIHtcbiAgY29uc3Qge3dyYXBwZXI6IE1EWExheW91dH0gPSB7XG4gICAgLi4uX3Byb3ZpZGVDb21wb25lbnRzKCksXG4gICAgLi4ucHJvcHMuY29tcG9uZW50c1xuICB9O1xuICByZXR1cm4gTURYTGF5b3V0ID8gPE1EWExheW91dCB7Li4ucHJvcHN9PjxfY3JlYXRlTWR4Q29udGVudCB7Li4ucHJvcHN9IC8+PC9NRFhMYXlvdXQ+IDogX2NyZWF0ZU1keENvbnRlbnQocHJvcHMpO1xufVxuZnVuY3Rpb24gX21pc3NpbmdNZHhSZWZlcmVuY2UoaWQsIGNvbXBvbmVudCwgcGxhY2UpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgXCIgKyAoY29tcG9uZW50ID8gXCJjb21wb25lbnRcIiA6IFwib2JqZWN0XCIpICsgXCIgYFwiICsgaWQgKyBcImAgdG8gYmUgZGVmaW5lZDogeW91IGxpa2VseSBmb3Jnb3QgdG8gaW1wb3J0LCBwYXNzLCBvciBwcm92aWRlIGl0LlwiICsgKHBsYWNlID8gXCJcXG5JdOKAmXMgcmVmZXJlbmNlZCBpbiB5b3VyIGNvZGUgYXQgYFwiICsgcGxhY2UgKyBcImAgaW4gYC9hcHAvY29udGVudC93aWtpbGluay5tZHhgXCIgOiBcIlwiKSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLElBQUFBLFlBQUEsR0FBQUMsT0FBQTtBQUF3RixJQUFBQyxXQUFBLEdBQUFELE9BQUE7QUFGeEY7QUFDQTs7QUFFQSxTQUFTRSxpQkFBaUJBLENBQUNDLEtBQUssRUFBRTtFQUNoQyxNQUFNQyxXQUFXLEdBQUc7TUFDbEJDLENBQUMsRUFBRSxHQUFHO01BQ05DLElBQUksRUFBRSxNQUFNO01BQ1pDLEVBQUUsRUFBRSxJQUFJO01BQ1JDLENBQUMsRUFBRSxHQUFHO01BQ05DLE1BQU0s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
_csbRefreshUtils.postlude(module);} finally {  window.$RefreshReg$ = prevRefreshReg;  window.$RefreshSig$ = prevRefreshSig;}