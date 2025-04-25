import { BuscarMensagemUseCase } from "../../application/usecases/BuscarMensagemUseCase";
import { CriarMensagemUseCase } from "../../application/usecases/CriarMensagemUseCase";
import { MensagemRepository } from "../../infrastructure/repositories/MensagemRepository";
import { MensagemController } from "../controllers/MensagemController";

export class MensagemFactory {
  static createMensagemController(): MensagemController {
    const mensagemRepository = new MensagemRepository();
    const criarMensagemUseCase = new CriarMensagemUseCase(mensagemRepository);
    const buscarMensagemUseCase = new BuscarMensagemUseCase(mensagemRepository);

    return new MensagemController(criarMensagemUseCase, buscarMensagemUseCase);
  }
}
