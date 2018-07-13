(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function h(name, attributes) {
      var rest = [];
      var children = [];
      var length = arguments.length;

      while (length-- > 2) rest.push(arguments[length]);

      while (rest.length) {
        var node = rest.pop();
        if (node && node.pop) {
          for (length = node.length; length--; ) {
            rest.push(node[length]);
          }
        } else if (node != null && node !== true && node !== false) {
          children.push(node);
        }
      }

      return typeof name === "function"
        ? name(attributes || {}, children)
        : {
            nodeName: name,
            attributes: attributes || {},
            children: children,
            key: attributes && attributes.key
          }
    }

    function app(state, actions, view, container) {
      var map = [].map;
      var rootElement = (container && container.children[0]) || null;
      var oldNode = rootElement && recycleElement(rootElement);
      var lifecycle = [];
      var skipRender;
      var isRecycling = true;
      var globalState = clone(state);
      var wiredActions = wireStateToActions([], globalState, clone(actions));

      scheduleRender();

      return wiredActions

      function recycleElement(element) {
        return {
          nodeName: element.nodeName.toLowerCase(),
          attributes: {},
          children: map.call(element.childNodes, function(element) {
            return element.nodeType === 3 // Node.TEXT_NODE
              ? element.nodeValue
              : recycleElement(element)
          })
        }
      }

      function resolveNode(node) {
        return typeof node === "function"
          ? resolveNode(node(globalState, wiredActions))
          : node != null
            ? node
            : ""
      }

      function render() {
        skipRender = !skipRender;

        var node = resolveNode(view);

        if (container && !skipRender) {
          rootElement = patch(container, rootElement, oldNode, (oldNode = node));
        }

        isRecycling = false;

        while (lifecycle.length) lifecycle.pop()();
      }

      function scheduleRender() {
        if (!skipRender) {
          skipRender = true;
          setTimeout(render);
        }
      }

      function clone(target, source) {
        var out = {};

        for (var i in target) out[i] = target[i];
        for (var i in source) out[i] = source[i];

        return out
      }

      function setPartialState(path, value, source) {
        var target = {};
        if (path.length) {
          target[path[0]] =
            path.length > 1
              ? setPartialState(path.slice(1), value, source[path[0]])
              : value;
          return clone(source, target)
        }
        return value
      }

      function getPartialState(path, source) {
        var i = 0;
        while (i < path.length) {
          source = source[path[i++]];
        }
        return source
      }

      function wireStateToActions(path, state, actions) {
        for (var key in actions) {
          typeof actions[key] === "function"
            ? (function(key, action) {
                actions[key] = function(data) {
                  var result = action(data);

                  if (typeof result === "function") {
                    result = result(getPartialState(path, globalState), actions);
                  }

                  if (
                    result &&
                    result !== (state = getPartialState(path, globalState)) &&
                    !result.then // !isPromise
                  ) {
                    scheduleRender(
                      (globalState = setPartialState(
                        path,
                        clone(state, result),
                        globalState
                      ))
                    );
                  }

                  return result
                };
              })(key, actions[key])
            : wireStateToActions(
                path.concat(key),
                (state[key] = clone(state[key])),
                (actions[key] = clone(actions[key]))
              );
        }

        return actions
      }

      function getKey(node) {
        return node ? node.key : null
      }

      function eventListener(event) {
        return event.currentTarget.events[event.type](event)
      }

      function updateAttribute(element, name, value, oldValue, isSvg) {
        if (name === "key") ; else if (name === "style") {
          for (var i in clone(oldValue, value)) {
            var style = value == null || value[i] == null ? "" : value[i];
            if (i[0] === "-") {
              element[name].setProperty(i, style);
            } else {
              element[name][i] = style;
            }
          }
        } else {
          if (name[0] === "o" && name[1] === "n") {
            name = name.slice(2);

            if (element.events) {
              if (!oldValue) oldValue = element.events[name];
            } else {
              element.events = {};
            }

            element.events[name] = value;

            if (value) {
              if (!oldValue) {
                element.addEventListener(name, eventListener);
              }
            } else {
              element.removeEventListener(name, eventListener);
            }
          } else if (name in element && name !== "list" && !isSvg) {
            element[name] = value == null ? "" : value;
          } else if (value != null && value !== false) {
            element.setAttribute(name, value);
          }

          if (value == null || value === false) {
            element.removeAttribute(name);
          }
        }
      }

      function createElement(node, isSvg) {
        var element =
          typeof node === "string" || typeof node === "number"
            ? document.createTextNode(node)
            : (isSvg = isSvg || node.nodeName === "svg")
              ? document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  node.nodeName
                )
              : document.createElement(node.nodeName);

        var attributes = node.attributes;
        if (attributes) {
          if (attributes.oncreate) {
            lifecycle.push(function() {
              attributes.oncreate(element);
            });
          }

          for (var i = 0; i < node.children.length; i++) {
            element.appendChild(
              createElement(
                (node.children[i] = resolveNode(node.children[i])),
                isSvg
              )
            );
          }

          for (var name in attributes) {
            updateAttribute(element, name, attributes[name], null, isSvg);
          }
        }

        return element
      }

      function updateElement(element, oldAttributes, attributes, isSvg) {
        for (var name in clone(oldAttributes, attributes)) {
          if (
            attributes[name] !==
            (name === "value" || name === "checked"
              ? element[name]
              : oldAttributes[name])
          ) {
            updateAttribute(
              element,
              name,
              attributes[name],
              oldAttributes[name],
              isSvg
            );
          }
        }

        var cb = isRecycling ? attributes.oncreate : attributes.onupdate;
        if (cb) {
          lifecycle.push(function() {
            cb(element, oldAttributes);
          });
        }
      }

      function removeChildren(element, node) {
        var attributes = node.attributes;
        if (attributes) {
          for (var i = 0; i < node.children.length; i++) {
            removeChildren(element.childNodes[i], node.children[i]);
          }

          if (attributes.ondestroy) {
            attributes.ondestroy(element);
          }
        }
        return element
      }

      function removeElement(parent, element, node) {
        function done() {
          parent.removeChild(removeChildren(element, node));
        }

        var cb = node.attributes && node.attributes.onremove;
        if (cb) {
          cb(element, done);
        } else {
          done();
        }
      }

      function patch(parent, element, oldNode, node, isSvg) {
        if (node === oldNode) ; else if (oldNode == null || oldNode.nodeName !== node.nodeName) {
          var newElement = createElement(node, isSvg);
          parent.insertBefore(newElement, element);

          if (oldNode != null) {
            removeElement(parent, element, oldNode);
          }

          element = newElement;
        } else if (oldNode.nodeName == null) {
          element.nodeValue = node;
        } else {
          updateElement(
            element,
            oldNode.attributes,
            node.attributes,
            (isSvg = isSvg || node.nodeName === "svg")
          );

          var oldKeyed = {};
          var newKeyed = {};
          var oldElements = [];
          var oldChildren = oldNode.children;
          var children = node.children;

          for (var i = 0; i < oldChildren.length; i++) {
            oldElements[i] = element.childNodes[i];

            var oldKey = getKey(oldChildren[i]);
            if (oldKey != null) {
              oldKeyed[oldKey] = [oldElements[i], oldChildren[i]];
            }
          }

          var i = 0;
          var k = 0;

          while (k < children.length) {
            var oldKey = getKey(oldChildren[i]);
            var newKey = getKey((children[k] = resolveNode(children[k])));

            if (newKeyed[oldKey]) {
              i++;
              continue
            }

            if (newKey != null && newKey === getKey(oldChildren[i + 1])) {
              if (oldKey == null) {
                removeElement(element, oldElements[i], oldChildren[i]);
              }
              i++;
              continue
            }

            if (newKey == null || isRecycling) {
              if (oldKey == null) {
                patch(element, oldElements[i], oldChildren[i], children[k], isSvg);
                k++;
              }
              i++;
            } else {
              var keyedNode = oldKeyed[newKey] || [];

              if (oldKey === newKey) {
                patch(element, keyedNode[0], keyedNode[1], children[k], isSvg);
                i++;
              } else if (keyedNode[0]) {
                patch(
                  element,
                  element.insertBefore(keyedNode[0], oldElements[i]),
                  keyedNode[1],
                  children[k],
                  isSvg
                );
              } else {
                patch(element, oldElements[i], null, children[k], isSvg);
              }

              newKeyed[newKey] = children[k];
              k++;
            }
          }

          while (i < oldChildren.length) {
            if (getKey(oldChildren[i]) == null) {
              removeElement(element, oldElements[i], oldChildren[i]);
            }
            i++;
          }

          for (var i in oldKeyed) {
            if (!newKeyed[i]) {
              removeElement(element, oldKeyed[i][0], oldKeyed[i][1]);
            }
          }
        }
        return element
      }
    }

    function getOrigin(loc) {
      return loc.protocol + "//" + loc.hostname + (loc.port ? ":" + loc.port : "")
    }

    function isExternal(anchorElement) {
      // Location.origin and HTMLAnchorElement.origin are not
      // supported by IE and Safari.
      return getOrigin(location) !== getOrigin(anchorElement)
    }

    function Link(props, children) {
      return function(state, actions) {
        var to = props.to;
        var location = state.location;
        var onclick = props.onclick;
        delete props.to;
        delete props.location;

        props.href = to;
        props.onclick = function(e) {
          if (onclick) {
            onclick(e);
          }
          if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.altKey ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            props.target === "_blank" ||
            isExternal(e.currentTarget)
          ) ; else {
            e.preventDefault();

            if (to !== location.pathname) {
              history.pushState(location.pathname, "", to);
            }
          }
        };

        return h("a", props, children)
      }
    }

    function wrapHistory(keys) {
      return keys.reduce(function(next, key) {
        var fn = history[key];

        history[key] = function(data, title, url) {
          fn.call(this, data, title, url);
          dispatchEvent(new CustomEvent("pushstate", { detail: data }));
        };

        return function() {
          history[key] = fn;
          next && next();
        }
      }, null)
    }

    var location$1 = {
      state: {
        pathname: window.location.pathname,
        previous: window.location.pathname
      },
      actions: {
        go: function(pathname) {
          history.pushState(null, "", pathname);
        },
        set: function(data) {
          return data
        }
      },
      subscribe: function(actions) {
        function handleLocationChange(e) {
          actions.set({
            pathname: window.location.pathname,
            previous: e.detail
              ? (window.location.previous = e.detail)
              : window.location.previous
          });
        }

        var unwrap = wrapHistory(["pushState", "replaceState"]);

        addEventListener("pushstate", handleLocationChange);
        addEventListener("popstate", handleLocationChange);

        return function() {
          removeEventListener("pushstate", handleLocationChange);
          removeEventListener("popstate", handleLocationChange);
          unwrap();
        }
      }
    };

    var PostTags = (function (_a) {
        var tags = _a.tags;
        return h("ul", { class: "PostTags" }, tags.map(function (tag) {
            return h("li", { key: tag, class: "PostTags-li" },
                h(Link, { class: "PostTags-Link", to: "/tags/" + tag + "/" }, tag),
                ' ');
        }));
    });

    var title = 'Tech SANDBOX';
    var blogUrl = '/blog';
    var GA_TRACKING_ID = 'UA-74494516-4';

    var PostThumb = (function (_a) {
        var post = _a.post;
        return h("article", null,
            h("span", null, post.date),
            h("h1", { class: "PostThumb-title" },
                h(Link, { to: blogUrl + "/" + post.slug + "/" }, post.title)),
            h(PostTags, { tags: post.tags }));
    });

    var Posts = (function (_a) {
        var posts = _a.posts;
        return h("ul", { class: "Posts" }, posts.map(function (post) {
            return h("li", { key: post.slug, class: "Posts-li" },
                h(PostThumb, { post: post }));
        }));
    });

    var $0_src_containers_PostList = (function (_a) {
        var posts = _a.posts;
        return h("div", null,
            h(Posts, { posts: posts }));
    });

    var PostPager = (function (_a) {
        var prev = _a.prev, next = _a.next;
        return h("div", { class: "PostPager" },
            h("div", { class: "PostPager-item" }, prev ? h(Link, { to: blogUrl + "/" + prev.slug + "/" }, prev.title) : null),
            h("div", { class: "PostPager-item" },
                h(Link, { to: "/" }, "HOME")),
            h("div", { class: "PostPager-item" }, next ? h(Link, { to: blogUrl + "/" + next.slug + "/" }, next.title) : null));
    });

    var $1_src_containers_Post = (function (_a) {
        var post = _a.post, prev = _a.prev, next = _a.next;
        return h("div", null,
            h("article", null,
                h("span", null, post.date),
                h("h1", null, post.title),
                h(PostTags, { tags: post.tags }),
                h("div", { innerHTML: post.contents, oncreate: function (el) {
                        el.innerHTML = post.contents;
                        el.addEventListener('click', function (e) {
                            var target = e.target;
                            if (target instanceof HTMLAnchorElement && !/$http/.test(target.href)) {
                                e.preventDefault();
                                history.pushState(location.pathname, '', target.href);
                            }
                        });
                    } })),
            h(PostPager, { prev: prev, next: next }));
    });

    var $2_src_containers_SearchedPostList = (function (_a) {
        var posts = _a.posts, tag = _a.tag;
        return h("div", null,
            h("div", null,
                h(Link, { to: "/" }, "TOP"),
                ' > ',
                h("span", null, tag)),
            h("p", null,
                "\u300C",
                tag,
                "\u300D\u306E\u691C\u7D22\u7D50\u679C"),
            h(Posts, { posts: posts }));
    });

    var routes = [
      $0_src_containers_PostList,
      $1_src_containers_Post,
      $2_src_containers_SearchedPostList
    ];

    // declear var routes;

    function Route$1 () {
      return function (state) {
        return h(routes[state.data.component], state.data.props);
      };
    }

    var Header = (function () {
        return h("header", { class: "Header" },
            h("h1", { class: "Header-title" },
                h(Link, { to: "/" }, title)));
    });

    var Footer = (function () {
        return h("footer", { class: "Footer" },
            h("p", null,
                "Author: ",
                h("a", { href: "https://github.com/iMasanari" }, "iMasanari")),
            h("small", null,
                h("a", { href: "https://github.com/iMasanari/imasanari.github.io/" }, '> Blog Repository <')));
    });

    var App = (function () {
        return h("div", { class: "App" },
            h(Header, null),
            h("div", { class: "content" },
                h(Route$1, null)),
            h(Footer, null));
    });

    var smoothScroll = (function () {
        var targetY = 0;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var loopCount = 10;
        var scrollby = (targetY - scrollY) / loopCount;
        var loop = function () {
            scrollTo(0, Math.floor(targetY - scrollby * loopCount));
            if (loopCount--) {
                requestAnimationFrame(loop);
            }
        };
        loop();
    });

    var state = {
        location: location$1.state,
        data: (window.__data || {}),
    };
    var actions = {
        location: location$1.actions,
        setData: function (data) { return function (state) { return (__assign({}, state, { data: data })); }; },
    };
    var main = app(state, actions, App, document.body);
    // const unsubscribe = 
    location$1.subscribe(main.location);
    var handleLocationChange = function (e) {
        if (e.type === 'pushstate') {
            smoothScroll();
        }
        // Google アナリティクスに送信
        window.gtag('config', GA_TRACKING_ID, {
            page_path: location.pathname
        });
        // ページデータを取得
        var xhr = new XMLHttpRequest();
        xhr.open('get', location.pathname + "index.json");
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            document.title = data.title;
            main.setData(data);
        };
        xhr.send();
    };
    addEventListener("pushstate", handleLocationChange);
    addEventListener("popstate", handleLocationChange);

}());
