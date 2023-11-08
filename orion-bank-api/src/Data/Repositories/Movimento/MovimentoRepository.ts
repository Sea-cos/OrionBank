import { Movimento } from "../../../Domain/Entities/Movimento";
import { IMovimentoRepository } from "../../../Domain/Interfaces/Movimento/IMovimentoRepository";
import { TipoTransacao } from "../../../Enums/TipoTransacao";
import { connection } from "../../context/ConnectionString";



export class MovimentoRepository implements IMovimentoRepository {

    async RealizarTransacaoPixViaChave(movimento: Movimento): Promise<void> {
        
        const parametros = [
            movimento.Codigo,
            movimento.CodigoContaOrigem,
            movimento.CodigoContaDestino,
            movimento.Valor,
            movimento.Chave_Pix,
            movimento.InfoAdicional,
            movimento.DescMovimento,
            movimento.TipoTransacao,
            movimento.DtMovimento
        ]

        const sql = `INSERT INTO movimento
                        (Codigo, CodigoContaOrigem, CodigoContaDestino, Valor, Chave_Pix, 
                            InfoAdicional, DescMovimento, TipoTransacao, DtMovimento)
                    VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?, ?)`

        await (await connection).query(
            sql,
            parametros
        )

    }

}