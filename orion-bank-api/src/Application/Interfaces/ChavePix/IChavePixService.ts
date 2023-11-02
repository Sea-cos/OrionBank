import { ChavePix } from "../../../Domain/Entities/ChavePix";
import { ChavePixDto } from "../../DTOs/ChavePixDto";


export interface IChavePixService {
    CriarChavePix(chavePixDto: ChavePixDto) : Promise<void>
    ObterChavePixPorCodigoConta(codigoConta: string): Promise<Array<ChavePix>>
    InativarChavePix(codigo: string) : Promise<void>
}