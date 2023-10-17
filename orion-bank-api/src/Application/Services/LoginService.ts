import { Conta } from '../../Domain/Entities/Conta';
import { LoginDto } from '../DTOs/LoginDto';
import { ILoginService } from '../Interfaces/ILoginService'
import { ILoginRepository } from '../../Domain/Interfaces/ILoginRepository';

export class LoginService implements ILoginService {
    
    private _loginRepository: ILoginRepository

    constructor(loginRepository: ILoginRepository) {
        this._loginRepository = loginRepository;
    }

    EfetuaLogin(conta: LoginDto): Conta {
        console.log("CHEGOUUUUUUUUUUUUUUUUUUUU");
        const telegrama = this._loginRepository.EfetuarConsultaContaExistente(conta.Login, conta.Senha);
        
        return telegrama;
    }    
}