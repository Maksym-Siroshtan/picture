const modals = () => {
  //Кнопка btnPressed нужна для проверки, было открыто модальное окно или нет
  let btnPressed = false;

  /* Функция bindModals привязывает к триггеру открытие-закрытие модального окна, параметр destroy по умолчанию false, если поставить в значение true, то при клике на триггер он(триггер) удалиться. */
  function bindModals(
    triggerSelector,
    modalSelector,
    closeSelector,
    destroy = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]"),
      fixedGift = document.querySelector(".fixed-gift"),
      scroll = calcScroll();

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          item.remove();
        }

        windows.forEach((window) => {
          window.style.display = "none";
          window.classList.add("animated", "fadeIn");
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
        fixedGift.style.marginRight = `${scroll}px`;
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((window) => {
        window.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
      fixedGift.style.marginRight = `0px`;
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        windows.forEach((window) => {
          window.style.display = "none";
        });

        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        fixedGift.style.marginRight = `0px`;
      }
    });
  }

  /*Функция showModalByTime показывает переданное по селектору модальное окно, через определенное время, если в данный момент никакое окно не открыто, проверяем с помощью display */
  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display = false;

      document.querySelectorAll("[data-modal]").forEach((item) => {
        if (getComputedStyle(item).display !== "none") {
          display = "block";
        }

        if (!display) {
          document.querySelector(selector).style.display = "block";
          document.body.style.overflow = "hidden";

          let scroll = calcScroll(),
            fixedGift = document.querySelector(".fixed-gift");

          document.body.style.marginRight = `${scroll}px`;
          if (fixedGift) {
            fixedGift.style.marginRight = `${scroll}px`;
          }
        }
      });
    }, time);
  }

  //Функция calcScroll используется для подсчета ширины скролла. Возвращает ширину скролла текущего браузера.
  function calcScroll() {
    const div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  /* Функция showModalByScroll показывает модальное окно при скролле до самого конца страницы, при условии, что модальное окно до этого момента не было открыто пользователем */
  function showModalByScroll(selector) {
    window.addEventListener("scroll", () => {
      if (
        !btnPressed &&
        window.pageYOffset + document.documentElement.clientHeight >=
          document.documentElement.scrollHeight
      ) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModals(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModals(
    ".button-consultation",
    ".popup-consultation",
    ".popup-consultation .popup-close"
  );
  bindModals(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);

  showModalByScroll(".fixed-gift");

  showModalByTime(".popup-consultation", 60000);
};

export default modals;
