import { ChavePixDto } from "../../DTOs/ChavePixDto";


export interface IChavePixService {
    CriarChavePix(chavePixDto: ChavePixDto) : Promise<void>
}