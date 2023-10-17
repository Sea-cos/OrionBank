import { Conta } from "../Entities/Conta";

export interface ILoginRepository {
    EfetuarConsultaContaExistente(documentoFederal: string, senha: string): Conta
}