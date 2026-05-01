const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Instrução Mestra M.A.C. V10 (O Cérebro)
const MAC_SYSTEM_PROMPT = `Você é o M.A.C. V10. Atue como humano experiente. 
REGRAS: Estilo WhatsApp, respostas curtas. Proibido dizer que é IA. 
PROTOCOLO: Use 'Vou providenciar' em vez de 'Vou ver'. 
LIMITES: Perfil D (2 frases), I/S (3 frases), C (4 frases).`;

export async function enviarMensagemMac(mensagemCliente) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Enviamos o Cérebro V10 + a Mensagem do Cliente
      body: JSON.stringify({
        prompt: `${MAC_SYSTEM_PROMPT}\n\nCliente: ${mensagemCliente}`
      }),
    });

    if (!response.ok) throw new Error('Erro na rede');
    
    const data = await response.json();
    return data.response; // Retorna a fala da IA (Llama 8B)
  } catch (error) {
    console.error("Erro no M.A.C.:", error);
    return "Vou confirmar essa informação agora e já retorno.";
  }
}

// Mantendo seu teste original por segurança
export async function testarMac() {
  const response = await fetch(`${API_URL}/teste`);
  return response.json();
}
