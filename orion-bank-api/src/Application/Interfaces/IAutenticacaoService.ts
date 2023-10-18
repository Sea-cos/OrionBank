import { AutenticacaoDto } from '../DTOs/AutenticacaoDto' 
import { Conta } from '../../Domain/Entities/Conta'

export interface IAutenticacaoService {
    EfetuaLogin(conta: AutenticacaoDto): Conta
}