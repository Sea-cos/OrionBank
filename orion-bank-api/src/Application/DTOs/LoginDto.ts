


export class LoginDto {

    public Login: string;
    public Senha: string;

    constructor(login: string, senha: string) {
        this.Login = login;
        this.Senha = senha;
    }
}