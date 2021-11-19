import 'animate.css';
// https://animate.style/
// css动画库
const animateCSS = (element, animation, speed, backgroundcolor, dom, prefix = 'animate__',) => new Promise((resolve, reject) => {
  const animationName = `${prefix}${animation}`;

  const node = element ? document.querySelector(element) : dom;
  const color = node.style.backgroundColor
  node.style.background = backgroundcolor
  node.classList.add(`${prefix}animated`, animationName, speed);
  // speed && node.classList.add(`${prefix}animated`, speed);
  // When the animation ends, we clean the classes and resolve the Promise
  function handleAnimationEnd(event) {
    event.stopPropagation();
    node.classList.remove(`${prefix}animated`, animationName, speed);
    node.style.background = color
    // speed && node.classList.add(`${prefix}animated`, speed);
    resolve('Animation ended');
  }

  node.addEventListener('animationend', handleAnimationEnd, { once: true });
});

export default animateCSS;

// ? 使用案例
// animateCSS(`#${dom.id}`, 'headShake', 'animate__faster')
