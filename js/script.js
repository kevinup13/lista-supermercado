// Seleciona os elementos do DOM
const abrirFormularioBtn = document.getElementById("abrir-formulario");
const formulario = document.querySelector(".lista-cadastro");
const listaProdutosDiv = document.querySelector(".lista-produtos");
const totalElement = document.querySelector(".soma-produto h1");
const somaProdutoDiv = document.querySelector(".soma-produto"); // Seleciona o container do total
let total = 0;

// Função para abrir o formulário (dispositivos móveis)
abrirFormularioBtn.addEventListener("click", function () {
    formulario.style.display = "flex"; // Exibe o formulário
    abrirFormularioBtn.style.display = "none"; // Oculta o botão "+"
});

// Função para adicionar produto ao carrinho
function adicionarProdutoAoCarrinho(nomeDoProduto, valorDoProduto) {
    // Cria um novo elemento para o produto
    const produtoElement = document.createElement("div");
    produtoElement.classList.add("lista-produtos-single");
    produtoElement.innerHTML = `
        <h3>${nomeDoProduto}</h3>
        <span>R$${valorDoProduto.toFixed(2)}</span>
        <button class="remover-produto"><i class="fas fa-trash"></i></button>
    `;
    listaProdutosDiv.appendChild(produtoElement);
}

// Função para atualizar o total
function atualizarTotal(valorDoProduto) {
    total += valorDoProduto;
    totalElement.textContent = `Total: R$${total.toFixed(2)}`;
}

// Função para fechar o formulário e exibir o botão "+"
function fecharFormulario() {
    formulario.style.display = "none"; // Fecha o formulário
    abrirFormularioBtn.style.display = "flex"; // Exibe o botão "+"
}

// Função para adicionar produto
formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Captura os valores dos inputs
    const nomeDoProduto = formulario.querySelector('input[name="nome do produto"]').value.trim();
    const valorDoProduto = parseFloat(formulario.querySelector('input[name="valor do produto"]').value.trim().replace(",", "."));

    // Verifica se os campos estão preenchidos corretamente
    if (nomeDoProduto && !isNaN(valorDoProduto) && valorDoProduto > 0) {
        // Adiciona o produto ao carrinho
        adicionarProdutoAoCarrinho(nomeDoProduto, valorDoProduto);

        // Atualiza o total
        atualizarTotal(valorDoProduto);

        // Exibe o total (se estiver oculto)
        if (window.getComputedStyle(somaProdutoDiv).display === "none") {
            somaProdutoDiv.style.display = "block";
        }

        // Limpa os campos do formulário
        formulario.reset();

        // Fecha o formulário e exibe o botão "+"
        fecharFormulario();
    } else {
        alert("Por favor, insira um nome e um valor válido para o produto.");
    }
});

// Função para remover produtos
listaProdutosDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("remover-produto") || e.target.closest(".remover-produto")) {
        const produtoElement = e.target.closest (".lista-produtos-single");
        const valorProduto = parseFloat(produtoElement.querySelector("span").textContent.replace("R$", ""));

        // Remove o produto da lista
        listaProdutosDiv.removeChild(produtoElement);

        // Atualiza o total
        total -= valorProduto;
        totalElement.textContent = `Total: R$${total.toFixed(2)}`;

        // Oculta o total se não houver produtos
        if (listaProdutosDiv.children.length === 0) {
            somaProdutoDiv.style.display = "none";
        }
    }
});

// Função para limpar a lista de produtos
document.getElementById("limpar-lista").addEventListener("click", function () {
    listaProdutosDiv.innerHTML = ""; // Limpa a lista de produtos
    total = 0; // Reseta o total
    totalElement.textContent = `Total: R$00,00`; // Atualiza o total exibido
    somaProdutoDiv.style.display = "none"; // Oculta o total
});