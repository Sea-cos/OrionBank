import { AlterarSenhaRepository } from "../../Data/Repositories/AlterarSenhaRepository";
import { IAlterarSenhaService } from "../Interfaces/IAlterarSenhaService";


export class AlterarSenhaService implements IAlterarSenhaService {

    async AtualizarSenha(codigo: string, senha: string): Promise<void> {
        
        let th = this
        th.ValidarParametros(codigo, senha)

        const alterarSenhaRepository = new AlterarSenhaRepository()
        await alterarSenhaRepository.AtualizarSenha(codigo, senha)
    }


    private ValidarParametros(codigo: string, novaSenha: string) {

        const caracteresEspeciais = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        const numericosSenha = /\d/;
        const caracterMaiusculo = /[A-Z]/;

        if(novaSenha === null || novaSenha.trim() === "") {
            throw new Error("Senha é obrigatória.")
        }

        if(!caracteresEspeciais.test(novaSenha)) {
            throw new Error("Senha deve conter pelo menos 1 caracter especial.")
        }

        if(!numericosSenha.test(novaSenha)) {
            throw new Error("Senha deve conter pelo menos 1 dígito numérico.")
        }

        if(!caracterMaiusculo.test(novaSenha)) {
            throw new Error("Senha deve conter pelo menos uma letra maiúscula.")
        }

        if(codigo === null || codigo.trim() === "" || codigo.trim().length != 36) {
            throw new Error("Error interno do servidor.")
        }
    }
    
}