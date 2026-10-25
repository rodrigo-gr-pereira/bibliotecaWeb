import { clearAuthUser, getAuthUser } from '../js/auth.js';
import { livrosCadastrados } from '../dados/livros-cadastrados.js';

document.addEventListener('DOMContentLoaded', () => {
  const usuario = getAuthUser();

  if (!usuario) {
    window.location.href = '../login/login.html';
    return;
  }

  const userNameEl = document.getElementById('nome-usuario-logado');
  if (userNameEl) {
    userNameEl.textContent = usuario.nome || usuario.email;
  }

  const totalLivros = livrosCadastrados.length;
  const livrosDisponiveis = livrosCadastrados.filter((livro) => livro.disponivel).length;
  const livrosIndisponiveis = totalLivros - livrosDisponiveis;
  
  const totalPaginas = livrosCadastrados.reduce((soma, livro) => soma + (Number(livro.paginas) || 0), 0);
  const mediaPaginas = totalLivros > 0 ? Number((totalPaginas / totalLivros).toFixed(2)) : 0;

  const totalLivrosEl = document.getElementById('total-livros');
  const livrosDisponiveisEl = document.getElementById('livros-disponiveis');
  const livrosIndisponiveisEl = document.getElementById('livros-indisponiveis');
  const totalPaginasEl = document.getElementById('total-paginas');
  const mediaPaginasEl = document.getElementById('media-paginas');

  if (totalLivrosEl) totalLivrosEl.textContent = String(totalLivros);
  if (livrosDisponiveisEl) livrosDisponiveisEl.textContent = String(livrosDisponiveis);
  if (livrosIndisponiveisEl) livrosIndisponiveisEl.textContent = String(livrosIndisponiveis);
  if (totalPaginasEl) totalPaginasEl.textContent = String(totalPaginas);
  if (mediaPaginasEl) mediaPaginasEl.textContent = String(mediaPaginas);

  const booksListEl = document.getElementById('livros-destaque');
  if (booksListEl) {
    const topLivros = livrosCadastrados.slice(0, 5);
    booksListEl.innerHTML = topLivros.length ? topLivros.map((livro) => `
      <div class="book-item">
        <div>
          <h4>${livro.titulo}</h4>
          <p>${livro.autor} · ${livro.categoria}</p>
        </div>
        <span class="status ${livro.disponivel ? 'available' : 'unavailable'}">
          ${livro.disponivel ? 'Disponível' : 'Indisponível'}
        </span>
      </div>
    `).join('') : '<p>Nenhum livro cadastrado.</p>';
  }

  const logoutButton = document.getElementById('btn-logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      clearAuthUser();
      window.location.href = '../login/login.html';
    });
  }
});
