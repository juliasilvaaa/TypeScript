import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCakeCandles, faEnvelope, faIdCard, faLocationArrow, faLocationDot, faPhone, faThumbTack, faUser, faUsers, faUserTie, faVenusMars, faVoicemail } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';


import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
import { IUser } from '@/interfaces/inscription';
import { exibirUsuariosComImagemResumida } from '@/services/user';




export default function Home() {

    const [usuarios, setUsuarios] = useState<IUser[]>([])

    useEffect(() => {
        const usuariosSalvos = localStorage.getItem("usuarios");
        if (usuariosSalvos) {
            setUsuarios(JSON.parse(usuariosSalvos));
            console.log(exibirUsuariosComImagemResumida())
        }
    }, []);

    const usuariosG = [
        exibirUsuariosComImagemResumida.length
    ]

    return (
        <div className="items-center bg-gray-300 flex flex-col gap-10 w-full">

            <div className="flex w-full justify-between p-5">
                <h1 className="text-2xl font-bold mb-4">Welcome, Julia</h1>

                <p>Conteúdo do painel administrativo.</p>
            </div>


            <div className='flex w-full p-5 justify-around h-[60vh]'>


                {/* Grafico com valores de usuarios cadastrados na plataforma - Biblioteca */}
                <div className='flex w-[50%] bg-white p-2 items-center justify-center h-[60vh]'>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={usuariosG}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Usuários" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


                <div className='flex flex-col w-[50%] justify-between h-full items-center'>
                    <div className='bg-white w-[80%] h-30 rounded-2xl p-2 flex'>
                        <div className='flex flex-col w-[40%] justify-center items-start text-black'>
                            <FontAwesomeIcon icon={faUsers} className="text-black w-10 h-5" />
                            <h1>Usuarios</h1>
                        </div>

                        <h1>{usuarios.length}</h1>
                    </div>

                    <div className='bg-white w-[80%] h-30 rounded-2xl p-2 flex'>
                        <div className='flex flex-col'>
                            <FontAwesomeIcon icon={faUserTie} className="text-black w-5 h-5" />
                            <h1>Admins</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex w-full flex-col p-5 gap-5'>
                <h1 className='font-bold text-black'>Notificações</h1>


                <div className='bg-white w-full rounded-2xl flex justify-between p-2 items-center'>
                    <div className='flex gap-5 text-black'>
                        <div className='bg-red-400 w-10 h-10 rounded-full'>

                        </div>

                        <div className='flex flex-col'>
                            <h1>Usuário Excluído</h1>
                            <h1>ID Usuário: 123455</h1>
                        </div>
                    </div>


                    <div className='h-10 w-10'>
                        <img src="../../img/user.png" alt="" />
                    </div>

                </div>
            </div>

        </div>
    );
}
