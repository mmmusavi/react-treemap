var TMap2 = {};
(function () {
    var t = function (t) {
        return document.getElementById(t);
    };
    (t.empty = function () {}),
        (t.lambda = function (t) {
            return "function" == typeof t
                ? t
                : function () {
                      return t;
                  };
        }),
        (t.extend = function (t, e) {
            for (var i in e || {}) t[i] = e[i];
            return t;
        }),
        (t.splat = function (e) {
            var i = t.type(e);
            return i ? ("array" != i ? [e] : e) : [];
        }),
        (t.type = function (e) {
            return t.type.s
                .call(e)
                .match(/^\[object\s(.*)\]$/)[1]
                .toLowerCase();
        }),
        (t.type.s = Object.prototype.toString),
        (t.each = function (e, i) {
            if ("object" == t.type(e)) for (var n in e) i(e[n], n);
            else for (var o = 0; o < e.length; o++) i(e[o], o);
        }),
        (t.merge = function () {
            for (var e = {}, i = 0, n = arguments.length; i < n; i++) {
                var o = arguments[i];
                if ("object" == t.type(o))
                    for (var r in o) {
                        var a = o[r],
                            h = e[r];
                        e[r] =
                            h && "object" == t.type(a) && "object" == t.type(h)
                                ? t.merge(h, a)
                                : t.unlink(a);
                    }
            }
            return e;
        }),
        (t.unlink = function (e) {
            var i;
            switch (t.type(e)) {
                case "object":
                    for (var n in ((i = {}), e)) i[n] = t.unlink(e[n]);
                    break;
                case "array":
                    i = [];
                    for (var o = 0, r = e.length; o < r; o++) i[o] = t.unlink(e[o]);
                    break;
                default:
                    return e;
            }
            return i;
        }),
        (t.rgbToHex = function (t, e) {
            if (t.length < 3) return null;
            if (4 == t.length && 0 == t[3] && !e) return "transparent";
            for (var i = [], n = 0; n < 3; n++) {
                var o = (t[n] - 0).toString(16);
                i.push(1 == o.length ? "0" + o : o);
            }
            return e ? i : "#" + i.join("");
        }),
        (t.hexToRgb = function (t) {
            if (7 != t.length) {
                if (
                    ((t = t.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/)).shift(),
                    3 != t.length)
                )
                    return null;
                for (var e = [], i = 0; i < 3; i++) {
                    var n = t[i];
                    1 == n.length && (n += n), e.push(parseInt(n, 16));
                }
                return e;
            }
            return [(t = parseInt(t.slice(1), 16)) >> 16, (t >> 8) & 255, 255 & t];
        }),
        (t.destroy = function (e) {
            t.clean(e),
                e.parentNode && e.parentNode.removeChild(e),
                e.clearAttributes && e.clearAttributes();
        }),
        (t.clean = function (e) {
            for (var i = e.childNodes, n = 0; n < i.length; n++) t.destroy(i[n]);
        }),
        (t.addEvent = function (t, e, i) {
            t.addEventListener
                ? t.addEventListener(e, i, !1)
                : t.attachEvent("on" + e, i);
        }),
        (t.hasClass = function (t, e) {
            return (" " + t.className + " ").indexOf(" " + e + " ") > -1;
        }),
        (t.addClass = function (e, i) {
            t.hasClass(e, i) || (e.className = e.className + " " + i);
        }),
        (t.removeClass = function (t, e) {
            t.className = t.className.replace(
                new RegExp("(^|\\s)" + e + "(?:\\s|$)"),
                "$1"
            );
        }),
        (t.getPos = function (t) {
            if (t.getBoundingClientRect) {
                var e = t.getBoundingClientRect(),
                    i = t.ownerDocument.documentElement;
                return {
                    x: e.left + i.scrollLeft - i.clientLeft,
                    y: e.top + i.scrollTop - i.clientTop,
                };
            }
            var n = (function (t) {
                    var e = { x: 0, y: 0 };
                    for (; t && !r(t); )
                        (e.x += t.offsetLeft), (e.y += t.offsetTop), (t = t.offsetParent);
                    return e;
                })(t),
                o = (function (t) {
                    var e = { x: 0, y: 0 };
                    for (; t && !r(t); )
                        (e.x += t.scrollLeft), (e.y += t.scrollTop), (t = t.parentNode);
                    return e;
                })(t);
            return { x: n.x - o.x, y: n.y - o.y };
            function r(t) {
                return /^(?:body|html)$/i.test(t.tagName);
            }
        });
    var e = function (i) {
        i = i || {};
        var n = function () {
            for (var i in this)
                "function" != typeof this[i] && (this[i] = t.unlink(this[i]));
            return (
                (this.constructor = n),
                e.prototyping
                    ? this
                    : this.initialize
                    ? this.initialize.apply(this, arguments)
                    : this
            );
        };
        for (var o in e.Mutators) i[o] && delete (i = e.Mutators[o](i, i[o]))[o];
        return t.extend(n, this), (n.constructor = e), (n.prototype = i), n;
    };
    (e.Mutators = {
        Implements: function (i, n) {
            return (
                t.each(t.splat(n), function (t) {
                    e.prototying = t;
                    var n = "function" == typeof t ? new t() : t;
                    for (var o in n) o in i || (i[o] = n[o]);
                    delete e.prototyping;
                }),
                i
            );
        },
    }),
        t.extend(e, {
            inherit: function (i, n) {
                var o = arguments.callee.caller;
                for (var r in n) {
                    var a = n[r],
                        h = i[r],
                        l = t.type(a);
                    h && "function" == l
                        ? a != h &&
                          (o ? ((a.__parent = h), (i[r] = a)) : e.override(i, r, a))
                        : (i[r] = "object" == l ? t.merge(h, a) : a);
                }
                return (
                    o &&
                        (i.parent = function () {
                            return arguments.callee.caller.__parent.apply(
                                this,
                                arguments
                            );
                        }),
                    i
                );
            },
            override: function (t, i, n) {
                var o = e.prototyping;
                o && t[i] != o[i] && (o = null);
                t[i] = function () {
                    var e = this.parent;
                    this.parent = o ? o[i] : t[i];
                    var r = n.apply(this, arguments);
                    return (this.parent = e), r;
                };
            },
        }),
        (e.prototype.implement = function () {
            var i = this.prototype;
            return (
                t.each(Array.prototype.slice.call(arguments || []), function (t) {
                    e.inherit(i, t);
                }),
                this
            );
        });
    var i = function (t, e) {
        (e = e || window), (t = t || e.event);
        var i = e.document;
        return (
            (i = i.html || i.body),
            {
                x: t.pageX || t.clientX + i.scrollLeft,
                y: t.pageY || t.clientY + i.scrollTop,
            }
        );
    };
    TMap2.Util = {
        prune: function (t, e) {
            this.each(t, function (t, i) {
                i == e && t.children && (delete t.children, (t.children = []));
            });
        },
        getParent: function (t, e) {
            if (t.id == e) return !1;
            var i = t.children;
            if (i && i.length > 0)
                for (var n = 0; n < i.length; n++) {
                    if (i[n].id == e) return t;
                    var o = this.getParent(i[n], e);
                    if (o) return o;
                }
            return !1;
        },
        getSubtree: function (t, e) {
            if (t.id == e) return t;
            for (var i = 0, n = t.children; i < n.length; i++) {
                var o = this.getSubtree(n[i], e);
                if (null != o) return o;
            }
            return null;
        },
        getLeaves: function (t, e) {
            var i = [],
                n = e || Number.MAX_VALUE;
            return (
                this.each(t, function (t, e) {
                    e < n &&
                        (!t.children || 0 == t.children.length) &&
                        i.push({ node: t, level: n - e });
                }),
                i
            );
        },
        eachLevel: function (t, e, i, n) {
            if (e <= i) {
                n(t, e);
                for (var o = 0, r = t.children; o < r.length; o++)
                    this.eachLevel(r[o], e + 1, i, n);
            }
        },
        each: function (t, e) {
            this.eachLevel(t, 0, Number.MAX_VALUE, e);
        },
        loadSubtrees: function (t, e) {
            var i = e.request && e.levelsToShow,
                n = this.getLeaves(t, i),
                o = n.length,
                r = {};
            0 == o && e.onComplete();
            for (var a = 0, h = 0; a < o; a++) {
                var l = n[a],
                    s = l.node.id;
                (r[s] = l.node),
                    e.request(s, l.level, {
                        onComplete: function (t, i) {
                            var n = i.children;
                            (r[t].children = n), ++h == o && e.onComplete();
                        },
                    });
            }
        },
    };
    var n = function () {
        for (
            var e = Array.prototype.slice.call(arguments), i = 0, o = e.length, r = {};
            i < o;
            i++
        ) {
            var a = n[e[i]];
            a.$extend ? t.extend(r, a) : (r[e[i]] = a);
        }
        return r;
    };
    (n.Controller = {
        $extend: !0,
        onBeforeCompute: t.empty,
        onAfterCompute: t.empty,
        onCreateLabel: t.empty,
        onPlaceLabel: t.empty,
        onComplete: t.empty,
        onBeforePlotLine: t.empty,
        onAfterPlotLine: t.empty,
        onBeforePlotNode: t.empty,
        onAfterPlotNode: t.empty,
        onCreateElement: t.empty,
        onDestroyElement: t.empty,
        request: !1,
    }),
        (n.Tips = {
            $extend: !1,
            enable: !1,
            attachToDOM: !0,
            attachToCanvas: !1,
            offsetX: 20,
            offsetY: 20,
            onShow: t.empty,
        });
    var o = {
            initializeExtras: function () {
                this.config.Tips && (this.tips = new r(this));
            },
        },
        r = new e({
            initialize: function (t) {
                if (
                    ((this.viz = t),
                    (this.controller = this.config = t.config),
                    this.config.Tips.enable && document.body)
                ) {
                    var e =
                        document.getElementById("_tooltip") ||
                        document.createElement("div");
                    (e.id = "_tooltip"), (e.className = "tip");
                    var i = e.style;
                    (i.position = "absolute"),
                        (i.display = "none"),
                        (i.zIndex = 13e3),
                        document.body.appendChild(e),
                        (this.tip = e),
                        (this.node = !1);
                }
            },
            attach: function (e, n) {
                if (this.config.Tips.enable && e.tooltip) {
                    var o = this,
                        r = this.controller;
                    t.addEvent(n, "mouseover", function (t) {
                        r.Tips.onShow(o.tip, e, n);
                    }),
                        t.addEvent(n, "mouseout", function (t) {
                            o.tip.style.display = "none";
                        }),
                        t.addEvent(n, "mousemove", function (t, e) {
                            var n = i(t, e);
                            o.setTooltipPosition(n);
                        });
                }
            },
            onClick: t.empty,
            onRightClick: t.empty,
            onMousemove: function (t, e) {
                if (!t) return (this.tip.style.display = "none"), void (this.node = !1);
                (this.node && this.node.id == t.id) ||
                    ((this.node = t), this.config.Tips.onShow(this.tip, t)),
                    this.setTooltipPosition(e.position);
            },
            setTooltipPosition: function (t) {
                const e = this.tip;
                const i = e.style;
                const n = this.config;

                i.display = "";

                const win = {
                    height: document.body.clientHeight,
                    width: document.body.clientWidth,
                };

                const o = e.offsetWidth;
                const r = e.offsetHeight;
                const a = n.Tips.offsetX;
                const h = n.Tips.offsetY;

                i.top = (t.y + h + r > win.height ? t.y - r - h : t.y + h) + "px";
                i.left = (t.x + o + a > win.width ? t.x - o - a : t.x + a) + "px";
            },
        });
    (TMap2.Base = t.extend(
        {
            layout: {
                orientation: "h",
                vertical: function () {
                    return "v" == this.orientation;
                },
                horizontal: function () {
                    return "h" == this.orientation;
                },
                change: function () {
                    this.orientation = this.vertical() ? "h" : "v";
                },
            },
            config: {
                orientation: "h",
                titleHeight: 13,
                rootId: "infovis",
                offset: 4,
                levelsToShow: 3,
                addLeftClickHandler: !1,
                addRightClickHandler: !1,
                selectPathOnHover: !1,
                Tips: n.Tips,
                Color: {
                    enable: !1,
                    minValue: -100,
                    maxValue: 100,
                    minColorValue: [255, 0, 50],
                    maxColorValue: [0, 255, 50],
                },
            },
            initialize: function (e) {
                (this.tree = null),
                    (this.shownTree = null),
                    (this.controller = this.config =
                        t.merge(n.Controller, this.config, e)),
                    (this.rootId = this.config.rootId),
                    (this.layout.orientation = this.config.orientation),
                    this.initializeExtras();
                var i = this,
                    o = function () {
                        i.empty(), window.CollectGarbage && window.CollectGarbage();
                    };
                window.addEventListener
                    ? window.addEventListener("unload", o, !1)
                    : window.attachEvent("onunload", o);
            },
            each: function (e) {
                !(function t(i) {
                    if (i) {
                        var n = i.childNodes,
                            o = n.length;
                        if ((o > 0 && e.apply(this, [i, 1 === o, n[0], n[1]]), o > 1))
                            for (var r = n[1].childNodes, a = 0; a < r.length; a++)
                                t(r[a]);
                    }
                })(t(this.rootId).firstChild);
            },
            toStyle: function (t) {
                var e = "";
                for (var i in t) e += i + ":" + t[i] + ";";
                return e;
            },
            leaf: function (t) {
                return 0 == t.children;
            },
            createBox: function (t, e, i) {
                var n;
                return (
                    (n = this.leaf(t)
                        ? this.leafBox(t, e)
                        : this.headBox(t, e) + this.bodyBox(i, e)),
                    this.contentBox(t, e, n)
                );
            },
            plot: function (t) {
                var e = t.coord,
                    i = "";
                if (this.leaf(t)) return this.createBox(t, e, null);
                for (var n = 0, o = t.children; n < o.length; n++) {
                    var r = o[n],
                        a = r.coord;
                    a.width * a.height > 1 && (i += this.plot(r));
                }
                return this.createBox(t, e, i);
            },
            headBox: function (t, e) {
                var i = this.config,
                    n = i.offset,
                    o = {
                        height: i.titleHeight + "px",
                        width: e.width - n + "px",
                        left: n / 2 + "px",
                    };
                return (
                    '<div class="head" style="' +
                    this.toStyle(o) +
                    '">' +
                    t.name +
                    "</div>"
                );
            },
            bodyBox: function (t, e) {
                var i = this.config,
                    n = i.titleHeight,
                    o = i.offset,
                    r = {
                        width: e.width - o + "px",
                        height: e.height - o - n + "px",
                        top: n + o / 2 + "px",
                        left: o / 2 + "px",
                    };
                return (
                    '<div class="body" style="' + this.toStyle(r) + '">' + t + "</div>"
                );
            },
            contentBox: function (t, e, i) {
                var n = {};
                for (var o in e) n[o] = e[o] + "px";
                return (
                    '<div class="content" style="' +
                    this.toStyle(n) +
                    '" id="' +
                    t.id +
                    '">' +
                    i +
                    "</div>"
                );
            },
            leafBox: function (t, e) {
                var i = this.config,
                    n = i.Color.enable && this.setColor(t),
                    o = i.offset,
                    r = e.width - o,
                    a = e.height - o,
                    h = {
                        top: o / 2 + "px",
                        height: a + "px",
                        width: r + "px",
                        left: o / 2 + "px",
                    };
                n && (h["background-color"] = n);
                let l = Math.floor(r / 30) - 1;
                return (
                    (h["font-size"] = 8 + 3 * l + "px"),
                    '<div class="leaf" style="' +
                        this.toStyle(h) +
                        '">' +
                        (a >= 32 && r >= 32
                            ? '<div class="text">' + t.name + "</div>"
                            : "") +
                        "</div>"
                );
            },
            setColor: function (t) {
                return t.data.$hex;
            },
            enter: function (t) {
                this.view(t.parentNode.id);
            },
            onLeftClick: function (t) {
                this.enter(t);
            },
            out: function () {
                var t = TMap2.Util.getParent(this.tree, this.shownTree.id);
                t &&
                    (this.controller.request &&
                        TMap2.Util.prune(t, this.config.levelsToShow),
                    this.view(t.id));
            },
            onRightClick: function () {
                this.out();
            },
            view: function (e) {
                var i = this.config,
                    n = this,
                    o = {
                        onComplete: function () {
                            n.loadTree(e), t(i.rootId).focus();
                        },
                    };
                if (this.controller.request) {
                    var r = TMap2.Util;
                    r.loadSubtrees(
                        r.getSubtree(this.tree, e),
                        t.merge(this.controller, o)
                    );
                } else o.onComplete();
            },
            resetPath: function (e) {
                var i = this.rootId,
                    n = this.resetPath.previous;
                function o(t) {
                    var e = t.parentNode;
                    return e && e.id != i && e;
                }
                function r(e, i) {
                    if (e) {
                        var n = t(e.id);
                        if (n)
                            for (var r = o(n); r; )
                                (e = r.childNodes[0]),
                                    t.hasClass(e, "in-path")
                                        ? (null == i || i) && t.removeClass(e, "in-path")
                                        : i || t.addClass(e, "in-path"),
                                    (r = o(r));
                    }
                }
                (this.resetPath.previous = e || !1), r(n, !0), r(e, !1);
            },
            initializeElements: function () {
                var e = this.controller,
                    i = this,
                    n = t.lambda(!1);
                this.each(function (o, r, a, h) {
                    var l = TMap2.Util.getSubtree(i.tree, o.id);
                    e.onCreateElement(o, l, r, a, h),
                        e.addRightClickHandler && (a.oncontextmenu = n),
                        (e.addLeftClickHandler || e.addRightClickHandler) &&
                            t.addEvent(a, "mouseup", function (t) {
                                3 == t.which || 2 == t.button
                                    ? e.addRightClickHandler && i.onRightClick()
                                    : e.addLeftClickHandler && i.onLeftClick(a),
                                    t.preventDefault
                                        ? t.preventDefault()
                                        : (t.returnValue = !1);
                            }),
                        e.selectPathOnHover &&
                            (t.addEvent(a, "mouseover", function (n) {
                                e.selectPathOnHover &&
                                    (r
                                        ? t.addClass(a, "over-leaf")
                                        : (t.addClass(a, "over-head"),
                                          t.addClass(o, "over-content")),
                                    o.id && i.resetPath(l));
                            }),
                            t.addEvent(a, "mouseout", function (n) {
                                e.selectPathOnHover &&
                                    (r
                                        ? t.removeClass(a, "over-leaf")
                                        : (t.removeClass(a, "over-head"),
                                          t.removeClass(o, "over-content")),
                                    i.resetPath());
                            })),
                        i.tips.attach(l, a);
                });
            },
            destroyElements: function () {
                if (this.controller.onDestroyElement != t.empty) {
                    var e = this.controller,
                        i = this;
                    this.each(function (t, n, o, r) {
                        e.onDestroyElement(
                            t,
                            TMap2.Util.getSubtree(i.tree, t.id),
                            n,
                            o,
                            r
                        );
                    });
                }
            },
            empty: function () {
                this.destroyElements(), t.clean(t(this.rootId));
            },
            loadTree: function (t) {
                this.empty(), this.loadJSON(TMap2.Util.getSubtree(this.tree, t));
            },
        },
        o
    )),
        (TMap2.SliceAndDice = new e({
            Implements: TMap2.Base,
            loadJSON: function (e) {
                this.controller.onBeforeCompute(e);
                var i = t(this.rootId),
                    n = this.config,
                    o = {
                        coord: {
                            top: 0,
                            left: 0,
                            width: i.offsetWidth,
                            height: i.offsetHeight + n.titleHeight + n.offset,
                        },
                    };
                null == this.tree && (this.tree = e),
                    (this.shownTree = e),
                    this.compute(o, e, this.layout.orientation),
                    (i.innerHTML = this.plot(e)),
                    this.initializeElements(),
                    this.controller.onAfterCompute(e);
            },
            compute: function (e, i, n) {
                var o,
                    r,
                    a,
                    h,
                    l,
                    s = this.config,
                    c = e.coord,
                    f = s.offset,
                    u = c.width - f,
                    d = c.height - f - s.titleHeight,
                    p = e.data,
                    v = p && "$.area" in p ? i.data.$area / p.$area : 1;
                "h" == n
                    ? ((n = "v"),
                      (o = d),
                      (r = Math.round(u * v)),
                      (a = "height"),
                      (h = "top"),
                      (l = "left"))
                    : ((n = "h"),
                      (o = Math.round(d * v)),
                      (r = u),
                      (a = "width"),
                      (h = "left"),
                      (l = "top")),
                    (i.coord = { width: r, height: o, top: 0, left: 0 });
                var g = 0,
                    m = this;
                t.each(i.children, function (t) {
                    m.compute(i, t, n),
                        (t.coord[h] = g),
                        (t.coord[l] = 0),
                        (g += Math.floor(t.coord[a]));
                });
            },
        })),
        (TMap2.Area = {
            loadJSON: function (e) {
                this.controller.onBeforeCompute(e);
                var i = t(this.rootId),
                    n = i.offsetWidth,
                    o = i.offsetHeight,
                    r = this.config.offset,
                    a = n - r,
                    h = o - r - this.config.titleHeight;
                e.coord = { height: o, width: n, top: 0, left: 0 };
                var l = t.merge(e.coord, { width: a, height: h });
                this.compute(e, l),
                    (i.innerHTML = this.plot(e)),
                    null == this.tree && (this.tree = e),
                    (this.shownTree = e),
                    this.initializeElements(),
                    this.controller.onAfterCompute(e);
            },
            computeDim: function (t, e, i, n, o) {
                if (t.length + e.length != 1)
                    if (
                        (t.length >= 2 &&
                            0 == e.length &&
                            ((e = [t[0]]), (t = t.slice(1))),
                        0 != t.length)
                    ) {
                        var r = t[0];
                        if (o(e, i) >= o([r].concat(e), i))
                            this.computeDim(t.slice(1), e.concat([r]), i, n, o);
                        else {
                            var a = this.layoutRow(e, i, n);
                            this.computeDim(t, [], a.dim, a, o);
                        }
                    } else e.length > 0 && this.layoutRow(e, i, n);
                else {
                    var h = 1 == t.length ? t : e;
                    this.layoutLast(h, i, n);
                }
            },
            worstAspectRatio: function (t, e) {
                if (!t || 0 == t.length) return Number.MAX_VALUE;
                for (var i = 0, n = 0, o = Number.MAX_VALUE, r = 0; r < t.length; r++) {
                    var a = t[r]._area;
                    (i += a), (o = o < a ? o : a), (n = n > a ? n : a);
                }
                var h = e * e,
                    l = i * i;
                return Math.max((h * n) / l, l / (h * o));
            },
            avgAspectRatio: function (t, e) {
                if (!t || 0 == t.length) return Number.MAX_VALUE;
                for (var i = 0, n = 0; n < t.length; n++) {
                    var o = t[n]._area / e;
                    i += e > o ? e / o : o / e;
                }
                return i / t.length;
            },
            layoutLast: function (t, e, i) {
                t[0].coord = i;
            },
        }),
        (TMap2.Squarified = new e({
            Implements: [TMap2.Base, TMap2.Area],
            compute: function (t, e) {
                (e.width >= e.height && this.layout.horizontal()) || this.layout.change();
                var i = t.children,
                    n = this.config;
                if (i.length > 0) {
                    this.processChildrenLayout(t, i, e);
                    for (var o = 0; o < i.length; o++) {
                        var r = i[o].coord,
                            a = n.offset,
                            h = r.height - (n.titleHeight + a);
                        (e = { width: r.width - a, height: h, top: 0, left: 0 }),
                            this.compute(i[o], e);
                    }
                }
            },
            processChildrenLayout: function (t, e, i) {
                var n,
                    o = i.width * i.height,
                    r = 0,
                    a = [];
                for (n = 0; n < e.length; n++)
                    (a[n] = parseFloat(e[n].data.$area)), (r += a[n]);
                for (n = 0; n < a.length; n++) e[n]._area = (o * a[n]) / r;
                var h = this.layout.horizontal() ? i.height : i.width;
                e.sort(function (t, e) {
                    return (t._area <= e._area) - (t._area >= e._area);
                });
                var l = [e[0]],
                    s = e.slice(1);
                this.squarify(s, l, h, i);
            },
            squarify: function (t, e, i, n) {
                this.computeDim(t, e, i, n, this.worstAspectRatio);
            },
            layoutRow: function (t, e, i) {
                return this.layout.horizontal()
                    ? this.layoutV(t, e, i)
                    : this.layoutH(t, e, i);
            },
            layoutV: function (e, i, n) {
                var o = 0,
                    r = Math.round;
                t.each(e, function (t) {
                    o += t._area;
                });
                for (var a = r(o / i), h = 0, l = 0; l < e.length; l++) {
                    var s = r(e[l]._area / a);
                    (e[l].coord = { height: s, width: a, top: n.top + h, left: n.left }),
                        (h += s);
                }
                var c = {
                    height: n.height,
                    width: n.width - a,
                    top: n.top,
                    left: n.left + a,
                };
                return (
                    (c.dim = Math.min(c.width, c.height)),
                    c.dim != c.height && this.layout.change(),
                    c
                );
            },
            layoutH: function (e, i, n) {
                var o = 0,
                    r = Math.round;
                t.each(e, function (t) {
                    o += t._area;
                });
                for (var a = r(o / i), h = n.top, l = 0, s = 0; s < e.length; s++)
                    (e[s].coord = {
                        height: a,
                        width: r(e[s]._area / a),
                        top: h,
                        left: n.left + l,
                    }),
                        (l += e[s].coord.width);
                var c = {
                    height: n.height - a,
                    width: n.width,
                    top: n.top + a,
                    left: n.left,
                };
                return (
                    (c.dim = Math.min(c.width, c.height)),
                    c.dim != c.width && this.layout.change(),
                    c
                );
            },
        })),
        (TMap2.Strip = new e({
            Implements: [TMap2.Base, TMap2.Area],
            compute: function (t, e) {
                var i = t.children,
                    n = this.config;
                if (i.length > 0) {
                    this.processChildrenLayout(t, i, e);
                    for (var o = 0; o < i.length; o++) {
                        var r = i[o].coord,
                            a = n.offset,
                            h = r.height - (n.titleHeight + a);
                        (e = { width: r.width - a, height: h, top: 0, left: 0 }),
                            this.compute(i[o], e);
                    }
                }
            },
            processChildrenLayout: function (e, i, n) {
                var o = n.width * n.height,
                    r = parseFloat(e.data.$area);
                t.each(i, function (t) {
                    t._area = (o * parseFloat(t.data.$area)) / r;
                });
                var a = this.layout.horizontal() ? n.width : n.height,
                    h = [i[0]],
                    l = i.slice(1);
                this.stripify(l, h, a, n);
            },
            stripify: function (t, e, i, n) {
                this.computeDim(t, e, i, n, this.avgAspectRatio);
            },
            layoutRow: function (t, e, i) {
                return this.layout.horizontal()
                    ? this.layoutH(t, e, i)
                    : this.layoutV(t, e, i);
            },
            layoutV: function (e, i, n) {
                var o = 0,
                    r = function (t) {
                        return t;
                    };
                t.each(e, function (t) {
                    o += t._area;
                });
                for (var a = r(o / i), h = 0, l = 0; l < e.length; l++) {
                    var s = r(e[l]._area / a);
                    (e[l].coord = {
                        height: s,
                        width: a,
                        top: n.top + (i - s - h),
                        left: n.left,
                    }),
                        (h += s);
                }
                return {
                    height: n.height,
                    width: n.width - a,
                    top: n.top,
                    left: n.left + a,
                    dim: i,
                };
            },
            layoutH: function (e, i, n) {
                var o = 0,
                    r = function (t) {
                        return t;
                    };
                t.each(e, function (t) {
                    o += t._area;
                });
                for (var a = r(o / i), h = n.height - a, l = 0, s = 0; s < e.length; s++)
                    (e[s].coord = {
                        height: a,
                        width: r(e[s]._area / a),
                        top: h,
                        left: n.left + l,
                    }),
                        (l += e[s].coord.width);
                return {
                    height: n.height - a,
                    width: n.width,
                    top: n.top,
                    left: n.left,
                    dim: i,
                };
            },
        }));
})();

export default TMap2;
