// Criando um componente header 
import Link from "next/link";

export function Header() {
    return (
        <header className="flex px-2 py-4 bg-black text-white">
            {/* Criando uma barra de navegação */}
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                <div>
                    <h1>
                        SBT
                    </h1>

                    <div className="align-center justify-center flex">
                                            <img className="w-10" src="../image/logo.png" alt="" />

                    </div>

                </div>


                <nav>
                    <ul className="flex items-center justify-center gap-2">
                        <li>
                            <Link href='/sobre'>
                                Sobre
                            </Link>
                        </li>

                        <li>
                            <Link href='/programas'>
                                Programas
                            </Link>
                        </li>
                        <li>
                            <Link href='/teste'>
                                Teste
                            </Link>
                        </li>


                    </ul>
                </nav>
            </div>


        </header>
    )
}