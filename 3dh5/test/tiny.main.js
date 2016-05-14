/*! Copyright 2012-2015 Voormedia */
(function() {
    "use strict";

    function t(t, e, n) {
        var r = document.querySelectorAll(e);
        try {
            throw void 0
        } catch (i) {
            for (i = 0; r.length > i; i++) try {
                throw void 0
            } catch (s) {
                s = i;
                try {
                    new t(r.item(s), n)
                } finally {
                    i = s
                }
            }
        }
    }

    function e() {
        t(b, "div.priceslider"), t(m, "section.upload"), t(y, "main.order")
    }
    var n = function(t) {
            function e(t) {
                return {
                    configurable: !0,
                    enumerable: !1,
                    value: t,
                    writable: !0
                }
            }

            function r() {
                return "__$" + Math.floor(1e9 * Math.random()) + "$" + ++H + "$__"
            }

            function i(t) {
                return "object" == typeof t && t instanceof a
            }

            function s(t) {
                return i(t) ? "symbol" : typeof t
            }

            function o(t) {
                var e = new a(t);
                if (!(this instanceof o)) return e;
                throw new TypeError("Symbol cannot be new'ed")
            }

            function a(t) {
                var e = r();
                T(this, G, {
                    value: this
                }), T(this, U, {
                    value: e
                }), T(this, B, {
                    value: t
                }), Q(this), J[e] = this
            }

            function u(t) {
                return i(t) ? t[U] : t
            }

            function c(t) {
                for (var e = [], n = F(t), r = 0; n.length > r; r++) {
                    var i = n[r];
                    J[i] || e.push(i)
                }
                return e
            }

            function l(t, e) {
                return I(t, u(e))
            }

            function h(t) {
                for (var e = [], n = F(t), r = 0; n.length > r; r++) {
                    var i = J[n[r]];
                    i && e.push(i)
                }
                return e
            }

            function f(t) {
                return N.call(this, u(t))
            }

            function d(e) {
                return t.traceur && t.traceur.options[e]
            }

            function p(t, e, n) {
                var r, s;
                return i(e) && (r = e, e = e[U]), t[e] = n, r && (s = I(t, e)) && T(t, e, {
                    enumerable: !1
                }), n
            }

            function v(t, e, n) {
                return i(e) && (n.enumerable && (n = A(n, {
                    enumerable: {
                        value: !1
                    }
                })), e = e[U]), T(t, e, n), t
            }

            function m(t) {
                function e(t, e) {
                    return t === e ? 0 !== t || 1 / t === 1 / e : t !== t && e !== e
                }

                function n(t, e) {
                    var n, r = F(e),
                        i = r.length;
                    for (n = 0; i > n; n++) t[r[n]] = e[r[n]];
                    return t
                }

                function r(t, e) {
                    var n, r, i = F(e),
                        s = i.length;
                    for (n = 0; s > n; n++) r = I(e, i[n]), T(t, i[n], r);
                    return t
                }
                T(t, "defineProperty", {
                    value: v
                }), T(t, "getOwnPropertyNames", {
                    value: c
                }), T(t, "getOwnPropertyDescriptor", {
                    value: l
                }), T(t.prototype, "hasOwnProperty", {
                    value: f
                }), t.getOwnPropertySymbols = h, T(t, "is", V(e)), T(t, "assign", V(n)), T(t, "mixin", V(r))
            }

            function g(t) {
                for (var e = 1; e < arguments.length; e++)
                    for (var n = F(arguments[e]), r = 0; n.length > r; r++) ! function(e, n) {
                        T(t, n, {
                            get: function() {
                                return e[n]
                            },
                            enumerable: !0
                        })
                    }(arguments[e], n[r]);
                return t
            }

            function y(t) {
                if (null == t) throw k();
                return _(t)
            }

            function b() {
                for (var t = [], e = 0, n = 0; n < arguments.length; n++)
                    for (var r = y(arguments[n]), i = 0; r.length > i; i++) t[e++] = r[i];
                return t
            }

            function w(t, e) {
                for (; null !== t;) {
                    var n = I(t, e);
                    if (n) return n;
                    t = D(t)
                }
                return void 0
            }

            function j(t, e) {
                var n = D(t);
                if (!n) throw k("super is null");
                return w(n, e)
            }

            function S(t, e, n, r) {
                var i = j(e, n);
                if (i) {
                    if ("value" in i) return i.value.apply(t, r);
                    if (i.get) return i.get.call(t).apply(t, r)
                }
                throw k("super has no method '" + n + "'.")
            }

            function O(t, e, n) {
                var r = j(e, n);
                if (r) {
                    if (r.get) return r.get.call(t);
                    if ("value" in r) return r.value
                }
                return void 0
            }

            function L(t, e, n, r) {
                var i = j(e, n);
                if (i && i.set) return void i.set.call(t, r);
                throw k("super has no setter '" + n + "'.")
            }

            function E(t) {
                for (var e, n = {}, r = F(t), i = 0; r.length > i; i++) {
                    var e = r[i];
                    n[e] = I(t, e)
                }
                return n
            }

            function q(t, e, n, r) {
                return T(e, "constructor", {
                    value: t,
                    configurable: !0,
                    enumerable: !1,
                    writable: !0
                }), arguments.length > 3 ? ("function" == typeof r && (t.__proto__ = r), t.prototype = A(P(r), E(e))) : t.prototype = e, T(t, "prototype", {
                    configurable: !1,
                    writable: !1
                }), R(t, E(n))
            }

            function P(t) {
                if ("function" == typeof t) {
                    var e = t.prototype;
                    if (_(e) === e || null === e) return t.prototype
                }
                if (null === t) return null;
                throw new TypeError
            }

            function M(t, e, n) {
                null !== D(e) && S(t, e, "constructor", n)
            }

            function C() {
                this.state = 0, this.GState = W, this.storedException = void 0, this.finallyFallThrough = void 0, this.sent = void 0, this.returnValue = void 0, this.tryStack_ = []
            }

            function x() {
                C.call(this), this.err = void 0;
                var t = this;
                t.result = new Promise(function(e, n) {
                    t.resolve = e, t.reject = n
                })
            }

            function z(t) {
                t.Symbol = o, m(t.Object)
            }
            if (!n) {
                var _ = Object,
                    k = TypeError,
                    A = _.create,
                    R = _.defineProperties,
                    T = _.defineProperty,
                    Q = _.freeze,
                    I = _.getOwnPropertyDescriptor,
                    F = _.getOwnPropertyNames,
                    D = _.getPrototypeOf,
                    N = _.prototype.hasOwnProperty,
                    V = e,
                    H = 0,
                    U = r(),
                    B = r(),
                    G = r(),
                    J = A(null);
                T(o.prototype, "constructor", e(o)), T(o.prototype, "toString", V(function() {
                    var t = this[G];
                    if (!d("symbols")) return t[U];
                    if (!t) throw TypeError("Conversion from symbol to string");
                    var e = t[B];
                    return void 0 === e && (e = ""), "Symbol(" + e + ")"
                })), T(o.prototype, "valueOf", V(function() {
                    var t = this[G];
                    if (!t) throw TypeError("Conversion from symbol to string");
                    return d("symbols") ? t : t[U]
                })), T(a.prototype, "constructor", e(o)), T(a.prototype, "toString", {
                    value: o.prototype.toString,
                    enumerable: !1
                }), T(a.prototype, "valueOf", {
                    value: o.prototype.valueOf,
                    enumerable: !1
                }), Q(a.prototype), o.iterator = o();
                var W = 0;
                return C.prototype = {
                    pushTry: function(t, e) {
                        if (null !== e) {
                            for (var n = null, r = this.tryStack_.length - 1; r >= 0; r--)
                                if (void 0 !== this.tryStack_[r].catch) {
                                    n = this.tryStack_[r].catch;
                                    break
                                }
                            null === n && (n = -3), this.tryStack_.push({
                                "finally": e,
                                finallyFallThrough: n
                            })
                        }
                        null !== t && this.tryStack_.push({
                            "catch": t
                        })
                    },
                    popTry: function() {
                        this.tryStack_.pop()
                    }
                }, x.prototype = Object.create(C.prototype), z(t), {
                    createClass: q,
                    defaultSuperCall: M,
                    exportStar: g,
                    setProperty: p,
                    setupGlobals: z,
                    spread: b,
                    superCall: S,
                    superGet: O,
                    superSet: L,
                    toObject: y,
                    toProperty: u,
                    "typeof": s
                }
            }
        }("undefined" != typeof global ? global : this),
        r = function() {
            var t = 1,
                e = 250,
                r = function(t) {
                    this.el = {
                        control: t,
                        input: t.querySelector("input"),
                        price: t.parentElement.querySelector(".price")
                    }, this.price = parseInt(this.el.price.innerHTML, 10), this.attachEvents(), this.updateQuantity()
                };
            return n.createClass(r, {
                attachEvents: function() {
                    var t = this;
                    this.el.input.onchange = function() {
                        return t.updateQuantity()
                    }, this.el.input.onkeyup = function() {
                        return t.updatePrice()
                    }, this.el.control.querySelector("a.up").onclick = function() {
                        return t.updateQuantity(1)
                    }, this.el.control.querySelector("a.down").onclick = function() {
                        return t.updateQuantity(-1)
                    }
                },
                updateQuantity: function() {
                    var t = void 0 !== arguments[0] ? arguments[0] : 0;
                    this.quantity += t, this.updatePrice()
                },
                updatePrice: function() {
                    this.el.price.innerHTML = this.quantity * this.price
                },
                get quantity() {
                    return this.normalizeQuantity(parseInt(this.el.input.value, 10))
                },
                set quantity(t) {
                    this.el.input.value = this.normalizeQuantity(t)
                },
                normalizeQuantity: function(n) {
                    return Math.min(Math.max(n, t), e) || 1
                }
            }, {}), {get QuantitySpinner() {
                    return r
                }
            }
        }(),
        i = function() {
            var t = r.QuantitySpinner,
                e = function(e, n) {
                    function r() {
                        return this.disable(), this.send(), !1
                    }
                    this.form = e, this.form.onsubmit = r.bind(this), this.rebind = n;
                    var i = this.form.querySelector("div.spinner");
                    i && new t(i)
                },
                i = e;
            return n.createClass(e, {
                replace: function(t) {
                    var e = this.form.parentNode;
                    this.form.outerHTML = t;
                    var n = e.querySelector("form");
                    n && new i(n, this.rebind), this.rebind()
                },
                disable: function() {
                    this.form.classList.add("pending");
                    var t = this.form.querySelector("input[type=submit]");
                    t && (t.disabled = !0)
                },
                send: function() {
                    function t(t) {
                        if (this.replace(t.target.responseText), window.ga) {
                            var e = t.target.status,
                                n = 2 === (e / 100 | 0) ? "Submit" : "Error (" + e + ")";
                            window.ga("send", "event", "Forms", n, this.form.getAttribute("action"))
                        }
                    }
                    var e = new XMLHttpRequest,
                        n = this.serialize();
                    e.open("POST", this.form.action), e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.onload = t.bind(this), e.send(n)
                },
                serialize: function() {
                    var t = [];
                    try {
                        throw void 0
                    } catch (e) {
                        for (e = 0; this.form.elements.length > e; e++) try {
                            throw void 0
                        } catch (n) {
                            n = e;
                            try {
                                try {
                                    throw void 0
                                } catch (r) {
                                    r = this.form.elements.item(n), r.name && "submit" != r.type && (-1 === ["radio", "checkbox"].indexOf(r.type) || r.checked) && t.push(encodeURIComponent(r.name) + "=" + encodeURIComponent(r.value))
                                }
                            } finally {
                                e = n
                            }
                        }
                    }
                    return t.join("&")
                }
            }, {}), {get AjaxForm() {
                    return e
                }
            }
        }(),
        s = function() {
            var t = function(t) {
                this.parse(window.navigator), this.addClasses(t)
            };
            return n.createClass(t, {
                parse: function(t) {
                    var e, n = t.platform.toLowerCase(),
                        r = t.userAgent.toLowerCase();
                    switch (n.slice(0, 3)) {
                        case "mac":
                            (e = r.match(/mac os x (\d+)[_.](\d+)/)) && (this.os = "osx", this.version = [e[1], e[2]].join("."));
                            break;
                        case "win":
                            if (e = r.match(/windows nt (\d+\.\d+)/)) {
                                var i;
                                switch (e[1]) {
                                    case "5.1":
                                    case "5.2":
                                        i = "xp";
                                        break;
                                    case "6.0":
                                        i = "vista";
                                        break;
                                    case "6.1":
                                        i = "7";
                                        break;
                                    case "6.2":
                                        i = "8";
                                        break;
                                    case "6.3":
                                        i = "8.1"
                                }
                                i && (this.os = "windows", this.version = i)
                            }
                    }
                },
                addClasses: function(t) {
                    this.os && t.classList.add("running-" + this.os + "-" + this.version.replace(".", "-"))
                }
            }, {}), {get OsSelector() {
                    return t
                }
            }
        }(),
        o = function() {
            var t = 5e6,
                e = function(e) {
                    this.el = {
                        slider: e,
                        active: e.querySelector(".active"),
                        handle: e.querySelector(".handle"),
                        quantity: e.parentElement.querySelector(".quantity"),
                        price: e.parentElement.querySelector(".price"),
                        figure: e.parentElement.parentElement.querySelector("figure.panda")
                    }, this.initPricing(), this.attachEvents(), this.moveSlider(this.sliderPosition(2e3, t))
                };
            return n.createClass(e, {
                initPricing: function() {
                    this.priceStructure = [];
                    var t, e = document.querySelectorAll("#pricetable li");
                    try {
                        throw void 0
                    } catch (n) {
                        for (n = 0; e.length > n; n++) try {
                            throw void 0
                        } catch (r) {
                            r = n;
                            try {
                                t = {}, e[r].getAttribute("data-size") && (t.size = e[r].getAttribute("data-size")), t.price = e[r].getAttribute("data-price"), this.priceStructure.push(t)
                            } finally {
                                n = r
                            }
                        }
                    }
                },
                moveSlider: function(t) {
                    this.updateMetrics(), this.updateSlider(t), this.updateQuotes(t)
                },
                attachEvents: function() {
                    var t = this;
                    this.el.handle.addEventListener("mousedown", function() {
                        return t.onStartDrag()
                    }), this.el.slider.addEventListener("click", function(e) {
                        return t.onClick(e)
                    }), this.el.quantity.addEventListener("keydown", function(e) {
                        return t.onKeyPress(e)
                    }), this.el.quantity.addEventListener("keyup", function() {
                        return t.onChangeValue()
                    }), this.el.quantity.addEventListener("blur", function() {
                        return t.onBlurValue()
                    })
                },
                onKeyPress: function(t) {
                    var e = String.fromCharCode(t.keyCode);
                    27 == t.keyCode && this.el.quantity.blur(), e.match(/[A-Za-z]/g) && t.preventDefault()
                },
                onChangeValue: function() {
                    this.sanitizeQuantity();
                    var e = this.retrieveQuantity(),
                        n = this.sliderPosition(e, t);
                    this.updateSlider(n), this.updatePrice(e)
                },
                onBlurValue: function() {
                    var t = this.retrieveQuantity();
                    this.el.quantity.textContent = this.numberFormat(t)
                },
                onStartDrag: function() {
                    var t = this;
                    this.updateMetrics(), this.documentMoveListener = function(e) {
                        return t.onDrag(e)
                    }, this.documentUpListener = function() {
                        return t.onStopDrag()
                    }, document.addEventListener("mousemove", this.documentMoveListener), document.addEventListener("mouseup", this.documentUpListener), document.body.classList.add("noselect")
                },
                onDrag: function(t) {
                    var e = Math.max(0, Math.min(100, 100 * (t.clientX - this.metrics.left) / this.metrics.width));
                    this.updateSlider(e), this.updateQuotes(e)
                },
                onStopDrag: function() {
                    document.removeEventListener("mousemove", this.documentMoveListener), document.removeEventListener("mouseup", this.documentUpListener), document.body.classList.remove("noselect")
                },
                onClick: function(t) {
                    this.updateMetrics(), this.onDrag(t)
                },
                updateMetrics: function() {
                    var t = this.el.handle.offsetWidth;
                    this.metrics = {
                        margin: t / 2,
                        width: this.el.slider.offsetWidth,
                        left: this.el.slider.offsetParent.offsetParent.offsetLeft + this.el.slider.offsetParent.offsetLeft + this.el.slider.offsetLeft
                    }
                },
                updateSlider: function(t) {
                    this.el.handle.style.left = t + "%", this.el.active.style.width = t + "%", this.el.handle.setAttribute("aria-valuenow", Math.round(t))
                },
                updateQuotes: function(e) {
                    var n = this.sliderQuantity(e, t);
                    this.el.quantity.textContent = this.numberFormat(n), this.updatePrice(n)
                },
                updatePrice: function(t) {
                    var e = this.calcPrice(t);
                    this.el.price.textContent = "$" + this.numberFormat(e / 100, 2), this.updateFigure(0 == e ? "free" : 1e4 > t ? "small" : "large")
                },
                updateFigure: function(t) {
                    this.el.figure.className = this.el.figure.className.replace(/free|small|large/, t)
                },
                sanitizeQuantity: function() {
                    var e = this.el.quantity.textContent,
                        n = e.replace(/[^\d\s]+/g, ""),
                        r = this.retrieveQuantity();
                    r == t && (n = this.numberFormat(r)), e != n && (this.el.quantity.textContent = n)
                },
                retrieveQuantity: function() {
                    var e = this.el.quantity.textContent;
                    return e = e.replace(/[\D]+/g, ""), e = +e, e = Math.min(e, t)
                },
                numberFormat: function(t, e) {
                    var n = t.toFixed(e || 0),
                        r = n.indexOf(".");
                    for (-1 == r && (r = n.length), r -= 3; r > 0; r -= 3) n = n.substring(0, r) + "鈥�" + n.substring(r);
                    return n
                },
                calcPrice: function(t) {
                    var e = 0;
                    for (var n in this.priceStructure) try {
                        throw void 0
                    } catch (r) {
                        try {
                            throw void 0
                        } catch (i) {
                            try {
                                throw void 0
                            } catch (s) {
                                if (s = n, i = this.priceStructure[s], r = i.size ? Math.min(i.size, t) : t, 0 == r) return e;
                                e += Math.round(i.price * r), t -= r
                            }
                        }
                    }
                    return e
                },
                sliderPosition: function(t, e) {
                    var n, r = 0,
                        i = 20,
                        s = 100;
                    return t /= i, e /= i, n = Math.log(t) / Math.log(10) * (s / (Math.log(e) / Math.log(10))) + r, 0 > n && (n = 0), n
                },
                precisionRound: function(t, e) {
                    if (0 >= t) return 0;
                    var n = Math.log(t) / Math.log(10) - e,
                        r = Math.pow(10, Math.floor(n)),
                        i = n % 1;
                    if (.2 > i) var s = .1;
                    else if (.5 > i) var s = .25;
                    else if (.9 > i) var s = .5;
                    else var s = 1;
                    return Math.round(t / r / s) * r * s
                },
                sliderQuantity: function(t, e) {
                    var n, r, i = 0,
                        s = 0,
                        o = 20,
                        a = 100;
                    return e /= o, n = Math.pow(10, (t - i) / (a / (Math.log(e) / Math.log(10)))), r = Math.round(this.precisionRound(n, s)), 0 == t && (r = 0), t == a && (r = e), r *= o
                }
            }, {}), {get PriceSlider() {
                    return e
                }
            }
        }(),
        a = function() {
            function t() {}

            function e(t, e) {
                for (var n = t.length; n--;)
                    if (t[n].listener === e) return n;
                return -1
            }

            function n(t) {
                return function() {
                    return this[t].apply(this, arguments)
                }
            }
            var r = t.prototype;
            return r.getListeners = function(t) {
                var e, n, r = this._getEvents();
                if ("object" == typeof t) {
                    e = {};
                    for (n in r) r.hasOwnProperty(n) && t.test(n) && (e[n] = r[n])
                } else e = r[t] || (r[t] = []);
                return e
            }, r.flattenListeners = function(t) {
                var e, n = [];
                for (e = 0; t.length > e; e += 1) n.push(t[e].listener);
                return n
            }, r.getListenersAsObject = function(t) {
                var e, n = this.getListeners(t);
                return n instanceof Array && (e = {}, e[t] = n), e || n
            }, r.addListener = function(t, n) {
                var r, i = this.getListenersAsObject(t),
                    s = "object" == typeof n;
                for (r in i) i.hasOwnProperty(r) && -1 === e(i[r], n) && i[r].push(s ? n : {
                    listener: n,
                    once: !1
                });
                return this
            }, r.on = n("addListener"), r.addOnceListener = function(t, e) {
                return this.addListener(t, {
                    listener: e,
                    once: !0
                })
            }, r.once = n("addOnceListener"), r.defineEvent = function(t) {
                return this.getListeners(t), this
            }, r.defineEvents = function(t) {
                for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
                return this
            }, r.removeListener = function(t, n) {
                var r, i, s = this.getListenersAsObject(t);
                for (i in s) s.hasOwnProperty(i) && (r = e(s[i], n), -1 !== r && s[i].splice(r, 1));
                return this
            }, r.off = n("removeListener"), r.addListeners = function(t, e) {
                return this.manipulateListeners(!1, t, e)
            }, r.removeListeners = function(t, e) {
                return this.manipulateListeners(!0, t, e)
            }, r.manipulateListeners = function(t, e, n) {
                var r, i, s = t ? this.removeListener : this.addListener,
                    o = t ? this.removeListeners : this.addListeners;
                if ("object" != typeof e || e instanceof RegExp)
                    for (r = n.length; r--;) s.call(this, e, n[r]);
                else
                    for (r in e) e.hasOwnProperty(r) && (i = e[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
                return this
            }, r.removeEvent = function(t) {
                var e, n = typeof t,
                    r = this._getEvents();
                if ("string" === n) delete r[t];
                else if ("object" === n)
                    for (e in r) r.hasOwnProperty(e) && t.test(e) && delete r[e];
                else delete this._events;
                return this
            }, r.emitEvent = function(t, e) {
                var n, r, i, s, o = this.getListenersAsObject(t);
                for (i in o)
                    if (o.hasOwnProperty(i))
                        for (r = o[i].length; r--;) n = o[i][r], n.once === !0 && this.removeListener(t, n.listener), s = n.listener.apply(this, e || []), s === this._getOnceReturnValue() && this.removeListener(t, n.listener);
                return this
            }, r.trigger = n("emitEvent"), r.emit = function(t) {
                var e = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(t, e)
            }, r.setOnceReturnValue = function(t) {
                return this._onceReturnValue = t, this
            }, r._getOnceReturnValue = function() {
                return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
            }, r._getEvents = function() {
                return this._events || (this._events = {})
            }, {get EventEmitter() {
                    return t
                }
            }
        }(),
        u = function() {
            var t = a.EventEmitter,
                e = "/web/shrink",
                r = 5,
                i = 1.1 * r,
                s = function(t, e) {
                    this.id = t, this.progress = 0, this.status = "waiting", this.res = {}, this.fileAttrs = {
                        name: e.name,
                        size: e.size
                    }, this.file = e
                };
            return n.createClass(s, {get name() {
                    return this.fileAttrs.name
                },
                get bytesIn() {
                    return this.fileAttrs.size
                },
                get bytesOut() {
                    return this.res.output && this.res.output.size
                },
                get percentage() {
                    return this.res.output && Math.round(100 * (this.res.output.ratio - 1))
                },
                get url() {
                    return this.res.output && this.res.output.url + "/" + encodeURIComponent(this.name)
                },
                get message() {
                    return this.res.message
                },
                get contentType() {
                    return this.res.input && this.res.input.type
                },
                send: function() {
                    function t(t) {
                        this.progress = t.lengthComputable ? Math.round(t.loaded / t.total * 1e3) / 10 : null, 100 === this.progress && (this.status = "compressing"), this.emit("change")
                    }

                    function n(t) {
                        if (t.target.status) try {
                            this.res = JSON.parse(t.target.responseText)
                        } catch (e) {
                            this.res = {
                                message: "Invalid server response"
                            }
                        } else this.res = {
                            message: "Could not upload file"
                        };
                        this.status = 201 === t.target.status ? "success" : "error", this.emit("complete")
                    }
                    if (this.file.size > 1e3 * i * 1e3) return this.status = "error", this.res = {
                        message: "File is too large (max. " + r + " MB)"
                    }, void this.emit("complete");
                    if (this.file.type && "image/jpeg" !== this.file.type.toLowerCase() && "image/png" !== this.file.type.toLowerCase()) return this.status = "error", this.res = {
                        message: "Does not appear to be a PNG or JPEG file"
                    }, void this.emit("complete");
                    this.status = "uploading", this.emit("change");
                    var s = new XMLHttpRequest;
                    s.open("POST", e), s.upload.onprogress = t.bind(this), s.onabort = s.onerror = s.onload = n.bind(this), s.send(this.file)
                }
            }, {}, t), {get Request() {
                    return s
                }
            }
        }(),
        c = function() {
            var t = u.Request,
                e = a.EventEmitter,
                r = 2,
                i = function() {
                    this.requests = [], this.head = 0, this.tail = 0, this.count = 0, this.bytesIn = this.bytesOut = 0
                };
            return n.createClass(i, {get length() {
                    return this.requests.length
                },
                get percentage() {
                    return Math.round(100 * (1 - this.bytesOut / this.bytesIn))
                },
                get bytes() {
                    return this.bytesIn - this.bytesOut
                },
                resume: function() {
                    function t() {
                        n.emit("change", this)
                    }

                    function e() {
                        "success" == this.status && (n.bytesIn += this.bytesIn, n.bytesOut += Math.min(this.bytesIn, this.bytesOut)), n.count--, n.resume(), n.emit("complete", this)
                    }
                    var n = this;
                    if (this.count !== r && this.tail !== this.head) {
                        this.count++;
                        var i = this.requests[this.tail++];
                        i.on("change", t), i.on("complete", e), i.send()
                    }
                },
                push: function(e) {
                    var n = new t(this.head++, e);
                    this.requests.push(n), this.emit("add", n), this.resume()
                }
            }, {}, e), {get Queue() {
                    return i
                }
            }
        }(),
        l = function() {
            function t(t) {
                return null != t && "" !== t
            }

            function e(n) {
                return Array.isArray(n) ? n.map(e).filter(t).join(" ") : n
            }
            var n = {};
            return n.merge = function r(e, n) {
                if (1 === arguments.length) {
                    for (var i = e[0], s = 1; e.length > s; s++) i = r(i, e[s]);
                    return i
                }
                var o = e.class,
                    a = n.class;
                (o || a) && (o = o || [], a = a || [], Array.isArray(o) || (o = [o]), Array.isArray(a) || (a = [a]), e.class = o.concat(a).filter(t));
                for (var u in n) "class" != u && (e[u] = n[u]);
                return e
            }, n.joinClasses = e, n.cls = function(t, r) {
                for (var i = [], s = 0; t.length > s; s++) i.push(r && r[s] ? n.escape(e([t[s]])) : e(t[s]));
                var o = e(i);
                return o.length ? ' class="' + o + '"' : ""
            }, n.attr = function(t, e, r, i) {
                return "boolean" == typeof e || null == e ? e ? " " + (i ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof e ? " " + t + "='" + JSON.stringify(e).replace(/'/g, "&apos;") + "'" : r ? " " + t + '="' + n.escape(e) + '"' : " " + t + '="' + e + '"'
            }, n.attrs = function(t, r) {
                var i = [],
                    s = Object.keys(t);
                if (s.length)
                    for (var o = 0; s.length > o; ++o) {
                        var a = s[o],
                            u = t[a];
                        "class" == a ? (u = e(u)) && i.push(" " + a + '="' + u + '"') : i.push(n.attr(a, u, !1, r))
                    }
                return i.join("")
            }, n.escape = function(t) {
                return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            }, n.rethrow = function i(t, e, n, r) {
                if (!(t instanceof Error)) throw t;
                if (!("undefined" == typeof window && e || r)) throw t.message += " on line " + n, t;
                try {
                    r = r || require("fs").readFileSync(e, "utf8")
                } catch (s) {
                    i(t, null, n)
                }
                var o = 3,
                    a = r.split("\n"),
                    u = Math.max(n - o, 0),
                    c = Math.min(a.length, n + o),
                    o = a.slice(u, c).map(function(t, e) {
                        var r = e + u + 1;
                        return (r == n ? "  > " : "    ") + r + "| " + t
                    }).join("\n");
                throw t.path = e, t.message = (e || "Jade") + ":" + n + "\n" + o + "\n\n" + t.message, t
            }, {get jade() {
                    return n
                }
            }
        }(),
        h = function() {
            function t(t) {
                var n, r = [],
                    i = t || {};
                return function(t, i, s) {
                    switch (r.push("<li" + e.attr("id", s.id, !0, !1) + ' class="upload"><div class="before"><span class="size">' + e.escape(null == (n = i(s.bytesIn)) ? "" : n) + "</span>" + e.escape(null == (n = s.name) ? "" : n) + "</div><div" + e.cls(["progress", s.status], [null, !0]) + '><div class="bar"></div></div><div class="after">'), s.status) {
                        case "success":
                            r.push('<span class="size">' + e.escape(null == (n = i(s.bytesOut)) ? "" : n) + "</span><a" + e.attr("href", s.url, !0, !1) + '>download</a><span class="saved">' + e.escape(null == (n = t(s.percentage)) ? "" : n) + "</span>");
                            break;
                        case "error":
                            r.push(e.escape(null == (n = s.message) ? "" : n))
                    }
                    r.push("</div></li>")
                }.call(this, "fmtSignedPerc" in i ? i.fmtSignedPerc : "undefined" != typeof fmtSignedPerc ? fmtSignedPerc : void 0, "fmtSize" in i ? i.fmtSize : "undefined" != typeof fmtSize ? fmtSize : void 0, "request" in i ? i.request : "undefined" != typeof request ? request : void 0), r.join("")
            }
            var e = l.jade;
            return {get template() {
                    return t
                }
            }
        }(),
        f = function() {
            function t(t) {
                var n, r = [],
                    i = t || {};
                return function(t, i, s, o, a) {
                    r.push('<div class="box"><div class="phrase">Panda just saved you</div><div class="percentage">' + e.escape(null == (n = o) ? "" : n) + '%</div><div class="bytes">' + e.escape(null == (n = s(t, 0)) ? "" : n) + ' total</div></div><div class="dropbox"><iframe id="dropbox_saver" src="/dropbox_saver.html"></iframe></div>'), o > 20 && (r.push('<div class="share"><small>Share your savings</small>'), a = i("Panda just saved me " + o + "%, " + s(t, 0) + " in total! "), r.push("<iframe" + e.attr("src", "//platform.twitter.com/widgets/tweet_button.html?url=https://tinypng.com&text=" + a + "%23TinyPNG&count=none", !0, !1) + ' seamless="seamless" class="png"></iframe><iframe' + e.attr("src", "//platform.twitter.com/widgets/tweet_button.html?url=https://tinyjpg.com&text=" + a + "%23TinyJPG&count=none", !0, !1) + ' seamless="seamless" class="jpg"></iframe></div>'))
                }.call(this, "bytes" in i ? i.bytes : "undefined" != typeof bytes ? bytes : void 0, "encodeURIComponent" in i ? i.encodeURIComponent : "undefined" != typeof encodeURIComponent ? encodeURIComponent : void 0, "fmtSize" in i ? i.fmtSize : "undefined" != typeof fmtSize ? fmtSize : void 0, "percentage" in i ? i.percentage : "undefined" != typeof percentage ? percentage : void 0, "savedMe" in i ? i.savedMe : "undefined" != typeof savedMe ? savedMe : void 0), r.join("")
            }
            var e = l.jade;
            return {get template() {
                    return t
                }
            }
        }(),
        d = function() {
            var t = h.template,
                e = f.template;
            return {get renderRequest() {
                    return t
                },
                get renderSummary() {
                    return e
                }
            }
        }(),
        p = function() {
            function t(t) {
                var e = void 0 !== arguments[1] ? arguments[1] : 1;
                return t >= 1e6 ? (t / 1e6).toFixed(e) + " MB" : t >= 1e3 ? (t / 1e3).toFixed(e) + " KB" : (t || 0) + " B"
            }

            function e(t) {
                return t > 0 ? "+" + t + "%" : "鈭�" + Math.abs(t) + "%"
            }
            var r = d,
                i = r.renderRequest,
                s = r.renderSummary,
                o = function(t, e) {
                    this.el = {
                        header: t
                    }, this.queue = e, this.createElements(), this.attachEvents()
                };
            return n.createClass(o, {
                createElements: function() {
                    var t = this.createElement("section", {
                        className: "results"
                    });
                    this.el.results = t.appendChild(document.createElement("ul")), this.el.summary = this.createElement("section", {
                        className: "summary"
                    })
                },
                createElement: function(t, e) {
                    var n = document.createElement(t);
                    for (var r in e) try {
                        throw void 0
                    } catch (i) {
                        i = r, n[i] = e[i]
                    }
                    return this.el.header.appendChild(n), n
                },
                attachEvents: function() {
                    this.queue.on("add", this.add.bind(this)), this.queue.on("change", this.change.bind(this)), this.queue.on("complete", this.complete.bind(this)), this.el.results.addEventListener("click", this.download.bind(this), !0)
                },
                add: function(n) {
                    this.el.header.classList.add("started");
                    var r = i({
                        request: n,
                        fmtSize: t,
                        fmtSignedPerc: e
                    });
                    this.el.results.insertAdjacentHTML("beforeend", r)
                },
                change: function(t) {
                    var e = document.getElementById(t.id);
                    e.querySelector("div.bar").style.width = t.progress + "%", e.querySelector("div.progress").className = "progress " + t.status
                },
                complete: function(n) {
                    var r = document.getElementById(n.id);
                    if (r.outerHTML = i({
                            request: n,
                            fmtSize: t,
                            fmtSignedPerc: e
                        }), "success" == n.status && this.summarize(n), window.ga) {
                        var s = n.status.charAt(0).toUpperCase() + n.status.slice(1),
                            o = "error" == n.status ? n.message : n.contentType;
                        window.ga("send", "event", "Conversions", s, o)
                    }
                },
                summarize: function() {
                    this.el.header.classList.add("complete"), this.el.summary.innerHTML = s({
                        percentage: this.queue.percentage,
                        bytes: this.queue.bytes,
                        fmtSize: t
                    });
                    var e = document.getElementById("dropbox_saver"),
                        n = this.queue.requests;
                    e.onload = function() {
                        e.contentWindow.createDropboxSaveButton(n), e.style.visibility = "visible"
                    }
                },
                download: function(t) {
                    if ("A" == t.target.tagName)
                        if (t.preventDefault(), /(iPad|iPhone|iPod)/g.test(navigator.userAgent)) window.open(t.target.href);
                        else {
                            t.target.classList.add("downloaded");
                            var e = document.createElement("iframe");
                            e.src = t.target.href, e.style.visibility = "hidden", e.style.width = e.style.height = e.style.borderWidth = 0, document.body.appendChild(e)
                        }
                }
            }, {}), {get ResultView() {
                    return o
                }
            }
        }(),
        v = function() {
            var t = c.Queue,
                e = p.ResultView,
                r = function(n) {
                    this.el = {
                        header: n,
                        target: n.querySelector("section.target")
                    }, this.queue = new t, this.results = new e(n, this.queue), this.createElements(), this.attachEvents()
                };
            return n.createClass(r, {
                createElements: function() {
                    this.el.input = this.createElement("input", {
                        type: "file",
                        multiple: !0
                    })
                },
                createElement: function(t, e) {
                    var n = document.createElement(t);
                    for (var r in e) try {
                        throw void 0
                    } catch (i) {
                        i = r, n[i] = e[i]
                    }
                    return this.el.header.appendChild(n), n
                },
                attachEvents: function() {
                    function t(t) {
                        t.preventDefault()
                    }

                    function e(e) {
                        t(e), this.upload(e.dataTransfer.files)
                    }
                    var n = this;
                    this.el.target.onclick = function() {
                        return n.el.input.click()
                    }, this.el.input.onchange = function() {
                        return n.upload(n.el.input.files)
                    }, document.ondragover = document.ondragleave = document.ondragend = t, document.ondrop = e.bind(this), this.el.target.ondragover = function() {
                        return n.el.target.classList.add("active")
                    }, this.el.target.ondragleave = this.el.target.ondrop = function() {
                        return n.el.target.classList.remove("active")
                    }
                },
                upload: function(t) {
                    try {
                        throw void 0
                    } catch (e) {
                        try {
                            throw void 0
                        } catch (n) {
                            for (e = 0; n = t[e]; e++) try {
                                throw void 0
                            } catch (r) {
                                try {
                                    throw void 0
                                } catch (i) {
                                    i = n, r = e;
                                    try {
                                        this.queue.push(i)
                                    } finally {
                                        n = i, e = r
                                    }
                                }
                            }
                        }
                    }
                }
            }, {}), {get TargetView() {
                    return r
                }
            }
        }(),
        m = v.TargetView,
        g = i.AjaxForm,
        y = s.OsSelector,
        b = o.PriceSlider;
    t(g, "form[action^='/']", e), e()
}).call(this);
