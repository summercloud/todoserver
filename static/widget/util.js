define([
    'base/util'
], function(_ut) {
    var _ = {};

    _.extend = function(o1, o2, override) {
        for (var i in o2) {
            if (o1[i] == undefined || override) {
                o1[i] = o2[i];
            }
        }
        return o1;
    };
    
    return _;
});