import { ChavePixRepository } from "../../../Data/Repositories/ChavePix/ChavePixRepository";
import { AbrirContaRepository } from "../../../Data/Repositories/CriarConta/AbrirContaRepository";
import { ChavePix } from "../../../Domain/Entities/ChavePix";
import { TipoChavePix } from "../../../Enums/TipoChavePix";
import { ChavePixDto } from "../../DTOs/ChavePixDto";
import { IChavePixService } from "../../Interfaces/ChavePix/IChavePixService";
import { v4 as uuidv4 } from "uuid";

export class ChavePixService implements IChavePixService {

    async CriarChavePix(chavePix: ChavePixDto): Promise<void> {
        
        let th = this;
        await th.ValidarParametros(chavePix)

        const chavePixRepository = new ChavePixRepository()
        const chave = await chavePixRepository.ObterChavePixPorChave(chavePix.Chave_Pix)
        if(chave) {
            throw new Error("Chave pix já existente.")
        }

        await chavePixRepository.CriarChavePix(th.DomainToDto(chavePix))
    }

    async ObterChavePixPorCodigoConta(codigoConta: string): Promise<Array<ChavePix>> {  

        if(codigoConta === null || codigoConta.trim() === "" || codigoConta.trim().length != 36) {
            throw new Error("Erro interno.")
        }

        const chavePixRepository = new ChavePixRepository()
        const chavesPix = await chavePixRepository.ObterChavePixPorCodigoConta(codigoConta)

        if(chavesPix.length === 0) {
            throw new Error("Não há chaves pix para está conta.")
        }
        return chavesPix
    }

    async InativarChavePix(codigo: string) : Promise<void> {

        if(codigo === null || codigo.trim() === "" || codigo.trim().length != 36) {
            throw new Error("Erro interno.")
        }

        const chavePixRepository = new ChavePixRepository()
        if(!await chavePixRepository.ObterChavepixPorCodigo(codigo)) {
            throw new Error("Chave Pix inválida.")
        }

        await chavePixRepository.InativarChavePix(codigo)
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
            throw new Error("Chave pix já existente.")
        }
    }

    private DomainToDto(chavePix: ChavePixDto) : ChavePix{
        return {
            Codigo: uuidv4(),
            CodigoConta: chavePix.CodigoConta,
            Chave_Pix: chavePix.Chave_Pix,
            TipoChave: chavePix.TipoChave
        } as ChavePix
    }
}