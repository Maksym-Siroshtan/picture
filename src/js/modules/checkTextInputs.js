const checkTextInputs = (selector) => {
  const txtInputs = document.querySelectorAll(selector);

  txtInputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key.match(/[^а-яё 0-9]/gi)) {
        e.preventDefault();
      }
    });

    input.addEventListener("input", () => {
      if (input.value.match(/[a-z]/gi)) {
        input.value = "";
      }
    });
  });
};

export default checkTextInputs;
