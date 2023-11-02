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

        return chave[0][0]
    }

}