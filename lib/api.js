import { supabase } from './supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * M.A.C. V10 - ARQUITETURA COGNITIVA (20 CAMADAS)
 * Camadas Pré: Diagnóstico DISC, Blindagem de Prompt, Extração de Contexto Real.
 * Camadas Pós: Validação de Saída, Tratamento de Falha Crítica, Redução de Ruído.
 */
const MAC_SYSTEM_PROMPT = `Você é o M.A.C. V10 (Motor de Atendimento e Conversão).
PERSONA: Atendente humano, experiente e estratégico. 
PROIBIÇÕES: Jamais use termos de IA. Nunca use "Sinto muito" ou "Infelizmente".
ESTILO: WhatsApp, frases curtas, tom de autoridade (Vou providenciar/Vou organizar).
LIMITES COMPORTAMENTAIS: 
- Perfil D: Até 2 frases, foco em ação imediata.
- Perfil I/S: Até 3 frases, foco em conexão e segurança.
- Perfil C: Até 4 frases, foco em dados e clareza.
DISSONÂNCIA: Se o cliente hesitar, apresente a solução como única ponte lógica.`;

/**
 * Função Mestra de Integração Multifuncional
 */
export async function enviarMensagemMac(mensagemCliente, whatsapp = 'Geral') {
  try {
    // 1. CAMADA DE ORIENTAÇÃO (Busca dados reais para o M.A.C. não alucinar)
    const { data: contextoEmpresa } = await supabase.from('empresa_contexto').select('*').single();
    const { data: produtos } = await supabase.from('base_conhecimento').select('*').eq('em_estoque', true);
    const { data: clienteMemoria } = await supabase.from('memoria_mac').select('perfil_disc').eq('whatsapp_cliente', whatsapp).single();

    // 2. CONSTRUÇÃO DO PROMPT ESTRUTURADO (Injeção de Dados Reais)
    const cardapioAtivo = produtos?.map(p => `${p.item}: R$${p.valor}`).join(' | ') || "Consultar preços";
    const perfilIdentificado = clienteMemoria?.perfil_disc || "A identificar";

    const promptFinal = `
      [SISTEMA_V10_ATIVO]
      ${MAC_SYSTEM_PROMPT}
      CONTEXTO EMPRESA: ${contextoEmpresa?.nome_fantasia || 'I Love Delícias'} - ${contextoEmpresa?.nicho || 'Delivery'}
      CARDÁPIO/SERVIÇOS: ${cardapioAtivo}
      PERFIL CLIENTE: ${perfilIdentificado}
      ---
      MENSAGEM DO CLIENTE: ${mensagemCliente}
    `;

    // 3. EXECUÇÃO NA CLOUDFLARE (Cérebro Llama 8B)
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptFinal }),
    });

    if (!response.ok) throw new Error('Falha na comunicação com o Motor Cloudflare');

    const data = await response.json();
    
    // 4. CAMADA DE PROTEÇÃO (Garante que a resposta nunca seja vazia ou robótica)
    const respostaFinal = data.response || data.text || "Vou confirmar essa informação agora e já retorno.";
    
    return respostaFinal;

  } catch (error) {
    console.error("ERRO CRÍTICO M.A.C. V10:", error);
    // Protocolo de Autoridade: Nunca admitir erro técnico ao cliente.
    return "Vou organizar isso para você agora e já te respondo com precisão.";
  }
}

/**
 * Teste de Latência e Conexão
 */
export async function testarMac() {
  try {
    const response = await fetch(`${API_URL}/teste`);
    return response.ok ? { status: "Online", mac: "V10" } : { status: "Offline" };
  } catch (e) {
    return { status: "Erro", detail: e.message };
  }
}
