import { usuariosSistema } from '../dados/usuarios-sistema.js';

document.addEventListener("DOMContentLoaded", () => {
    // Busca o usuário logado salvo no navegador (mude 'usuarioLogado' se usar outra chave no login)
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const elementoNome = document.getElementById("nome-usuario-logado");

    if (elementoNome) {
        if (usuarioLogado && usuarioLogado.nome) {
            elementoNome.textContent = usuarioLogado.nome;
        } else {
            elementoNome.textContent = "Visitante";
            
            // Opcional: Se não tiver usuário logado, expulsa para a página de login
            // window.location.href = "../login/login.html";
        }
    }
});


export const AUTH_STORAGE_KEY = 'usuarioLogado';

function readStoredList(key) {
    try {
        const valor = localStorage.getItem(key);
        if (!valor) {
            return [];
        }

        const parsed = JSON.parse(valor);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error(`Erro ao ler ${key}:`, error);
        localStorage.removeItem(key);
        return [];
    }
}

export function getAuthUser() {
    try {
        const usuarioSalvo = localStorage.getItem(AUTH_STORAGE_KEY);
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    } catch (error) {
        console.error('Erro ao ler sessão do usuário:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
}

export function saveAuthUser(usuario) {
    if (!usuario) {
        return;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(usuario));
}

export function clearAuthUser() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Realiza a autenticação do usuário com base no e-mail e senha.
 * @param {string} email - E-mail do usuário
 * @param {string} senha - Senha do usuário
 * @returns {Promise<Object>} Retorna uma Promise que resolve com os dados do usuário ou rejeita com uma mensagem de erro.
 */
export function login(email, senha) {
    return new Promise((resolve, reject) => {
        const usuariosPadrao = Array.isArray(usuariosSistema) ? usuariosSistema : [];
        const usuariosLocais = readStoredList('usuariosCadastrados');
        const usuarios = [...usuariosPadrao, ...usuariosLocais];

        const emailNormalizado = String(email).trim().toLowerCase();
        const senhaNormalizada = String(senha).trim();

        const usuarioEncontrado = usuarios.find((user) => {
            const emailAtual = String(user?.email || '').trim().toLowerCase();
            const senhaAtual = String(user?.senha || '');
            return emailAtual === emailNormalizado && senhaAtual === senhaNormalizada;
        });

        if (usuarioEncontrado) {
            const { senha: _, ...dadosUsuario } = usuarioEncontrado;
            resolve(dadosUsuario);
            return;
        }

        reject(new Error('Dados incorretos. Favor verificar e tentar novamente'));
    });
}