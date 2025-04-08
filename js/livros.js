// Função para obter livros do localStorage
function getLivros() {
    return JSON.parse(localStorage.getItem('livros')) || [];
}

// Função para salvar livros no localStorage
function setLivros(livros) {
    localStorage.setItem('livros', JSON.stringify(livros));
}

// Cadastrar livro
function salvarLivro(e) {
    e.preventDefault();

    const id = document.getElementById('livroId').value;
    const nome = document.getElementById('nome').value;
    const autor = document.getElementById('autor').value;
    const disponivel = document.getElementById('disponivel').checked;

    let livros = getLivros();

    if (id) {
        // Alterar
        const index = livros.findIndex(l => l.id == id);
        if (index !== -1) {
            livros[index] = { id, nome, autor, disponivel };
        }
    } else {
        // Novo
        const novoLivro = {
            id: Date.now(),
            nome,
            autor,
            disponivel
        };
        livros.push(novoLivro);
    }

    setLivros(livros);
    window.location.href = "lista.html"; // redireciona para lista
}

// Listar livros
function listarLivros() {
    const tabela = document.getElementById('tabelaLivros');
    if (!tabela) return;

    const livros = getLivros();

    tabela.innerHTML = livros.map(livro => `
        <tr>
            <td>${livro.id}</td>
            <td>${livro.nome}</td>
            <td>${livro.autor}</td>
            <td>${livro.disponivel ? "Sim" : "Não"}</td>
            <td>
                <a href="#" onclick="editarLivro(${livro.id})">Alterar</a>
                <a href="#" onclick="excluirLivro(${livro.id})">Excluir</a>
            </td>
        </tr>
    `).join('');
}

// Excluir livro
function excluirLivro(id) {
    let livros = getLivros();
    livros = livros.filter(l => l.id !== id);
    setLivros(livros);
    listarLivros();
}

// Editar livro (redireciona com info no localStorage)
function editarLivro(id) {
    localStorage.setItem('editarLivroId', id);
    window.location.href = "cadastro.html";
}

// Preencher formulário se for edição
function preencherFormularioEdicao() {
    const id = localStorage.getItem('editarLivroId');
    if (!id) return;

    const livros = getLivros();
    const livro = livros.find(l => l.id == id);
    if (!livro) return;

    document.getElementById('livroId').value = livro.id;
    document.getElementById('nome').value = livro.nome;
    document.getElementById('autor').value = livro.autor;
    document.getElementById('disponivel').checked = livro.disponivel;

    localStorage.removeItem('editarLivroId');
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLivro');
    if (form) {
        form.addEventListener('submit', salvarLivro);
        preencherFormularioEdicao();
    }
    listarLivros();
});
