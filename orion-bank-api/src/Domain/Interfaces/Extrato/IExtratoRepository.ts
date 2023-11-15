import { ExtratoEnviadosRawQuery } from "../../RawQuery/ExtratoEnviadosRawQuery";
import { ExtratoRecebidosRawQuery } from "../../RawQuery/ExtratoRecebidosRawQuery";

export interface IExtratoRepository {
    ObterMovimentacaoEnviados(codigoConta: string) : Promise<Array<ExtratoEnviadosRawQuery>>
    ObterMovimentacaoRecebidos(codigoConta: string) : Promise<Array<ExtratoRecebidosRawQuery>>
}