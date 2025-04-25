import { BuscarMensagemUseCase } from "../../application/usecases/BuscarMensagemUseCase";
import { CriarMensagemUseCase } from "../../application/usecases/CriarMensagemUseCase";
import { MensagemProps } from "../../domain/entities/Mensagem";

export interface FormState {
  nome: string;
  para: string;
  mensagem: string;
  assinatura: string;
  corFundo: string;
  mostrarFormaPagamento: boolean;
  pagamentoCompleto: boolean;
  mensagemId: string;
  processandoPagamento?: boolean;
}

export class MensagemController {
  constructor(
    private readonly criarMensagemUseCase: CriarMensagemUseCase,
    private readonly buscarMensagemUseCase: BuscarMensagemUseCase
  ) {}

  async criarMensagem(data: {
    nome: string;
    para: string;
    mensagem: string;
    assinatura: string;
    corFundo: string;
  }): Promise<string> {
    const result = await this.criarMensagemUseCase.execute({
      nome: data.nome,
      para: data.para,
      mensagem: data.mensagem,
      assinatura: data.assinatura,
      corFundo: data.corFundo,
    });

    return result.mensagemId;
  }

  async buscarMensagem(id: string): Promise<MensagemProps | null> {
    const result = await this.buscarMensagemUseCase.execute({ id });
    return result.mensagem;
  }

  // Método para simular pagamento (em uma implementação real, seria integração com gateway)
  async simularPagamento(): Promise<boolean> {
    // Simula espera de processamento
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return true;
  }
}
