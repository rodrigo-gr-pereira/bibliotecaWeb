export class Usuario {
    constructor(nome, genero, dataNascimento, cpf, telefone, email, senha, endereco) {
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