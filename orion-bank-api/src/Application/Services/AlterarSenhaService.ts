import { IAlterarSenhaService } from "../Interfaces/IAlterarSenhaService";


export class AlterarSenhaService implements IAlterarSenhaService {

    async AtualizarSenha(codigo: string, novaSenha: string, senhaAntiga: string): Promise<void> {
        
        let th = this
        th.ValidarParametros(codigo, novaSenha, senhaAntiga)

    }


    private ValidarParametros(codigo: string, novaSenha: string, senhaAntiga: string) {

        const caracteresEspeciais = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        const numericosSenha = /\d/;
        const caracterMaiusculo = /[A-Z]/;

        if(novaSenha === null || novaSenha.trim() === "") {
            throw new Error("A nova senha é obrigatória.")
        }

        if(senhaAntiga === null || senhaAntiga.trim() === "") {
            throw new Error("A senha antiga é obrigatória.")
        }

        if(!caracteresEspeciais.test(novaSenha)) {
            throw new Error("A nova senha deve conter pelo menos 1 caracter especial.")
        }

        if(!numericosSenha.test(novaSenha)) {
            throw new Error("A nova senha deve conter pelo menos 1 dígito numérico.")
        }

        if(!caracterMaiusculo.test(novaSenha)) {
            throw new Error("A nova senha deve conter pelo menos uma letra maiúscula.")
        }

        if(codigo === null || codigo.trim() === "") {
            throw new Error("Error interno do servidor.")
        }
    }
    
}