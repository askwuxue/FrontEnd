export default function createElement(type, props, ...children) {
    // console.log('createElement');
    const childElement = [...children].reduce((result, child) => {
        if (child !== true && child !== false && child !== undefined && child !== null) {
            if (child instanceof Object) {
                result.push(child)
            } else {
                result.push(createElement('text', { textContent: child }));
            }
        }
        return result;
    }, [])
    return {
        type,
        props: Object.assign({ children: childElement }, props),
        children: childElement
    }
}