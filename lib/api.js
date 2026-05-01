import { supabase } from './supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * M.A.C. V10 - SISTEMA DE ALTA DISPONIBILIDADE (40 CAMADAS)
 */
const MAC_SYSTEM_PROMPT = `Você é o M.A.C. V10. Persona: Humano, Estratégico, Seguro.
PROIBIDO: Mencionar que é IA, usar "Sinto muito" ou "Infelizmente".
ESTILO: WhatsApp (curto/direto). Protocolo: "Vou providenciar".
LIMITES: D(2 frases), I/S(3 frases), C(4 frases).
ORDEM: Se o perfil DISC for identificado, adapte o tom imediatamente.`;

export async function enviarMensagemMac(mensagemCliente, whatsapp = 'Geral') {
  try {
    // [PRÉ-PROCESSAMENTO]
    const [contexto, produtos, cliente] = await Promise.all([
      supabase.from('empresa_contexto').select('*').single(),
      supabase.from('base_conhecimento').select('*').eq('em_estoque', true),
      supabase.from('memoria_mac').select('*').eq('whatsapp_cliente', whatsapp).single()
    ]);

    const infoCardapio = produtos.data?.map(p => `${p.item}: R$${p.valor}`).join(' | ') || "Consultar preços";
    const perfilAnterior = cliente.data?.perfil_disc || "Analisar agora";

    // [MONTAGEM DO CÉREBRO]
    const promptFinal = `
      ${MAC_SYSTEM_PROMPT}
      EMPRESA: ${contexto.data?.nome_fantasia || 'I Love Delícias'}
      CONHECIMENTO_ATUAL: ${infoCardapio}
      PERFIL_HISTORICO: ${perfilAnterior}
      ---
      CLIENTE DIZ: ${mensagemCliente}
    `;

    // [EXECUÇÃO]
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptFinal }),
    });

    if (!response.ok) throw new Error('Falha na Camada Cloudflare');
    const data = await response.json();
    const respostaIA = data.response || "Vou confirmar isso e já te falo.";

    // [PÓS-PROCESSAMENTO - PERSISTÊNCIA DISC]
    const perfilDetectado = detectarPerfilPorTom(respostaIA, perfilAnterior);
    await supabase.from('memoria_mac').upsert({
      whatsapp_cliente: whatsapp,
      perfil_disc: perfilDetectado,
      ultima_conversa: mensagemCliente,
      atualizado_em: new Date().toISOString()
    }, { onConflict: 'whatsapp_cliente' });

    return respostaIA;
  } catch (error) {
    console.error("ERRO M.A.C V10:", error);
    return "Vou organizar essa informação agora e já te retorno.";
  }
}

function detectarPerfilPorTom(texto, perfilAtual) {
  if (texto.length < 50) return 'D';
  if (texto.includes('?') || texto.includes('!')) return 'I';
  return perfilAtual || 'S';
}

export async function testarMac() {
  const response = await fetch(`${API_URL}/teste`);
  return response.json();
}
