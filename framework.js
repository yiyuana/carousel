// 自定义createElement对应config.js文件的自定义名称
export function createElement(type, attributes, ...children) {
    let element
    if(typeof type === "string") 
        element = new ElementWrapper(type);
    else
        element = new type;

    for(let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }

    for(let child of children) {
        // 文本字符串要先创建文本对象，再加入到child
        if(typeof child === "string") {
            child = new TextWrapper(child);
        }
        element.appendChild(child);
    }

    return element;
}

export const STATE = Symbol("state");
export const ATTRIBUTE = Symbol("attribute");

export class Component {
    constructor() {
        this[ATTRIBUTE] = Object.create(null);
        this[STATE] = Object.create(null);
    }
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value;
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        if (!this.root)
            this.render();
        
        parent.appendChild(this.root);
    }
    // 触发事件
    triggerEvent(type, args) {
        // console.log(this[ATTRIBUTE])
        this[ATTRIBUTE]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, {
            detail: args
        }));
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(type);
    }
}

class TextWrapper extends Component {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}
