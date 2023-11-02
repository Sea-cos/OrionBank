import { ChavePix } from "../../Entities/ChavePix";


export interface IChavePixRepository {
    CriarChavePix(chavePix: ChavePix) : Promise<void>
    ObterChavePixPorChave(chavePix: string) : Promise<ChavePix>
}