import { getResourse } from "../services/requests";

const calc = (size, material, options, promocode, result, state) => {
  const sizeBlock = document.querySelector(size),
    materialBlock = document.querySelector(material),
    optionsBlock = document.querySelector(options),
    promocodeBlock = document.querySelector(promocode),
    resultBlock = document.querySelector(result);

  let sum = 0;

  const calcFunction = () => {
    getResourse("assets/db.json").then((res) => {
      setValueToOption(res.calcSize, sizeBlock);
      setValueToOption(res.calcMaterial, materialBlock);
      setValueToOption(res.calcOptions, optionsBlock);
    })
    .catch(error => console.log(error));

    sum = Math.round(
      (+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value)
    );

    if (sizeBlock.value == "" || materialBlock.value == "") {
      resultBlock.textContent =
        "Пожалуйста, выберите размер и материал картины";
    } else if (promocodeBlock.value == "IWANTPOPART") {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }
    
    state.size = sizeBlock.value;
    state.material = materialBlock.value;
    state.options = optionsBlock.value;
    state.totalPrice = resultBlock.textContent;
    console.log(state);
  };
  calcFunction();

  const setValueToOption = (response, select) => {
    const value = response.map(({value}) => value);

    select.children.forEach((option, i) => {
      option.value == "" || option.value == 0 ? null : option.setAttribute("value", value[i - 1]);
    });
  };

  sizeBlock.addEventListener("change", calcFunction);
  materialBlock.addEventListener("change", calcFunction);
  optionsBlock.addEventListener("change", calcFunction);
  promocodeBlock.addEventListener("input", calcFunction);
};

export default calc;
