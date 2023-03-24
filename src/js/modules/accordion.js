const accordion = (triggersSelector) => {
  //Аккордеон с помощью js animated
  const btns = document.querySelectorAll(triggersSelector); //accordion paragraphs

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!this.classList.contains("active-style")) {
        btns.forEach((btn) => {
          btn.classList.remove("active-style");
          btn.nextElementSibling.classList.remove("active-content");
          btn.nextElementSibling.style.maxHeight = "0px";
        });

        this.classList.add("active-style");
        this.nextElementSibling.classList.add("active-content");
        this.nextElementSibling.style.maxHeight =
          this.nextElementSibling.scrollHeight + 80 + "px";
      } else {
        this.classList.remove("active-style");
        this.nextElementSibling.classList.remove("active-content");
        this.nextElementSibling.style.maxHeight = "0px";
      }

      /*  this.classList.toggle("active-style"); //p
          this.nextElementSibling.classList.toggle("active-content"); //div 

       if (this.classList.contains("active-style")) {
        this.nextElementSibling.style.maxHeight =
          this.nextElementSibling.scrollHeight + 80 + "px";
      } else {
        this.nextElementSibling.style.maxHeight = "0px";
      } */
    });
  });
};

/* const accordion = (triggersSelector, contentSelector) => {
  //Аккордеон с помощью css animated
   const triggers = document.querySelectorAll(triggersSelector),
    items = document.querySelectorAll(contentSelector);

  items.forEach(item => item.classList.add('animated', 'fadeInDown'));

  triggers.forEach(trigger =>  {
    trigger.addEventListener('click', function() {
      if (!this.classList.contains('active')) {
        triggers.forEach(trigger => {
          trigger.classList.remove('active', 'active-style');
        });
        this.classList.add('active', 'active-style');
      }
    });
  }); 
}; */

export default accordion;
