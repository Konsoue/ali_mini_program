import 'animate.css';

const animateCSS = (element, animation, speed, prefix = 'animate__',) => new Promise((resolve, reject) => {
  const animationName = `${prefix}${animation}`;

  const node = document.querySelector(element);

  node.classList.add(`${prefix}animated`, animationName,speed);
  // speed && node.classList.add(`${prefix}animated`, speed);
  // When the animation ends, we clean the classes and resolve the Promise
  function handleAnimationEnd(event) {
    event.stopPropagation();
    node.classList.remove(`${prefix}animated`, animationName,speed);
    // speed && node.classList.add(`${prefix}animated`, speed);
    resolve('Animation ended');
  }

  node.addEventListener('animationend', handleAnimationEnd, { once: true });
});

export default animateCSS;

// ? 使用案例
// animateCSS(`#${dom.id}`, 'headShake', 'animate__faster')
