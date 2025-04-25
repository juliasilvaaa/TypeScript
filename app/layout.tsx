// Layout Global 
import "./globals.css"

// Importando os componentes
import { Header } from "./components/header";
import { Metadata } from "next";

export const metada: Metadata = {
  title: 'Aprendendo NextJS',
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`antialised`}>
       
       <Header/>
 
   {/* Contéudo das paginas */}
        {children}

        <footer>
         <h1>
          Confira mais!
         </h1>
        </footer>
      </body>
    </html>
  );
}
