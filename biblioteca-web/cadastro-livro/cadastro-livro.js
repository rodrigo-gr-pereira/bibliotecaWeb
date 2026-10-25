import { Livro } from '../js/Livro.js';
import { clearAuthUser, getAuthUser } from '../js/auth.js';
import { cadastrarLivro } from '../js/livros.js';

document.addEventListener('DOMContentLoaded', () => {
    const usuario = getAuthUser();
    if (!usuario) {
        window.location.href = '../login/login.html';
        return;
    }

    const nomeUsuario = document.getElementById('nome-usuario-logado');
    if (nomeUsuario) {
        nomeUsuario.textContent = usuario.nome || usuario.email || 'Usuário';
    }

    const logoutButton = document.getElementById('btn-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            clearAuthUser();
            window.location.href = '../login/login.html';
        });
    }

    const form = document.getElementById('form-cadastro-livro');
    const feedbackMsg = document.getElementById('feedback-mensagem');
    if (!form) {
        console.error('Formulário de cadastro de livro não encontrado.');
        return;
    }

    function mostrarFeedback(mensagem, tipo) {
        if (!feedbackMsg) {
            alert(mensagem);
            return;
        }

        feedbackMsg.textContent = mensagem;
        feedbackMsg.className = `feedback-box ${tipo}`;
        feedbackMsg.style.display = 'block';
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const categoria = document.getElementById('categoria').value.trim();
        const paginasStr = document.getElementById('paginas').value.trim();

        if (!titulo || !autor || !categoria || !paginasStr) {
            mostrarFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        if (titulo.length < 4 || titulo.length > 80) {
            mostrarFeedback('O título deve ter entre 4 e 80 caracteres.', 'error');
            return;
        }

        if (autor.length < 4 || autor.length > 80) {
            mostrarFeedback('O autor deve ter entre 4 e 80 caracteres.', 'error');
            return;
        }

        const paginas = Number(paginasStr);
        if (!Number.isSafeInteger(paginas) || paginas <= 0) {
            mostrarFeedback('O número de páginas deve ser um inteiro maior que zero.', 'error');
            return;
        }

        const novoLivro = new Livro(titulo, autor, categoria, paginas, true);
        novoLivro.id = Date.now();

        try {
            await cadastrarLivro(novoLivro);
            mostrarFeedback('Livro cadastrado com sucesso!', 'success');
            form.reset();
        } catch (erro) {
            mostrarFeedback(erro.message || 'Não foi possível cadastrar o livro.', 'error');
        }
    });
});