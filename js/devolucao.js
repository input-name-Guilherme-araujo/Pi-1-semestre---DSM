function iniciarDevolucao() {
    const orderId = document.getElementById('order-id').value;
    const reason = document.getElementById('reason').value;
    const reembolso = document.querySelector('input[name="reembolso"]:checked').value;
    const productImage = document.getElementById('product-image').files[0];

    // Validação de Condições de Devolução
    if (!orderId) {
        alert("Por favor, insira o ID do pedido.");
        return;
    }

    if (!productImage) {
        alert("Por favor, envie uma imagem do produto.");
        return;
    }

    // Simulação de prazo de devolução e condições
    const dataRecebimento = new Date();
    dataRecebimento.setDate(dataRecebimento.getDate() - 5); // Simulando um pedido de 5 dias atrás
    const hoje = new Date();
    const prazoDevolucao = new Date(dataRecebimento);
    prazoDevolucao.setDate(prazoDevolucao.getDate() + 7);

    if (hoje > prazoDevolucao) {
        alert("Prazo de devolução expirado.");
        return;
    }

    // Registrar Solicitação de Devolução
    const numeroProtocolo = Math.floor(Math.random() * 1000000);
    alert(`Solicitação de devolução criada com sucesso! Número de protocolo: ${numeroProtocolo}.\nOpção de reembolso escolhida: ${reembolso}\n\nSeu produto será encaminhado para um especialista, mas se precisar sanar suas dúvidas, entre em contato conosco. Prezamos a confiança acima de tudo e não queremos deixar você sem as respostas que precisa!`);

    // Exibir a imagem do produto enviada
    const reader = new FileReader();
    reader.onload = function (e) {
        alert("Imagem enviada com sucesso!");
        console.log("Imagem enviada:", e.target.result); // Aqui você pode simular o envio para o servidor ou armazená-la
    };
    reader.readAsDataURL(productImage);
}

// Função para abrir o WhatsApp
function abrirWhatsApp() {
    const numeroWhatsApp = "5511999999999"; // Substitua pelo número de WhatsApp da loja
    const mensagem = "Olá, gostaria de saber mais sobre o processo de devolução.";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}