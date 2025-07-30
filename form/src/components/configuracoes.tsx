import { IAdministrator } from '@/interfaces/adm';
import '../css/ajustes.css'
import { useState } from 'react';



export default function Configurações() {

    const [perfilAdm, setPerfilAdm] = useState<IAdministrator | null>(null);
    
    const adm = {
        nome: "Administradora Julia",
        email: "admin@sbt.com",
        telefone: "(11) 99999-9999",
        imagem: "/img/user.png"
    };

    return (
        <div className='flex flex-col gap-10 w-full h-full p-10 bg-white'>
            <h1 className="font-bold text-black text-2xl">Ajustes</h1>

            <div className='container-ajustes'>
                <div className='container-ajuste'>

                    <button
                        onClick={() => setPerfilAdm(adm)}
                        className="text-lg font-medium text-left w-full h-full"
                    >
                        Conta
                    </button>

                    {perfilAdm && (
                        <div
                            className="flex flex-col justify-around items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                z-50 bg-white border border-gray-300 text-gray-800 px-6 py-4 rounded shadow-lg 
                w-[90%] h-[50%] max-w-md text-center">
                            <img
                                src={perfilAdm.imagem}
                                alt="Foto do admin"
                                className="w-24 h-24 rounded-full object-cover border"
                            />
                            <div className="flex flex-col gap-1 text-black">
                                <p><strong>Nome:</strong> {perfilAdm.nome}</p>
                                <p><strong>Email:</strong> {perfilAdm.email}</p>
                                <p><strong>Telefone:</strong> {perfilAdm.telefone}</p>
                            </div>
                        </div>
                    )}

                </div>

                <div className="container-ajuste">
                    <h1 className="text-lg font-medium">Aparência</h1>

                    <select
                        name="aparencia" id="">
                        <option value="">Escuro</option>
                        <option value="Masculino">Claro</option>
                    </select>

                </div>


                <div className="container-ajuste">
                    <h1 className="text-lg font-medium">Acessibilidade</h1>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
                        <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 peer-checked:translate-x-full"></div>
                    </label>
                </div>

                <div className="container-ajuste">
                    <h1 className="text-lg font-medium">Notificações</h1>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
                        <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 peer-checked:translate-x-full"></div>
                    </label>
                </div>

            </div>

        </div>
    )
}