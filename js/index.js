// utilizando a biblioteca ScrollReveal para animar os elementos da página
window.sr = ScrollReveal({ reset: true });
sr.reveal(".banner-message", { duration: 2500 });
sr.reveal(".banner-image", {
  rotate: { x: 0, y: 80, z: 0 },
  duration: 2500,
});
sr.reveal(".info-burger-text", { duration: 2500 });
sr.reveal(".info-burger-img-burger img", { duration: 2500 });



// Slider (passa os conteúdos para o lado quando o usuário clica nas setas (da página) ou nos pontos ou quando o usuário aperta as setas do teclado)
const slider = function () {
  const slides = document.querySelectorAll(".slide"); // seleciona todos os slides
  const btnLeft = document.querySelector(".slider__btn--left"); // seleciona o botão da seta para a esquerda
  const btnRight = document.querySelector(".slider__btn--right"); // seleciona o botão da seta para a direita
  const dotContainer = document.querySelector(".dots"); // seleciona o container dos pontos

  let curSlide = 0; // variável que armazena o slide atual
  const maxSlide = slides.length; // variável que armazena o número total de slides

  // Functions
  const createDots = function () {
    // função que cria os pontos de acordo com o número de slides
    slides.forEach(function (_, i) {
      // para cada slide, ele cria um ponto
      dotContainer.insertAdjacentHTML(
        // insere o ponto no container dos pontos (dotContainer)
        "beforeend", // posição onde o ponto será inserido
        `<button class="dots__dot" data-slide="${i}"></button>` // html do ponto
      );
    });
  };

  const activateDot = function (slide) {
    // função que ativa o ponto correspondente ao slide atual
    document
      .querySelectorAll(".dots__dot") // seleciona todos os pontos que foram criados na função createDots
      .forEach((dot) => dot.classList.remove("dots__dot--active")); // remove a classe dots__dot--active de todos os pontos. Isso evita que mais de um ponto fique ativo ao mesmo tempo

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`) // seleciona o ponto que tem o valor do atributo data-slide igual ao slide atual
      .classList.add("dots__dot--active"); // adiciona a classe dots__dot--active ao ponto que tem o valor do atributo data-slide igual ao slide atual
  };

  const goToSlide = function (slide) {
    // função que faz a transição dos slides
    slides.forEach(
      // aqui está fazendo um loop nos slides e para cada slide, ele adiciona um estilo transform que faz a transição do slide. Essa mesma lógica funciona tant opara o nextSlide quanto para o prevSlide
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`) // o valor do estilo transform é calculado com base na diferença entre o índice do slide e o slide atual. Exemplo: se o slide atual for o segundo slide, o valor do estilo transform do primeiro slide será -100% pois 100 * (0 - 1) = -100%. O mesmo raciocínio vale para o terceiro slide, quarto slide e assim por diante
    );
  };

  // Next slide
  const nextSlide = function () {
    // função que faz a transição para o próximo slide
    if (curSlide === maxSlide - 1) {
      // se o slide atual for o último slide, ele volta para o primeiro slide
      curSlide = 0;
    } else {
      // se o slide atual não for o último slide, ele vai para o próximo slide
      curSlide++;
    }

    goToSlide(curSlide); // chama a função goToSlide para fazer a transição do slide
    activateDot(curSlide); // chama a função activateDot para ativar o ponto correspondente ao slide atual
  };

  const prevSlide = function () {
    // função que faz a transição para o slide anterior
    if (curSlide === 0) {
      // se o slide atual for o primeiro slide, ele vai para o último slide
      curSlide = maxSlide - 1;
    } else {
      // se o slide atual não for o primeiro slide, ele vai para o slide anterior
      curSlide--;
    }
    goToSlide(curSlide); // chama a função goToSlide para fazer a transição do slide
    activateDot(curSlide); // chama a função activateDot para ativar o ponto correspondente ao slide atual
  };

  const init = function () {
    // função que inicializa o slider
    goToSlide(0); // chama a função goToSlide para fazer a transição do slide. Nesse caso, ele faz a transição para o primeiro slide para que o usuário veja o primeiro slide quando a página carregar
    createDots(); // chama a função createDots para criar os pontos

    activateDot(0); // chama a função activateDot para ativar o ponto correspondente ao slide atual. Nesse caso, ele ativa o ponto correspondente ao primeiro slide
  };
  init(); // chama a função init para inicializar o slider

  // Event handlers
  btnRight.addEventListener("click", nextSlide); // adiciona um event listener para o botão da seta para a direita que chama a função nextSlide quando o botão é clicado
  btnLeft.addEventListener("click", prevSlide); // adiciona um event listener para o botão da seta para a esquerda que chama a função prevSlide quando o botão é clicado

  document.addEventListener("keydown", function (e) {
    // adiciona um event listener para o documento que chama a função nextSlide ou prevSlide quando o usuário aperta as setas (direita e esquerda) do teclado
    //Foi usado o short circuiting para chamar a função nextSlide. Isso é uma forma mais curta de fazer um if. Se a condição do lado esquerdo do && for verdadeira, ele chama a função do lado direito. Se a condição do lado esquerdo do && for falsa, ele não chama a função do lado direito.
    if (e.key === "ArrowLeft") prevSlide(); // se o usuário apertar a seta para a esquerda, ele chama a função prevSlide
    e.key === "ArrowRight" && nextSlide(); // se o usuário apertar a seta para a direita, ele chama a função nextSlide
  });

  dotContainer.addEventListener("click", function (e) {
    // adiciona um event listener para o container dos pontos que chama a função goToSlide e activateDot quando o usuário clica em um ponto
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset; // destruturou o valor do atributo data-slide do elemento clicado. Exemplo: se clicar no terceiro ponto, slide = 2
      goToSlide(slide); // chama a função goToSlide para fazer a transição do slide
      activateDot(slide); // chama a função activateDot para ativar o ponto correspondente ao slide atual
    }
  });
};
slider(); // chama a função slider para inicializar o slider

