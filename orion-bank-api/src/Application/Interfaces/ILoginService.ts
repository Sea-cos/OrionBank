import { LoginDto } from '../DTOs/LoginDto' 
import { Conta } from '../../Domain/Entities/Conta'

export interface ILoginService {
    EfetuaLogin(conta: Conta): LoginDto
}