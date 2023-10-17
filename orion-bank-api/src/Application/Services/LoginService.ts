import { Conta } from '../../Domain/Entities/Conta';
import { LoginDto } from '../DTOs/LoginDto';
import { ILoginService } from '../Interfaces/ILoginService'



export class LoginService implements ILoginService {
    
    EfetuaLogin(conta: Conta): LoginDto {
        throw new Error('Method not implemented.');
    }
    
}