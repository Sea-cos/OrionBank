import { ChavePix } from "../../../Domain/Entities/ChavePix";
import { IChavePixRepository } from "../../../Domain/Interfaces/ChavePix/IChavePixRepository";
import { Situacao } from "../../../Enums/Situacao";
import { connection } from "../../context/ConnectionString";


export class ChavePixRepository implements IChavePixRepository {

    async CriarChavePix(chavePix: ChavePix): Promise<void> {
        
        const parametros = [
            chavePix.Codigo,
            chavePix.CodigoConta,
            chavePix.Chave_Pix,
            chavePix.TipoChave,
            Situacao.Ativa,
            new Date(),
            new Date()
        ]

        const sql = `INSERT INTO chave_pix
                        (Codigo, CodigoConta, ChavePix, TipoChave, Situacao, DtSituacao, DtInclusao)
                    VALUES
                        (?, ?, ?, ?, ?, ?, ?)`

        await (await connection).query(
            sql,
            parametros
        )

    }

    async ObterChavePixPorChave(chavePix: string) : Promise<ChavePix> {

        const sql = `SELECT *
                    FROM 
                        chave_pix
                    WHERE
                        ChavePix = ?`

        const chave = await (await connection).query(
                        sql,
                        [
                            chavePix
                        ]
                    ) as any

        return chave[0][0] as ChavePix
    }

    async ObterChavePixPorCodigoConta(codigoConta: string): Promise<Array<ChavePix>> {

        const sql = `SELECT *
                    FROM 
                        chave_pix
                    WHERE
                        CodigoConta = ?`

        const chavesPix = await (await connection).query(
                            sql,
                            [
                                codigoConta
                            ]
                        ) as any

        return chavesPix[0] as Array<ChavePix>

    }

    async ObterChavepixPorCodigo(codigo: string) : Promise<ChavePix> {

        const sql = `SELECT *
                    FROM
                        chave_pix
                    WHERE
                        Codigo = ?`

        const chavePix = await (await connection).query(
                            sql,
                            [
                                codigo
                            ]
                        ) as any

        return chavePix[0][0] as ChavePix

    }

    async InativarChavePix(codigo: string) : Promise<void> {

        const parametros = [
            Situacao.Inativa,
            codigo
        ]

        const sql = `UPDATE chave_pix
                    SET
                        Situacao = ?
                    WHERE
                        Codigo = ?`

        await (await connection).query(
            sql,
            parametros
        )

    }

}