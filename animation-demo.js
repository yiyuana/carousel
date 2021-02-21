import { TimeLine, Animation } from './animation.js'
import { easeInOut } from './ease.js'

let tl = new TimeLine();
tl.start();

let animation = new Animation(document.querySelector("#el").style, 'transform', 0, 500, 2000, 0, easeInOut, v => `translateX(${v}px)`);
tl.add(animation);

document.querySelector("#pause-btn").addEventListener("click",() => tl.pause());
document.querySelector("#resume-btn").addEventListener("click",() => tl.resume());