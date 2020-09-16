(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require("$"));
    else if(typeof define === 'function' && define.amd)
        define("vip_share", ["$"], factory);
    else if(typeof exports === 'object')
        exports["vip_share"] = factory(require("$"));
    else
        root["vip_share"] = factory(root["$"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.loaded = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    var _constant = __webpack_require__(1);

    var _constant2 = _interopRequireDefault(_constant);

    var _jquery = __webpack_require__(2);

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Share = function () {
        function Share() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _classCallCheck(this, Share);

            var ua = navigator.userAgent.toLowerCase();
            options.title = options.title || document.title;
            options.img_url = options.img_url || 'http://act.vip.xunlei.com/favicon.ico';
            options.link = options.link || location.href.split('#')[0];
            options.desc = options.desc || '';
            options.success = options.success || function () {};
            options.cancel = options.cancel || function () {};

            this.options = options;

            this._cache_wechat_url_data = null;
            this.wechat();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {//微信

            }
        }

        Share.prototype.share = function share() {
            var ua = navigator.userAgent.toLowerCase();
            if (window.XLJSWebViewBridge || ua.match(/Thunder/i) == 'thunder') {
                //新版手雷
                this.shoulei();
            } else if (window.share && window.share.displayUmengShareBtn) {
                //旧版手雷
                this.old_shoulei();
            } else {
                this.sina();
            }
        };

        Share.prototype.wechat = function wechat() {
            var _this = this;

            _jquery2['default'].when(_jquery2['default'].Deferred(function (promise) {
                //加载微信插件包
                if (window.wx && wx.onMenuShareTimeline && wx.onMenuShareAppMessage) {
                    promise.resolve();
                } else {
                    _jquery2['default'].ajax({
                        url: '//res.wx.qq.com/open/js/jweixin-1.0.0.js',
                        dataType: 'script',
                        cache: true,
                        success: promise.resolve,
                        error: promise.reject
                    });
                }
            }), _jquery2['default'].Deferred(function (promise) {
                // 读取后台key
                if (_this._cache_wechat_url_data) promise.resolve(_this._cache_wechat_url_data);
                _jquery2['default'].ajax({
                    url: _constant2['default'].WECHAT_URL + '&url=' + encodeURIComponent(location.href.split('#')[0]) + '&time=' + new Date().getTime(),
                    type: 'GET',
                    dataType: 'jsonp',
                    timeout: 10 * 1000,
                    success: function success(rs) {
                        if (rs.result == 0) {
                            _this._cache_wechat_url_data = rs;
                            promise.resolve(rs);
                        } else {
                            promise.reject();
                        }
                    },
                    error: promise.reject
                });
            })).then(function (_, rs) {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: _constant2['default'].WECHAT_APP_ID, // 必填，公众号的唯一标识
                    timestamp: rs.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: rs.data.nonceStr, // 必填，生成签名的随机串
                    signature: rs.data.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: _this.options.title, // 分享标题
                        link: _this.options.link, // 分享链接
                        imgUrl: _this.options.img_url, // 分享图标
                        success: _this.options.success,
                        cancel: _this.options.cancel
                    });

                    wx.onMenuShareAppMessage({
                        title: _this.options.title, // 分享标题
                        desc: _this.options.desc, // 分享描述
                        link: _this.options.link, // 分享链接
                        imgUrl: _this.options.img_url, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: _this.options.success,
                        cancel: _this.options.cancel
                    });
                });
            });
        };

        Share.prototype.old_shoulei = function old_shoulei() {
            window.share.displayUmengShareBtn(JSON.stringify({
                url: this.options.link,
                wxUrl: this.options.link,
                imgUrl: this.options.img_url,
                title: this.options.title,
                type: 'activity',
                content: this.options.desc
            }));
        };

        Share.prototype.shoulei = function shoulei() {
            var _this2 = this;

            _jquery2['default'].Deferred().resolve().then(function () {
                return _jquery2['default'].Deferred(function (promise) {
                    if (client.data && client.data.shareTo) {
                        promise.resolve();
                    } else {
                        _jquery2['default'].getScript('//m.sjzhushou.com/h5/lib/dist/client.min.js', function () {
                            promise.resolve();
                        }, promise.reject);
                    }
                });
            }).then(function () {
                client.data.shareTo({
                    'sharePlatform': 1,
                    'shareHeadline': _this2.options.title,
                    'shareImageUrl': _this2.options.img_url,
                    'shareUrl': _this2.options.link
                }, function (response) {
                    var result = response.result;
                    if (result == 0) {
                        //分享成功
                        /*if (typeof window.ACTCONFIG.successCallback == 'function') {
                            window.ACTCONFIG.successCallback();
                        }*/
                        _this2.options.success();
                    } else if (result == 2) {
                        //分享取消
                        /*if (typeof window.ACTCONFIG.cancleCallback == 'function') {
                            window.ACTCONFIGcancleCallback.();
                        }*/
                        _this2.options.cancel();
                    }
                });
            });
        };

        Share.prototype.sina = function sina() {
            var openUrl = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(this.options.link) + '&title=' + encodeURIComponent(this.options.title) + '&pic=' + encodeURIComponent(this.options.img_url);
            window.open(openUrl);
        };

        return Share;
    }();

    module.exports = Share;

/***/ },
/* 1 */
/***/ function(module, exports) {

    'use strict';

    exports.__esModule = true;
    exports['default'] = {
        WECHAT_APP_ID: 'wxffca8b088e4134ac',
        WECHAT_URL: 'http://dyactive.vip.xunlei.com/weixin_huiyuan/server.php?type=jweixinSign'
    };

/***/ },
/* 2 */
/***/ function(module, exports) {

    module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;