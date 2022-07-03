!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.Scout = t())
    : (e.Scout = t());
})(self, function () {
  return (function () {
    var e = {
        868: function (e) {
          "undefined" == typeof window && (window = { ctrl: {}, lib: {} }),
            !window.ctrl && (window.ctrl = {}),
            !window.lib && (window.lib = {}),
            (function (e, t) {
              function n() {
                var e = {},
                  t = new p(function (t, n) {
                    (e.resolve = t), (e.reject = n);
                  });
                return (e.promise = t), e;
              }
              function o(e, t) {
                for (var n in t) void 0 === e[n] && (e[n] = t[n]);
                return e;
              }
              function r(e) {
                var t = [];
                for (var n in e)
                  e[n] && t.push(n + "=" + encodeURIComponent(e[n]));
                return t.join("&");
              }
              function i(e) {
                return "[object Object]" == {}.toString.call(e);
              }
              function a(e) {
                var t = new RegExp(
                  "(?:^|;\\s*)" + e + "\\=([^;]+)(?:;\\s*|$)"
                ).exec(document.cookie);
                return t ? t[1] : void 0;
              }
              function s(e, t, n) {
                var o = new Date();
                o.setTime(o.getTime() - 864e5);
                (document.cookie =
                  e + "=;path=/;domain=." + t + ";expires=" + o.toGMTString()),
                  (document.cookie =
                    e +
                    "=;path=/;domain=." +
                    n +
                    "." +
                    t +
                    ";expires=" +
                    o.toGMTString());
              }
              function c(e, t) {
                for (
                  var n = e.split("."), o = t.split("."), r = 0;
                  3 > r;
                  r++
                ) {
                  var i = Number(n[r]),
                    a = Number(o[r]);
                  if (i > a) return 1;
                  if (a > i) return -1;
                  if (!isNaN(i) && isNaN(a)) return 1;
                  if (isNaN(i) && !isNaN(a)) return -1;
                }
                return 0;
              }
              function u(e) {
                (this.id = "" + new Date().getTime() + ++h),
                  (this.params = o(e || {}, {
                    v: "*",
                    data: {},
                    type: "get",
                    dataType: "jsonp",
                  })),
                  (this.params.type = this.params.type.toLowerCase()),
                  "object" == typeof this.params.data &&
                    (this.params.data = JSON.stringify(this.params.data)),
                  (this.middlewares = f.slice(0));
              }
              var p = e.Promise,
                d = (p || { resolve: function () {} }).resolve();
              String.prototype.trim ||
                (String.prototype.trim = function () {
                  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                });
              var l = {
                  useJsonpResultType: !1,
                  safariGoLogin: !0,
                  useAlipayJSBridge: !1,
                },
                f = [],
                m = {
                  ERROR: -1,
                  SUCCESS: 0,
                  TOKEN_EXPIRED: 1,
                  SESSION_EXPIRED: 2,
                };
              (function () {
                var t = e.location.hostname;
                if (!t) {
                  var n = e.parent.location.hostname;
                  n && ~n.indexOf("zebra.alibaba-inc.com") && (t = n);
                }
                var o = new RegExp(
                    "([^.]*?)\\.?((?:" +
                      [
                        "taobao.net",
                        "taobao.com",
                        "tmall.com",
                        "tmall.hk",
                        "alibaba-inc.com",
                      ]
                        .join(")|(?:")
                        .replace(/\./g, "\\.") +
                      "))",
                    "i"
                  ),
                  r = t.match(o) || [],
                  i = r[2] || "taobao.com",
                  a = r[1] || "m";
                "taobao.net" !== i ||
                ("x" !== a && "waptest" !== a && "daily" !== a)
                  ? "taobao.net" === i && "demo" === a
                    ? (a = "demo")
                    : "alibaba-inc.com" === i && "zebra" === a
                    ? (a = "zebra")
                    : "waptest" !== a && "wapa" !== a && "m" !== a && (a = "m")
                  : (a = "waptest");
                var s = "h5api";
                "taobao.net" === i && "waptest" === a && (s = "acs"),
                  (l.mainDomain = i),
                  (l.subDomain = a),
                  (l.prefix = s);
              })(),
                (function () {
                  var t = e.navigator.userAgent,
                    n = t.match(/WindVane[\/\s]([\d\.\_]+)/);
                  n && (l.WindVaneVersion = n[1]);
                  var o = t.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i);
                  o && ((l.AliAppName = o[1]), (l.AliAppVersion = o[2]));
                  var r = t.match(/AMapClient\/([\d\.\_]+)/i);
                  r && ((l.AliAppName = "AMAP"), (l.AliAppVersion = r[1]));
                })();
              var y = /[Android|Adr]/.test(e.navigator.userAgent),
                g =
                  ("AP" === l.AliAppName &&
                    c(l.AliAppVersion, "10.1.2") >= 0) ||
                  ("KB" === l.AliAppName &&
                    c(l.AliAppVersion, "7.1.62") >= 0) ||
                  (y &&
                    "AMAP" === l.AliAppName &&
                    c(l.AliAppVersion, "1.0.1") >= 0),
                h = 0;
              (u.prototype.use = function (e) {
                if (!e) throw new Error("middleware is undefined");
                return this.middlewares.push(e), this;
              }),
                (u.prototype.__processRequestMethod = function (e) {
                  var t = this.params,
                    n = this.options;
                  "get" === t.type && "jsonp" === t.dataType
                    ? (n.getJSONP = !0)
                    : "get" === t.type && "originaljsonp" === t.dataType
                    ? (n.getOriginalJSONP = !0)
                    : "get" === t.type && "json" === t.dataType
                    ? (n.getJSON = !0)
                    : "post" === t.type && (n.postJSON = !0),
                    e();
                }),
                (u.prototype.__processRequestType = function (n) {
                  var o = this,
                    r = this.params,
                    a = this.options;
                  if (
                    (!0 === l.H5Request && (a.H5Request = !0),
                    !0 === l.WindVaneRequest && (a.WindVaneRequest = !0),
                    !1 === a.H5Request && !0 === a.WindVaneRequest)
                  ) {
                    if (
                      !g &&
                      (!t.windvane || parseFloat(a.WindVaneVersion) < 5.4)
                    )
                      throw new Error("WINDVANE_NOT_FOUND::缂哄皯WindVane鐜");
                    if (g && !e.AlipayJSBridge)
                      throw new Error(
                        "ALIPAY_NOT_READY::鏀粯瀹濋€氶亾鏈噯澶囧ソ锛屾敮浠樺疂璇疯 https://lark.alipay.com/mtbsdkdocs/mtopjssdkdocs/pucq6z"
                      );
                  } else if (!0 === a.H5Request) a.WindVaneRequest = !1;
                  else if (
                    void 0 === a.WindVaneRequest &&
                    void 0 === a.H5Request
                  ) {
                    if (
                      (t.windvane && parseFloat(a.WindVaneVersion) >= 5.4
                        ? (a.WindVaneRequest = !0)
                        : (a.H5Request = !0),
                      g)
                    ) {
                      if (
                        ((a.WindVaneRequest = a.H5Request = void 0),
                        e.AlipayJSBridge)
                      )
                        if (i(r.data)) a.WindVaneRequest = !0;
                        else
                          try {
                            i(JSON.parse(r.data))
                              ? (a.WindVaneRequest = !0)
                              : (a.H5Request = !0);
                          } catch (e) {
                            a.H5Request = !0;
                          }
                      else a.H5Request = !0;
                      "AMAP" !== l.AliAppName ||
                        r.useNebulaJSbridgeWithAMAP ||
                        ((a.WindVaneRequest = a.H5Request = void 0),
                        (a.H5Request = !0));
                    }
                    window.self !== window.top && (a.H5Request = !0);
                  }
                  var s = e.navigator.userAgent.toLowerCase();
                  return (
                    s.indexOf("youku") > -1 &&
                      a.mainDomain.indexOf("youku.com") < 0 &&
                      ((a.WindVaneRequest = !1), (a.H5Request = !0)),
                    a.mainDomain.indexOf("youku.com") > -1 &&
                      s.indexOf("youku") < 0 &&
                      ((a.WindVaneRequest = !1), (a.H5Request = !0)),
                    n
                      ? n().then(function () {
                          var e = a.retJson.ret;
                          if (
                            (e instanceof Array && (e = e.join(",")),
                            (!0 === a.WindVaneRequest &&
                              g &&
                              a.retJson.error) ||
                              !e ||
                              e.indexOf("PARAM_PARSE_ERROR") > -1 ||
                              e.indexOf("HY_FAILED") > -1 ||
                              e.indexOf("HY_NO_HANDLER") > -1 ||
                              e.indexOf("HY_CLOSED") > -1 ||
                              e.indexOf("HY_EXCEPTION") > -1 ||
                              e.indexOf("HY_NO_PERMISSION") > -1)
                          ) {
                            if (
                              !g ||
                              !isNaN(a.retJson.error) ||
                              -1 !==
                                a.retJson.error.indexOf(
                                  "FAIL_SYS_ACCESS_DENIED"
                                )
                            )
                              return (
                                g &&
                                  i(r.data) &&
                                  (r.data = JSON.stringify(r.data)),
                                (l.H5Request = !0),
                                o.__sequence([
                                  o.__processRequestType,
                                  o.__processToken,
                                  o.__processRequestUrl,
                                  o.middlewares,
                                  o.__processRequest,
                                ])
                              );
                            void 0 === a.retJson.api &&
                              void 0 === a.retJson.v &&
                              ((a.retJson.api = r.api),
                              (a.retJson.v = r.v),
                              (a.retJson.ret = [
                                a.retJson.error + "::" + a.retJson.errorMessage,
                              ]),
                              (a.retJson.data = {}));
                          }
                        })
                      : void 0
                  );
                });
              var v = "_m_h5_c",
                b = "_m_h5_tk";
              (u.prototype.__getTokenFromAlipay = function () {
                var t = n(),
                  o = this.options,
                  r =
                    (e.navigator.userAgent,
                    !!location.protocol.match(/^https?\:$/));
                return (
                  !0 === o.useAlipayJSBridge &&
                  !r &&
                  g &&
                  e.AlipayJSBridge &&
                  e.AlipayJSBridge.call
                    ? e.AlipayJSBridge.call(
                        "getMtopToken",
                        function (e) {
                          e && e.token && (o.token = e.token), t.resolve();
                        },
                        function () {
                          t.resolve();
                        }
                      )
                    : t.resolve(),
                  t.promise
                );
              }),
                (u.prototype.__getTokenFromCookie = function () {
                  var e = this.options;
                  return (
                    e.CDR && a(v)
                      ? (e.token = a(v).split(";")[0])
                      : (e.token = e.token || a(b)),
                    e.token && (e.token = e.token.split("_")[0]),
                    p.resolve()
                  );
                }),
                (u.prototype.__waitWKWebViewCookie = function (t) {
                  var n = this.options;
                  n.waitWKWebViewCookieFn &&
                  n.H5Request &&
                  e.webkit &&
                  e.webkit.messageHandlers
                    ? n.waitWKWebViewCookieFn(t)
                    : t();
                }),
                (u.prototype.__processToken = function (e) {
                  var t = this,
                    n = this.options;
                  return (
                    this.params,
                    n.token && delete n.token,
                    !0 !== n.WindVaneRequest
                      ? d
                          .then(function () {
                            return t.__getTokenFromAlipay();
                          })
                          .then(function () {
                            return t.__getTokenFromCookie();
                          })
                          .then(e)
                          .then(function () {
                            var e = n.retJson,
                              o = e.ret;
                            if (
                              (o instanceof Array && (o = o.join(",")),
                              o.indexOf("TOKEN_EMPTY") > -1 ||
                                ((!0 === n.CDR || !0 === n.syncCookieMode) &&
                                  o.indexOf("ILLEGAL_ACCESS") > -1) ||
                                o.indexOf("TOKEN_EXOIRED") > -1)
                            ) {
                              if (
                                ((n.maxRetryTimes = n.maxRetryTimes || 5),
                                (n.failTimes = n.failTimes || 0),
                                n.H5Request && ++n.failTimes < n.maxRetryTimes)
                              ) {
                                var r = [
                                  t.__waitWKWebViewCookie,
                                  t.__processToken,
                                  t.__processRequestUrl,
                                  t.middlewares,
                                  t.__processRequest,
                                ];
                                if (
                                  !0 === n.syncCookieMode &&
                                  t.constructor.__cookieProcessorId !== t.id
                                )
                                  if (t.constructor.__cookieProcessor) {
                                    r = [
                                      function (e) {
                                        var n = function () {
                                          (t.constructor.__cookieProcessor =
                                            null),
                                            (t.constructor.__cookieProcessorId =
                                              null),
                                            e();
                                        };
                                        t.constructor.__cookieProcessor
                                          ? t.constructor.__cookieProcessor
                                              .then(n)
                                              .catch(n)
                                          : e();
                                      },
                                      t.__waitWKWebViewCookie,
                                      t.__processToken,
                                      t.__processRequestUrl,
                                      t.middlewares,
                                      t.__processRequest,
                                    ];
                                  } else
                                    (t.constructor.__cookieProcessor =
                                      t.__requestProcessor),
                                      (t.constructor.__cookieProcessorId =
                                        t.id);
                                return t.__sequence(r);
                              }
                              n.maxRetryTimes > 0 &&
                                (s(v, n.pageDomain, "*"),
                                s(b, n.mainDomain, n.subDomain),
                                s("_m_h5_tk_enc", n.mainDomain, n.subDomain)),
                                (e.retType = m.TOKEN_EXPIRED);
                            }
                          })
                      : void e()
                  );
                }),
                (u.prototype.__processRequestUrl = function (t) {
                  var n = this.params,
                    o = this.options;
                  if (o.hostSetting && o.hostSetting[e.location.hostname]) {
                    var r = o.hostSetting[e.location.hostname];
                    r.prefix && (o.prefix = r.prefix),
                      r.subDomain && (o.subDomain = r.subDomain),
                      r.mainDomain && (o.mainDomain = r.mainDomain);
                  }
                  if (!0 === o.H5Request) {
                    var i =
                        "//" +
                        (o.prefix ? o.prefix + "." : "") +
                        (o.subDomain ? o.subDomain + "." : "") +
                        o.mainDomain +
                        "/h5/" +
                        n.api.toLowerCase() +
                        "/" +
                        n.v.toLowerCase() +
                        "/",
                      a =
                        n.appKey ||
                        ("waptest" === o.subDomain ? "4272" : "12574478"),
                      s = new Date().getTime(),
                      c = (function (e) {
                        function t(e, t) {
                          return (e << t) | (e >>> (32 - t));
                        }
                        function n(e, t) {
                          var n, o, r, i, a;
                          return (
                            (r = 2147483648 & e),
                            (i = 2147483648 & t),
                            (a = (1073741823 & e) + (1073741823 & t)),
                            (n = 1073741824 & e) & (o = 1073741824 & t)
                              ? 2147483648 ^ a ^ r ^ i
                              : n | o
                              ? 1073741824 & a
                                ? 3221225472 ^ a ^ r ^ i
                                : 1073741824 ^ a ^ r ^ i
                              : a ^ r ^ i
                          );
                        }
                        function o(e, o, r, i, a, s, c) {
                          return (
                            (e = n(
                              e,
                              n(
                                n(
                                  (function (e, t, n) {
                                    return (e & t) | (~e & n);
                                  })(o, r, i),
                                  a
                                ),
                                c
                              )
                            )),
                            n(t(e, s), o)
                          );
                        }
                        function r(e, o, r, i, a, s, c) {
                          return (
                            (e = n(
                              e,
                              n(
                                n(
                                  (function (e, t, n) {
                                    return (e & n) | (t & ~n);
                                  })(o, r, i),
                                  a
                                ),
                                c
                              )
                            )),
                            n(t(e, s), o)
                          );
                        }
                        function i(e, o, r, i, a, s, c) {
                          return (
                            (e = n(
                              e,
                              n(
                                n(
                                  (function (e, t, n) {
                                    return e ^ t ^ n;
                                  })(o, r, i),
                                  a
                                ),
                                c
                              )
                            )),
                            n(t(e, s), o)
                          );
                        }
                        function a(e, o, r, i, a, s, c) {
                          return (
                            (e = n(
                              e,
                              n(
                                n(
                                  (function (e, t, n) {
                                    return t ^ (e | ~n);
                                  })(o, r, i),
                                  a
                                ),
                                c
                              )
                            )),
                            n(t(e, s), o)
                          );
                        }
                        function s(e) {
                          var t,
                            n = "",
                            o = "";
                          for (t = 0; 3 >= t; t++)
                            n += (o =
                              "0" +
                              ((e >>> (8 * t)) & 255).toString(16)).substr(
                              o.length - 2,
                              2
                            );
                          return n;
                        }
                        var c, u, p, d, l, f, m, y, g, h;
                        for (
                          e = (function (e) {
                            e = e.replace(/\r\n/g, "\n");
                            for (var t = "", n = 0; n < e.length; n++) {
                              var o = e.charCodeAt(n);
                              128 > o
                                ? (t += String.fromCharCode(o))
                                : o > 127 && 2048 > o
                                ? ((t += String.fromCharCode((o >> 6) | 192)),
                                  (t += String.fromCharCode((63 & o) | 128)))
                                : ((t += String.fromCharCode((o >> 12) | 224)),
                                  (t += String.fromCharCode(
                                    ((o >> 6) & 63) | 128
                                  )),
                                  (t += String.fromCharCode((63 & o) | 128)));
                            }
                            return t;
                          })(e),
                            h = (function (e) {
                              for (
                                var t,
                                  n = e.length,
                                  o = n + 8,
                                  r = 16 * ((o - (o % 64)) / 64 + 1),
                                  i = new Array(r - 1),
                                  a = 0,
                                  s = 0;
                                n > s;

                              )
                                (a = (s % 4) * 8),
                                  (i[(t = (s - (s % 4)) / 4)] =
                                    i[t] | (e.charCodeAt(s) << a)),
                                  s++;
                              return (
                                (a = (s % 4) * 8),
                                (i[(t = (s - (s % 4)) / 4)] =
                                  i[t] | (128 << a)),
                                (i[r - 2] = n << 3),
                                (i[r - 1] = n >>> 29),
                                i
                              );
                            })(e),
                            f = 1732584193,
                            m = 4023233417,
                            y = 2562383102,
                            g = 271733878,
                            c = 0;
                          c < h.length;
                          c += 16
                        )
                          (u = f),
                            (p = m),
                            (d = y),
                            (l = g),
                            (f = o(f, m, y, g, h[c + 0], 7, 3614090360)),
                            (g = o(g, f, m, y, h[c + 1], 12, 3905402710)),
                            (y = o(y, g, f, m, h[c + 2], 17, 606105819)),
                            (m = o(m, y, g, f, h[c + 3], 22, 3250441966)),
                            (f = o(f, m, y, g, h[c + 4], 7, 4118548399)),
                            (g = o(g, f, m, y, h[c + 5], 12, 1200080426)),
                            (y = o(y, g, f, m, h[c + 6], 17, 2821735955)),
                            (m = o(m, y, g, f, h[c + 7], 22, 4249261313)),
                            (f = o(f, m, y, g, h[c + 8], 7, 1770035416)),
                            (g = o(g, f, m, y, h[c + 9], 12, 2336552879)),
                            (y = o(y, g, f, m, h[c + 10], 17, 4294925233)),
                            (m = o(m, y, g, f, h[c + 11], 22, 2304563134)),
                            (f = o(f, m, y, g, h[c + 12], 7, 1804603682)),
                            (g = o(g, f, m, y, h[c + 13], 12, 4254626195)),
                            (y = o(y, g, f, m, h[c + 14], 17, 2792965006)),
                            (f = r(
                              f,
                              (m = o(m, y, g, f, h[c + 15], 22, 1236535329)),
                              y,
                              g,
                              h[c + 1],
                              5,
                              4129170786
                            )),
                            (g = r(g, f, m, y, h[c + 6], 9, 3225465664)),
                            (y = r(y, g, f, m, h[c + 11], 14, 643717713)),
                            (m = r(m, y, g, f, h[c + 0], 20, 3921069994)),
                            (f = r(f, m, y, g, h[c + 5], 5, 3593408605)),
                            (g = r(g, f, m, y, h[c + 10], 9, 38016083)),
                            (y = r(y, g, f, m, h[c + 15], 14, 3634488961)),
                            (m = r(m, y, g, f, h[c + 4], 20, 3889429448)),
                            (f = r(f, m, y, g, h[c + 9], 5, 568446438)),
                            (g = r(g, f, m, y, h[c + 14], 9, 3275163606)),
                            (y = r(y, g, f, m, h[c + 3], 14, 4107603335)),
                            (m = r(m, y, g, f, h[c + 8], 20, 1163531501)),
                            (f = r(f, m, y, g, h[c + 13], 5, 2850285829)),
                            (g = r(g, f, m, y, h[c + 2], 9, 4243563512)),
                            (y = r(y, g, f, m, h[c + 7], 14, 1735328473)),
                            (f = i(
                              f,
                              (m = r(m, y, g, f, h[c + 12], 20, 2368359562)),
                              y,
                              g,
                              h[c + 5],
                              4,
                              4294588738
                            )),
                            (g = i(g, f, m, y, h[c + 8], 11, 2272392833)),
                            (y = i(y, g, f, m, h[c + 11], 16, 1839030562)),
                            (m = i(m, y, g, f, h[c + 14], 23, 4259657740)),
                            (f = i(f, m, y, g, h[c + 1], 4, 2763975236)),
                            (g = i(g, f, m, y, h[c + 4], 11, 1272893353)),
                            (y = i(y, g, f, m, h[c + 7], 16, 4139469664)),
                            (m = i(m, y, g, f, h[c + 10], 23, 3200236656)),
                            (f = i(f, m, y, g, h[c + 13], 4, 681279174)),
                            (g = i(g, f, m, y, h[c + 0], 11, 3936430074)),
                            (y = i(y, g, f, m, h[c + 3], 16, 3572445317)),
                            (m = i(m, y, g, f, h[c + 6], 23, 76029189)),
                            (f = i(f, m, y, g, h[c + 9], 4, 3654602809)),
                            (g = i(g, f, m, y, h[c + 12], 11, 3873151461)),
                            (y = i(y, g, f, m, h[c + 15], 16, 530742520)),
                            (f = a(
                              f,
                              (m = i(m, y, g, f, h[c + 2], 23, 3299628645)),
                              y,
                              g,
                              h[c + 0],
                              6,
                              4096336452
                            )),
                            (g = a(g, f, m, y, h[c + 7], 10, 1126891415)),
                            (y = a(y, g, f, m, h[c + 14], 15, 2878612391)),
                            (m = a(m, y, g, f, h[c + 5], 21, 4237533241)),
                            (f = a(f, m, y, g, h[c + 12], 6, 1700485571)),
                            (g = a(g, f, m, y, h[c + 3], 10, 2399980690)),
                            (y = a(y, g, f, m, h[c + 10], 15, 4293915773)),
                            (m = a(m, y, g, f, h[c + 1], 21, 2240044497)),
                            (f = a(f, m, y, g, h[c + 8], 6, 1873313359)),
                            (g = a(g, f, m, y, h[c + 15], 10, 4264355552)),
                            (y = a(y, g, f, m, h[c + 6], 15, 2734768916)),
                            (m = a(m, y, g, f, h[c + 13], 21, 1309151649)),
                            (f = a(f, m, y, g, h[c + 4], 6, 4149444226)),
                            (g = a(g, f, m, y, h[c + 11], 10, 3174756917)),
                            (y = a(y, g, f, m, h[c + 2], 15, 718787259)),
                            (m = a(m, y, g, f, h[c + 9], 21, 3951481745)),
                            (f = n(f, u)),
                            (m = n(m, p)),
                            (y = n(y, d)),
                            (g = n(g, l));
                        return (s(f) + s(m) + s(y) + s(g)).toLowerCase();
                      })(o.token + "&" + s + "&" + a + "&" + n.data),
                      u = { jsv: "2.6.1", appKey: a, t: s, sign: c },
                      p = { data: n.data, ua: n.ua };
                    Object.keys(n).forEach(function (e) {
                      void 0 === u[e] &&
                        void 0 === p[e] &&
                        "headers" !== e &&
                        "ext_headers" !== e &&
                        "ext_querys" !== e &&
                        (u[e] = n[e]);
                    }),
                      n.ext_querys &&
                        Object.keys(n.ext_querys).forEach(function (e) {
                          u[e] = n.ext_querys[e];
                        }),
                      o.getJSONP
                        ? (u.type = "jsonp")
                        : o.getOriginalJSONP
                        ? (u.type = "originaljsonp")
                        : (o.getJSON || o.postJSON) &&
                          (u.type = "originaljson"),
                      void 0 !== n.valueType &&
                        ("original" === n.valueType
                          ? o.getJSONP || o.getOriginalJSONP
                            ? (u.type = "originaljsonp")
                            : (o.getJSON || o.postJSON) &&
                              (u.type = "originaljson")
                          : "string" === n.valueType &&
                            (o.getJSONP || o.getOriginalJSONP
                              ? (u.type = "jsonp")
                              : (o.getJSON || o.postJSON) &&
                                (u.type = "json"))),
                      !0 === o.useJsonpResultType &&
                        "originaljson" === u.type &&
                        delete u.type,
                      o.dangerouslySetProtocol &&
                        (i = o.dangerouslySetProtocol + ":" + i),
                      (o.querystring = u),
                      (o.postdata = p),
                      (o.path = i);
                  }
                  t();
                }),
                (u.prototype.__processUnitPrefix = function (e) {
                  e();
                });
              var w = 0;
              (u.prototype.__requestJSONP = function (e) {
                function t(e) {
                  if (
                    (u && clearTimeout(u),
                    p.parentNode && p.parentNode.removeChild(p),
                    "TIMEOUT" === e)
                  )
                    window[c] = function () {
                      window[c] = void 0;
                      try {
                        delete window[c];
                      } catch (e) {}
                    };
                  else {
                    window[c] = void 0;
                    try {
                      delete window[c];
                    } catch (e) {}
                  }
                }
                var o = n(),
                  i = this.params,
                  a = this.options,
                  s = i.timeout || 2e4,
                  c = "mtopjsonp" + (i.jsonpIncPrefix || "") + ++w,
                  u = setTimeout(function () {
                    e(a.timeoutErrMsg || "TIMEOUT::鎺ュ彛瓒呮椂"), t("TIMEOUT");
                  }, s);
                a.querystring.callback = c;
                var p = document.createElement("script");
                return (
                  (p.src =
                    a.path + "?" + r(a.querystring) + "&" + r(a.postdata)),
                  (p.async = !0),
                  (p.onerror = function () {
                    t("ABORT"), e(a.abortErrMsg || "ABORT::鎺ュ彛寮傚父閫€鍑�");
                  }),
                  (window[c] = function () {
                    (a.results = Array.prototype.slice.call(arguments)),
                      t(),
                      o.resolve();
                  }),
                  (function (e) {
                    (
                      document.getElementsByTagName("head")[0] ||
                      document.getElementsByTagName("body")[0] ||
                      document.firstElementChild ||
                      document
                    ).appendChild(e);
                  })(p),
                  o.promise
                );
              }),
                (u.prototype.__requestJSON = function (t) {
                  function o(e) {
                    d && clearTimeout(d), "TIMEOUT" === e && u.abort();
                  }
                  var i = n(),
                    s = this.params,
                    c = this.options,
                    u = new e.XMLHttpRequest(),
                    p = s.timeout || 2e4,
                    d = setTimeout(function () {
                      t(c.timeoutErrMsg || "TIMEOUT::鎺ュ彛瓒呮椂"),
                        o("TIMEOUT");
                    }, p);
                  c.CDR && a(v) && (c.querystring.c = decodeURIComponent(a(v))),
                    (u.onreadystatechange = function () {
                      if (4 == u.readyState) {
                        var e,
                          n,
                          r = u.status;
                        if ((r >= 200 && 300 > r) || 304 == r) {
                          o(),
                            (e = u.responseText),
                            (n = u.getAllResponseHeaders() || "");
                          try {
                            ((e = /^\s*$/.test(e)
                              ? {}
                              : JSON.parse(e)).responseHeaders = n),
                              (c.results = [e]),
                              i.resolve();
                          } catch (e) {
                            t("PARSE_JSON_ERROR::瑙ｆ瀽JSON澶辫触");
                          }
                        } else
                          o("ABORT"),
                            t(c.abortErrMsg || "ABORT::鎺ュ彛寮傚父閫€鍑�");
                      }
                    });
                  var l,
                    f,
                    m = c.path + "?" + r(c.querystring);
                  c.getJSON
                    ? ((l = "GET"), (m += "&" + r(c.postdata)))
                    : c.postJSON && ((l = "POST"), (f = r(c.postdata))),
                    u.open(l, m, !0),
                    (u.withCredentials = !0),
                    u.setRequestHeader("Accept", "application/json"),
                    u.setRequestHeader(
                      "Content-type",
                      "application/x-www-form-urlencoded"
                    );
                  var y = s.ext_headers || s.headers;
                  if (y) for (var g in y) u.setRequestHeader(g, y[g]);
                  return u.send(f), i.promise;
                }),
                (u.prototype.__requestWindVane = function (e) {
                  function o(e) {
                    (a.results = [e]), r.resolve();
                  }
                  var r = n(),
                    i = this.params,
                    a = this.options,
                    s = i.data,
                    c = i.api,
                    u = i.v,
                    p = a.postJSON ? 1 : 0,
                    d =
                      a.getJSON || a.postJSON || a.getOriginalJSONP
                        ? "originaljson"
                        : "";
                  void 0 !== i.valueType &&
                    ("original" === i.valueType
                      ? (d = "originaljson")
                      : "string" === i.valueType && (d = "")),
                    !0 === a.useJsonpResultType && (d = "");
                  var l,
                    f,
                    m = "https" === location.protocol ? 1 : 0,
                    y = i.isSec || 0,
                    g = i.sessionOption || "AutoLoginOnly",
                    h = i.ecode || 0,
                    v = i.ext_headers || {},
                    b = i.ext_querys || {};
                  (l =
                    2 *
                    (f =
                      void 0 !== i.timer
                        ? parseInt(i.timer)
                        : void 0 !== i.timeout
                        ? parseInt(i.timeout)
                        : 2e4)),
                    !0 === i.needLogin &&
                      void 0 === i.sessionOption &&
                      (g = "AutoLoginAndManualLogin"),
                    void 0 !== i.secType &&
                      void 0 === i.isSec &&
                      (y = i.secType);
                  var w = {
                    api: c,
                    v: u,
                    post: String(p),
                    type: d,
                    isHttps: String(m),
                    ecode: String(h),
                    isSec: String(y),
                    param: JSON.parse(s),
                    timer: f,
                    sessionOption: g,
                    ext_headers: v,
                    ext_querys: b,
                  };
                  i.ttid && !0 === a.dangerouslySetWVTtid && (w.ttid = i.ttid),
                    Object.assign &&
                      i.dangerouslySetWindvaneParams &&
                      Object.assign(w, i.dangerouslySetWindvaneParams);
                  var _ = "MtopWVPlugin";
                  return (
                    "string" == typeof i.customWindVaneClassName &&
                      (_ = i.customWindVaneClassName),
                    t.windvane.call(_, "send", w, o, o, l),
                    r.promise
                  );
                }),
                (u.prototype.__requestAlipay = function (t) {
                  var o = n(),
                    r = this.params,
                    a = this.options,
                    s = {
                      apiName: r.api,
                      apiVersion: r.v,
                      needEcodeSign: "1" === String(r.ecode),
                      headers: r.ext_headers || {},
                      usePost: !!a.postJSON,
                    };
                  i(r.data) || (r.data = JSON.parse(r.data)),
                    (s.data = r.data),
                    r.ttid &&
                      !0 === a.dangerouslySetWVTtid &&
                      (s.ttid = r.ttid),
                    (a.getJSON || a.postJSON || a.getOriginalJSONP) &&
                      (s.type = "originaljson"),
                    void 0 !== r.valueType &&
                      ("original" === r.valueType
                        ? (s.type = "originaljson")
                        : "string" === r.valueType && delete s.type),
                    !0 === a.useJsonpResultType && delete s.type,
                    Object.assign &&
                      r.dangerouslySetAlipayParams &&
                      Object.assign(s, r.dangerouslySetAlipayParams);
                  var c = "mtop";
                  return (
                    "string" == typeof r.customAlipayJSBridgeApi &&
                      (c = r.customAlipayJSBridgeApi),
                    e.AlipayJSBridge.call(c, s, function (e) {
                      (a.results = [e]), o.resolve();
                    }),
                    o.promise
                  );
                }),
                (u.prototype.__processRequest = function (e, t) {
                  var n = this;
                  return d
                    .then(function () {
                      var e = n.options;
                      if (e.H5Request && (e.getJSONP || e.getOriginalJSONP))
                        return n.__requestJSONP(t);
                      if (e.H5Request && (e.getJSON || e.postJSON))
                        return n.__requestJSON(t);
                      if (e.WindVaneRequest)
                        return g
                          ? n.__requestAlipay(t)
                          : n.__requestWindVane(t);
                      throw new Error("UNEXCEPT_REQUEST::閿欒鐨勮姹傜被鍨�");
                    })
                    .then(e)
                    .then(function () {
                      var e = n.options,
                        t = (n.params, e.results[0]),
                        o = (t && t.ret) || [];
                      (t.ret = o), o instanceof Array && (o = o.join(","));
                      var r = t.c;
                      e.CDR &&
                        r &&
                        (function (e, t, n) {
                          var o = n || {};
                          document.cookie =
                            e
                              .replace(/[^+#$&^`|]/g, encodeURIComponent)
                              .replace("(", "%28")
                              .replace(")", "%29") +
                            "=" +
                            t.replace(
                              /[^+#$&\/:<-\[\]-}]/g,
                              encodeURIComponent
                            ) +
                            (o.domain ? ";domain=" + o.domain : "") +
                            (o.path ? ";path=" + o.path : "") +
                            (o.secure ? ";secure" : "") +
                            (o.httponly ? ";HttpOnly" : "") +
                            (o.sameSite ? ";Samesite=" + o.sameSite : "");
                        })(v, r, {
                          domain: e.pageDomain,
                          path: "/",
                          secure: e.secure,
                          sameSite: e.sameSite,
                        }),
                        o.indexOf("SUCCESS") > -1
                          ? (t.retType = m.SUCCESS)
                          : (t.retType = m.ERROR),
                        (e.retJson = t);
                    });
                }),
                (u.prototype.__sequence = function (e) {
                  var t = this,
                    o = [],
                    r = [];
                  e.forEach(function e(i) {
                    if (i instanceof Array) i.forEach(e);
                    else {
                      var a,
                        s = n(),
                        c = n();
                      o.push(function () {
                        return (
                          (s = n()),
                          (a = i.call(
                            t,
                            function (e) {
                              return s.resolve(e), c.promise;
                            },
                            function (e) {
                              return s.reject(e), c.promise;
                            }
                          )) &&
                            (a = a.catch(function (e) {
                              s.reject(e);
                            })),
                          s.promise
                        );
                      }),
                        r.push(function (e) {
                          return c.resolve(e), a;
                        });
                    }
                  });
                  for (var i, a = d; (i = o.shift()); ) a = a.then(i);
                  for (; (i = r.pop()); ) a = a.then(i);
                  return a;
                });
              var _ = function (e) {
                  e();
                },
                S = function (e) {
                  e();
                };
              (u.prototype.request = function (n) {
                var r = this;
                if (((this.options = o(n || {}, l)), !p)) {
                  var i =
                    "褰撳墠娴忚鍣ㄤ笉鏀寔Promise锛岃鍦╳indows瀵硅薄涓婃寕杞絇romise瀵硅薄";
                  throw ((t.mtop = { ERROR: i }), new Error(i));
                }
                var a = p
                  .resolve([_, S])
                  .then(function (e) {
                    var t = e[0],
                      n = e[1];
                    return r.__sequence([
                      t,
                      r.__processRequestMethod,
                      r.__processRequestType,
                      r.__processToken,
                      r.__processRequestUrl,
                      r.middlewares,
                      r.__processRequest,
                      n,
                    ]);
                  })
                  .then(function () {
                    var e = r.options.retJson;
                    return e.retType !== m.SUCCESS
                      ? p.reject(e)
                      : r.options.successCallback
                      ? void r.options.successCallback(e)
                      : p.resolve(e);
                  })
                  .catch(function (e) {
                    var n;
                    return (
                      (n =
                        e instanceof Error
                          ? {
                              ret: [e.message],
                              stack: [e.stack],
                              retJson: m.ERROR,
                            }
                          : "string" == typeof e
                          ? { ret: [e], retJson: m.ERROR }
                          : void 0 !== e
                          ? e
                          : r.options.retJson),
                      t.mtop.errorListener &&
                        t.mtop.errorListener({
                          api: r.params.api,
                          data: r.params.data,
                          v: r.params.v,
                          retJson: n,
                        }),
                      r.options.failureCallback
                        ? void r.options.failureCallback(n)
                        : p.reject(n)
                    );
                  });
                return (
                  this.__processRequestType(),
                  r.options.H5Request &&
                    (r.constructor.__firstProcessor ||
                      (r.constructor.__firstProcessor = a),
                    (_ = function (e) {
                      r.constructor.__firstProcessor.then(e).catch(e);
                    })),
                  (("get" === this.params.type &&
                    "json" === this.params.dataType) ||
                    "post" === this.params.type) &&
                    ((n.pageDomain =
                      n.pageDomain ||
                      (function (e) {
                        try {
                          return ".com" !== e.substring(e.lastIndexOf("."))
                            ? (e.split(".") || []).length <= 3
                              ? e
                              : e.split(".").slice(1).join(".")
                            : e.substring(
                                e.lastIndexOf(".", e.lastIndexOf(".") - 1) + 1
                              );
                        } catch (t) {
                          return e.substring(
                            e.lastIndexOf(".", e.lastIndexOf(".") - 1) + 1
                          );
                        }
                      })(e.location.hostname)),
                    n.mainDomain !== n.pageDomain &&
                      ((n.maxRetryTimes = 4), (n.CDR = !0))),
                  (this.__requestProcessor = a),
                  a
                );
              }),
                (t.mtop = function (e) {
                  return new u(e);
                }),
                (t.mtop.request = function (e, t, n) {
                  var o = {
                    H5Request: e.H5Request,
                    WindVaneRequest: e.WindVaneRequest,
                    LoginRequest: e.LoginRequest,
                    AntiCreep: e.AntiCreep,
                    AntiFlood: e.AntiFlood,
                    successCallback: t,
                    failureCallback: n || t,
                  };
                  return new u(e).request(o);
                }),
                (t.mtop.H5Request = function (e, t, n) {
                  var o = {
                    H5Request: !0,
                    successCallback: t,
                    failureCallback: n || t,
                  };
                  return new u(e).request(o);
                }),
                (t.mtop.middlewares = f),
                (t.mtop.config = l),
                (t.mtop.RESPONSE_TYPE = m),
                (t.mtop.CLASS = u);
            })(window, window.lib || (window.lib = {})),
            (function (e, t) {
              function n(e) {
                return e.preventDefault(), !1;
              }
              function o(t, o) {
                var r = this,
                  i = e.dpr || 1,
                  a = document.createElement("div"),
                  s = document.documentElement.getBoundingClientRect(),
                  c = Math.max(s.width, window.innerWidth) / i,
                  u = Math.max(s.height, window.innerHeight) / i;
                a.style.cssText = [
                  "-webkit-transform:scale(" + i + ") translateZ(0)",
                  "-ms-transform:scale(" + i + ") translateZ(0)",
                  "transform:scale(" + i + ") translateZ(0)",
                  "-webkit-transform-origin:0 0",
                  "-ms-transform-origin:0 0",
                  "transform-origin:0 0",
                  "width:" + c + "px",
                  "height:" + u + "px",
                  "z-index:2147483647",
                  "position:" + (c > 800 ? "fixed" : "absolute"),
                  "left:0",
                  "top:0px",
                  "background:" + (c > 800 ? "rgba(0,0,0,.5)" : "#FFF"),
                  "display:none",
                ].join(";");
                var p = document.createElement("div");
                (p.style.cssText = [
                  "width:100%",
                  "height:52px",
                  "background:#EEE",
                  "line-height:52px",
                  "text-align:left",
                  "box-sizing:border-box",
                  "padding-left:20px",
                  "position:absolute",
                  "left:0",
                  "top:0",
                  "font-size:16px",
                  "font-weight:bold",
                  "color:#333",
                ].join(";")),
                  (p.innerText = t);
                var d = navigator.userAgent.match(
                    /.*(iPhone|iPad|Android|ios|SymbianOS|Windows Phone).*/i
                  ),
                  l = document.createElement("img");
                (l.style.cssText = [
                  "display:block",
                  "position:absolute",
                  "margin-top:15px",
                  "right:0",
                  "top:0",
                  "height:15px",
                  "line-height:52px",
                  "padding:0 20px",
                  "color:#999",
                ].join(";")),
                  (l.src =
                    "https://gw.alicdn.com/tfs/TB1QZN.CYj1gK0jSZFuXXcrHpXa-200-200.png");
                var f = document.createElement("iframe");
                (f.style.cssText = [
                  "width:100%",
                  "height:100%",
                  "border:0",
                  "overflow:hidden",
                ].join(";")),
                  d
                    ? (p.appendChild(l), a.appendChild(p))
                    : ((l.style.cssText = [
                        "position:absolute",
                        "width:15px",
                        "height:15px",
                        "top:102px",
                        "left:" + (c / 2 - 185 + 390) + "px",
                        "cursor: pointer",
                        "border:0",
                        "z-index:1",
                        "overflow:hidden",
                      ].join(";")),
                      a.appendChild(l),
                      (f.style.cssText = [
                        "position:absolute",
                        "top:92px",
                        "left:" + (c / 2 - 185) + "px",
                        "width:420px",
                        "height:320px",
                        "border:0",
                        "background:#FFF",
                        "overflow:hidden",
                      ].join(";"))),
                  a.appendChild(f),
                  (a.className = "J_MIDDLEWARE_FRAME_WIDGET"),
                  document.body.appendChild(a),
                  (f.src = o),
                  l.addEventListener(
                    "click",
                    function () {
                      r.hide();
                      var e = document.createEvent("HTMLEvents");
                      e.initEvent("close", !1, !1), a.dispatchEvent(e);
                    },
                    !1
                  ),
                  (this.addEventListener = function () {
                    a.addEventListener.apply(a, arguments);
                  }),
                  (this.removeEventListener = function () {
                    a.removeEventListener.apply(a, arguments);
                  }),
                  (this.show = function () {
                    document.addEventListener("touchmove", n, !1),
                      (a.style.display = "block"),
                      window.scrollTo(0, 0);
                  }),
                  (this.hide = function () {
                    document.removeEventListener("touchmove", n),
                      window.scrollTo(0, -s.top),
                      a.parentNode && a.parentNode.removeChild(a);
                  });
              }
              if (!t || !t.mtop || t.mtop.ERROR)
                throw new Error("Mtop 鍒濆鍖栧け璐ワ紒");
              var r = e.Promise,
                i = t.mtop.CLASS,
                a = t.mtop.config,
                s = t.mtop.RESPONSE_TYPE;
              t.mtop.middlewares.push(function (e) {
                var n = this,
                  o = this.options,
                  r = this.params;
                return e().then(function () {
                  var e = o.retJson,
                    i = e.ret,
                    c = navigator.userAgent.toLowerCase(),
                    u =
                      c.indexOf("safari") > -1 &&
                      c.indexOf("chrome") < 0 &&
                      c.indexOf("qqbrowser") < 0;
                  if (
                    (i instanceof Array && (i = i.join(",")),
                    (i.indexOf("SESSION_EXPIRED") > -1 ||
                      i.indexOf("SID_INVALID") > -1 ||
                      i.indexOf("AUTH_REJECT") > -1 ||
                      i.indexOf("NEED_LOGIN") > -1) &&
                      ((e.retType = s.SESSION_EXPIRED),
                      !o.WindVaneRequest &&
                        (!0 === a.LoginRequest ||
                          !0 === o.LoginRequest ||
                          !0 === r.needLogin)))
                  ) {
                    if (!t.login)
                      throw new Error("LOGIN_NOT_FOUND::缂哄皯lib.login");
                    if (
                      !0 !== o.safariGoLogin ||
                      !u ||
                      "taobao.com" === o.pageDomain
                    )
                      return t.login
                        .goLoginAsync()
                        .then(function (e) {
                          return n.__sequence([
                            n.__processToken,
                            n.__processRequestUrl,
                            n.__processUnitPrefix,
                            n.middlewares,
                            n.__processRequest,
                          ]);
                        })
                        .catch(function (e) {
                          throw "CANCEL" === e
                            ? new Error("LOGIN_CANCEL::鐢ㄦ埛鍙栨秷鐧诲綍")
                            : new Error("LOGIN_FAILURE::鐢ㄦ埛鐧诲綍澶辫触");
                        });
                    t.login.goLogin();
                  }
                });
              }),
                (t.mtop.loginRequest = function (e, t, n) {
                  var o = {
                    LoginRequest: !0,
                    H5Request: !0,
                    successCallback: t,
                    failureCallback: n || t,
                  };
                  return new i(e).request(o);
                }),
                (t.mtop.antiFloodRequest = function (e, t, n) {
                  var o = {
                    AntiFlood: !0,
                    successCallback: t,
                    failureCallback: n || t,
                  };
                  return new i(e).request(o);
                }),
                t.mtop.middlewares.push(function (e) {
                  var t = this.options;
                  return (
                    this.params,
                    !0 !== t.H5Request ||
                    (!0 !== a.AntiFlood && !0 !== t.AntiFlood)
                      ? void e()
                      : e().then(function () {
                          var e = t.retJson,
                            n = e.ret;
                          n instanceof Array && (n = n.join(",")),
                            n.indexOf("FAIL_SYS_USER_VALIDATE") > -1 &&
                              e.data.url &&
                              (t.AntiFloodReferer
                                ? (location.href = e.data.url.replace(
                                    /(http_referer=).+/,
                                    "$1" + t.AntiFloodReferer
                                  ))
                                : (location.href = e.data.url));
                        })
                  );
                }),
                (t.mtop.antiCreepRequest = function (e, t, n) {
                  var o = {
                    AntiCreep: !0,
                    successCallback: t,
                    failureCallback: n || t,
                  };
                  return new i(e).request(o);
                }),
                t.mtop.middlewares.push(function (t) {
                  var n = this,
                    i = this.options,
                    s = this.params;
                  return (
                    !1 !== i.AntiCreep && (i.AntiCreep = !0),
                    (!0 !== s.forceAntiCreep && !0 !== i.H5Request) ||
                    (!0 !== a.AntiCreep && !0 !== i.AntiCreep)
                      ? void t()
                      : t().then(function () {
                          var t = i.retJson,
                            a = t.ret;
                          if (
                            (a instanceof Array && (a = a.join(",")),
                            (a.indexOf("RGV587_ERROR::SM") > -1 ||
                              a.indexOf("ASSIST_FLAG") > -1) &&
                              t.data.url)
                          ) {
                            var c = "_m_h5_smt",
                              u = (function (e) {
                                var t = new RegExp(
                                  "(?:^|;\\s*)" + e + "\\=([^;]+)(?:;\\s*|$)"
                                ).exec(document.cookie);
                                return t ? t[1] : void 0;
                              })(c),
                              p = !1;
                            if (!0 === i.saveAntiCreepToken && u)
                              for (var d in (u = JSON.parse(u)))
                                s[d] && (p = !0);
                            if (!0 === i.saveAntiCreepToken && u && !p) {
                              for (var d in u) s[d] = u[d];
                              return n.__sequence([
                                n.__processToken,
                                n.__processRequestUrl,
                                n.__processUnitPrefix,
                                n.middlewares,
                                n.__processRequest,
                              ]);
                            }
                            return new r(function (r, a) {
                              function u() {
                                d.removeEventListener("close", u),
                                  e.removeEventListener("message", p),
                                  a("USER_INPUT_CANCEL::鐢ㄦ埛鍙栨秷杈撳叆");
                              }
                              function p(t) {
                                var o;
                                try {
                                  o = JSON.parse(t.data) || {};
                                } catch (e) {}
                                if (o && "child" === o.type) {
                                  var l;
                                  d.removeEventListener("close", u),
                                    e.removeEventListener("message", p),
                                    d.hide();
                                  try {
                                    for (var f in ("string" ==
                                      typeof (l = JSON.parse(
                                        decodeURIComponent(o.content)
                                      )) && (l = JSON.parse(l)),
                                    l))
                                      s[f] = l[f];
                                    !0 === i.saveAntiCreepToken
                                      ? ((document.cookie =
                                          c + "=" + JSON.stringify(l) + ";"),
                                        e.location.reload())
                                      : n
                                          .__sequence([
                                            n.__processToken,
                                            n.__processRequestUrl,
                                            n.__processUnitPrefix,
                                            n.middlewares,
                                            n.__processRequest,
                                          ])
                                          .then(r);
                                  } catch (e) {
                                    a("USER_INPUT_FAILURE::鐢ㄦ埛杈撳叆澶辫触");
                                  }
                                }
                              }
                              var d = new o("", t.data.url);
                              d.addEventListener("close", u, !1),
                                e.addEventListener("message", p, !1),
                                d.show();
                            });
                          }
                        })
                  );
                });
            })(window, window.lib || (window.lib = {})),
            (e.exports = window.lib.mtop);
        },
      },
      t = {};
    function n(o) {
      var r = t[o];
      if (void 0 !== r) return r.exports;
      var i = (t[o] = { exports: {} });
      return e[o](i, i.exports, n), i.exports;
    }
    (n.d = function (e, t) {
      for (var o in t)
        n.o(t, o) &&
          !n.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
    }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      });
    var o = {};
    return (
      (function () {
        "use strict";
        n.d(o, {
          default: function () {
            return zt;
          },
        });
        var e = {
          base: {
            ignorePath: [/mtop\.youku.aio\.collector\.alarm/, /^\/alilog\//],
            ignoreHost: [
              /\.baidu\.com$/,
              /^alarm\.youku\.com$/,
              /retcode\./,
              /\.mmstat\.com$/,
              /azhimalayanvh\.com$/,
              /\.aliapp\.org$/,
              /\.tbcache\.com$/,
              /valipl\.cp31\.ott\.cibntv\.net$/,
              /ykugc\.cp31\.ott\.cibntv\.net$/,
              /valipl-vip\.cp31\.ott\.cibntv\.net$/,
            ],
            ignoreMsg: [
              /^Script\serror\.$/,
              /^ResizeObserver\sloop\slimit\sexceeded$/,
            ],
            jsonpHost: [
              /acs\.youku\.com$/,
              /heyi-acs\.cp31\.ott\.cibntv\.net$/,
              /heyi-acs\.cp12\.wasu\.tv$/,
              /acs\.m\.taobao\.com$/,
              /mtop\.damai\.cn$/,
            ],
            isMtop: [/\/mtop(\.\w+){3,}\/[\d\.]+\/$/],
            ignoreMtop: ["mtop.youku.aio.collector.alarm"],
            ownHost: [/(\.|^)youku\.com$/, /\.cibntv\.net$/, /\.wasu\.tv$/],
            performanceExt: ["fmp"],
            alarmExt: ["page_type", "third_uuid", "alarm_mark"],
            urlKeys: ["scout_disable", "dev", "page_type", "sample"],
            loadTimeout: 5e3,
            apiTimeout: 5e3,
            alarmGather: 200,
            allowAlarmKeys: ["apiError", "apiTimeout"],
            alarmMaxNum: 24,
            api: "https://alarm.youku.com/api/sendAlarm",
            mtop: "mtop.youku.aio.collector.alarm",
            currentInitKeys: ["bu", "code", "sampleRate"],
            currentInitExtKeys: ["page_type"],
          },
          set: {
            console: ["info"],
            sampleRate: 1,
            bu: "youku",
            code: 7e3,
            ignorePath: [],
            ignoreHost: [],
            autoEnable: !0,
            alarmEnable: !0,
            outEnable: !0,
            spa: !1,
            loadTimeout: 5e3,
            apiTimeout: 5e3,
            alarmGather: 200,
            pathKeys: [],
          },
          ext: {
            performance: {},
            alarm: { page_type: "C:V0.0.32" },
            pageTypes: [],
            msg: {},
          },
          state: {},
          store: {},
          count: new Array(14)
            .join(0)
            .split("")
            .map(function (e) {
              return 0;
            }),
        };
        function t(e) {
          return (
            (t =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            t(e)
          );
        }
        var r,
          i,
          a = function (e) {
            return "undefined" === e;
          },
          s =
            !a("undefined" == typeof window ? "undefined" : t(window)) &&
            "onload" in window,
          c =
            (!a(
              "undefined" == typeof WXEnvironment
                ? "undefined"
                : t(WXEnvironment)
            ) && WXEnvironment.platform,
            function (t) {
              var n,
                o,
                a = r
                  ? i
                  : ((n = navigator.userAgent.toLowerCase()),
                    (o = n.indexOf("compatible") > -1 && n.indexOf(!1)),
                    (r = !0),
                    (i = o && 9 == n.match(/msie (\d+)/i)[1])),
                s = {};
              window.XMLHttpRequest
                ? ((s = a
                    ? new XDomainRequest()
                    : new XMLHttpRequest()).withCredentials = !0)
                : (s = ActiveXObject("Microsoft.XMLHTTP"));
              var c = t.length;
              c > 6096 ||
                ("GET" == (c > 2048 ? "POST" : "GET")
                  ? (s.open(
                      "GET",
                      ""
                        .concat(e.base.api, "?alarmInfo=")
                        .concat(encodeURIComponent(t)),
                      !0
                    ),
                    s.send(null))
                  : (s.open("POST", e.base.api, !0),
                    s.setRequestHeader(
                      "Content-Type",
                      "application/x-www-form-urlencoded"
                    ),
                    s.send("alarmInfo=".concat(encodeURIComponent(t)))));
            }),
          u = function (t) {
            var n = e.base.api,
              o = t.length,
              r = o > 2048 ? "POST" : "GET";
            if (!(o > 6096)) {
              var i = "GET" === r,
                a = "alarmInfo=".concat(encodeURIComponent(t));
              n += i ? "?".concat(a) : "";
              var s = {
                method: r,
                credentials: "include",
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: a,
              };
              i && delete s.body, fetch(n, s).catch(function (e) {});
            }
          },
          p = function (t) {
            var n = new FormData();
            n.append("alarmInfo", t), navigator.sendBeacon(e.base.api, n);
          };
        function d(e) {
          return (
            (d =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            d(e)
          );
        }
        var l,
          f,
          m = function (e) {
            "object" ===
              ("undefined" == typeof navigator ? "undefined" : d(navigator)) &&
            navigator.sendBeacon
              ? p(e)
              : "function" == typeof fetch
              ? u(e)
              : "function" == typeof XMLHttpRequest && c(e);
          },
          y = !0,
          g = function () {
            try {
              ("undefined" == typeof lib || !lib.mtop) && n(868),
                (e = {
                  prefix: "acs",
                  mainDomain: "youku.com",
                  appKey: "24679788",
                }),
                (t = window && window.location && window.location.host).indexOf(
                  "cibn"
                ) > 0
                  ? ((e.prefix = "heyi-acs"),
                    (e.mainDomain = "cp31.ott.cibntv.net"))
                  : t.indexOf("wasu") > 0 &&
                    ((e.prefix = "heyi-acs"), (e.mainDomain = "cp12.wasu.tv")),
                (function (e) {
                  var t = lib.mtop.config.mainDomain || "";
                  -1 === t.indexOf("youku") &&
                    -1 === t.indexOf("cibntv") &&
                    -1 === t.indexOf("wasu") &&
                    ((lib.mtop.config.prefix = e.prefix),
                    (lib.mtop.config.subDomain = ""),
                    (lib.mtop.config.mainDomain = e.mainDomain)),
                    (l = lib.mtop.request);
                })((f = e)),
                (y = !1);
            } catch (e) {
              y = !0;
            }
            var e, t;
            return y;
          },
          h = function (e) {
            var t = e.length;
            if (!(t > 6096)) {
              var n = {
                api: "mtop.youku.aio.collector.alarm",
                v: "1.0",
                type: t > 2048 ? "post" : "get",
                data: { req: e },
                appKey: f.appKey,
                ecode: 0,
                dataType: "json",
              };
              l(n).catch(function (t) {
                s && m(e);
              });
            }
          };
        function v(e) {
          return (
            (v =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            v(e)
          );
        }
        var b = function (e, t) {
            return e.reduce(function (e, n) {
              return e || n.test(t);
            }, !1);
          },
          w =
            ("object" ===
              ("undefined" == typeof window ? "undefined" : v(window)) &&
              window.location) ||
            {},
          _ = function (t, n, o) {
            var r,
              i,
              a = e.set[n] || e.base[n],
              s = t;
            try {
              s = (function (e) {
                return /^(\/\/)/gi.test(e)
                  ? "".concat(w.protocol).concat(e)
                  : /^\/[^\/]+/gi.test(e)
                  ? "".concat(w.origin).concat(e)
                  : /(?!https?:\/\/)^[^\/]+/gi.test(e)
                  ? ""
                      .concat(w.origin)
                      .concat(w.pathname.replace(/[^\/]+$/gi, ""))
                      .concat(e)
                  : e;
              })(t);
              var c = new URL(s);
              (r = c.hostname), (i = c.pathname);
            } catch (e) {
              var u = (s || "-").match(
                /^(http:|https:)?\/\/([^\/:]*):?(\d*)(\/[^\?\#]*)/
              );
              (r = (u && u[2]) || "-"), (i = (u && u[4]) || "-");
            }
            return b(a, o || "ignoreHost" === n || "jsonpHost" === n ? r : i);
          },
          S = e.set,
          E = e.store,
          O = function () {
            var e =
                "Mtop" === S.apiType || "Http" === S.apiType
                  ? S.apiType
                  : "Mtop",
              t = _(E.page_url, "ownHost", !0) && window.Promise ? e : "Http",
              n = "Mtop" === t && g();
            return {
              send:
                "Mtop" === (t = "Mtop" !== t || n ? "Http" : "Mtop") ? h : m,
              mtopInitCatch: n,
              api_type: t,
            };
          };
        function x(e) {
          return (
            (x =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            x(e)
          );
        }
        var R = {
            console: (function (e) {
              function t(t) {
                return e.apply(this, arguments);
              }
              return (
                (t.toString = function () {
                  return e.toString();
                }),
                t
              );
            })(function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "info";
              if (
                "object" ===
                ("undefined" == typeof window ? "undefined" : x(window))
              ) {
                window.console || (window.console = {});
                var n = console[t] || function () {};
                console[t] = function () {
                  n.apply(this, arguments);
                  try {
                    e && e(arguments[0], !1);
                  } catch (e) {}
                };
              }
            }),
          },
          T = R,
          A = {
            isRobot: function () {
              var e = ["baiduspider", "360Spider", "Bytespider"],
                t =
                  this.isExist(navigator) &&
                  this.isString(navigator.userAgent) &&
                  navigator.userAgent.toLowerCase();
              if (t)
                for (var n = 0; n < e.length; n++)
                  if (t.indexOf(e[n]) > -1) return 1;
            },
            isFunction: function (e) {
              return "function" == typeof e;
            },
            isPlainObject: function (e) {
              return "[object Object]" === Object.prototype.toString.call(e);
            },
            isString: function (e) {
              return "[object String]" === Object.prototype.toString.call(e);
            },
            isArray: function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            },
            isExist: function (e) {
              return void 0 !== e;
            },
          },
          k = "performance_fe",
          q = "jsError",
          C = "loadError",
          j = "loadTimeout",
          P = "unhandledrejection",
          N = "apiError",
          L = "apiTimeout",
          H = "alarm_fe",
          M = [
            "dns",
            "tcp",
            "ssl",
            "ttfb",
            "trans",
            "dom",
            "res",
            "firstbyte",
            "tti",
            "ready",
            "load",
            "fcp",
            "fmp",
          ],
          D = {};
        M.forEach(function (e) {
          D[e] = 0;
        });
        var J = {
            dns: ["domainLookupEnd", "domainLookupStart"],
            tcp: ["connectEnd", "connectStart"],
            ssl: ["connectEnd", "secureConnectionStart"],
            ttfb: ["responseStart", "requestStart"],
            trans: ["responseEnd", "responseStart"],
            dom: ["domInteractive", "responseEnd"],
            res: ["loadEventStart", "domContentLoadedEventEnd"],
            firstbyte: ["responseStart", "domainLookupStart"],
            tti: ["domInteractive", "fetchStart"],
            ready: ["domContentLoadedEventEnd", "fetchStart"],
            load: ["loadEventStart", "fetchStart"],
          },
          I = {
            keys: [
              "ttfb",
              "firstbyte",
              "dom",
              "ready",
              "res",
              "load",
              "fcp",
              "fmp",
            ],
            regex: /^(1|2)\d{4}$|^0$|^([1-9]\d{0,3})$/,
          },
          W = "performance_state",
          U = "ready",
          V = ["1s&2s&3s&4s&5s", "2s&3s&4s&5s", "3s&4s&5s", "4s&5s", "5s"],
          B = "fmp",
          F = ["1f&2f&3f&4f&5f", "2f&3f&4f&5f", "3f&4f&5f", "4f&5f", "5f"],
          $ = "bad",
          X = function (e) {
            for (var t = /([^=&\s\?]+)[=\s]*([^&\s]*)/g, n = {}; t.exec(e); )
              n[RegExp.$1] = RegExp.$2;
            return n;
          };
        function K(e) {
          return (
            (K =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            K(e)
          );
        }
        var G,
          z = e.base,
          Y = e.set,
          Q = e.store,
          Z = function (e) {
            var t = {},
              n =
                ("object" ===
                  ("undefined" == typeof window ? "undefined" : K(window)) &&
                  window.location) ||
                {},
              o = n.href || "https://e.cn/p?a=b",
              r = n.origin,
              i = (A.isArray(Y.pathKeys) && Y.pathKeys) || [];
            try {
              var a = new URL(o).searchParams;
              z.urlKeys.concat(i).forEach(function (e) {
                t[e] = a.get(e);
              });
            } catch (e) {
              var s = X(n.search);
              z.urlKeys.concat(i).forEach(function (e) {
                t[e] = s[e];
              });
            }
            (t.port = n.port),
              (Q.page_url = t.page_url = o),
              (Q.page_title = t.page_title =
                "object" ===
                  ("undefined" == typeof document
                    ? "undefined"
                    : K(document)) && document.title);
            var c =
              "Electron" === (G = G || e)
                ? n.pathname.replace(/.*(?=uos)/gi, "")
                : n.pathname;
            return (
              (Q.page_name = t.page_name =
                (function (e, t, n) {
                  var o = [];
                  return (
                    t.forEach(function (e) {
                      var t = n[e];
                      t && o.push("".concat(e, "=").concat(t));
                    }),
                    e + (o.length ? "?" + o.join("&") : "")
                  );
                })(r + c, i, t)),
              t
            );
          },
          ee = e.base,
          te = e.ext,
          ne = function (e) {
            var t = {},
              n = [];
            ee.alarmExt.forEach(function (o) {
              var r = e[o],
                i = "page_type" === o;
              if (i && r) {
                var a = r.split("&");
                te.pageTypes.concat(a).forEach(function (e) {
                  e && (t[e] || n.push(e)) && (t[e] = !0);
                }),
                  (te.pageTypes = n);
              }
              var s = i ? te.pageTypes.join("&") : r;
              te.alarm[o] = s || void 0;
            });
          };
        function oe(e) {
          return (
            (oe =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            oe(e)
          );
        }
        function re(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t &&
              (o = o.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function ie(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? re(Object(n), !0).forEach(function (t) {
                  ae(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : re(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function ae(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        var se = e.base,
          ce = e.set,
          ue = e.ext,
          pe = e.state,
          de = e.store,
          le = W,
          fe = m,
          me = function (e, t, n, o, r) {
            (n.biz_type = t), (n[le] = pe[t] ? void 0 : t), (pe[t] = !0);
            var i = t === k;
            (n[le] = i ? e[le] : n[le]),
              i && delete e[le],
              (n.client_msg = ie(
                i ? ie(ie({}, e), ue.performance) : ie({}, e),
                ue.msg
              )),
              (n.alarm_type = o || void 0),
              (n.alarm_code = r || void 0);
          },
          ye = 0,
          ge = function (e, t, n, o) {
            if (!(ye >= se.alarmMaxNum)) {
              var r,
                i = "".concat(ce.bu, "@").concat(ce.code),
                a = { client_code: i };
              try {
                if (!A.isPlainObject(e)) return;
                if (t)
                  me(
                    e,
                    t,
                    a,
                    n || (se.allowAlarmKeys.indexOf(t) > -1 && "listen"),
                    o
                  );
                else if ("calc" === e.biz_type && A.isArray(e.client_msg)) {
                  var s = {};
                  e.client_msg.forEach(function (e, t) {
                    var n = M[t];
                    s[n] = +e || 0;
                  }),
                    (a.biz_type = k),
                    (a[le] = n || "calc"),
                    (a.alarm_type = e.alarm_type),
                    (a.alarm_code = e.alarm_code || e.biz_code),
                    (a.client_msg = ie(ie({}, D), s));
                } else if (
                  e.biz_type &&
                  se.allowAlarmKeys.indexOf(e.biz_type) > -1 &&
                  A.isPlainObject(e.client_msg) &&
                  (function (e) {
                    return e.api && -1 === se.ignoreMtop.indexOf(e.api);
                  })(e.client_msg)
                )
                  me(e.client_msg, e.biz_type, a, "outer", o);
                else {
                  if (!e.alarm_type || !e.client_msg) {
                    if ("performance" === e.extType) {
                      if (ue.performance.over) return;
                      return void se.performanceExt.forEach(function (t) {
                        ue.performance[t] = e[t];
                      });
                    }
                    return "alarm" === e.extType
                      ? void ne(e)
                      : "msg" === e.extType
                      ? ((ue.msg = ie(ie({}, ue.msg), e)),
                        void delete ue.msg.extType)
                      : void 0;
                  }
                  var c =
                    e.Error && e.Error instanceof Error
                      ? e.Error.toString()
                      : void 0;
                  (a.client_msg = A.isPlainObject(e.client_msg)
                    ? ie(ie(ie({}, e.client_msg), ue.msg), {}, { _Error: c })
                    : { message: e.client_msg, _Error: c }),
                    (a.biz_type = H),
                    (a.alarm_type = e.alarm_type),
                    (a.alarm_code = e.alarm_code || a.alarm_type);
                  var u = e.alarmExt;
                  u && A.isPlainObject(u) && ne(u);
                }
                (a.client_msg = JSON.stringify(a.client_msg)),
                  (a.client_time = +new Date()),
                  ce.spa && Z(),
                  (de.page_title =
                    de.page_title ||
                    ("object" ===
                      ("undefined" == typeof document
                        ? "undefined"
                        : oe(document)) &&
                      document.title) ||
                    void 0),
                  (r = JSON.stringify(ie(ie(ie({}, a), ue.alarm), de)));
              } catch (e) {
                ce.spa && Z(),
                  (r = JSON.stringify(
                    ie(
                      {
                        biz_type: H,
                        client_code: i,
                        alarm_type: "alarmCatch",
                        client_time: +new Date(),
                        client_msg: e.toString(),
                      },
                      de
                    )
                  ));
              }
              return "calc" === e.biz_type && "apiStatistics" === e.alarm_type
                ? m(r) || ye++
                : setTimeout(function () {
                    try {
                      fe(r), ye++;
                    } catch (e) {}
                  }, 0);
            }
          };
        function he(e) {
          return (
            (he =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            he(e)
          );
        }
        var ve = e.set,
          be = e.base,
          we = e.count,
          _e = [],
          Se = [],
          Ee = [],
          Oe =
            "object" ===
              ("undefined" == typeof window ? "undefined" : he(window)) &&
            window.XMLHttpRequest,
          xe = function (e, t, n, o) {
            for (var r = 0; r < t.length; r++)
              if (e.index === t[r].index) {
                var i = t[r],
                  a = n[r] || {},
                  s = a.isMtop,
                  c = +new Date() - i.time,
                  u = e.status,
                  p = e.responseURL || a.url,
                  d = (p || "").replace(/(#|\?).*/, ""),
                  l = _(d, "ignorePath") || _(d, "ignoreHost"),
                  f = !l && (u < 200 || u >= 300) && 304 != u,
                  m = !l && !f && !s && c > (ve.apiTimeout || be.apiTimeout);
                !l && !s && we[5]++,
                  !l && !f && !m && !s && we[6]++,
                  f && we[7]++,
                  m && !s && we[8]++;
                var y = f ? N : m ? L : 0;
                if (y && d && -1 === _e.indexOf(d)) {
                  var g = {
                    api: d,
                    cost: c,
                    type: "xhr".concat(s ? "&mtop" : ""),
                    method: a.method || "GET",
                    status: u,
                    url: p,
                    message: e.statusText || void 0,
                    params: i.params || void 0,
                  };
                  o && o(g, y, 0, s ? "mtop" : "xhr"), _e.push(d);
                }
                n.splice(r, 1), t.splice(r, 1);
                break;
              }
          },
          Re = function (e) {
            if (Oe) {
              var t = 0,
                n = XMLHttpRequest.prototype.open;
              XMLHttpRequest.prototype.open = function (e, t) {
                try {
                  var o = _(t, "isMtop");
                  Se.push({ method: e, url: t, isMtop: o });
                } catch (e) {}
                n && n.apply(this, arguments);
              };
              var o = XMLHttpRequest.prototype.send;
              (XMLHttpRequest.prototype.send = function (e) {
                try {
                  t++,
                    Ee.push({ index: t, params: e, time: +new Date() }),
                    (this.index = t);
                } catch (e) {}
                o && o.apply(this, arguments);
              }),
                (window.XMLHttpRequest = function () {
                  var t = new Oe();
                  return (
                    void 0 !== t.onloadend &&
                      t.addEventListener(
                        "loadend",
                        function (t) {
                          xe(this, Ee, Se, e);
                        },
                        !1
                      ),
                    void 0 === t.onloadend &&
                      t.addEventListener(
                        "readystatechange",
                        function () {
                          4 === this.readyState && xe(this, Ee, Se, e);
                        },
                        !1
                      ),
                    t
                  );
                });
            }
          };
        function Te(e) {
          return (
            (Te =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Te(e)
          );
        }
        var Ae = e.set,
          ke = e.base,
          qe = e.count,
          Ce = [],
          je = function (e, t, n, o, r) {
            var i = t.url || r,
              a = (i || "").replace(/(#|\?).*/, "");
            if ("opaque" !== t.type && a) {
              var s = +new Date() - e,
                c = t.status || 0,
                u = _(a, "ignorePath") || _(a, "ignoreHost"),
                p = !u && (c < 200 || c >= 300) && 304 != c,
                d = !u && !p && s > (Ae.apiTimeout || ke.apiTimeout);
              !u && qe[9]++,
                !u && !p && !d && qe[10]++,
                p && qe[11]++,
                d && qe[12]++;
              var l = p ? N : d ? L : 0;
              if (l && !(Ce.indexOf(a) > -1)) {
                var f = {
                  api: a,
                  cost: s,
                  type: "fetch",
                  method: n.method || "GET",
                  status: c,
                  url: i,
                  message: t.statusText || void 0,
                  params: n.body || void 0,
                };
                o && o(f, l, 0, "fetch"), Ce.push(a);
              }
            }
          },
          Pe = function (e) {
            var t =
              "object" ===
                ("undefined" == typeof window ? "undefined" : Te(window)) &&
              window.fetch;
            t &&
              (window.fetch = function (n, o) {
                var r = +new Date();
                return t.apply(this, arguments).then(
                  function (t) {
                    try {
                      je(r, t, o || {}, e, n);
                    } catch (e) {}
                    return t;
                  },
                  function (t) {
                    try {
                      je(r, {}, o || {}, e, n);
                    } catch (e) {}
                    throw t;
                  }
                );
              });
          };
        function Ne(e) {
          return (
            (Ne =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Ne(e)
          );
        }
        var Le = e.set,
          He = e.base,
          Me = function (e) {
            var t =
                ("object" ===
                  ("undefined" == typeof window ? "undefined" : Ne(window)) &&
                  window.performance) ||
                {},
              n = (t.getEntriesByType && t.getEntriesByType("resource")) || [],
              o = +Le.loadTimeout || He.loadTimeout,
              r = +Le.apiTimeout || He.apiTimeout,
              i = [],
              a = [];
            n.forEach(function (e) {
              var t = e.duration,
                n = e.nextHopProtocol,
                s = e.initiatorType,
                c = e.name,
                u = t > r,
                p = t > o;
              if (u || p) {
                var d =
                    _(c, "ignorePath") || _(c, "ignoreHost") || _(c, "isMtop"),
                  l = !d && u && "script" === s && _(c, "jsonpHost");
                l &&
                  a.push({
                    api: c.replace(/(#|\?).*/, ""),
                    url: c,
                    cost: t,
                    type: "jsonp",
                    method: "GET",
                    message: "resource load timeout",
                  }),
                  !d &&
                    !l &&
                    p &&
                    i.push({
                      duration: t,
                      initiatorType: s,
                      name: c,
                      nextHopProtocol: n,
                    });
              }
            }),
              i.length && e && e(i, j),
              a.length && e && e(a, L);
          },
          De = function () {
            if (
              !window.performance ||
              (!window.performance.getEntriesByType &&
                !window.performance.timing) ||
              !window.requestAnimationFrame ||
              !window.MutationObserver
            )
              return {};
            var e =
                performance.getEntriesByType("navigation") &&
                performance.getEntriesByType("navigation")[0],
              t = e || performance.timing,
              n = !0,
              o = 0,
              r = e ? performance.now() : +new Date(),
              i = [{ score: 0, t: r }],
              a = window.innerHeight,
              s = function e(t, n, r) {
                var i = t.children,
                  s = (i && i.length) || 0,
                  c = 0,
                  u = t.tagName;
                if (
                  "SCRIPT" !== u &&
                  "STYLE" !== u &&
                  "META" !== u &&
                  "HEAD" !== u &&
                  (t.getBoundingClientRect &&
                    t.getBoundingClientRect().top < a &&
                    (c += n * s),
                  s)
                )
                  for (var p = 0; p < s; p++) c += e(i[p], n + 1, r);
                return (o = r ? c : o), c;
              },
              c = new window.MutationObserver(function () {
                window.requestAnimationFrame(function () {
                  var t = e ? performance.now() : +new Date(),
                    o = s(document, 1, n);
                  (n = !1), i.push({ score: o, t: t });
                });
              });
            c.observe(document, { childList: !0, subtree: !0 });
            return function () {
              c.disconnect();
              for (var e = [], n = 1; n < i.length; n++)
                i[n].t !== i[n - 1].t &&
                  e.push({ t: i[n].t, rate: i[n].score - i[n - 1].score });
              e.sort(function (e, t) {
                return t.rate - e.rate;
              });
              var a = o > 300 || 1 === i.length;
              if (e.length) {
                var s = t.fetchStart || t.navigationStart,
                  u =
                    (performance.getEntriesByType("paint") &&
                      performance.getEntriesByType("paint")[1] &&
                      performance.getEntriesByType("paint")[1].startTime) ||
                    0,
                  p = a ? r - s : e[0].t - s;
                return (
                  (p = window.__USE_SSR_TIME__ || p),
                  u ||
                    (e.forEach(function (e) {
                      u = e.rate > 0 ? e.t - s : 0;
                    }),
                    (u = u || e[e.length - 1].t - s)),
                  { fcp: parseInt(u), fmp: u > p ? parseInt(u) : parseInt(p) }
                );
              }
              return {};
            };
          };
        function Je(e) {
          return (
            (Je =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Je(e)
          );
        }
        var Ie = e.base,
          We = e.set,
          Ue = e.count,
          Ve = [],
          Be = function (e) {
            var t = e.responseHeaders,
              n =
                "string" == typeof t &&
                t.match(/(x-eagleeye-id|eagleeye-traceid):\s*([a-z0-9]+)/);
            return n ? n[2] : void 0;
          },
          Fe = function (e) {
            var t =
              "object" ===
                ("undefined" == typeof lib ? "undefined" : Je(lib)) &&
              A.isFunction(lib.mtop) &&
              lib.mtop.middlewares;
            t &&
              !lib.mtop.config.scout &&
              lib.mtop.middlewares.push(function (t) {
                var n = this.options,
                  o = this.params,
                  r = +new Date(),
                  i = Ie.ignoreMtop.indexOf(o.api) > -1;
                return (
                  !i && Ue[0]++,
                  t().then(function () {
                    if (!i) {
                      var t = +new Date() - r,
                        a = n.retJson,
                        s = a.ret;
                      s = A.isArray(s) ? s.join(",") : s;
                      var c = o.api,
                        u = s.indexOf("SUCCESS") > -1;
                      u && Ue[1]++, !u && Ue[2]++;
                      var p = t > (We.apiTimeout || Ie.apiTimeout);
                      u && p && Ue[4]++;
                      var d =
                        (u && p && -1 === Ve.indexOf(c) && Ve.push(c) && L) ||
                        (!u &&
                          -1 === Ve.indexOf("".concat(c, "&").concat(s)) &&
                          Ve.push("".concat(c, "&").concat(s)) &&
                          N);
                      if (d) {
                        var l = {
                          api: c,
                          cost: t,
                          type: "mtop",
                          method: o.type,
                          status: ""
                            .concat(a.code || 200)
                            .concat(p ? "&" + L : ""),
                          traceId: Be(a),
                          message: s,
                        };
                        e(l, d, "middlewares"),
                          Ve.push("".concat(c, "&").concat(s));
                      }
                    }
                  })
                );
              }),
              t && (lib.mtop.config.scout = 1);
          },
          $e = e.count,
          Xe = function (e) {
            document.addEventListener("visibilitychange", function () {
              "hidden" === document.visibilityState &&
                (($e[3] = $e[0] - $e[1] - $e[2]),
                $e.reduce(function (e, t) {
                  return e || t;
                }, 0) &&
                  e(
                    {
                      biz_type: "calc",
                      alarm_type: "apiStatistics",
                      client_msg: $e,
                    },
                    0,
                    "statistics"
                  ),
                $e.forEach(function (e, t) {
                  $e[t] = 0;
                }));
            });
          };
        function Ke(e) {
          return (
            (Ke =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Ke(e)
          );
        }
        var Ge = {
            YoukuDesktop: function (e, t) {
              var n = e.match(/CHANNEL\s(\w+);/i);
              return "".concat(t, "&channel_").concat((n && n[1]) || "uk");
            },
          },
          ze = function (e) {
            var t = {
              Wechat: "MicroMessenger|WeChat",
              Alipay: "Alipay",
              Weibo: "WeiBo",
              IKU: "IKU",
              QQ: "M?QQBrowser|QQLiveBrowser|qqbrowserlite",
              TB: "taobao",
              UC: "UC? ?Browser|UCWEB",
              DD: "dingtalk",
              HW: "HuaweiBrowser",
              XM: "MiuiBrowser",
              VV: "Vivo",
              OP: "OPPO",
              360: "\bqihu|qi?ho?o?browser|360browser",
              BD: "Baidu|BIDU",
              YoukuDesktop: "YoukuDesktop\\/([\\d\\.]+)",
              Youku: "Youku",
              SG: "MetaSr",
              "2345E": "2345Explorer",
              Opera: "\bOPR|Opera",
              LB: "LBBROWSER",
              quark: "quark",
              Maxthon: "Maxthon",
              Samsung: "Samsung",
              Tesla: "Tesla",
              Electron: "Electron",
              WV: "[^w]wv[^w]",
            };
            for (var n in t) {
              var o = new RegExp(t[n], "i"),
                r = e.match(o);
              if (r) {
                var i = "".concat(n).concat(r[1] || "");
                return Ge[n] ? Ge[n](e, i) : "".concat(i, "&-");
              }
            }
            return (function (e) {
              var t = e.toLowerCase(),
                n = t.match(/edge|edg/),
                o = function (e) {
                  var o = new RegExp(
                      "".concat(n ? "Edge?" : e, "\\/(\\d+)"),
                      "i"
                    ),
                    r = t.match(o),
                    i = r && r[1];
                  return (
                    (i = i ? "&V".concat(i.replace(/(\.0+)+$/g, "")) : ""),
                    "".concat(e).concat(i)
                  );
                };
              return (
                (!n &&
                  t.match(/chrome/i) &&
                  t.match(/safari/i) &&
                  o("Chrome")) ||
                (t.match(/safari/i) && !t.match(/chrome/) && o("Safari")) ||
                (n && o("Edge")) ||
                (t.match(/trident/i) && t.match(/rv:11.0/i) && "IE&V11") ||
                (t.match(/compatible/i) &&
                  t.match(/msi/i) &&
                  "IE&V".concat(t.match(/msie (\d+)/i)[1])) ||
                (t.match(/firefox/i) && o("Firefox")) ||
                "bs_uk&-"
              );
            })(e);
          },
          Ye = function (e) {
            var t =
                "object" ===
                  ("undefined" == typeof navigator
                    ? "undefined"
                    : Ke(navigator)) && navigator.userAgent,
              n = t
                ? ""
                    .concat(
                      (function (e) {
                        var t = e.match(/Mobile/i) ? "M&" : "";
                        if (e.match(/Linux|Android/i)) {
                          var n = e.match(/android(\s+)?\/?(\d+)?/i),
                            o = e.match(/HarmonyOS/i);
                          t = t || ((n || o) && "M&") || "PC&";
                          var r = n && !o && n[2] ? "&A".concat(n[2]) : "";
                          return (
                            (r = r.replace(/(\.0+)+$/g, "")),
                            o
                              ? "".concat(t, "HarmonyOS&-&-")
                              : n
                              ? "".concat(t, "Android").concat(r)
                              : "".concat(t, "Linux&-&-")
                          );
                        }
                        var i =
                          e.match(/\((\bi[^;]+);( U;)? CPU.+Mac OS X/i) ||
                          e.match(/(\bi[^;\s\d]+)( OS\b|\d+\,)/i);
                        if (i) {
                          t = t || "M&";
                          var a = e.match(/OS[ \/]([0-9_\.]+)/i);
                          return (
                            (a = (a =
                              (a && "&I".concat(a[1].replace(/_/g, "."))) ||
                              "").replace(/(\.0+)+$/g, "")),
                            "".concat(t, "iOS&").concat(i[1]).concat(a)
                          );
                        }
                        if (e.match(/Windows/i)) {
                          t = t || "PC&Win&";
                          var s =
                            (e.match(/windows nt 5.1|Windows XP/i)
                              ? "WindXP"
                              : e.match(/windows nt (6.1|7)/i) && "Win7") ||
                            (e.match(/windows nt (6.2|8)/i) && "Win8") ||
                            (e.match(/windows nt 6.3/i) && "Win81") ||
                            (e.match(/windows( nt)? (6.4|10)/i) && "Win10") ||
                            "win_uk";
                          return "".concat(t).concat(s);
                        }
                        if (e.match(/macintosh|mac_powerpc|Mac OS X/i))
                          return "PC&Mac&-&-";
                        if (e.match(/Unix|bsd|x11/)) return "PC&Unix&-&-";
                        var c = {
                            android: "Android",
                            iphone: "iPhone",
                            ipad: "iPad",
                          },
                          u = navigator.platform;
                        return u && Object.keys(c).indexOf(u.toLowerCase()) > -1
                          ? "M&".concat(c[u], "&-&-")
                          : "-&os_uk&-&-";
                      })(t),
                      "&"
                    )
                    .concat(e || "Web")
                : "os_uk";
            return { os: n, app_version: t ? ze(t) : "bs_uk" };
          };
        function Qe(e) {
          return (
            (Qe =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Qe(e)
          );
        }
        var Ze = "function",
          et = "model",
          tt = "type",
          nt = "vendor",
          ot = "mobile",
          rt = "tablet",
          it = "Apple",
          at = "Google",
          st = "Huawei",
          ct = "Motorola",
          ut = "Samsung",
          pt = "Sony",
          dt = "Xiaomi",
          lt = function (e, t) {
            for (var n, o, r, i, a, s, c = 0; c < t.length && !a; ) {
              var u = t[c],
                p = t[c + 1];
              for (n = o = 0; n < u.length && !a; )
                if ((a = u[n++].exec(e)))
                  for (r = 0; r < p.length; r++)
                    (s = a[++o]),
                      "object" === Qe((i = p[r])) && i.length > 0
                        ? 2 == i.length
                          ? Qe(i[1]) == Ze
                            ? (this[i[0]] = i[1].call(this, s))
                            : (this[i[0]] = i[1])
                          : 3 == i.length
                          ? Qe(i[1]) !== Ze || (i[1].exec && i[1].test)
                            ? (this[i[0]] = s ? s.replace(i[1], i[2]) : void 0)
                            : (this[i[0]] = s
                                ? i[1].call(this, s, i[2])
                                : void 0)
                          : 4 == i.length &&
                            (this[i[0]] = s
                              ? i[3].call(this, s.replace(i[1], i[2]))
                              : void 0)
                        : (this[i] = s || void 0);
              c += 2;
            }
          },
          ft = {
            device: [
              [
                /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
              ],
              [et, [nt, ut], [tt, rt]],
              [
                /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
                /samsung[- ]([-\w]+)/i,
                /sec-(sgh\w+)/i,
              ],
              [et, [nt, ut], [tt, ot]],
              [/\((ip(?:hone|od)[\w ]*);/i],
              [et, [nt, it], [tt, ot]],
              [
                /\((ipad);[-\w\),; ]+apple/i,
                /applecoremedia\/[\w\.]+ \((ipad)/i,
                /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
              ],
              [et, [nt, it], [tt, rt]],
              [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
              [et, [nt, st], [tt, rt]],
              [
                /(?:huawei|honor)([-\w ]+)[;\)]/i,
                /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i,
              ],
              [et, [nt, st], [tt, ot]],
              [
                /\b(poco[\w ]+)(?: bui|\))/i,
                /\b; (\w+) build\/hm\1/i,
                /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
              ],
              [
                [et, /_/g, " "],
                [nt, dt],
                [tt, ot],
              ],
              [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
              [
                [et, /_/g, " "],
                [nt, dt],
                [tt, rt],
              ],
              [
                /; (\w+) bui.+ oppo/i,
                /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i,
              ],
              [et, [nt, "OPPO"], [tt, ot]],
              [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
              [et, [nt, "Vivo"], [tt, ot]],
              [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
              [et, [nt, "Realme"], [tt, ot]],
              [
                /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                /\bmot(?:orola)?[- ](\w*)/i,
                /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
              ],
              [et, [nt, ct], [tt, ot]],
              [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
              [et, [nt, ct], [tt, rt]],
              [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
              [et, [nt, "LG"], [tt, rt]],
              [
                /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                /\blg-?([\d\w]+) bui/i,
              ],
              [et, [nt, "LG"], [tt, ot]],
              [
                /(ideatab[-\w ]+)/i,
                /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
              ],
              [et, [nt, "Lenovo"], [tt, rt]],
              [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
              [
                [et, /_/g, " "],
                [nt, "Nokia"],
                [tt, ot],
              ],
              [/(pixel c)\b/i],
              [et, [nt, at], [tt, rt]],
              [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
              [et, [nt, at], [tt, ot]],
              [
                /droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
              ],
              [et, [nt, pt], [tt, ot]],
              [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
              [
                [et, "Xperia Tablet"],
                [nt, pt],
                [tt, rt],
              ],
              [
                / (kb2005|in20[12]5|be20[12][59])\b/i,
                /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
              ],
              [et, [nt, "OnePlus"], [tt, ot]],
              [/(playbook);[-\w\),; ]+(rim)/i],
              [et, nt, [tt, rt]],
              [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
              [et, [nt, "BlackBerry"], [tt, ot]],
              [/(nexus 9)/i],
              [et, [nt, "HTC"], [tt, rt]],
              [
                /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i,
              ],
              [nt, [et, /_/g, " "], [tt, ot]],
              [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
              [et, [nt, "Meizu"], [tt, ot]],
              [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
              [et, [nt, "Sharp"], [tt, ot]],
              [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
              [nt, [tt, "embedded"]],
            ],
          },
          mt = function e(t, n) {
            if (!(this instanceof e)) return new e(t, n).getDevice();
            var o =
                t ||
                ("undefined" !==
                  ("undefined" == typeof window ? "undefined" : Qe(window)) &&
                window.navigator &&
                window.navigator.userAgent
                  ? window.navigator.userAgent
                  : ""),
              r = ft;
            return (
              (this.getDevice = function () {
                var e = {};
                return (
                  (e.vendor = e.model = e.type = void 0),
                  lt.call(e, o, r.device),
                  e
                );
              }),
              this
            );
          },
          yt = function (e) {
            var t = document.cookie.match(
              new RegExp("(^| )" + e + "=([^;]*)(;|$)")
            );
            return (t && decodeURI(t[2])) || void 0;
          },
          gt = e.store,
          ht = e.ext,
          vt = function (e) {
            var t = Ye(e),
              n = new mt().getDevice();
            Object.assign(gt, t),
              (gt.app_key = ""
                .concat(n.vendor || "v_uk", "&")
                .concat(n.model || "m_uk")
                .replace(/\s/g, ""));
            var o = yt("cna");
            ht.alarm.third_uuid = o ? "cna&".concat(o) : void 0;
          },
          bt = function () {
            "function" != typeof Object.assign &&
              (Object.assign = function (e) {
                if (!e) return {};
                e = Object(e);
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  if (null != n)
                    for (var o in n)
                      Object.prototype.hasOwnProperty.call(n, o) &&
                        (e[o] = n[o]);
                }
                return e;
              }),
              Array.prototype.indexOf ||
                (Array.prototype.indexOf = function (e) {
                  var t = this.length >>> 0,
                    n = Number(arguments[1]) || 0;
                  for (
                    (n = n < 0 ? Math.ceil(n) : Math.floor(n)) < 0 && (n += t);
                    n < t;
                    n++
                  )
                    if (n in this && this[n] === e) return n;
                  return -1;
                });
          },
          wt = function (e, t) {
            var n = e();
            Object.keys(J).map(function (e, o) {
              var r = J[e];
              n[e] = Math.round(t[r[0]] - (t[r[1]] || t[r[0]]));
            });
            var o = I.keys.reduce(function (e, t) {
                return e || !I.regex.test(n[t]);
              }, !1),
              r = n[U] || 0,
              i = n[B] || 0,
              a = parseInt(r / 1e3),
              s = parseInt(i / 1e3);
            return (
              (n[W] =
                "dr&" +
                (V[a] || "dr" + $) +
                (i ? "&fp&" + (F[s] || "fp" + $) : "")),
              (!o && n) || !1
            );
          };
        function _t(e) {
          return (
            (_t =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            _t(e)
          );
        }
        var St = e.base,
          Et = e.set,
          Ot = e.ext,
          xt = e.store,
          Rt = {},
          Tt = {};
        (Rt[C] = []),
          (Rt[N] = []),
          (Rt[q] = []),
          (Rt[P] = []),
          (Tt[C] = []),
          (Tt[N] = []),
          (Tt[q] = []),
          (Tt[P] = []);
        var At = Et.alarmGather,
          kt = !1,
          qt = !1,
          Ct =
            ("object" ===
              ("undefined" == typeof window ? "undefined" : _t(window)) &&
              window.performance) ||
            {},
          jt =
            (Ct.getEntriesByType &&
              Ct.getEntriesByType("navigation") &&
              Ct.getEntriesByType("navigation")[0]) ||
            Ct.timing,
          Pt = function (e, t, n) {
            var o = ""
                .concat(e.api || "")
                .concat(e.message || "")
                .concat((e.filename || "").replace(/(#|\?).*/, "")),
              r = o && A.isString(o);
            if (!(r && Tt[t].indexOf(o) > -1))
              return r && Tt[t].push(o), !n && Rt[t].push(e), !0;
          },
          Nt = function (e, t, n) {
            Pt(e, t) &&
              (Tt["".concat(t, "_set")] ||
                ((Tt["".concat(t, "_set")] = !0),
                setTimeout(function () {
                  var e = Rt[t],
                    o = e.length;
                  o && n(1 === o ? e[0] : e, t),
                    (Rt[t] = []),
                    (Tt["".concat(t, "_set")] = !1);
                }, +At || St.alarmGather)));
          },
          Lt = function (e) {
            window.addEventListener(
              "error",
              function (t) {
                try {
                  !(function (t) {
                    var n,
                      o = {},
                      r = t.target && t.target.localName;
                    if (!r || ("link" !== r && "script" !== r && "img" !== r)) {
                      if (r) return;
                      if (kt && b(St.ignoreMsg, t.message || "")) return;
                      (n = q),
                        (o = {
                          filename: t.filename || "",
                          colno: t.colno,
                          lineno: t.lineno,
                          message: t.message,
                          stack: (t.error && t.error.stack) || "",
                        });
                    } else {
                      var i = t.target.href || t.target.src;
                      if (!i || i === xt.page_url) return;
                      if (((n = C), _(i, "ignorePath") || _(i, "ignoreHost")))
                        return;
                      _(i, "jsonpHost")
                        ? ((n = N),
                          (o = {
                            api: i.replace(/(#|\?).*/, ""),
                            url: i,
                            type: "jsonp",
                            method: "GET",
                            message: "listen load error",
                          }))
                        : "video" === r
                        ? ((n = q),
                          (o = {
                            filename: i,
                            tag: r,
                            message: t.target.error,
                          }))
                        : (o = {
                            filename: i,
                            tag: r,
                            message: "listen load error",
                          });
                    }
                    At && !qt && Pt(o, n),
                      At && qt && Nt(o, n, e),
                      !At && Pt(o, n, !0) && e(o, n),
                      (kt = !0);
                  })(t);
                } catch (t) {}
              },
              !0
            );
          },
          Ht = function (e) {
            window.addEventListener(
              "unhandledrejection",
              function (t) {
                try {
                  !(function (t) {
                    var n,
                      o,
                      r,
                      i = P,
                      a =
                        t.reason instanceof Error
                          ? t.reason.toString()
                          : t.reason;
                    try {
                      var s = !A.isString(a);
                      (o = (s && (a.api || a.ret)) || o),
                        (o = A.isArray(o) ? o.join("&") : o),
                        (r = (s && (a.message || a.msg || a.ret)) || a),
                        (r = A.isArray(r) ? r.join("&") : r),
                        (n = (s && a.stack) || n);
                    } catch (t) {}
                    if (!o || o !== St.mtop) {
                      var c = { api: o, message: r, reason: a, stack: n };
                      At && !qt && Pt(c, i),
                        At && qt && Nt(c, i, e),
                        !At && Pt(c, i, !0) && e(c, i);
                    }
                  })(t);
                } catch (t) {}
              },
              !0
            );
          },
          Mt = function (e, t, n) {
            jt &&
              !jt.loadEventEnd &&
              window.addEventListener(
                "load",
                function () {
                  try {
                    !(function () {
                      qt = !0;
                      var o = k,
                        r = wt(n, jt);
                      r && e(r, o, "basic"),
                        (Ot.performance.over = !0),
                        t && t(e);
                    })();
                  } catch (e) {
                    qt = !0;
                  }
                },
                !0
              );
          };
        function Dt(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        var Jt,
          It,
          Wt = e.base,
          Ut = e.set,
          Vt = e.ext,
          Bt = { support: s },
          Ft = (function () {
            function e(t) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e);
              try {
                Bt.support && !Jt && this.init((A.isPlainObject(t) && t) || {});
              } catch (e) {}
            }
            var t, n, o;
            return (
              (t = e),
              (n = [
                {
                  key: "init",
                  value: function (e) {
                    if (Bt.support && !Jt) {
                      (Jt = 1),
                        bt(),
                        Object.assign(Ut, e),
                        (Ut.alarmEnable = A.isFunction(Ut.alarmEnable)
                          ? Ut.alarmEnable()
                          : !!Ut.alarmEnable),
                        (Ut.alarmHost = (e.alarmHost || []).concat(
                          Wt.alarmHost
                        ));
                      var t = Z(),
                        n = _(t.page_url, "ownHost", !0);
                      if (
                        ((Ut.sampleRate = t.sample ? 1 : Ut.sampleRate),
                        !(
                          A.isRobot() ||
                          !ge ||
                          !Ut.alarmEnable ||
                          (!n && !Ut.outEnable) ||
                          t.scout_disable ||
                          t.dev ||
                          t.port ||
                          Ut.sampleRate < Math.random() ||
                          (Bt.getSendType &&
                            !(function (e) {
                              var t = e() || {};
                              return (fe = t.send);
                            })(Bt.getSendType))
                        ))
                      ) {
                        (Ut.ignoreHost = (e.ignoreHost || []).concat(
                          Wt.ignoreHost
                        )),
                          (Ut.ignorePath = (e.ignorePath || []).concat(
                            Wt.ignorePath
                          )),
                          (Ut.jsonpHost = (e.jsonpHost || []).concat(
                            Wt.jsonpHost
                          )),
                          Ut.console.forEach(function (e) {
                            T.console(ge, e);
                          }),
                          Jt++,
                          (window.__scout_probe_ready__ = !0),
                          vt(Bt.scene);
                        var o = A.isPlainObject(Ut.alarmExt) ? Ut.alarmExt : {};
                        Wt.alarmExt.forEach(function (e) {
                          var n = "page_type" === e;
                          n && t.page_type && Vt.pageTypes.push(t.page_type),
                            n && o[e] && Vt.pageTypes.push(o[e]),
                            n && Vt.alarm[e] && Vt.pageTypes.push(Vt.alarm[e]),
                            (Vt.alarm[e] = n
                              ? Vt.pageTypes.join("&")
                              : o[e] || Vt.alarm[e]);
                        }),
                          (Vt.msg = A.isPlainObject(Ut.msgExt)
                            ? Ut.msgExt
                            : Ut.msgExt
                            ? { msgExt: Ut.msgExt }
                            : {}),
                          (Ut.autoEnable = A.isFunction(Ut.autoEnable)
                            ? Ut.autoEnable()
                            : !!Ut.autoEnable),
                          Ut.autoEnable &&
                            !t.scout_auto_disable &&
                            (s &&
                              window.addEventListener &&
                              !Lt(ge) &&
                              !Ht(ge) &&
                              !(function (e, t) {
                                var n = function () {
                                  (qt = !0),
                                    Object.keys(Rt).map(function (t) {
                                      var n = Rt[t],
                                        o = n.length;
                                      o && e(1 === o ? n[0] : n, t),
                                        (Rt[t] = []);
                                    }),
                                    t(e);
                                };
                                At && jt && !jt.domContentLoadedEventEnd
                                  ? window.addEventListener(
                                      "DOMContentLoaded",
                                      function () {
                                        try {
                                          n();
                                        } catch (e) {
                                          qt = !0;
                                        }
                                      },
                                      !0
                                    )
                                  : n();
                              })(ge, Fe) &&
                              !Mt(ge, Me, De()) &&
                              document.addEventListener &&
                              Xe(ge),
                            Re(ge),
                            Pe(ge),
                            Fe(ge),
                            (window.__scout_probe_listen__ = !0));
                      }
                    }
                  },
                },
                {
                  key: "alarm",
                  value: function (e) {
                    2 === Jt && ge(e);
                  },
                },
              ]),
              n && Dt(t.prototype, n),
              o && Dt(t, o),
              e
            );
          })(),
          $t = Ft,
          Xt = function () {
            if (document.currentScript) return document.currentScript;
            for (
              var e, t = document.getElementsByTagName("script"), n = 0;
              (e = t[n++]);

            )
              if ("interactive" === e.readyState || "probe_current" === e.id)
                return e;
          },
          Kt = e.base,
          Gt = function (e) {
            var t = Xt();
            if (t && "probe_current" === t.id) {
              var n = { alarmExt: {} },
                o = t.getAttribute("exparams"),
                r = o ? X(o) : {},
                i = Kt.currentInitKeys.length;
              Kt.currentInitKeys
                .concat(Kt.currentInitExtKeys)
                .map(function (e, a) {
                  var s = t.getAttribute(e),
                    c = o && r[e];
                  (s || c) && ((a < i ? n : n.alarmExt)[e] = s || c);
                }),
                n.bu && n.code && new e(n);
            }
          };
        try {
          (It = { getSendType: O }), Object.assign(Bt, It), Gt($t);
        } catch (e) {}
        var zt = $t;
      })(),
      (o = o.default)
    );
  })();
});
