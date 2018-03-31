NEJ.define([
    'base/klass',
    './widget/module.js',
    './page/todo.js'
], function(k, m, Page, p, pro) {

    p._$$Module = k._$klass();
    pro = p._$$Module._$extend(m._$$Module);

    pro.__init = function(options) {
        this.__super(options);

        new Page().$inject('#app');
    };

    return p;
});