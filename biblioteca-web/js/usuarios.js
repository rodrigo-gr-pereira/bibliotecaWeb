import { usuariosCadastrados } from '../dados/usuarios-cadastrados.js';

/**
 * Cadastra um novo usuário no sistema.
 * {Usuario} usuario - Instância ou objeto contendo os dados do usuário.
 * {Promise<boolean>} Retorna uma Promise resolvida em caso de sucesso ou rejeitada com erro.
 */
export function cadastrarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        try {
            // Recupera os usuários existentes no localStorage ou usa a base inicial
            const listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados")) || usuariosCadastrados || [];

            // Valida duplicidade de e-mail ou CPF
            if (listaUsuarios.some(user => user.email === usuario.email)) {
                reject(new Error("Este e-mail já está cadastrado no sistema."));
                return;
            }

            if (listaUsuarios.some(user => user.cpf === usuario.cpf)) {
                reject(new Error("Este CPF já está cadastrado no sistema."));
                return;
            }

            // Adiciona o novo usuário e atualiza o localStorage
            listaUsuarios.push(usuario);
            localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios));

            resolve(true);
        } catch (erro) {
            reject(new Error("Erro ao cadastrar usuário. Tente novamente."));
        }
    });
}