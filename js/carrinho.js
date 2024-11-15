const catalogoProdutos = {
    1: {
        id: 1,
        nome: "Camiseta Trio F1 oversized",
        preco: 89.90,
        imagem: "./img/camisetas/aposi-f1.png",
        precoPromocional: null,
        temPromocao: false
    },
    2: {
        id: 2,
        nome: "Camiseta Duende Aposimatic oversized",
        preco: 89.90,
        imagem: "./img/camisetas/cami1.png",
        precoPromocional: null,
        temPromocao: false
    },
    3: {
        id: 3,
        nome: "Camiseta Aposimatic oversized",
        preco: 89.90,
        imagem: "./img/camisetas/Aposimatic.png",
        precoPromocional: null,
        temPromocao: false
    },
    4: {
        id: 4,
        nome: "Camiseta Just Relaxxx oversized",
        preco: 89.90,
        imagem: "./img/camisetas/just_relax.png",
        precoPromocional: null,
        temPromocao: false
    },
    5: {
        id: 5,
        nome: "Camiseta Necromancy Aposimatic oversized",
        preco: 89.90,
        imagem: "./img/camisetas/necromancy-aposimatic.png",
        precoPromocional: null,
        temPromocao: false
    }
};

// Cupons válidos
const cuponsValidos = {
    'APOS10': 10,
    'APOS20': 20,
    'PRIMEIRO': 15
};

// Limite para frete grátis
const FRETE_GRATIS_LIMITE = 290.00;

// Gerenciamento do carrinho
const CarrinhoManager = {
    // Obtém os itens do carrinho do localStorage
    getItems() {
        const items = localStorage.getItem('carrinhoItems');
        return items ? JSON.parse(items) : [];
    },

    // Salva os itens no localStorage
    saveItems(items) {
        localStorage.setItem('carrinhoItems', JSON.stringify(items));
    },

    // Obtém o cupom aplicado
    getCupomAplicado() {
        const cupom = localStorage.getItem('cupomAplicado');
        return cupom ? JSON.parse(cupom) : null;
    },

    // Salva o cupom aplicado
    saveCupomAplicado(cupom) {
        localStorage.setItem('cupomAplicado', JSON.stringify(cupom));
    },

    // Adiciona um item ao carrinho
    adicionarItem(produtoId) {
        const produto = catalogoProdutos[produtoId];
        if (!produto) return false;

        const items = this.getItems();
        const itemExistente = items.find(item => item.id === produtoId);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            items.push({
                ...produto,
                quantidade: 1
            });
        }

        this.saveItems(items);
        this.atualizarBadgeCarrinho();
        return true;
    },

    // Atualiza a quantidade de um item
    atualizarQuantidade(id, mudanca) {
        const items = this.getItems();
        const item = items.find(item => item.id === id);
        
        if (item) {
            item.quantidade = Math.max(1, item.quantidade + mudanca);
            this.saveItems(items);
            this.renderizarCarrinho();
        }
    },

    // Remove um item do carrinho
    removerItem(id) {
        const items = this.getItems();
        const novosItems = items.filter(item => item.id !== id);
        this.saveItems(novosItems);
        this.renderizarCarrinho();
        this.atualizarBadgeCarrinho();
    },

    // Aplica um cupom de desconto
    aplicarCupom(codigo) {
        codigo = codigo.toUpperCase();
        if (cuponsValidos[codigo]) {
            this.saveCupomAplicado({
                codigo: codigo,
                desconto: cuponsValidos[codigo]
            });
            alert(`Cupom ${codigo} aplicado com sucesso! Desconto de ${cuponsValidos[codigo]}%`);
            this.renderizarCarrinho();
            return true;
        }
        alert('Cupom inválido!');
        return false;
    },

    // Calcula o preço de um item
    calcularPrecoItem(item) {
        const precoBase = item.precoPromocional || item.preco;
        return precoBase * item.quantidade;
    },

    // Calcula o total do carrinho
    calcularTotal() {
        const items = this.getItems();
        let total = items.reduce((sum, item) => sum + this.calcularPrecoItem(item), 0);
        const cupomAplicado = this.getCupomAplicado();
        
        if (cupomAplicado) {
            total = total * (1 - cupomAplicado.desconto / 100);
        }
        
        return total;
    },

    // Calcula a economia total
    calcularEconomia() {
        const items = this.getItems();
        const precoOriginal = items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        return precoOriginal - this.calcularTotal();
    },

    // Finaliza a compra
    finalizarCompra() {
        const total = this.calcularTotal();
        const economia = this.calcularEconomia();
        const cupomAplicado = this.getCupomAplicado();
        
        let mensagem = `Pedido finalizado com sucesso!\n`;
        mensagem += `Total: ${this.formatarPreco(total)}\n`;
        if (economia > 0) {
            mensagem += `Você economizou: ${this.formatarPreco(economia)}\n`;
        }
        if (cupomAplicado) {
            mensagem += `Cupom aplicado: ${cupomAplicado.codigo}\n`;
        }
        
        alert(mensagem);
        localStorage.removeItem('carrinhoItems');
        localStorage.removeItem('cupomAplicado');
        this.renderizarCarrinho();
        this.atualizarBadgeCarrinho();
    },

    // Formata o preço para exibição
    formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    // Atualiza o badge do carrinho com a quantidade de itens
    atualizarBadgeCarrinho() {
        const items = this.getItems();
        const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);
        const badges = document.querySelectorAll('.carrinho-badge');
        
        badges.forEach(badge => {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'block' : 'none';
        });
    },

    // Renderiza o carrinho na página
    renderizarCarrinho() {
        const containerProdutos = document.querySelector('.produtos-carrinho');
        const containerResumo = document.querySelector('.menu-compra-conteudo');
        
        if (!containerProdutos || !containerResumo) return; // Não estamos na página do carrinho
        
        const items = this.getItems();
        
        if (items.length === 0) {
            containerProdutos.innerHTML = `
                <div class="carrinho-vazio">
                    <h2>Seu carrinho está vazio</h2>
                    <p>Continue comprando para adicionar produtos</p>
                </div>
            `;
            containerResumo.innerHTML = '';
            return;
        }

        containerProdutos.innerHTML = items.map(item => `
            <div class="item-carrinho">
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="item-info">
                    <span class="item-nome">
                        ${item.nome}
                        ${item.temPromocao ? '<span class="badge-promocao">PROMOÇÃO</span>' : ''}
                    </span>
                    <div class="item-preco">
                        ${item.temPromocao ? `
                            <span class="preco-original">${this.formatarPreco(item.preco)}</span>
                            <span class="preco-promocional">${this.formatarPreco(item.precoPromocional)}</span>
                        ` : this.formatarPreco(item.preco)}
                    </div>
                    <div class="item-controles">
                        <button class="btn-quantidade" onclick="CarrinhoManager.atualizarQuantidade(${item.id}, -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button class="btn-quantidade" onclick="CarrinhoManager.atualizarQuantidade(${item.id}, 1)">+</button>
                        <button class="btn-remover" onclick="CarrinhoManager.removerItem(${item.id})">Remover</button>
                    </div>
                </div>
                <div class="item-total">
                    ${this.formatarPreco(this.calcularPrecoItem(item))}
                </div>
            </div>
        `).join('');

        const cupomAplicado = this.getCupomAplicado();
        const economia = this.calcularEconomia();
        const total = this.calcularTotal();
        const frete = this.calcularFrete();

        containerResumo.innerHTML = `
            <div class="cupom-container">
                <input type="text" class="cupom-input" placeholder="Digite seu cupom de desconto">
                <button class="btn-cupom" onclick="CarrinhoManager.aplicarCupomFromInput()">Aplicar Cupom</button>
            </div>
            
            <div class="resumo-compra">
                <div class="resumo-item">
                    <span>Subtotal</span>
                    <span>${this.formatarPreco(items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0))}</span>
                </div>
                ${cupomAplicado ? `
                    <div class="resumo-item">
                        <span>Desconto do cupom</span>
                        <span>-${cupomAplicado.desconto}%</span>
                    </div>
                ` : ''}
                <div class="resumo-item">
                    <span>Frete</span>
                    <span>${typeof frete === 'string' ? frete : this.formatarPreco(frete)}</span>
                </div>
                <div class="resumo-item total">
                    <span>Total</span>
                    <span>${this.formatarPreco(total + (typeof frete === 'number' ? frete : 0))}</span>
                </div>
                ${economia > 0 ? `
                    <div class="economia">
                        Você economizou ${this.formatarPreco(economia)}!
                    </div>
                ` : ''}
            </div>
            
            <button class="btn-finalizar" onclick="CarrinhoManager.finalizarCompra()">
                Finalizar Compra
            </button>
        `;
    },

    // Função auxiliar para pegar o valor do input de cupom e aplicá-lo
    aplicarCupomFromInput() {
        const input = document.querySelector('.cupom-input');
        if (input) {
            this.aplicarCupom(input.value);
            input.value = '';
        }
    },

    // Calcula o frete com base no total do carrinho
    calcularFrete() {
        const total = this.calcularTotal();
        if (total >= FRETE_GRATIS_LIMITE) {
            return "Frete Grátis";
        } else {
            return 20.00; // Valor do frete padrão
        }
    },

    // Inicializa o carrinho
    init() {
        this.atualizarBadgeCarrinho();
        this.renderizarCarrinho();
        
        // Adiciona listeners para botões de compra
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-comprar')) {
                const produtoId = parseInt(e.target.dataset.produtoId);
                if (produtoId) {
                    this.adicionarItem(produtoId);
                }
            }
        });
    }
};

// Inicializa o carrinho quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => CarrinhoManager.init());