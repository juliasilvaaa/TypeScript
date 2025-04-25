import "./globals.css"

// Importando os componentes
import { Header } from "";

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
