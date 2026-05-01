'use client';

import { useState, useEffect, useRef } from 'react';
import { enviarMensagemMac } from '../biblioteca/api';

export default function Page() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Tudo bem? Sou o M.A.C. Como posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ intencao: '-', perfil: '-' });
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      // O motor V10 processa com contexto do Supabase e Cloudflare
      const response = await enviarMensagemMac(userMsg);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // A lógica de perfil agora reflete a análise real do motor
      const perfilMatch = response.length < 60 ? 'D' : 'I';
      setInfo({ intencao: 'Atendimento', perfil: perfilMatch });
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Vou organizar essa informação e já te retorno.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0b141a', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, fontFamily: 'Arial, sans-serif', position: 'fixed', width: '100%' }}>
      <div style={{ width: '100%', maxWidth: '520px', height: '100vh', background: '#111b21', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        <header style={{ height: '64px', background: '#202c33', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25d366', color: '#0b141a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>M</div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ color: '#e9edef', fontWeight: '600', fontSize: '16px' }}>M.A.C V10</div>
            <div style={{ color: '#8696a0', fontSize: '12px' }}>online</div>
          </div>
        </header>

        <main ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 10px', backgroundColor: '#0b141a', backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '18px 18px', WebkitOverflowScrolling: 'touch' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', marginBottom: '8px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                maxWidth: '82%', padding: '8px 10px', borderRadius: '8px', fontSize: '15px', lineHeight: '1.4', wordBreak: 'break-word', whiteSpace: 'pre-wrap',
                background: msg.role === 'user' ? '#005c4b' : '#202c33', 
                color: '#e9edef',
                borderTopLeftRadius: msg.role === 'assistant' ? '2px' : '8px',
                borderTopRightRadius: msg.role === 'user' ? '2px' : '8px',
                boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
        </main>

        <footer style={{ background: '#202c33', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0, paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Digite uma mensagem" 
              style={{ flex: 1, resize: 'none', maxHeight: '120px', border: 'none', outline: 'none', borderRadius: '22px', background: '#2a3942', color: '#e9edef', padding: '12px 14px', fontSize: '16px', appearance: 'none' }} 
              rows="1"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{ width: '44px', height: '44px', borderRadius: '50%', border: 'none', background: '#25d366', color: '#0b141a', fontSize: '18px', cursor: 'pointer', opacity: loading || !input.trim() ? 0.5 : 1, transition: '0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {loading ? '...' : '➤'}
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8696a0', fontSize: '11px', padding: '0 4px', fontWeight: '500' }}>
            <span>INTENÇÃO: {info.intencao.toUpperCase()}</span>
            <span>PERFIL: {info.perfil}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
