const burger = (triggerSelector, menuSelector) => {
  const trigger = document.querySelector(triggerSelector),
    menu = document.querySelector(menuSelector);

  menu.style.display = 'none';

  trigger.addEventListener('click', () => {
    if (menu.style.display == 'none' && window.screen.availWidth < 993) {
      menu.style.display = 'block';
      menu.classList.add('animated', 'fadeInDown');
    } else {
      menu.style.display = 'none';
      menu.classList.remove('animated', 'fadeInDown');
    }
  });

  window.addEventListener('resize', () => {
    if (window.screen.availWidth > 992) {
      menu.style.display = 'none';
      menu.classList.remove('animated', 'fadeInDown');
    }
  });
};

export default burger;
