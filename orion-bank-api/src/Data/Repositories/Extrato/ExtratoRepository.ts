import { IExtratoRepository } from "../../../Domain/Interfaces/Extrato/IExtratoRepository";
import { ExtratoMovimentoRawQuery } from "../../../Domain/RawQuery/ExtratoMovimentoRawQuery";
import { connection } from "../../context/ConnectionString";


export class ExtratoRepository implements IExtratoRepository {

    async ObterMovimentacao(codigoConta: string, dataInicio: Date, dataFim: Date): Promise<Array<ExtratoMovimentoRawQuery>> {
        
        const parametros = [
            codigoConta,
            codigoConta,
            dataInicio,
            dataFim
        ]

        const sql = `SELECT
                        DtMovimento Data,
                        InfoAdicional Descricao,
                        TipoTransacao,
                        FORMAT(Valor, 2) AS Valor,
                        CodigoContaDestino,
                        CodigoContaOrigem
                    FROM
                        movimento
                    WHERE (
                        CodigoContaOrigem = ?
                    OR 
                        CodigoContaDestino = ? )
                    AND 
                        DtMovimento BETWEEN ? AND ?
                    ORDER BY
                        DtMovimento DESC`

        const movimento = await (await connection).query(
            sql,
            parametros
        ) as any

        return movimento[0] as Array<ExtratoMovimentoRawQuery>

    }    
}