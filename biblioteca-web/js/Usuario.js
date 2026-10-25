export class Usuario {
    constructor(nome, genero, dataNascimento, cpf, telefone, email, senha, endereco) {
      // Gera um identificador único automático (UUID v4)
        this.id = window.crypto && window.crypto.randomUUID 
            ? window.crypto.randomUUID() 
            : 'user_' + Date.now() + Math.random().toString(36).substr(2, 9);
        this.nome = nome;
        this.genero = genero;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.endereco = endereco; // Objeto contendo: cep, estado, cidade, bairro, logradouro, numero, complemento
    }
}