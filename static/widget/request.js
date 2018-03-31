define([
    'util/ajax/xdr',
], function(xdr) {

    var noop = function() {/**/};
    // 如果请求不写错误方法则默认用这个 Added by Cody
    var _onerror = function(json) {
        var msg = json.message || json.msg || 'UNKOWN ERROR';
        alert(msg);
    };

    /**
     * 平台request, 避免后续需要统一处理
     * opt:  其他参数如 $request
     */
    var request = function(url, opt) {
        opt = opt || {};
        var olderror = typeof opt.onerror === 'function' ? opt.onerror : _onerror,
            oldload = typeof opt.onload === 'function' ? opt.onload : noop;

        opt.onload = function(json) {
            if (json && json.code < 400 && json.code >= 200) {
                oldload.apply(this, arguments);
            } else {
                olderror.apply(this, arguments);
            }
        };
        opt.onerror = function(json) {
            olderror.apply(this, arguments);
        };
        if ((opt.method && opt.method.toLowerCase() == 'get') || !opt.method) {
            if (!opt.data) {
                opt.data = {};
            }
            opt.data.t = +new Date();
        }
        if (!opt.data) {
            opt.data = {};
        }

        opt.headers = opt.headers || {};
        opt.headers['X-Requested-With'] = 'XMLHttpRequest';
        opt.hasTimeoutFlag && setTimeout(function() {}, opt.timeoutTime || 10000);

        opt.type = 'json';
        xdr._$request(url, opt);
    };
    return request;
});