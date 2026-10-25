import { livrosCadastrados } from '../dados/livros-cadastrados.js';

/**
 * Calcula e retorna as estatísticas dos livros cadastrados no sistema.
 * @returns {Promise<Object>} Retorna uma Promise resolvida com o objeto de estatísticas ou rejeitada com um erro.
 */
export function exibirEstatisticas() {
    return new Promise((resolve, reject) => {
        try {
            // Obtém os livros do localStorage (caso haja cadastros dinâmicos) ou da lista padrão
            const livrosStorage = localStorage.getItem("livros");
            const livros = livrosStorage ? JSON.parse(livrosStorage) : (livrosCadastrados || []);

            if (!Array.isArray(livros)) {
                reject(new Error("Erro ao exibir estatísticas"));
                return;
            }

            const totalLivros = livros.length;
            let quantidadeDisponiveis = 0;
            let quantidadeIndisponiveis = 0;
            let totalPaginas = 0;

            // Percorre o array de livros calculando as métricas
            livros.forEach((livro) => {
                // Verifica a disponibilidade (considerando booleanos ou propriedades de status)
                const disponivel = livro.disponivel !== undefined ? livro.disponivel : true;

                if (disponivel) {
                    quantidadeDisponiveis++;
                } else {
                    quantidadeIndisponiveis++;
                }

                // Soma o número de páginas (suportando diferentes nomenclaturas comuns)
                const paginas = Number(livro.paginas || livro.numeroPaginas || 0);
                totalPaginas += paginas;
            });

            // Calcula a média de páginas por livro (arredondada para 2 casas decimais)
            const mediaPaginas = totalLivros > 0 ? Number((totalPaginas / totalLivros).toFixed(2)) : 0;

            // Objeto contendo os dados estatísticos solicitados
            const estatisticas = {
                totalLivros,
                quantidadeDisponiveis,
                quantidadeIndisponiveis,
                totalPaginas,
                mediaPaginas
            };

            resolve(estatisticas);
        } catch (erro) {
            reject(new Error("Erro ao exibir estatísticas"));
        }
    });
}