import { Component } from './framework'

// 自定义轮播组件
export class Carousel extends Component {
    constructor() {
        super();
        // this.root = document.createElement("div");
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        // console.log(this.attributes.src);
        this.root = document.createElement("div");
        this.root.classList.add("carousel")
        for(let record of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url(${record})`;
            this.root.appendChild(child);
        }


        let position = 0;
        this.root.addEventListener("mousedown", event => {
            // console.log("mousedown");
            let children = this.root.children;
            let startX = event.clientX;

            let move = event => {
                // console.log("mousemove");
                let x = event.clientX - startX;

                let current = position - ((x - x % 500) / 500);

                // 遍历前中后三张，保证move时能正常见到
                for(let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
                }
            }

            let up = event => {
                // console.log("mouseup");
                let x = event.clientX - startX;

                // 大于轮播的一半就挪到下一张图片
                position = position - Math.round(x / 500);

                let nextIndex = - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x));

                for(let offset of [0, nextIndex]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`;
                }

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }

            document.addEventListener("mousemove", move);
    
            document.addEventListener("mouseup", up);
        })



        // let currentIndex = 0;
        // setInterval(() => {
        //     let children = this.root.children;

        //     // 在1~n循环，只要对n取余就可以
        //     let nextIndex = (currentIndex + 1) % children.length;

        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     next.style.transition = "none";
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

        //     setTimeout(() => {
        //         next.style.transition = "";
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        //         next.style.transform = `translateX(${- nextIndex * 100}%)`;

        //         currentIndex = nextIndex;
        //     }, 16)
        // }, 3000)


        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}