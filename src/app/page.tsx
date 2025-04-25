import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-purple-900 dark:to-pink-900">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            Namorinho
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Expresse seu amor com uma mensagem secreta
          </p>
        </header>

        <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
                Declare seu amor de forma única
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Por apenas{" "}
                <span className="font-bold text-pink-600 dark:text-pink-400">
                  R$ 5,00
                </span>
                , você pode deixar uma mensagem especial para aquela pessoa que
                faz seu coração bater mais forte.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
                <li className="flex items-center">
                  <span className="mr-2 text-pink-500">❤️</span>
                  Mensagem totalmente personalizada
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-pink-500">🔒</span>
                  Link exclusivo para compartilhar
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-pink-500">✨</span>
                  Design romântico e especial
                </li>
              </ul>
              <Link
                href="/mensagem"
                className="w-full md:w-auto px-6 py-3 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Criar Mensagem Secreta
              </Link>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/40 to-purple-500/40"></div>
              <div className="h-full flex items-center justify-center p-8">
                <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg transform rotate-3 max-w-xs w-full">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-500 text-lg">❤️</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Exemplo
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 text-sm italic">
                    "Cada momento ao seu lado é como um sonho do qual eu nunca
                    quero acordar. Você é meu presente mais precioso. Te amo
                    infinitamente!"
                  </p>
                  <div className="mt-4 text-right">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      - Seu Admirador Secreto
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-12">
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl text-pink-500">1</span>
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-3">
                Pague
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Realize o pagamento de R$ 5,00 para desbloquear sua mensagem
                especial.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl text-pink-500">2</span>
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-3">
                Escreva
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Crie sua mensagem romântica com todo o seu coração.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl text-pink-500">3</span>
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-3">
                Compartilhe
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receba um link único para compartilhar com seu amor.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-24 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Namorinho - Todos os direitos
            reservados
          </p>
        </footer>
      </div>
    </div>
  );
}
