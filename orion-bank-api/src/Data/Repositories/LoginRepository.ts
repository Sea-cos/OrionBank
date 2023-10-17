import { Conta } from "../../Domain/Entities/Conta";
import { ILoginRepository } from "../../Domain/Interfaces/ILoginRepository";

export class LoginRepository implements ILoginRepository {
    EfetuarConsultaContaExistente(documentoFederal: string, senha: string): Conta {
        console.log("CHEGOOOOOOUUUUUUUUUUUUU");
        throw new Error("Method not implemented.");
    }
}