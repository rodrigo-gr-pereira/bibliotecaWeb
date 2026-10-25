import { livrosCadastrados } from '../dados/livros-cadastrados.js';

/**
 * Cadastra um novo livro no sistema.
 * @param {Livro} livro - Instância ou objeto contendo os dados do livro.
 * @returns {Promise<boolean>} Retorna uma Promise resolvida em caso de sucesso ou rejeitada com erro.
 */
export function cadastrarLivro(livro) {
    return new Promise((resolve, reject) => {
        try {
            if (typeof localStorage === 'undefined') {
                throw new Error('O armazenamento local não está disponível.');
            }

            const livrosSalvos = localStorage.getItem('livrosCadastrados');
            const listaLivrosSalvos = livrosSalvos ? JSON.parse(livrosSalvos) : [];
            if (!Array.isArray(listaLivrosSalvos)) {
                throw new Error('A lista de livros salva não é válida.');
            }

            const todosLivros = [...livrosCadastrados, ...listaLivrosSalvos];
            const tituloNormalizado = String(livro?.titulo || '').trim().toLocaleLowerCase('pt-BR');

            if (!tituloNormalizado) {
                throw new Error('O título do livro é obrigatório.');
            }

            if (todosLivros.some((item) =>
                String(item?.titulo || '').trim().toLocaleLowerCase('pt-BR') === tituloNormalizado
            )) {
                throw new Error('Já existe um livro cadastrado com este título.');
            }

            localStorage.setItem('livrosCadastrados', JSON.stringify([...listaLivrosSalvos, livro]));
            resolve(true);
        } catch (erro) {
            reject(erro instanceof Error ? erro : new Error('Erro ao cadastrar livro. Tente novamente.'));
        }
    });
}