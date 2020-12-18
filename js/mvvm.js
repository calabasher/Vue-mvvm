function Vue(options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });

    observe(this.data); // 调用监听器，劫持监听所有属性，如果有变动，则通知订阅者
    // Compile 扫描和解析每个节点的相关指令（v-model，v-on等指令），如果节点存在v-model，v-on等指令，则解析器Compile初始化这类节点的模板数据，使之可以显示在视图上，然后初始化相应的订阅者（Watcher）
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
    console.log(this.__proto__)
}

Vue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function getter() {
                return self.data[key];
            },
            set: function setter(newVal) {
                self.data[key] = newVal;
            }
        });
    }
}