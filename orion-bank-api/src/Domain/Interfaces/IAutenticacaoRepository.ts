import { Conta } from "../Entities/Conta";

export interface IAutenticacaoRepository {
    EfetuarConsultaContaExistente(documentoFederal: string, senha: string): Conta
}