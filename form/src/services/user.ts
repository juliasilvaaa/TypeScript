// Objetivo: Criar uma página para cadastro com todas as validações

import { Endereco, IUser } from "@/interfaces/inscription";
import { json } from "stream/consumers";

// -- Validações
// Nome: Minimo caracteres
// E-mail: RegExr - moldar um tipo de entrada @, qntd de caracteres
// Data Nascimento - Retornar a data formatada e idade minima (18)
// Gênero - Campo Opcional - Fornecer opções pro usuario selecionar
// Imagem de Perfil (Opcional) - Imagem local
// CPF - Validação e formatação para exibir
// Endereço (Opcional) - Formatação de CEP
// Telefone (Opcional) - Formatação BR
// Termos e condições (CheckBox) - Só há possibilidade de concluir o cadastro após aceitar os termos
// Necessidade Especial (Opcional - CheckBox) - Opções para selecionar

// -- Mensagens de Erro e Sucesso
// - Em cada campo
// - Erro no Cadastro e sucesso no Cadastro com modal

// Depois de concluir o cadastro direcionar para o perfil do usuario com suas informações

// -- Conceitos Usados
// - Replace (Objetivo principal substituir partes de string por outras, manipualando.)
// - New Date (Usada para criar um objeto de data e hora, sendo possível usar metódos para obter informações especificas ex:(getFullYear))
// - Console.warn (Usada para exibir mensagens de aviso no console do navegador)
// - localStorage (Permite armazenar dados de forma persistente)
// - RegExr - Expressões Regulares ()

// Lidando com a mudança do nome
export function handleNomeChange(nome: string): boolean {
  const minCaracteres = 3;

  const nomeValido = nome.length >= minCaracteres;
  return nomeValido;
}

// Validar Idade
export function validarIdade(data: string, idadeMinima = 18): boolean {
  const dataNascimento = new Date(data + "T00:00:00");
  const hoje = new Date();

  const dataMinima = new Date(
    hoje.getFullYear() - idadeMinima,
    hoje.getMonth(),
    hoje.getDate()
  );

  const isOldEnough = dataNascimento <= dataMinima;

  return isOldEnough;
}

// Formatando a data de nascimento (00/00/0000)
export function formatarDataNascimento(data: string): string {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0"); // Janeiro = 0
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

// Validando E-mail
export function validarEmail(email: string): boolean {
  const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Formatando Telefone
export function formatarTelefone(telefone: string): string {
  telefone = telefone.replace(/\D/g, "");

  // Formata os primeiros digitos como DDD, adicionando parenteses e espaço
  if (telefone.length > 0) {
    telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
  }
  // Formata os proximos 5 digitos com hifén
  if (telefone.length > 9) {
    telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");
  }

  // Como ele adiciona () e hifen conta como 14 caracteres
  const maxTelefone = 15;
  // Limitando a quantidade de caracteres para o usuario não digitar mais que o permitido
  if (telefone.length > maxTelefone) {
    console.log("Digite um numéro valido");
  }
  // Retornando o valor, para que o usuario visualize o telefone formatado
  return telefone;
}

// Validando Telefone
export function validarTelefone(telefone: string): boolean {
  telefone = telefone.replace(/\D/g, "");
  return telefone.length === 11;
}

// Lidando com o CEP
export function handleCEPChange(cep: string): string {
  // Remove tudo que não for número
  cep = cep.replace(/\D/g, "");

  // Aplica máscara se tiver pelo menos 5 dígitos
  if (cep.length > 5) {
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
  }

  // Limitando a quantidade de caracteres
  const qntdCep = 9;
  if (cep.length > qntdCep) {
    console.log("Digite um cep válido");
  }

  return cep;
}

// Função para formatar CPF no formato 000.000.000-00
export function formatarCpf(cpf: string): string {
  // Remove tudo que não for número
  cpf = cpf.replace(/\D/g, "");

  // Limita o tamanho para 11 dígitos
  cpf = cpf.slice(0, 11);

  // Aplica a formatação padrão
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para validar CPF com base nos dígitos verificadores
export function validarCpf(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, ""); // remove qualquer formatação

  if (!/^\d{11}$/.test(cpf)) return false;
  if (/^(\d)\1+$/.test(cpf)) return false; // rejeita CPFs com todos os dígitos iguais

  const calcularDigito = (cpf: string, pesoInicial: number): number => {
    let soma = 0;
    for (let i = 0; i < pesoInicial - 1; i++) {
      soma += parseInt(cpf.charAt(i)) * (pesoInicial - i);
    }
    const resto = (soma * 10) % 11;
    return resto >= 10 ? 0 : resto;
  };

  const d1 = calcularDigito(cpf, 10);
  const d2 = calcularDigito(cpf, 11);

  return d1 === parseInt(cpf.charAt(9)) && d2 === parseInt(cpf.charAt(10));
}

// Criando função para salvar o usuario localmente

export function salvarUsuario(usuario: IUser) {
  const usuariosSalvos = localStorage.getItem("usuarios");
  const listUsuarios: IUser[] = usuariosSalvos
    ? JSON.parse(usuariosSalvos)
    : [];

  const novoUsuario = {
    ...usuario,
    id: Date.now(), // gera ID único com base no timestamp atual
  };

  listUsuarios.push(novoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(listUsuarios));
  console.log("Usuário salvo com sucesso:", novoUsuario);
}

// Login com e-mail e cpf
export function Login(email: string, cpf: string): IUser | null {
  const usuariosSalvos = localStorage.getItem("usuarios");
  const listUsuarios: IUser[] = usuariosSalvos
    ? JSON.parse(usuariosSalvos)
    : [];

  // CPF e E-mail
  const usuarioEncontrado = listUsuarios.find(
    (usuario) => usuario.email === email && usuario.cpf === cpf
  );

  if (usuarioEncontrado) {
    console.log("Login bem-sucedido", usuarioEncontrado);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    return usuarioEncontrado;
  } else {
    console.log("E-mail ou cpf incorretos");
    return null;
  }
}

// Deletar Usuario

export function removerUsuario(id: number): void {
const usuariosSalvos = localStorage.getItem("usuarios");
const listUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

const novalist = listUsuarios.filter((usuario: any) => usuario.id  !== id);

localStorage.setItem("usuarios", JSON.stringify(novalist))

}

// Buscar pelo CEP
export async function buscarEnderecoPorCep(
  cep: string
): Promise<Endereco | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      console.warn("CEP não encontrado.");
      return null;
    }

    return data as Endereco;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
}

export function exibirUsuariosComImagemResumida() {
  const dados = localStorage.getItem("usuarios");

  if (dados) {
    const usuarios = JSON.parse(dados);

    usuarios.forEach((usuario: any, index: number) => {
      const imagemResumida = usuario.imagem
        ? usuario.imagem.slice(0, 30) + "..." + usuario.imagem.slice(-10)
        : "Sem imagem";

      console.log(`Usuário ${index + 1}:`);
      console.log(`Id: ${usuario.id}`);
      console.log(`  Nome: ${usuario.nome}`);
      console.log(`  Email: ${usuario.email}`);
      console.log(`  Imagem (resumida): ${imagemResumida}`);
    });
  }
}

// Exibir usuarios salvos

// export function exibirLocalStorage() {
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const value = localStorage.getItem("usuarios");
//     console.log(`Chave: ${key}, Valor: ${value}`);
//   }
// }

// exibirLocalStorage();
