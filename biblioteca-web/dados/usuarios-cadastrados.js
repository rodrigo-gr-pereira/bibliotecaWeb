export const usuariosCadastrados = [
    {
        id: 1,
        nome: 'Lucas Henrique Martins',
        genero: 'Masculino',
        dataNascimento: '2002-05-18',
        cpf: '123.456.789-00',
        telefone: '(11) 98888-1234',
        email: 'lucas.martins@email.com',
        cep: '01001-000',
        cidade: 'São Paulo',
        estado: 'SP',
        logradouro: 'Praça da Sé',
        numero: '100',
        complemento: 'Apto 12',
        bairro: 'Sé'
    },
    {
        id: 2,
        nome: 'Beatriz Fernanda Oliveira',
        genero: 'Feminino',
        dataNascimento: '2001-11-27',
        cpf: '987.654.321-00',
        telefone: '(11) 97777-5678',
        email: 'beatriz.oliveira@email.com',
        cep: '13010-000',
        cidade: 'Campinas',
        estado: 'SP',
        logradouro: 'Rua Barreto Leme',
        numero: '250',
        complemento: 'Casa',
        bairro: 'Centro'
    }
];

const STORAGE_KEY = 'usuariosCadastrados';

function readStoredUsers() {
    if (typeof localStorage === 'undefined') {
        return [];
    }

    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (!storedUsers) {
        return [];
    }

    let parsedUsers;
    try {
        parsedUsers = JSON.parse(storedUsers);
    } catch (error) {
        console.error('Erro ao ler usuários cadastrados:', error);
        throw new Error('A lista de usuários salva não é válida.');
    }

    if (!Array.isArray(parsedUsers)) {
        throw new Error('A lista de usuários salva não é válida.');
    }
    return parsedUsers;
}

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function normalizeCpf(cpf) {
    return String(cpf || '').replace(/\D/g, '');
}

export function inserirUsuario(usuario) {
    if (!usuario || typeof usuario !== 'object') {
        throw new Error('Os dados do usuário são inválidos.');
    }
    if (typeof localStorage === 'undefined') {
        throw new Error('O armazenamento local não está disponível.');
    }

    const usuariosSalvos = readStoredUsers();
    const todosUsuarios = [...usuariosCadastrados, ...usuariosSalvos];
    const email = normalizeEmail(usuario.email);
    const cpf = normalizeCpf(usuario.cpf);

    if (email && todosUsuarios.some((existente) => normalizeEmail(existente.email) === email)) {
        throw new Error('Já existe um usuário cadastrado com este e-mail.');
    }
    if (cpf && todosUsuarios.some((existente) => normalizeCpf(existente.cpf) === cpf)) {
        throw new Error('Já existe um usuário cadastrado com este CPF.');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...usuariosSalvos, usuario]));
    return true;
}

export function listarUsuarios() {
    const usuariosSalvos = readStoredUsers();
    const emails = new Set();
    const cpfs = new Set();

    return [...usuariosCadastrados, ...usuariosSalvos].filter((usuario) => {
        const email = normalizeEmail(usuario?.email);
        const cpf = normalizeCpf(usuario?.cpf);
        if ((email && emails.has(email)) || (cpf && cpfs.has(cpf))) {
            return false;
        }
        if (email) emails.add(email);
        if (cpf) cpfs.add(cpf);
        return true;
    });
}
