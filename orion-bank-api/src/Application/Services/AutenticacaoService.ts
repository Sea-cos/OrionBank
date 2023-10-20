import { Conta } from '../../Domain/Entities/Conta';
import { AutenticacaoDto, AutenticacaoTokenDto } from '../DTOs/AutenticacaoDto';
import { IAutenticacaoService } from '../Interfaces/IAutenticacaoService'
import { AutenticacaoRepository } from '../../Data/Repositories/LoginRepository';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export class AutenticacaoService implements IAutenticacaoService {

    async EfetuarLogin(conta: AutenticacaoDto): Promise<Conta> {

        const _autenticacaaoRepository = new AutenticacaoRepository()
        const [loginConta,] = await _autenticacaaoRepository.EfetuarConsultaContaExistente(conta) as any;

        console.log(loginConta)

        return loginConta as Conta;
    }
    
    private CriarTokenJWT(conta: Conta): AutenticacaoTokenDto {
        
        const secret = process.env.SECRET_JWT as string;
        const token = jwt.sign(
            {
                Nome: conta.NomeCompleto,
                Email: conta.Email
            }, 
            secret, 
            { expiresIn: '24h' }
        );

        const autenticador = {
            Token: token,
            Codigo: conta.Conta
        } as AutenticacaoTokenDto

        return autenticador;
    }
}

