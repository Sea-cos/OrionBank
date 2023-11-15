import { IExtratoRepository } from "../../../Domain/Interfaces/Extrato/IExtratoRepository";
import { ExtratoEnviadosRawQuery } from "../../../Domain/RawQuery/ExtratoEnviadosRawQuery";
import { ExtratoRecebidosRawQuery } from "../../../Domain/RawQuery/ExtratoRecebidosRawQuery";
import { connection } from "../../context/ConnectionString";


export class ExtratoRepository implements IExtratoRepository {

    async ObterMovimentacaoEnviados(codigoConta: string): Promise<Array<ExtratoEnviadosRawQuery>> {
        
        const sql = `SELECT
                        m.DtMovimento Data,
                        m.InfoAdicional Descricao,
                        m.TipoTransacao,
                        m.Valor,
                        m.CodigoContaDestino 
                    FROM
                        movimento m
                    INNER JOIN conta c
                    ON m.CodigoContaOrigem = c.Codigo
                    WHERE c.Codigo = ?`

        const movimento = await (await connection).query(
            sql,
            [
                codigoConta
            ]
        ) as any

        return movimento[0] as Array<ExtratoEnviadosRawQuery>

    }

    async ObterMovimentacaoRecebidos(codigoConta: string): Promise<Array<ExtratoRecebidosRawQuery>> {
        
        const sql = `SELECT
                        m.DtMovimento Data,
                        m.InfoAdicional Descricao,
                        m.TipoTransacao,
                        m.Valor,
                        m.CodigoContaOrigem 
                    FROM
                        movimento m
                    INNER JOIN conta c
                    ON m.CodigoContaDestino = c.Codigo
                    WHERE c.Codigo = ?`

        const movimento = await (await connection).query(
            sql,
            [
                codigoConta
            ]
        ) as any

        return movimento[0] as Array<ExtratoRecebidosRawQuery>

    }
    
}