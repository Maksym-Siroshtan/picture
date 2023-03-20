import {postData} from '../services/requests';

const forms = () => {
  const forms = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    upload = document.querySelectorAll('[name="upload"]');

  const messages = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с Вами свяжемся.",
    failure: "Извините! Что-то пошло не так...",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
  };

  const path = {
    server: "assets/server.php",
    question: "assets/question.php",
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = "";
    });

    upload.forEach((item) => {
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };

  upload.forEach((item) => {
    item.addEventListener("input", () => {
      const arr = item.files[0].name.split(".");
      let dots;

      arr[0].length > 6 ? (dots = "...") : (dots = ".");
      const name = arr[0].substring(0, 6) + dots + arr[1];

      item.previousElementSibling.textContent = name;
    });
  });

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      form.parentNode.appendChild(statusMessage);

      form.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        form.style.display = "none";
      }, 300);

      const statusImg = document.createElement("img");
      statusImg.setAttribute("src", messages.spinner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.appendChild(statusImg);

      const statusText = document.createElement("div");
      statusText.textContent = messages.loading;
      statusMessage.appendChild(statusText);

      const formData = new FormData(form);
      let api;
      form.closest(".popup-design") || form.classList.contains("calc_form")
        ? (api = path.server)
        : (api = path.question);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute("src", messages.ok);
          statusText.textContent = messages.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", messages.fail);
          statusText.textContent = messages.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            form.style.display = "block";
            form.classList.remove("fadeOutUp");
            form.classList.add("fadeInUp");
          }, 3000);
        });
    });
  });
};

export default forms;
