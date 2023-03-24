import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calc from './modules/calc';
import filter from './modules/filter';
import picturesSize from './modules/pictureSize';
import accordion from './modules/accordion';

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  let calcStateObj = {};

  modals();
  sliders(".main-slider-item", "vertical");
  sliders(
    ".feedback-slider-item",
    "horizontal",
    ".main-prev-btn",
    ".main-next-btn"
  );
  forms(calcStateObj);
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
  showMoreStyles(".button-styles", "#styles .row");
  calc('#size', '#material', '#options', '.promocode', '.calc-price', calcStateObj);
  filter();
  picturesSize('.sizes-block');
  accordion('.accordion-heading');
});
