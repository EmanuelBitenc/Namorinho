"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MensagemProps } from "../../../domain/entities/Mensagem";
import { MensagemFactory } from "../../../interfaces/factories/MensagemFactory";

export default function VerMensagem() {
  const params = useParams();
  const id = params.id as string;
  const [mensagem, setMensagem] = useState<MensagemProps | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [animacaoCompleta, setAnimacaoCompleta] = useState(false);
  const [controller, setController] = useState<any>(null);

  useEffect(() => {
    // Inicializa o controller apenas no cliente
    setController(MensagemFactory.createMensagemController());
  }, []);

  useEffect(() => {
    if (!controller) return;

    const buscarMensagem = async () => {
      try {
        // Simulando um tempo de carregamento
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mensagemEncontrada = await controller.buscarMensagem(id);
        setMensagem(mensagemEncontrada);
      } catch (error) {
        console.error("Erro ao buscar mensagem:", error);
      } finally {
        setCarregando(false);

        // Iniciar animação após o carregamento
        setTimeout(() => {
          setAnimacaoCompleta(true);
        }, 500);
      }
    };

    if (controller) {
      buscarMensagem();
    }
  }, [id, controller]);

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 dark:from-purple-900 dark:to-pink-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Carregando mensagem especial...
          </p>
        </div>
      </div>
    );
  }

  if (!mensagem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 dark:from-purple-900 dark:to-pink-900 p-4">
        <div className="max-w-md w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Mensagem não encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Não foi possível encontrar a mensagem que você está procurando.
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Voltar para início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundColor: mensagem.corFundo,
        background: `linear-gradient(135deg, ${mensagem.corFundo}95, ${mensagem.corFundo})`,
      }}
    >
      <div
        className={`relative max-w-xl w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 mx-auto my-12 transition-all duration-1000 ${
          animacaoCompleta
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        <div
          className="absolute -top-4 -right-4 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse"
          style={{ animationDuration: "2s" }}
        >
          <span className="text-white text-2xl">❤️</span>
        </div>

        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Para</p>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {mensagem.para}
          </h1>
        </div>

        <div
          className={`relative mb-8 transition-all duration-1000 delay-500 ${
            animacaoCompleta
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        >
          <div className="absolute -left-3 top-0 text-5xl text-gray-300 dark:text-gray-700">
            "
          </div>
          <p className="relative z-10 text-gray-800 dark:text-gray-200 text-lg leading-relaxed pl-6 italic">
            {mensagem.mensagem}
          </p>
          <div className="absolute -right-3 bottom-0 text-5xl text-gray-300 dark:text-gray-700">
            "
          </div>
        </div>

        <div
          className={`text-right mt-10 transition-all duration-1000 delay-1000 ${
            animacaoCompleta
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        >
          <p className="text-gray-800 dark:text-gray-200 font-semibold">
            {mensagem.assinatura}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {mensagem.nome}
          </p>
        </div>
      </div>

      <div
        className={`mt-4 text-center transition-all duration-1000 delay-1500 ${
          animacaoCompleta ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors"
        >
          Voltar para início
        </Link>
        <p className="text-gray-500 dark:text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} Namorinho - Mensagens de amor
        </p>
      </div>
    </div>
  );
}
