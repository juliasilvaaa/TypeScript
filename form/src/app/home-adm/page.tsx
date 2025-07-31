'use client'
import { useState } from "react";
import Home from "@/components/home";
import Painel from "@/components/painel";
import Menu from "@/components/menu";
import Usuarios from "@/components/usuarios";
import Configurações from "@/components/configuracoes";

export default function PaginaComMenu() {
  const [secaoAtiva, setSecaoAtiva] = useState("home");

  const renderizarConteudo = () => {
    switch (secaoAtiva) {
      case "home":
        return <Home/>;
      case "painel":
        return <Painel/>;
      case "usuarios":
        return <Usuarios/>
      case "configuracoes":
        return <Configurações/>
      default:
        return <div>Seção inválida</div>;
    }
  };

  return (
    <div className="w-[100%] h-screen flex bg-gray-300">
   
          <Menu onSelecionar={setSecaoAtiva} />
      

    {renderizarConteudo()}
      </div>


  );
}
