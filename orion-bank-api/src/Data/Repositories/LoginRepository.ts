import { Conta } from "../../Domain/Entities/Conta";
import { IAutenticacaoRepository } from "../../Domain/Interfaces/IAutenticacaoRepository";

export class LoginRepository implements IAutenticacaoRepository {
    EfetuarConsultaContaExistente(documentoFederal: string, senha: string): Conta {
        console.log("CHEGOOOOOOUUUUUUUUUUUUU");
        throw new Error("Method not implemented.");
    }
}