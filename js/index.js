// utilizando a biblioteca ScrollReveal para animar os elementos da página
window.sr = ScrollReveal({ reset: true });
sr.reveal(".banner-message", { duration: 2500 });
sr.reveal(".banner-image", {
  rotate: { x: 0, y: 80, z: 0 },
  duration: 2500,
});
sr.reveal(".info-roup-text", { duration: 2500 });
sr.reveal(".info-roup-img-roup img", { duration: 2500 });

// Tabbed component (componente de abas que mostra um conteúdo diferente para cada aba)

tabsContainer.addEventListener("click", function (e) {q
  const clicked = e.target.closest(".operations__tab"); // pega o elemento clicado e procura pelo elemento pai ou ele mesmo que tenha a classe operations__tab. Se não achar, ele retorna null. Isso é feito para evitar que o usuário clique em algum lugar que não tenha a classe operations__tab, como por exemplo o span que está dentro do botão

  // Guard clause
  if (!clicked) return; // se o elemento clicado não achar nenhum elemento pai ou ele mesmo com a classe operations__tab, ele fica null e, com isso, retorna e não faz nada. Isso evita que o código abaixo seja executado quando o usuário clicar em qualquer lugar que não seja o botão

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active")); // remove a classe operations__tab--active de todos os tabs. Isso evita que mais de um aba fique ativo ao mesmo tempo
  tabsContent.forEach((c) => c.classList.remove("operations__content--active")); // remove a classe operations__content--active de todos os conteúdos das abas. Isso evita que mais de um conteúdo fique ativo ao mesmo tempo

  // Activate tab
  clicked.classList.add("operations__tab--active"); // adiciona a classe operations__tab--active ao botão clicado

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) // seleciona o conteúdo da aba que tem o mesmo valor do atributo data-tab do botão clicado
    .classList.add("operations__content--active"); // adiciona a classe operations__content--active ao conteúdo da aba que tem o mesmo valor do atributo data-tab do botão clicado
});



  
  
