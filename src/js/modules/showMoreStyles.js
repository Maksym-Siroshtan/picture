import { getResourse } from "../services/requests";

const showMoreStyles = (triggerSelector, wrapperSelector) => {
  const trigger = document.querySelector(triggerSelector),
    wrapper = document.querySelector(wrapperSelector);

  trigger.addEventListener("click", function () {
    getResourse("assets/db.json")
      .then((res) => {
        createCards(res.styles);
      })
      .catch((error) => {
        let errorBlock = document.createElement("div");
        errorBlock.classList.add("animated", "fadeInDown");

        errorBlock.innerHTML = `
          <h3 class="text-center text-danger">Извините, не возможно посмотреть 
          больше стилей в данный момент... ${error}</h3>
        `;
        wrapper.appendChild(errorBlock);
      });

    this.remove();
  });

  function createCards(response) {
    response.forEach(({ src, title, link }) => {
      let card = document.createElement("div");

      card.classList.add(
        "animated",
        "fadeInUp",
        "col-sm-3",
        "col-sm-offset-0",
        "col-xs-10",
        "col-xs-offset-1"
      );

      card.innerHTML = `
        <div class=styles-block>
          <img src=${src} alt="Style">
          <h4>${title}</h4>
          <a href=${link}>Подробнее</a>
        </div>
      `;

      wrapper.appendChild(card);
    });
  }
};

export default showMoreStyles;
