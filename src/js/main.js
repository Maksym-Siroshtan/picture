import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from './modules/forms';

window.addEventListener("DOMContentLoaded", () => {
  modals();
  sliders('.main-slider-item', 'vertical');
  sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  forms();
});
