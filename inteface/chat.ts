// Importação ou definição das interfaces
interface Messages {
    role: "user" | "system" | "assistant";
    content: string;
}

interface Chat {
    id: number;
    model: string;
    messages: Messages[];
    generate: boolean;
}

interface AllChats {
    chats: Chat[];
}
// Função para carregar chats do localStorage
function carregarChats(): AllChats {
    const chatsSalvos = localStorage.getItem("chats");
    return chatsSalvos ? JSON.parse(chatsSalvos) : { chats: [] };
}

// Função para salvar chats no localStorage
function salvarChats(allChats: AllChats): void {
    localStorage.setItem("chats", JSON.stringify(allChats));
}

// Inicializa os chats verificando o localStorage
const allChats: AllChats = carregarChats();

// Função para criar um novo chat
function criarChat(model: string): Chat {
    const novoChat: Chat = {
        id: allChats.chats.length + 1, // Gera um ID incremental
        model: model,
        messages: [],
        generate: true
    };
    allChats.chats.push(novoChat);
    salvarChats(allChats);
    atualizarListaChats();
    return novoChat;
}

// Função para adicionar mensagem a um chat existente
function adicionarMensagem(chatId: number, mensagem: Messages): void {
    const chat = allChats.chats.find(c => c.id === chatId);
    if (!chat) {
        console.error(`Chat com ID ${chatId} não encontrado.`);
        return;
    }
    chat.messages.push(mensagem);
    salvarChats(allChats);
    atualizarMensagens(chatId);
}

// Função para listar chats na interface
function atualizarListaChats(): void {


    const chatList = document.getElementById("chatList") as HTMLUListElement;
    chatList.innerHTML = ""; // Limpa a lista antes de recriar

    allChats.chats.forEach(chat => {
        const listItem = document.createElement("li");
        listItem.textContent = `Chat ${chat.id} - ${chat.model}`;
        listItem.addEventListener("click", () => abrirChat(chat.id));
        chatList.appendChild(listItem);
    });
}

// Função para abrir um chat
function abrirChat(chatId: number): void {
    const chatContainer = document.getElementById("chatContainer") as HTMLDivElement;
    chatContainer.style.display = "block";
    chatContainer.dataset.chatId = chatId.toString();
    atualizarMensagens(chatId);
}

// Função para exibir mensagens na interface
function atualizarMensagens(chatId: number): void {
    const chat = allChats.chats.find(c => c.id === chatId);
    if (!chat) return;

    const messagesDiv = document.getElementById("messages") as HTMLDivElement;
    messagesDiv.innerHTML = ""; // Limpa antes de recriar

    chat.messages.forEach(msg => {
        const msgElement = document.createElement("p");
        msgElement.textContent = `[${msg.role}] ${msg.content}`;
        messagesDiv.appendChild(msgElement);
    });
}