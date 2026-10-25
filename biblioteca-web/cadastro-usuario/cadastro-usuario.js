import { clearAuthUser, getAuthUser } from '../js/auth.js';
import { inserirUsuario } from '../dados/usuarios-cadastrados.js';

function parseBirthDate(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = getAuthUser();
  if (!usuarioLogado) {
    window.location.href = '../login/login.html';
    return;
  }

  const nameElement = document.getElementById('nome-usuario-logado');
  if (nameElement) {
    nameElement.textContent = usuarioLogado.nome || usuarioLogado.email || 'Usuário';
  }

  const logoutButton = document.getElementById('btn-logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      clearAuthUser();
      window.location.href = '../login/login.html';
    });
  }

  const form = document.getElementById('form-cadastro-usuario');
  if (!form) {
    console.error('Formulário de cadastro de usuário não encontrado.');
    return;
  }

  const cepInput = document.getElementById('cep');
  if (cepInput) {
    cepInput.addEventListener('blur', async () => {
      const cep = cepInput.value.replace(/\D/g, '');
      if (cep.length !== 8) {
        return;
      }

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
          throw new Error(`Consulta de CEP falhou com status ${response.status}.`);
        }

        const endereco = await response.json();
        if (endereco.erro) {
          alert('CEP não encontrado.');
          return;
        }

        document.getElementById('logradouro').value = endereco.logradouro || '';
        document.getElementById('bairro').value = endereco.bairro || '';
        document.getElementById('cidade').value = endereco.localidade || '';
        document.getElementById('estado').value = endereco.uf || '';
        document.getElementById('numero').focus();
      } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        alert('Não foi possível consultar o CEP. Preencha o endereço manualmente.');
      }
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const genero = document.getElementById('genero').value;
    const dataNascStr = document.getElementById('dataNascimento').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const logradouro = document.getElementById('logradouro').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const complemento = document.getElementById('complemento').value.trim();
    const bairro = document.getElementById('bairro').value.trim();

    if (
      !nome || !genero || !dataNascStr || !cpf || !telefone || !email ||
      !cep || !cidade || !estado || !logradouro || !numero || !bairro
    ) {
      alert('Por favor, preencha todos os campos obrigatórios antes de cadastrar.');
      return;
    }

    if (nome.length < 4 || nome.length > 80) {
      alert('O nome completo deve ter entre 4 e 80 caracteres.');
      return;
    }

    const dataNascimento = parseBirthDate(dataNascStr);
    const dataMinima = new Date(1900, 0, 1);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    if (!dataNascimento || dataNascimento <= dataMinima || dataNascimento >= dataAtual) {
      alert('Informe uma data válida posterior a 01/01/1900 e anterior à data atual, no formato DD/MM/AAAA.');
      return;
    }

    const apenasNumeros = /^\d+$/;
    if (
      !apenasNumeros.test(cpf) ||
      !apenasNumeros.test(telefone) ||
      !apenasNumeros.test(cep) ||
      !apenasNumeros.test(numero)
    ) {
      alert('CPF, telefone, CEP e número devem conter apenas números.');
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      genero,
      dataNascimento: `${dataNascimento.getFullYear()}-${String(dataNascimento.getMonth() + 1).padStart(2, '0')}-${String(dataNascimento.getDate()).padStart(2, '0')}`,
      cpf,
      telefone,
      email,
      cep,
      cidade,
      estado,
      logradouro,
      numero,
      complemento,
      bairro
    };

    try {
      inserirUsuario(novoUsuario);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Não foi possível cadastrar o usuário.');
      return;
    }

    alert('Usuário cadastrado com sucesso!');
    form.reset();
  });
});
