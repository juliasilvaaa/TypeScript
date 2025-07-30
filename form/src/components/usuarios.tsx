'use client'

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faMagnifyingGlass, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { exibirUsuariosComImagemResumida, removerUsuario } from "@/services/user";
import '../css/admin.css'

type Pessoa = {
  id: number;
  nome: string;
  data_nascimento: string;
  email: string;
  imagem: string;
  cpf: string;
  telefone: string;
  genero: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  temNecessidadeEspecial: boolean;
  necessidades?: string[];
  outraDescricao?: string;
};

function calcularIdade(dataNascimento: string | undefined): number {
  if (!dataNascimento) return 0;
  const partes = dataNascimento.split("/");
  if (partes.length !== 3) return 0;

  const [dia, mes, ano] = partes;
  const nascimento = new Date(`${ano}-${mes}-${dia}`);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth() - nascimento.getMonth();

  if (mesAtual < 0 || (mesAtual === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Pessoa[]>([]);
  const [perfilSelecionado, setPerfilSelecionado] = useState<Pessoa | null>(null);
  const [confirmacao, setConfirmacao] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState<number | null>(null);

  // Criando estados para controlar a navegação
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 4
  // Calcular os usuarios
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina

  // Busca pelo Nome do usuario
  const [search, setSearch] = useState('')

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);
  const usuariosPaginados = usuariosFiltrados.slice(indiceInicial, indiceFinal);




  useEffect(() => {
    const usuariosSalvos = localStorage.getItem("usuarios");
    if (usuariosSalvos) {
      setUsuarios(JSON.parse(usuariosSalvos));
      console.log(exibirUsuariosComImagemResumida())
    }
  }, []);

  useEffect(() => {
    if (perfilSelecionado) {
      console.log("Perfil selecionado:", perfilSelecionado);
    }
  }, [perfilSelecionado]);

  function confirmarExclusao(id: number) {
    setUsuarioParaExcluir(id);
    setConfirmacao(true);
  }

  function excluirUsuario() {
    if (usuarioParaExcluir === null) return;
    // Remove do localStorage - supondo que "removerUsuario" faça isso
    removerUsuario(usuarioParaExcluir);

    // Atualiza lista local e fecha modal
    const novaLista = usuarios.filter(u => u.id !== usuarioParaExcluir);
    setUsuarios(novaLista);
    setPerfilSelecionado(null);
    setUsuarioParaExcluir(null);
    setConfirmacao(false);
  }

  return (
    <div className="bg-white h-[100vh] items-center justify-center">
      <div className="flex flex-col p-5 gap-5 w-full h-[100%] bg-white ">
        <div className="flex justify-between w-full h-[10%]">
          <h1 className="text-black font-bold text-2xl">Usuários</h1>
          <button className="w-30 h-10 bg-purple-900 rounded-xl text-white">
            Novo Usuário
          </button>
        </div>

        <div className="w-full flex flex-col h-full items-center justify-between gap-2">

          {!perfilSelecionado && (
            <div className="flex justify-between items-center w-full h-10 text-black">
              <h1>Usuários ({usuarios.length})</h1>
              <div className="flex items-center gap-5">
                <h1>Filtros (0)</h1>
                <div className="relative w-64">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(ev) => setSearch(ev.target.value)}
                    placeholder="Buscar"
                    className="w-full h-10 pl-10 pr-4 border border-black rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-800"
                  />
                </div>

              </div>
            </div>
          )}

          {perfilSelecionado ? (
            <div className="flex flex-col w-full h-full bg-white rounded-2xl border-2 border-black/20">
              <div className="w-full h-full flex">
                <div
                  className="w-[20%] flex flex-col items-center text-white p-4 relative rounded-l-lg"
                  style={{
                    backgroundImage: "url('../img/background.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                >
                  <div className="flex flex-col items-center w-full h-full gap-8 justify-center">
                    <img
                      src={
                        perfilSelecionado.imagem && perfilSelecionado.imagem.trim() !== ""
                          ? perfilSelecionado.imagem
                          : "../img/user.png"
                      }
                      alt="Foto do usuário"
                      className="w-24 h-24 object-cover rounded-full border-2 border-white mb-4"
                    />
                    <div className="flex flex-col items-center">
                      <p>{perfilSelecionado.nome}</p>
                      <p>{perfilSelecionado.email}</p>
                      <p>{perfilSelecionado.cpf}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent w-[80%] p-4 text-black flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h1 
                    id="title"
                    className="text-xl font-bold text-blue-900">Informações Pessoais</h1>
                    <div 
                    className="flex gap-5 items-center p-2">

                      <button className="cursor-pointer">
                        <FontAwesomeIcon icon={faPen} className="text-black w-5 h-5" />
                      </button>

                      <button
                        onClick={() => confirmarExclusao(perfilSelecionado.id)}
                        className="cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-black w-5 h-5" />
                      </button>

                      <button
                        className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        onClick={() => setPerfilSelecionado(null)}
                      >
                        Voltar
                      </button>
                    </div>
                  </div>

                  <div 
                  id="container-profile-user"
                  className="flex flex-col h-full gap-2">
                    <div className="w-full gap-2 flex flex-col">
                      <p><strong>ID: </strong>{perfilSelecionado.id}</p>
                      <p><strong>Nome: </strong>{perfilSelecionado.nome}</p>
                      <p><strong>E-mail: </strong>{perfilSelecionado.email}</p>
                      <p><strong>Telefone: </strong>{perfilSelecionado.telefone}</p>
                      <p><strong>Data de Nascimento: </strong>{perfilSelecionado.data_nascimento}</p>
                      <p><strong>CPF: </strong>{perfilSelecionado.cpf}</p>
                      <p><strong>Gênero: </strong>{perfilSelecionado.genero}</p>
                    </div>

                    <div className="w-full gap-2 flex flex-col">
                      <h1 className="text-xl font-bold text-blue-900">Endereço</h1>
                      <p><strong>CEP: </strong>{perfilSelecionado.cep || "Não Informado"}</p>
                      <p><strong>Logradouro: </strong>{perfilSelecionado.logradouro || "Não Informado"}</p>
                      <p><strong>Número: </strong>{perfilSelecionado.numero || "Não Informado"}</p>
                      <p><strong>Complemento: </strong>{perfilSelecionado.complemento || "Não Informado"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal de confirmação */}
              {confirmacao && (
                <div className="flex flex-col justify-around items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                z-50 bg-white border border-gray-300 text-gray-800 px-6 py-4 rounded shadow-lg 
                w-[90%] h-[50%] max-w-md text-center">
                  <FontAwesomeIcon icon={faCircleExclamation}
                    style={{ width: '60px', height: '60px' }}
                    className="text-red-500  h-full" />
                  <h2 className="text-xl font-bold mb-2 text-red-600">Tem certeza?</h2>
                  <p className="mb-4">Você realmente deseja excluir este usuário?</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={excluirUsuario}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Sim, excluir
                    </button>
                    <button
                      onClick={() => {
                        setConfirmacao(false);
                        setUsuarioParaExcluir(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="w-full overflow-auto h-[100%]">
              <table className="w-full table-auto h-[100%]">
                <thead className=" text-black">
                  <tr className=" text-center">

                    <th>ID</th>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosPaginados.map((pessoa) => (
                    <tr key={pessoa.id} className="hover:bg-gray-100 text-black text-center w-[100%]">

                      <td className="border border-gray-300 w-[10%]">{pessoa.id}</td>
                      <td className="border border-gray-30 w-[10%] text-center h-10">
                        <img
                          src={
                            pessoa.imagem && pessoa.imagem.trim() !== ""
                              ? pessoa.imagem
                              : "../img/user.png"
                          }
                          alt="Foto do usuário"
                          className="w-12 h-12 object-cover rounded-full mx-auto"
                        />
                      </td>
                      <td className="border border-gray-300 w-[10%]">
                        {pessoa.nome.length > 20 ? pessoa.nome.slice(0, 15) : pessoa.nome}
                      </td>
                      <td className="border border-gray-300 w-[10%]">{calcularIdade(pessoa.data_nascimento)}</td>
                      <td className="border border-gray-300 w-[20%]">{pessoa.email}</td>

                      <td className="border border-gray-300 w-[10%]">
                        {pessoa.cpf.length > 6 ? pessoa.cpf.slice(0, 6) + "***" : pessoa.cpf}
                      </td>

                      <td className="border border-gray-300 w-[20%]">
                        {pessoa.telefone.length > 10 ? pessoa.telefone.slice(0, 10) + "..." : pessoa.telefone || "Não Informado"}
                      </td>


                      <td className="border border-gray-300 w-[10%]">
                        <button
                          className="text-xl font-bold"
                          onClick={() => setPerfilSelecionado(pessoa)}
                        >
                          ⋮
                        </button>
                      </td>
                    </tr>
                  ))}
                  {usuarios.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center text-gray-400 py-4">
                        Nenhum usuário encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          )}


          {usuarios.length > itensPorPagina && (
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaAtual === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Anterior
              </button>

              {[...Array(totalPaginas)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPaginaAtual(index + 1)}
                  className={`px-3 py-1 rounded ${paginaAtual === index + 1 ? 'bg-purple-800 text-white' : 'bg-gray-200'}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
                disabled={paginaAtual === totalPaginas}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
