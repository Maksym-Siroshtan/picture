const filter = () => {
  const menu = document.querySelector(".portfolio-menu"),
    items = menu.querySelectorAll("li"),
    wrapper = document.querySelector(".portfolio-wrapper"),
    markAll = wrapper.querySelectorAll(".all"),
    no = document.querySelector(".portfolio-no");

  const typeFilter = (markType) => {
    markAll.forEach((item) => {
      item.style.display = "none";
      item.classList.remove("animated", "fadeIn");
    });

    no.style.display = "none";
    no.classList.remove("animated", "fadeIn");

    if (markType) {
      markType.forEach((item) => {
        item.style.display = "block";
        item.classList.add("animated", "fadeIn");
      });
    } else {
      no.style.display = "block";
      no.classList.add("animated", "fadeIn");
    }
  };

  const bindTriggerToEvent = (btnSelector, markSelector) => {
    let btn = menu.querySelector(btnSelector),
      mark;

    if (markSelector) {
      mark = wrapper.querySelectorAll(markSelector);
    }

    btn.addEventListener("click", () => {
      typeFilter(mark);
    });
  };

  bindTriggerToEvent(".all", ".all"); // Все работы
  bindTriggerToEvent(".lovers", ".lovers"); // Для влюбленных
  bindTriggerToEvent(".chef", ".chef"); // Для шефа
  bindTriggerToEvent(".girl", ".girl"); // Для девушки
  bindTriggerToEvent(".guy", ".guy"); // Для парня
  bindTriggerToEvent(".grandmother"); // Для бабушки
  bindTriggerToEvent(".granddad"); // Для дедушки

  menu.addEventListener("click", (e) => {
    let target = e.target;

    if (target && target.tagName == "LI") {
      items.forEach((item) => item.classList.remove("active"));
      target.classList.add("active");
    }
  });
};

export default filter;
