import { Mensagem, MensagemProps } from "../../domain/entities/Mensagem";
import { IMensagemRepository } from "../../domain/repositories/IMensagemRepository";
import { generateUniqueId } from "../../utils/idGenerator";

interface CriarMensagemRequest {
  nome: string;
  para: string;
  mensagem: string;
  assinatura: string;
  corFundo: string;
}

interface CriarMensagemResponse {
  mensagemId: string;
}

export class CriarMensagemUseCase {
  constructor(private mensagemRepository: IMensagemRepository) {}

  async execute(request: CriarMensagemRequest): Promise<CriarMensagemResponse> {
    // Gerar ID único para a mensagem
    const mensagemId = generateUniqueId();

    const mensagem = new Mensagem({
      id: mensagemId,
      nome: request.nome,
      para: request.para,
      mensagem: request.mensagem,
      assinatura: request.assinatura,
      corFundo: request.corFundo,
    });

    await this.mensagemRepository.save(mensagem);

    return {
      mensagemId,
    };
  }
}
