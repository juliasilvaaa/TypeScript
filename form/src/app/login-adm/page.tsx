'use client'

import { useState } from "react";
import { LoginAdm } from "@/services/adm";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faTrash, faUser, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'



export default function LoginAdministrator() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin() {
    const autenticado = LoginAdm(email, senha);

    if (autenticado) {
      alert("Login realizado com sucesso!");

    } else {
      setErro("Email ou senha inválidos");
    }
  }

  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      {/* Imagem de fundo */}
      <img
        src="/img/background.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white w-[40%] bg-white h-[90%] rounded-2xl">
        <div className="relative w-full h-full flex justify-center items-center rounded-2xl">
          <img
            src="/img/onda.png"
            alt="waves"
            className="absolute inset-0 w-full h-full object-cover z-0 rounded-2xl" />
          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col items-center justify-center text-white w-full h-[80%] rounded-2xl">
            <div className="flex flex-col h-full justify-around p-5 w-[80%] items-center">
              <h1 className="text-2xl font-bold mb-4">Bem-vindo, Admin</h1>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex  text-white w-full items-center gap-5 p-2 justify-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-white w-5 h-5"
                  />
                  <input
                    type="text"
                    placeholder="Usuário"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 px-4 py-2 rounded text-white border-2 border-transparent border-b-white w-[80%]"
                  />
                </div>

                <div className="flex text-white w-full items-center gap-5 p-2 justify-center">
                  <FontAwesomeIcon
                    icon={faKey}
                    className="text-white w-5 h-5"
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="mb-4 px-4 py-2 rounded text-white border-2 border-transparent border-b-white w-[80%]"
                  />
                </div>

              </div>


              {erro && <p className="text-red-400 mb-2">{erro}</p>}

              <button
                className="bg-blue-600 px-6 py-2 rounded text-white"
                onClick={handleLogin}
              >
                <Link href="/home-adm">
                  Log in
                </Link>
              </button>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
}
