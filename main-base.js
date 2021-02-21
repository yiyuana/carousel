// 自定义createElement对应config.js文件的自定义名称
function createElement(type, attributes, ...children) {
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

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

// 自定义实体对象
class Div {
    constructor() {
        this.root = document.createElement("div");
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

let a = <Div>
    <span>a</span>
    <span>b</span>
    <span>c</span>
</Div>

a.mountTo(document.body);