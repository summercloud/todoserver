define([
    '../widget/util.js',
    '../widget/request.js',
    'text!./todo.html'
], function(_, $request,template) {
    var Component = Regular.extend({
        template: template,
        config: function(data) {
            _.extend(data, {
                current : '',
                todoList : [],
                count: 0,
                test : true,
                visible : 'all'
            });
            this.supr(data);
        },
        init: function(){
            this._getList();
            this.supr();
        },
        _getList: function(){
            var self = this;
            $request('/todo/list',{
                method: 'GET',
                onload: function(json){
                    self.$update('todoList', json.data.list);
                    self.$update('count', json.data.count);
                }
            });
        },
        onKeyup: function(e){
            var self = this;
            if(e.event.keyCode === 13 && this.data.current){
                var temp = {
                    completed: false,
                    value: this.data.current
                }
                $request('/todo/add',{
                    method: 'POST',
                    data: temp,
                    onload: function(json){
                        self._getList();
                        self.data.current = '';
                    }
                });
            }
        },
        check: function(index){
            var self = this;
            this.data.todoList[index].completed = !this.data.todoList[index].completed;
            $request('/todo/update',{
                method: 'POST',
                data: self.data.todoList[index],
                onload: function(json){
                    self._getList();
                }
            });
        },
        remove: function(index){
            var self = this;
            $request('/todo/delete',{
                method: 'DELETE',
                data: self.data.todoList[index],
                onload: function(json){
                    self._getList();
                }
            });
        },
        change: function(type){
            this.data.visible = type;
        }
    })
    
    return Component;
});