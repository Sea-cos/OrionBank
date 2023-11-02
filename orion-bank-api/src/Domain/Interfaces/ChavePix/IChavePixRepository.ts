import { ChavePix } from "../../Entities/ChavePix";


export interface IChavePixRepository {
    CriarChavePix(chavePix: ChavePix) : Promise<void>
    ObterChavePixPorChave(chavePix: string) : Promise<ChavePix>
    ObterChavepixPorCodigo(codigo: string) : Promise<ChavePix>
    ObterChavePixPorCodigoConta(codigoConta: string): Promise<Array<ChavePix>>
    InativarChavePix(codigo: string) : Promise<void>
}