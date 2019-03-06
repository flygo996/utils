function Vue(options) {
    if (!(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
}

Vue.prototype._init = function (options) {
    initLifecycle(vm); // 把一些全局的实例绑定到vm里面
    initEvents(vm); // 把一些全局的事件绑定到vm里面
    initRender(vm); // 渲染初始化，createElement()绑定等
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm); // 把vm的属性和方法初始化，包括props、data、methods、钩子函数等所有属性，并完成对data的数据劫持（Object.defineProperty）
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    if (vm.$options.el) {
        vm.$mount(vm.$options.el);
    }
}
Vue.prototype.$mount = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
};

/*
model() -->
genCheckboxModel() + genRadioModel + genSelect()+ genDefaultModel()
genAssignmentCode() -->
parseModel() --> parseString()+parseBracket()-> parseString()

 */