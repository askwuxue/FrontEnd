// 导出项目中使用的常量
import { INCREASE, DECREASE } from '../constant';

// 设置初始的preState值，初始化时Store调用reducer, preState === undefined
const initState = 0;
// reducer处理函数 接受处理前的state和action参数 action = {type, data}
export default function countReducer(preState = initState, action) {

    let { type, data } = action;

    switch (type) {
        // +
        case INCREASE:
            return preState + data;
        // -
        case DECREASE:
            return preState - data;
        // default
        default:
            return preState;
    }
}