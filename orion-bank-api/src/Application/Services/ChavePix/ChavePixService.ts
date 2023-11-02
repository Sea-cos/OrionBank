import { AbrirContaRepository } from "../../../Data/Repositories/CriarConta/AbrirContaRepository";
import { TipoChavePix } from "../../../Enums/TipoChavePix";
import { ChavePixDto } from "../../DTOs/ChavePixDto";
import { IChavePixService } from "../../Interfaces/ChavePix/IChavePixService";

export class ChavePixService implements IChavePixService {

    async CriarChavePix(chavePix: ChavePixDto): Promise<void> {
        
        let th = this;
        await th.ValidarParametros(chavePix)
    }

    private async ValidarParametros(chavePix: ChavePixDto) : Promise<void> {

        const tipoChave = TipoChavePix[chavePix.TipoChave === 1 ? "DocumentoFederal" 
                            : chavePix.TipoChave === 2 ? "Email" 
                            : chavePix.TipoChave === 3 ? "Telefone" 
                            : "Erro"
                        ]
        if(tipoChave === 99) {
            throw new Error("Tipo de chave inválida.")
        }

        if(chavePix.Chave_Pix === null || chavePix.Chave_Pix.trim() === "") {
            throw new Error("A chave pix é obrigatória.")
        }

        if(chavePix.CodigoConta === null || chavePix.CodigoConta.trim() === "") {
            throw new Error("Conta inválida.")
        }

        const contaRepository = new AbrirContaRepository()      
        if(await contaRepository.BuscarContaPorChavePix(chavePix.Chave_Pix, chavePix.CodigoConta)) {
            throw new Error("Chave pix inválida.")
        }
    }
}