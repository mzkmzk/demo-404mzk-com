(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define("vip_kn_speed", [], factory);
    else if(typeof exports === 'object')
        exports["vip_kn_speed"] = factory();
    else
        root["vip_kn_speed"] = factory();
})(this, function() {
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

    var _utils = __webpack_require__(2);

    var _utils2 = _interopRequireDefault(_utils);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    //let $ = require('jquery')


    var Speed = function () {
        function Speed() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _classCallCheck(this, Speed);

            this.client_type = options.client_type || 'kn-speed';
            this.timeout = options.timeout || 10000;
            this.get_user_id = options.get_user_id || function () {
                return 0;
            };
            this.get_session_id = options.get_session_id || function () {
                return 0;
            };

            this.interface_url = null;
        }

        Speed.prototype.can_speed = function can_speed(callback) {
            var _this = this;

            var result = {
                errno: 1,
                message: '查询宽带失败，请稍后重试',
                pre_downstream: 0,
                after_downstream: 0,
                data: {
                    ajax_query_portal: {},
                    ajax_bandwidth: {}
                }
            },
                dfd = $.Deferred();

            dfd.then(function () {
                _this._get_interface_url(function (result) {
                    if (result.errno === 0) {
                        dfd.resolve(result);
                    }
                });
            }).then(function (interface_result) {
                _this._ajax(interface_result.url + _constant2['default'].BANDWIDTH_SUFFIX_URL, function (bandwidth_result) {
                    if (bandwidth_result.errno == 0 && bandwidth_result.number_of_try > 0) {
                        result.errno = 0;
                        result.message = '';
                        result.pre_downstream = bandwidth_result.bandwidth.downstream;
                        result.after_downstream = bandwidth_result.max_bandwidth.downstream;
                        result.data.ajax_query_portal = interface_result;
                        result.data.ajax_bandwidth = bandwidth_result;
                        callback && callback(result);
                    } else {
                        callback && callback(false, bandwidth_result);
                    }
                });
            }

            /*this._get_interface_url( interface_url => {
                this._ajax( this.interface_url + CONSTANT.BANDWIDTH_SUFFIX_URL, (bandwidth_result) => {
                    
                    if ( bandwidth_result.errno == 0 && parseInt(bandwidth_result.can_upgrade) === 1 ) {
                        this._bandwidth_result = bandwidth_result
                        callback && callback(true, bandwidth_result)
                    }else {
                        callback && callback(false, bandwidth_result)
                    }
                }, () => {
                    callback && callback(false, { richmessage: '提速失败，请稍后重试'})
                })
            })*/
            );
        };

        Speed.prototype.try_speed = function try_speed(callback) {
            var _this2 = this;

            var user_type = user_type || 2,
                userid = parseInt(getCookie('userid'));
            if (isNaN(userid)) {
                userid = 0;
            }

            this._get_interface_url(function (interface_url) {
                jsonp_ajax(_this2.interface_url + _constant2['default'].QUERY_TRY_INFO_SUFFICE_URL, function (try_info_result) {

                    if (parseInt(try_info_result.errno) === 0 && parseInt(try_info_result.number_of_try) > 0) {
                        jsonp_ajax(_this2.interface_url + _constant2['default'].UPGRADE_SUFFICE_URL + '?=dial_account=', function (upgrade_result) {

                            callback && callback(true, try_info_result, upgrade_result);
                        }, 'get', {
                            sequence: getSequence(),
                            peerid: new Date().getTime(),
                            sessionid: getCookie('sessionid'),
                            userid: userid,
                            client_type: 'speedh5',
                            client_version: '2.0.0'
                        }, null, null, 'jsonp');
                    } else {
                        callback(false, try_info_result);
                    }
                }, 'get');
            });
        };

        Speed.prototype._get_interface_url = function _get_interface_url(callback) {

            var result = {
                errno: 1,
                message: '获取运营商信息失败',
                url: '',
                data: {
                    ajax_query_portal: {}
                }
            };

            if (this.interface_url !== null) {
                callback(this.interface_url);
                return;
            }
            this._ajax(_constant2['default'].QUERY_PORTAL_URL, function (ajax_query_portal) {

                if (ajax_query_portal.errno == 0) {
                    result.errno = 0;
                    result.message = '';
                    result.url = 'http://' + ajax_query_portal.interface_ip + ':' + ajax_query_portal.interface_port + '/';
                }
                result.data.ajax_query_portal = ajax_query_portal;

                callback(result);
            }, function () {
                callback(result);
            });
        };

        Speed.prototype._get_sequence = function _get_sequence() {
            var str = '' + new Date().getTime();
            return parseInt(Math.random() * 1000) + '' + parseInt(str.substr(5, 7));
        };

        Speed.prototype._get_peer_id = function _get_peer_id() {
            var peer_id = void 0;
            try {
                peer_id = localStorage.getItem('kn-speed-peer-id');
                if (peer_id) {
                    peer_id = _utils2['default'].get_guid();
                    localStorage.setItem('kn-speed-peer-id', peer_id);
                }
            } catch (e) {
                peer_id = _utils2['default'].get_guid();
            }
            return peer_id;
        };

        Speed.prototype._get_data = function _get_data() {
            return {
                sequence: this._get_sequence(),
                peerid: this._get_peer_id(),
                sessionid: this.get_session_id(),
                userid: this.get_user_id(),
                client_type: this.client_type,
                client_version: '2.0.0'
            };
        };

        Speed.prototype._ajax = function _ajax(url, success, error) {
            $.ajax({
                type: 'get',
                url: url,
                data: this._get_data(),
                jsonp: 'callback',
                jsonpCallback: 'callback_name',
                dataType: "jsonp", //_k_mock && _k_mock.mock_status ? "json" :
                timeout: this.timeout,
                success: success,
                error: error
            });
        };

        return Speed;
    }();

    module.exports = Speed;
    //export default Speed

/***/ },
/* 1 */
/***/ function(module, exports) {

    'use strict';

    exports.__esModule = true;
    exports['default'] = {
        QUERY_PORTAL_URL: 'http://api.portal.swjsq.vip.xunlei.com:81/v2/queryportal', //查看接口服务器信息
        BANDWIDTH_SUFFIX_URL: '/v2/bandwidth', //宽带信息查询后缀url
        UPGRADE_SUFFICE_URL: '/v2/upgrade', //提速URL
        QUERY_TRY_INFO_SUFFICE_URL: '/v2/query_try_info', //试用信息查询后缀url
        KEEPLIVE_SUFFICE_URL: '/v2/keepalive' //心跳查询后缀url
    };

/***/ },
/* 2 */
/***/ function(module, exports) {

    'use strict';

    exports.__esModule = true;
    exports['default'] = {
        get_guid: function get_guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        }
    };

/***/ }
/******/ ])
});
;