import { ChavePix } from "../../../Domain/Entities/ChavePix";
import { IChavePixRepository } from "../../../Domain/Interfaces/ChavePix/IChavePixRepository";
import { Situacao } from "../../../Enums/Situacao";
import { TipoChavePix } from "../../../Enums/TipoChavePix";
import { connection } from "../../context/ConnectionString";


export class ChavePixRepository implements IChavePixRepository {

    async CriarChavePix(chavePix: ChavePix): Promise<void> {
        
        const parametros = [
            chavePix.Codigo,
            chavePix.CodigoConta,
            chavePix.Chave_Pix,
            TipoChavePix[chavePix.TipoChave === 1 ? "DocumentoFederal" : chavePix.TipoChave === 2 ? "Email" : "Telefone"],
            Situacao.Ativa,
            new Date(),
            new Date()
        ]

        const sql = `INSERT INTO chave_pix
                        (Codigo, CodigoConta, Chave_Pix, TipoChave, Situacao, DtSituacao, DtInclusao)
                    VALUES
                        (?, ?, ?, ?, ?, ?, ?)`

        await (await connection).query(
            sql,
            parametros
        )

    }

}