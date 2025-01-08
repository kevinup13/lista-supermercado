// Seleciona os elementos do DOM
const abrirFormularioBtn = document.getElementById("abrir-formulario");
const formulario = document.querySelector(".lista-cadastro");
const listaProdutosDiv = document.querySelector(".lista-produtos");
const totalElement = document.querySelector(".soma-produto h1");
const somaProdutoDiv = document.querySelector(".soma-produto");
const limparListaBtn = document.getElementById("limpar-lista");

// Variável para armazenar o total dos produtos
let total = 0;

// Função para validar os dados do produto
function validarDados(nome, valor) {
    const nomeValido = typeof nome === 'string' && nome.trim() !== '';
    const valorValido = !isNaN(valor) && valor > 0;
    return nomeValido && valorValido;
}

// Função para adicionar um produto ao carrinho
function adicionarProdutoAoCarrinho(nomeDoProduto, valorDoProduto) {
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

// Função para verificar a largura da tela (sem fechar o formulário)
function verificarLarguraTela() {
    if (window.innerWidth > 768) {
        formulario.style.display = "flex"; // Exibe o formulário em telas maiores
        abrirFormularioBtn.style.display = "none"; // Oculta o botão "+"
    } else {
        abrirFormularioBtn.style.display = "flex"; // Exibe o botão "+" em telas menores
    }
}

// Função para abrir o formulário (dispositivos móveis)
function abrirFormulario() {
    formulario.style.display = "flex"; // Exibe o formulário
    abrirFormularioBtn.style.display = "none"; // Oculta o botão "+"
}

/// Função para fechar o formulário (apenas quando necessário)
function fecharFormulario() {
    if (window.innerWidth <= 768) {
        formulario.style.display = "none"; // Oculta o formulário
        abrirFormularioBtn.style.display = "flex"; // Exibe o botão "+"
    }
}

// Função para limpar a lista de produtos
function limparLista() {
    listaProdutosDiv.innerHTML = ""; // Limpa a lista de produtos
    total = 0; // Reseta o total
    totalElement.textContent = `Total: R$00,00`; // Atualiza o total exibido
    somaProdutoDiv.style.display = "none"; // Oculta a soma dos produtos
}

// Função para verificar se há produtos na lista e exibir/ocultar a soma
function verificarExibicaoSoma() {
    if (listaProdutosDiv.children.length > 0) {
        somaProdutoDiv.style.display = "block"; // Exibe a soma se houver produtos
    } else {
        somaProdutoDiv.style.display = "none"; // Oc ulta a soma se não houver produtos
    }
}

// Evento para abrir o formulário ao clicar no botão "+"
abrirFormularioBtn.addEventListener("click", abrirFormulario);

// Evento para adicionar um produto ao carrinho ao enviar o formulário
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeDoProduto = formulario.querySelector('input[name="nome do produto"]').value.trim();
    const valorDoProdutoInput = formulario.querySelector('input[name="valor do produto"]').value.trim().replace(",", ".");
    const valorDoProduto = parseFloat(valorDoProdutoInput);

    if (validarDados(nomeDoProduto, valorDoProduto)) {
        adicionarProdutoAoCarrinho(nomeDoProduto, valorDoProduto);
        atualizarTotal(valorDoProduto);
        somaProdutoDiv.style.display = "flex"; // Exibe a soma dos produtos
        formulario.reset(); // Reseta o formulário
        fecharFormulario(); // Fecha o formulário após adicionar o produto
    } else {
        alert("Por favor, insira um nome e um valor válido para o produto.");
    }
});

// Evento para remover um produto da lista
listaProdutosDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("remover-produto") || e.target.closest(".remover-produto")) {
        const produtoElement = e.target.closest(".lista-produtos-single");
        const valorDoProduto = parseFloat(produtoElement.querySelector("span").textContent.replace("R$", ""));
        listaProdutosDiv.removeChild(produtoElement); // Remove o produto da lista
        total -= valorDoProduto; // Atualiza o total
        totalElement.textContent = `Total: R$${total.toFixed(2)}`; // Atualiza o total exibido
        if (listaProdutosDiv.children.length === 0) {
            somaProdutoDiv.style.display = "none"; // Oculta a soma se não houver produtos
        }
    }
});

/* ------------ */
const inputNome = formulario.querySelector('input[name="nome do produto"]');
inputNome.addEventListener("focus", () => {
    console.log("Campo de nome recebeu foco");
});

/* ------------ */

// Evento para limpar a lista ao clicar no botão de limpar
limparListaBtn.addEventListener("click", limparLista);

// Evento para verificar a largura da tela ao redimensionar
window.addEventListener("resize", verificarLarguraTela);

// Verifica a largura da tela ao carregar a página
verificarLarguraTela();

// Verifica a exibição da soma ao carregar a página
verificarExibicaoSoma();