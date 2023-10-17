import { Conta } from '../../Domain/Entities/Conta';
import { AutenticacaoDto } from '../DTOs/AutenticacaoDto';
import { IAutenticacaoService } from '../Interfaces/IAutenticacaoService'
import { IAutenticacaoRepository } from '../../Domain/Interfaces/IAutenticacaoRepository';

export class AutenticacaoService implements IAutenticacaoService {
    
    private _loginRepository: IAutenticacaoRepository

    constructor(loginRepository: IAutenticacaoRepository) {
        this._loginRepository = loginRepository;
    }

    EfetuaLogin(conta: AutenticacaoDto): Conta {
        console.log("CHEGOUUUUUUUUUUUUUUUUUUUU");
        const telegrama = this._loginRepository.EfetuarConsultaContaExistente(conta.Login, conta.Senha);
        
        return telegrama;
    }    
}