import { listarLivros } from '../js/livros.js';
import { clearAuthUser, getAuthUser } from '../js/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!getAuthUser()) {
        window.location.href = '../login/login.html';
        return;
    }

    const userName = document.getElementById('nome-usuario-logado');
    const usuario = getAuthUser();
    if (userName) {
        userName.textContent = usuario.nome || usuario.email || 'Usuário';
    }

    const logoutButton = document.getElementById('btn-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            clearAuthUser();
            window.location.href = '../login/login.html';
        });
    }

    const tbody = document.getElementById('tabela-livros-corpo');
    if (!tbody) {
        console.error('Corpo da tabela de livros não encontrado.');
        return;
    }

    let livros;
    try {
        livros = listarLivros();
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
        tbody.innerHTML = '<tr><td colspan="4" class="empty-message">Não foi possível carregar os livros.</td></tr>';
        return;
    }

    if (livros.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-message">Nenhum livro cadastrado no sistema até o momento.</td></tr>';
        return;
    }

    livros.forEach((livro) => {
        const row = document.createElement('tr');
        [livro.titulo, livro.autor, livro.categoria, livro.paginas].forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = String(value ?? '');
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
});