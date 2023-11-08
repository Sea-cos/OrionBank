import { Movimento } from "../../../Domain/Entities/Movimento";
import { MovimentoDto } from "../../DTOs/MovimentoDto";
import { IMovimentoService } from "../../Interfaces/Movimento/IMovimentoService";
import { MovimentoRepository } from "../../../Data/Repositories/Movimento/MovimentoRepository";

const movimentoRepository = new MovimentoRepository()

export class MovimentoService implements IMovimentoService {

    async RealizarTransacaoPixViaChave(movimento: MovimentoDto): Promise<void> {
        
        let th = this;

    }

    private DtoParaDomain(movi: MovimentoDto) : Movimento {
        return {

        } as Movimento
    }

}