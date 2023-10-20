import { AutenticacaoDto } from '../DTOs/AutenticacaoDto' 
import { Conta } from '../../Domain/Entities/Conta'

export interface IAutenticacaoService {
    EfetuarLogin(conta: AutenticacaoDto): Promise<Conta> 
}