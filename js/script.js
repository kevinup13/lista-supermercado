// Seleciona os elementos do DOM
const form = document.querySelector(".lista-cadastro");
const listaProdutos = document.querySelector(".lista-produtos");
const totalElement = document.querySelector(".soma-produto h1");
const limparListaButton = document.getElementById("limpar-lista");
const somaProdutoElement = document.querySelector(".soma-produto");

// Inicializa a variável total
let total = 0;

// Função para capitalizar a primeira letra de uma string
function capitalizarPrimeiraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Adiciona um listener para o evento de submit do formulário
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Captura os valores dos inputs
    const nomeProduto = form.querySelector('input[name="nome do produto"]').value.trim();
    const valorProduto = parseFloat(form.querySelector('input[name="valor do produto"]').value.replace(",", "."));

    // Valida os dados de entrada
    if (!nomeProduto || isNaN(valorProduto) || valorProduto <= 0) {
        alert("Por favor, insira um nome e um valor válido para o produto.");
        return;
    }

    // Formata o nome do produto (primeira letra maiúscula)
    const nomeFormatado = capitalizarPrimeiraLetra(nomeProduto);

    // Adiciona o produto à lista
    adicionarProduto(nomeFormatado, valorProduto);

    // Atualiza o valor total
    atualizarTotal(valorProduto);

    // Mostra a soma-produtos e o botão de limpar lista
    mostrarSomaProdutosEBotaoLimparLista();

    // Limpa os inputs
    limparInputs();
});

// Função para adicionar um produto à lista
function adicionarProduto(nome, valor) {
    const produtoSingle = document.createElement("div");
    produtoSingle.classList.add("lista-produtos-single");
    produtoSingle.innerHTML = `
        <h3>${nome}</h3>
        <span>R$${valor.toFixed(2).replace(".", ",")}</span>
        <button class="remover-item">Remover</button>
    `;
    listaProdutos.appendChild(produtoSingle);

    // Adiciona evento de clique ao botão de remover
    const removerButton = produtoSingle.querySelector(".remover-item");
    removerButton.addEventListener("click", function () {
        removerProduto(produtoSingle, valor);
    });
}

// Função para remover um produto da lista
function removerProduto(produto, valor) {
    listaProdutos.removeChild(produto); // Remove o elemento da lista
    total -= valor; // Subtrai o valor do total
    totalElement.textContent = `Total: R$${total.toFixed(2).replace(".", ",")}`; // Atualiza o total
}

// Função para atualizar o valor total
function atualizarTotal(valor) {
    total += valor; // Soma o novo valor ao total
    totalElement.textContent = `Total: R$${total.toFixed(2).replace(".", ",")}`; // Atualiza o total
}

// Função para mostrar a soma-produtos e o botão de limpar lista
function mostrarSomaProdutosEBotaoLimparLista() {
    somaProdutoElement.style.display = "block";
    limparListaButton.style.display = "block";
}

// Função para limpar os inputs
function limparInputs() {
    form.querySelector('input[name="nome do produto"]').value = "";
    form.querySelector('input[name="valor do produto"]').value = "";
}

// Adiciona evento de clique ao botão de limpar lista
limparListaButton.addEventListener("click", function () {
    listaProdutos.innerHTML = ""; // Limpa todos os produtos da lista
    total = 0; // Reseta o total
    totalElement.textContent = `Total: R$00,00`; // Atualiza o total
    somaProdutoElement.style.display = "none"; // Oculta a soma-produtos
    limparListaButton.style.display = "none"; // Oculta o botão de limpar lista
});