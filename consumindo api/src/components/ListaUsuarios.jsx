import { useState, useEffect } from "react"; 


const UsuarioDetalhes = ({ usuario }) => {
    if (!usuario) return null; 
    return (
        <div>
            <h2>Detalhes do Usuário</h2>
            <p><strong>Nome:</strong> {usuario.name}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Telefone:</strong> {usuario.phone}</p>
            <p><strong>Empresa:</strong> {usuario.company.name}</p>
        </div>
    );
};


const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]); // armazenar a lista de usuários
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null); // armazenar o usuário selecionado
    const [carregando, setCarregando] = useState(true); // controlar o carregamento
    const [erro, setErro] = useState(null); // armazenar erros

    // buscar usuários ao montar o componente
    useEffect(() => {
        const obterUsuarios = async () => {
            try {
                const resposta = await fetch("https://jsonplaceholder.typicode.com/users"); // Faz a requisição GET
                if (!resposta.ok) {
                    throw new Error("Erro ao buscar usuários"); // Lança erro se a resposta não for OK
                }
                const dados = await resposta.json(); // Converte para JSON SE ESTIVER ERRADO 
                setUsuarios(dados); // Atualiza o estado com os dados dos usuários
            } catch (error) {
                setErro(error.message); // Atualiza o estado de erro
            } finally {
                setCarregando(false); // Define carregando como falso
            }
        };
        obterUsuarios(); // Chama a função para obter usuários
    }, []); 


    const selecionarUsuario = (usuario) => {
        setUsuarioSelecionado(usuario); // Atualiza o estado do usuário selecionado
    };

 
    return (
        <div>
            <h1>Lista de Usuários</h1>
            {carregando && <p>Carregando...</p>}
            {erro && <p>Erro: {erro}</p>} 
            <ul>
                {usuarios.map((usuario) => ( // Mapeia e exibe a lista de usuários
                    <li key={usuario.id} onClick={() => selecionarUsuario(usuario)}>
                        {usuario.name} 
                    </li>
                ))}
            </ul>
            <UsuarioDetalhes usuario={usuarioSelecionado} /> 
        </div>
    );
};

export default ListaUsuarios;
