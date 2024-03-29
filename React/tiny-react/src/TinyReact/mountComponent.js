import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from './mountNativeElement';

export default function mountComponent(virtualDOM, container, oldDOM) {
    let nextVirtualDOM = null;
    let component = null;

    // 1. 函数组件
    if (isFunctionComponent(virtualDOM)) {
        nextVirtualDOM = buildFunctionComponent(virtualDOM);
        // 2. 类组件
    } else {
        nextVirtualDOM = buildClassComponent(virtualDOM);
        // 组件实例
        component = nextVirtualDOM && nextVirtualDOM.component;
    }

    // 组件中返回了另一个组件
    if (isFunction(nextVirtualDOM)) {
        mountComponent(nextVirtualDOM, container, oldDOM);
    } else {
        mountNativeElement(nextVirtualDOM, container, oldDOM);
    }

    // 处理组件的ref属性 
    if (component.props && component.props.ref) {
        // component.
        // 调用组件实例上的props上的ref()
        component.props.ref(nextVirtualDOM);
    }
}

// 编译函数组件
function buildFunctionComponent(virtualDOM) {
    // 为组件添加props
    return virtualDOM.type(virtualDOM.props || {});
}

// 编译类组件
function buildClassComponent(virtualDOM) {
    // 创建实例 将props传递给类组件
    const component = new virtualDOM.type(virtualDOM.props);
    // 渲染DOM
    const nextVirtualDOM = component.render();
    // 添加组件实例到virtualDOM
    nextVirtualDOM.component = component;
    return nextVirtualDOM;
}