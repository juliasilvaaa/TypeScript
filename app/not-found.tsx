// Criando arquivo para pagina NotFound

import Link from "next/link";

export default function NotFound(){
    return(
        <div>
            <h1>
                Pagina 404 não encontrada
            </h1>
            <p>
                Essa página não existe 
            </p>

           {/* Criando link para retornar para a home */}
            <Link href='/'>
            Voltar para a home
            </Link>
        </div>
    )
}