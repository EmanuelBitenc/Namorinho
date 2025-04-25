import { Mensagem, MensagemProps } from "../../domain/entities/Mensagem";
import { IMensagemRepository } from "../../domain/repositories/IMensagemRepository";

interface BuscarMensagemRequest {
  id: string;
}

interface BuscarMensagemResponse {
  mensagem: MensagemProps | null;
}

export class BuscarMensagemUseCase {
  constructor(private mensagemRepository: IMensagemRepository) {}

  async execute(
    request: BuscarMensagemRequest
  ): Promise<BuscarMensagemResponse> {
    const mensagem = await this.mensagemRepository.findById(request.id);

    return {
      mensagem: mensagem ? mensagem.toObject() : null,
    };
  }
}
