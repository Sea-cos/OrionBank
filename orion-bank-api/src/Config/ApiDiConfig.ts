import { token } from 'brandi'
import { IAutenticacaoService } from '../Application/Interfaces/IAutenticacaoService'
import { IAutenticacaoRepository } from '../Domain/Interfaces/IAutenticacaoRepository' 
import { AutenticacaoController } from '../API/Controllers/AutenticacaoController'

export const AUTENTICACAO = {
    Controller: token<AutenticacaoController>('Controller'),
    IService: token<IAutenticacaoService>('IService'),
    IRepository: token<IAutenticacaoRepository>('IRepository'),
}
