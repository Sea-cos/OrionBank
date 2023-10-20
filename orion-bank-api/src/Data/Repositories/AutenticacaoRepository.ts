import { Conta } from "../../Domain/Entities/Conta";
import { connection } from "../../../context/ConnectionString"
import { IAutenticacaoRepository } from "../../Domain/Interfaces/IAutenticacaoRepository";
import { AutenticacaoDto } from "../../Application/DTOs/AutenticacaoDto";

export class AutenticacaoRepository implements IAutenticacaoRepository {

    async EfetuarConsultaContaExistente(conta: AutenticacaoDto): Promise<Conta> {
        
        const sql = `SELECT 
                        *
                    FROM
                        conta
                    WHERE (DocumentoFederal = ? AND Senha = MD5(?));`
        
        const teste = await (await connection).query(
            sql,
            [conta.Login, conta.Senha]) as unknown as Conta;

        return teste;
    }
}