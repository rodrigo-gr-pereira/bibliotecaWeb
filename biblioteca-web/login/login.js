import { getAuthUser, login, saveAuthUser } from '../js/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const forgotPasswordLink = document.getElementById('forgot-password');

    if (getAuthUser()) {
        window.location.href = '../dashboard/dashboard.html';
        return;
    }

    if (!loginForm) {
        return;
    }

    let feedbackElement = document.getElementById('feedback-message');
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'feedback-message';
        feedbackElement.className = 'feedback-message';
        loginForm.appendChild(feedbackElement);
    }

    const exibirErro = (mensagem) => {
        feedbackElement.textContent = mensagem;
    };

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        feedbackElement.textContent = '';

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        if (!email || !senha) {
            exibirErro('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const usuarioLogado = await login(email, senha);
            saveAuthUser(usuarioLogado);
            window.location.href = '../dashboard/dashboard.html';
        } catch (erro) {
            exibirErro(erro.message);
        }
    });

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.alert('Funcionalidade em construção!');
        });
    }
});