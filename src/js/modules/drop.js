import { postData } from "../services/requests";

const drop = () => {
  //dragover - …элемент перетаскивается над допустимой целью сброса каждые несколько сотен миллисекунд.
  //dragenter - …перетаскиваемый элемент попадает в допустимую цель сброса.
  //dragleave - …перетаскиваемый элемент покидает допустимую цель сброса.
  //drop - …элемент сброшен в допустимую зону сброса.

  const inputsUpload = document.querySelectorAll('[name="upload"]');

  ["dragover", "dragenter", "dragleave", "drop"].forEach((eventNames) => {
    inputsUpload.forEach((input) => {
      input.addEventListener(eventNames, preventDefaults, false);
    });
  });

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function highlight(item) {
    item.closest(".file_upload").style.border = "5px solid yellow";
    item.closest(".file_upload").style.backgroundColor = "rgba(0,0,0,0.7)";
  }

  function unhighlight(item) {
    item.closest(".file_upload").style.border = "none";
    if (item.closest(".calc_form")) {
      item.closest(".file_upload").style.backgroundColor = "#fff";
    } else if (item.closest(".main")) {
      item.closest(".file_upload").style.backgroundColor = "#f7e7e6";
    } else {
      item.closest(".file_upload").style.backgroundColor = "#ededed";
    }
  }

  ["dragover", "dragenter"].forEach((eventNames) => {
    inputsUpload.forEach((input) => {
      input.addEventListener(eventNames, () => highlight(input), false);
    });
  });

  ["dragleave", "drop"].forEach((eventNames) => {
    inputsUpload.forEach((input) => {
      input.addEventListener(eventNames, () => unhighlight(input), false);
    });
  });

  inputsUpload.forEach((input) => {
    input.addEventListener("drop", (event) => {
      input.files = event.dataTransfer.files;

      if (input.closest(".main")) {
        const formData = new FormData(document.querySelector(".main form"));

        postData("assets/server.php", formData)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
          .finally(() => {
            setInterval(function () {
              input.previousElementSibling.textContent = "Файл отправлен!";
            }, 2000);
          });
      }

      let dots;
      const arr = input.files[0].name.split(".");

      arr[0].length > 6 ? (dots = "...") : (dots = ".");
      const name = arr[0].substring(0, 6) + dots + arr[1];

      input.previousElementSibling.textContent = name;
    });
  });
};

export default drop;
