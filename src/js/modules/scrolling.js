const scrolling = (upSelector) => {
  const upElem = document.querySelector(upSelector);

  //Если прокрученная область документа больше 1650px, показываем элемент, иначе скрываем.
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1650) {
      upElem.classList.add("animated", "fadeIn");
      upElem.classList.remove("fadeOut");
    } else {
      upElem.classList.remove("fadeIn");
      upElem.classList.add("fadeOut");
    }
  });

  //Реализация плавного скролла RequestAnimationFrame

  let links = document.querySelectorAll('[href^="#"]'), //Находим все локальные ссылки.
    speed = 0.3; //Скорость анимации.

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      try {
        event.preventDefault(); // Отменим стандартное поведение ссылок.

        //let scrollTop = Math.round(element.scrollTop || body.scrollTop); Таким образом нужно получать scrollTop для поддержки старых браузеров.


        let withTop = document.documentElement.scrollTop, //Определим какое расстояние было пролистано сверху.
          hash = this.hash, // #Хэш элемента
          toBlock = document.querySelector(hash).getBoundingClientRect().top, //Получаем блок к которому будем скроллить. Спомощью getBoundingClientRect() получаем доступ к свойствам элемента в данном случае к свойству top.
          start = null; //Переменная которая определяет стартовую позицию.

        //Функцию step(аргумент time в которую передаётся автоматически) будет запускать каждый раз когда посчитает нужным requestAnimationFrame(step).
        const step = (time) => {
          //Нужно узнать первый ли раз запускается анимация.Это условие выполнится только один раз.
          if (start === null) {
            //Если да, в start записываем time
            start = time;
          }

          let progress = time - start, //Будем вычислять прогресс, time каждый раз будет приходить новый, а позиция start, вычисляется только в начале, когда только запускаем анимацию.
            r =
              toBlock < 0
                ? Math.max(withTop - progress / speed, withTop + toBlock)
                : Math.min(withTop + progress / speed, withTop + toBlock);
          //Тут (withTop - progress / speed) мы используем значение того сколько пользователь уже пролистал(progress), делим на скорость(speed) с которой у нас происходит анимация и всё это отнимаем от значения withTop(scrollTop) нашей страницы.

          //Переменная r отвечает за количество пикселей на которые нам необходимо пролистать в течении этой анимации и в какую сторону ведь мы можем скролить как вниз так и вверх. Поэтому переменная r может быть как положительная так и отрицательная.

          //Так как по x мы не двигаемся, устанавливаем 0, а по y устанавливаем значение переменной r
          document.documentElement.scrollTo(0, r);

          if (r != withTop + toBlock) {
            //Пока условие выполняется мы рекурсивно повторяем функцию step.
            requestAnimationFrame(step);
          } else {
            //Если значения равны, анимация должна закончиться
            location.hash = hash;
          }
        };
        requestAnimationFrame(step);
      } catch (error) {}
    });
  });

  /* //Реализайия плавного скролла Pure js
  
  const element = document.documentElement,
    body = document.body;

  //calcScroll занимается подсчётом того сколько нужно пролистать и как это сделать
  const calcScroll = () => {
    upElem.addEventListener("click", function (event) {
      let scrollTop = Math.round(element.scrollTop || body.scrollTop); //Определим какое расстояние было пролистано сверху. Что из этого будет существовать то и попадёт в scrollTop. Так мы обезопасим себя от багов.При запуске calcScroll мы вычисляем самое первое значение статичное изменятся оно не будет.

      if (this.hash !== "") {
        //Используем hash для того чтобы убедиться что кликнута ссылка. Так-как hash неотъемлемая часть локальных ссылок.

        event.preventDefault(); //Если hash не пустой, то кликнута локальная ссылка. Тогда отменяем стандартное поведение.
        
        let hashElement = document.querySelector(this.hash), //Получаем элемент к которому будем скролить страницу. Например #up - приведёт нас к header.

          hashElementTop = 0; //Переменная нужна для того чтобы узнать сколько нужно еще пролистать px до родителя этого hash элемента.
   
        //Вычисляем значение hashElementTop с помощью цикла while(пока). Перебираем всех родителей искомого элемента и узнаём сколько px нужно пролистать.
        while (hashElement.offsetParent) {
          //offsetParent-это тот элемент относительно которого будет позиционироваться hashElement <-- (его родитель).Пока он существует запускаем цикл.

          hashElementTop += hashElement.offsetTop;
          //offsetTop-позволяет определить, а сколько px у нас осталось до верхней границы родительского элемента от hashElement

          hashElement = hashElement.offsetParent;
          //Перебираем всех родителей которые могут быть основой для позиционирования данного элемента
          
          hashElementTop = Math.round(hashElementTop);
          //Так как количество px может быть дробное, округлим его


          //Теперь у нас есть все значения для запуска плавного скролла:
            // 1)scrollTop - узнали какое расстояние пользователь пролистал вниз
            // 2)hashElementTop - узнали сколько px между hashElement элементом и родительским
            // 3)this.hash - для того чтобы узнать до какого элемента мы листаем
          
          //Помещаем эти 3 параметра в функцию
          smoothScroll(scrollTop, hashElementTop, this.hash);
        }
      }
    });
  };

  const smoothScroll = (from, to, hash) => {
    //from - откуда. Статичная переменная - не изменяется 
    //to - куда
    //hash - до какого элемента

    let timeInterval = 1, //Это то значение(шаг) через которое будет производиться анимация
      prevScrollTop, //Предшедствующее значение
      speed; //Скорость анимации(направление)

    //Мы должны учитывать в какую сторону мы движемся снизу-вверх или наоборот.Добавим условие
    if (to > from) {
      //Если to(hashElementTop) > from(scrollTop) установим скорость 30 - это соответствует движению сверху-вниз
      speed = 30; 
    } else {
      //Если ситуация обратная(снизу-вверх) установим скорость -30
      speed = -30;
    }

    //Создаём саму анимацию
    let move = setInterval(function() {
      //Функция которая отвечаем за анимацию

      let scrollTop = Math.round(element.scrollTop || body.scrollTop);
      //При запуске calcScroll на стр.(22) мы вычисляем самое первое значение статичное. Но в этом случае когда запускается анимация, одно из этих значений каждый раз будет изменятся и нам нужно знать его в текущий момент, запишем его в переменную scrollTop.

      if (
        prevScrollTop === scrollTop ||
        //Это значит что предидущая анимация которая была воспроизведенена равна тому что мы хотели получить.Это значит, что нам уже некуда вращать нашу страницу, мы достигли результата.
        (to > from && scrollTop >= to) ||
        (to < from && scrollTop <= to)
        //Это условие гарантирует нам что мы долистали до того момента который был нужен нам
      ) {
        //Если условие верно, очищаем наш SetInterval, останавливаем анимацию
        clearInterval(move);

        //Поработаем с объектом history для того чтобы всё правильно установить.Самое важное для нас location.href, по факту мы сейчас работаем с адресной строкой, т.к это строка применим метод replace для того чтобы найти все знаки # в конце строке нашего href и уберём их. После того как мы их убрали, мы добавляем наш hash, который приходит из функции calcScroll. Так мы точно и правильно установим нашу строку в браузере.
        history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
      } else {
        //Для того чтобы страница двигалась в нужном мне направлении и со скоростью которая задана нужно:
        element.scrollTop += speed;//Теперь в зависимости от знака страница будет двигаться.
        body.scrollTop += speed;

        //В этом же условии записываем переменную prevScrollTop для того чтобы знать как изменяется моё значение. Каждый раз переменная будет перезаписываться, таким образом мы будем знать, сколько нам осталось до того как мы долистаем до нужного момента.
        prevScrollTop = scrollTop;
      }
    }, timeInterval);
  };
  calcScroll(); */
};

export default scrolling;
