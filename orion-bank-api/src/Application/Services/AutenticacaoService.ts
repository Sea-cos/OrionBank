import { Conta } from '../../Domain/Entities/Conta';
import { AutenticacaoDto } from '../DTOs/AutenticacaoDto';
import { IAutenticacaoService } from '../Interfaces/IAutenticacaoService'
import { IAutenticacaoRepository } from '../../Domain/Interfaces/IAutenticacaoRepository';
import { injected } from 'brandi';
import { AUTENTICACAO } from '../../Config/ApiDiConfig';

export class AutenticacaoService implements IAutenticacaoService {

    constructor(
        private autenticacaaoRepository: IAutenticacaoRepository,
    ){  }

    EfetuaLogin(conta: AutenticacaoDto): Conta {
        console.log("CHEGOUUUUUUUUUUUUUUUUUUUU");
        const telegrama = this.autenticacaaoRepository.EfetuarConsultaContaExistente(conta.Login, conta.Senha);
        
        return telegrama;
    }    
}

injected(AutenticacaoService, AUTENTICACAO.IRepository);