!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("callapp", [], t) : "object" == typeof exports ? exports.callapp = t() : e.callapp = t()
}(this, function() {
    return function(e) {
        function t(r) {
            if (n[r])
                return n[r].exports;
            var i = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(i.exports, i, i.exports, t),
            i.loaded = !0,
            i.exports
        }
        var n = {};
        return t.m = e,
        t.c = n,
        t.p = "",
        t(0)
    }([function(e, t) {
        "use strict";
        function n(e, t) {
            for (var n = e.split("."), r = t.split("."), i = 0; i < n.length || i < r.length; i += 1) {
                var o = parseInt(n[i], 10) || 0
                  , a = parseInt(r[i], 10) || 0;
                if (o < a)
                    return -1;
                if (o > a)
                    return 1
            }
            return 0
        }
        function r(e) {
            v || (v = m.createElement("iframe"),
            v.id = "callapp_iframe_" + Date.now(),
            v.frameborder = "0",
            v.style.cssText = "display:none;border:0;width:0;height:0;",
            m.body.appendChild(v)),
            v.src = e
        }
        function i(e) {
            var t = m.createElement("a");
            t.setAttribute("href", e),
            t.style.display = "none",
            m.body.appendChild(t);
            var n = m.createEvent("HTMLEvents");
            n.initEvent("click", !1, !1),
            t.dispatchEvent(n)
        }
        function o(e) {
            return /^(http|https)\:\/\//.test(e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = {}
          , c = window.navigator.userAgent
          , s = !1
          , d = !1
          , l = ""
          , p = c.match(/Android[\s\/]([\d\.]+)/);
        p ? (s = !0,
        l = p[1]) : c.match(/(iPhone|iPad|iPod)/) && (d = !0,
        p = c.match(/OS ([\d_\.]+) like Mac OS X/),
        p && (l = p[1].split("_").join(".")));
        var u = !1
          , f = !1
          , h = !1;
        c.match(/(?:Chrome|CriOS)\/([\d\.]+)/) ? (u = !0,
        c.match(/Version\/[\d+\.]+\s*Chrome/) && (h = !0)) : c.match(/iPhone|iPad|iPod/) && (c.match(/Safari/) && c.match(/Version\/([\d\.]+)/) ? f = !0 : c.match(/OS ([\d_\.]+) like Mac OS X/) && (h = !0));
        var m = window.document
          , v = void 0;
        a.gotoPage = function(e, t, a) {
            var p = e
              , m = s && u && !h
              , v = s && !!c.match(/samsung/i) && n(l, "4.3") >= 0 && n(l, "4.5") < 0
              , w = d && n(l, "9.0") >= 0 && f;
            if (m || v || a) {
                var g = p.substring(0, p.indexOf("://"))
                  , x = "#Intent;scheme=" + g + ";package=" + t + ";end";
                p = p.replace(/.*?:\/\//g, "intent://"),
                p += x
            }
            if (w) {
                if (o(p))
                    return window.Tracker && window.Tracker.click && window.Tracker.click("not_schema"),
                    void console.log("not schema");
                setTimeout(function() {
                    return i(p)
                }, 100)
            } else
                0 === p.indexOf("intent:") ? setTimeout(function() {
                    return window.location.href = p
                }, 100) : /^(http(s)?\:\/\/|javascript\:)/.test(p) ? console.log("schema is url") : r(p)
        }
        ,
        t.default = a,
        e.exports = t.default
    }
    ])
});
