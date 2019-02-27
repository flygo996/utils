/*
 * @Author: laifeipeng 
 * @Date: 2019-02-27 18:00:45 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-27 18:51:04
 */

class Compile {
  constructor(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
  }

  init() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('Dom元素不存在');
    }
  }
  nodeToFragment(el) {
    const fragment = document.createDocumentFragment();
    let child = el.firstChild;
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child);
      child = el.firstChild
    }
    return fragment;
  }
  compileElement(el) {
    const childNodes = el.childNodes;
    const self = this;
    [...childNodes].forEach(function (node) {
      const reg = /\{\{(.*)\}\}/;
      const text = node.textContent;

      if (self.isElementNode(node)) {
        self.compile(node);
      } else if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    });
  }
  compile(node) {
    const nodeAttrs = node.attributes;
    const self = this;
    Array.prototype.forEach.call(nodeAttrs, function (attr) {
      const attrName = attr.name;
      if (self.isDirective(attrName)) {
        const exp = attr.value;
        const dir = attrName.substring(2);
        if (self.isEventDirective(dir)) {  // 事件指令
          self.compileEvent(node, self.vm, exp, dir);
        } else {  // v-model 指令
          self.compileModel(node, self.vm, exp, dir);
        }
        node.removeAttribute(attrName);
      }
    });
  }
  compileText(node, exp) {
    const self = this;
    const initText = this.vm[exp];
    this.updateText(node, initText);
    new Watcher(this.vm, exp, function (value) {
      self.updateText(node, value);
    });
  }
  compileEvent(node, vm, exp, dir) {
    const eventType = dir.split(':')[1];
    const cb = vm.methods && vm.methods[exp];

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  }
  compileModel(node, vm, exp, dir) {
    const self = this;
    const val = this.vm[exp];
    this.modelUpdater(node, val);
    new Watcher(this.vm, exp, function (value) {
      self.modelUpdater(node, value);
    });

    node.addEventListener('input', function (e) {
      const newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      self.vm[exp] = newValue;
      val = newValue;
    });
  }
  updateText(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  }
  modelUpdater(node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
  isDirective(attr) {
    return attr.indexOf('v-') == 0;
  }
  isEventDirective(dir) {
    return dir.indexOf('on:') === 0;
  }
  isElementNode(node) {
    return node.nodeType == 1;
  }
  isTextNode(node) {
    return node.nodeType == 3;
  }
}
