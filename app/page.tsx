import { Metadata } from "next"

export const metada: Metadata = {
  title: 'Aprendendo TypeScript',
  description: 'Aplicando conhecimentos TypeScript',
  openGraph: {
    title: 'Aprendendo',
    description: 'Aprendendo NextJS'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
}

export default function Home(){
  return(
    <div>
      <h1>
        Página Inicial
      </h1>
    </div>
  )
}