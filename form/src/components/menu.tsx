import '../css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faDashboard, faGear, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';


// components/Menu.tsx
type Props = {
  onSelecionar: (secao: string) => void;
};


// Menu com navegação
export default function Menu({ onSelecionar }: Props) {
  return (
    <div className="h-full text-black fixed w-[20%] flex flex-col bg-gray-200 gap-10 justify-between p-5">

      <div className='flex flex-col gap-10'>
        <div className='flex w-full h-20 items-center gap-2 p-2 justify-between'>
          <div className='flex items-center gap-2 w-full'>
            <div className='h-10 w-10'>
              <img
                className='h-full w-full object-cover rounded-full'
                src="../img/virginia.png" alt="" />
            </div>

            <h1 className='font-bold'>Júlia Silva</h1>
          </div>

          <FontAwesomeIcon icon={faAngleDown}
            style={{ width: '20px', height: '20px' }}
            className="text-black  h-full" />
        </div>

        <ul className="space-y-4  w-full flex flex-col gap-5">

          <div className='container-secao'>
            <div className='container-secao-img'>
              <FontAwesomeIcon icon={faHouse}
                style={{ width: '20px', height: '20px' }}
                className="text-black  h-full" />
            </div>

            <li onClick={() => onSelecionar('home')}>Home</li>

          </div>

          <div className='container-secao'>
            <div className='container-secao-img'>
              <FontAwesomeIcon icon={faDashboard}
                style={{ width: '20px', height: '20px' }}
                className="text-black  h-full" />
            </div>
            <li onClick={() => onSelecionar('painel')}>Painel</li>

          </div>

          <div className='container-secao'>
            <div className='container-secao-img'>
              <FontAwesomeIcon icon={faUsers}
                style={{ width: '20px', height: '20px' }}
                className="text-black  h-full" />
            </div>
            <li onClick={() => onSelecionar('usuarios')}>Usuarios</li>

          </div>

          <div className='container-secao'>
            <div className='container-secao-img'>
              <FontAwesomeIcon icon={faGear}
                style={{ width: '20px', height: '20px' }}
                className="text-black  h-full" />
            </div>
            <li onClick={() => onSelecionar('configuracoes')}>Configurações</li>

          </div>


        </ul>
      </div>


      <div className='w-full flex justify-center h-8'>
        <button className='w-[50%] bg-gray-400 rounded-xl text-white font-bold h-full'>
          <Link href="/login-adm">
            Sair
          </Link>
        </button>
      </div>

    </div>
  );
}
