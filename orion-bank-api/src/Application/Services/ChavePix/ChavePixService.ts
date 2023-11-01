import { ChavePixDto } from "../../DTOs/ChavePixDto";
import { IChavePixService } from "../../Interfaces/ChavePix/IChavePixService";

export class ChavePixService implements IChavePixService {

    async CriarChavePix(chavePix: ChavePixDto): Promise<void> {
        
        let th = this;
        th.ValidarParametros(chavePix)
    }

    private async ValidarParametros(chavePix: ChavePixDto) : Promise<void> {

        if(chavePix.Chave_Pix === null || chavePix.Chave_Pix.trim() === "") {
            throw new Error("A chave pix é obrigatória.")
        }

    }

}