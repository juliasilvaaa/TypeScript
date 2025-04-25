// Criando um componente header 

import Link from "next/link";

export function Header() {
    return (
        <header>
            {/* Criando uma barra de navegação */}
            <div className="fle">
                <div>
                    <h1>
                        SBT
                    </h1>
                </div>


                <nav>
                    <ul>
                        <li>
                            <Link href=''>
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>


        </header>
    )
}