"use client";

import { useState } from "react";

export default function Page() {
  const [msg, setMsg] = useState("");
  const [resposta, setResposta] = useState(null);
  const [loading, setLoading] = useState(false);

  const enviarMensagem = async () => {
    if (!msg.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("https://mac-backend-zs62.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          empresa_id: 1,
          nome: "Cliente Teste",
          telefone: "31999999999",
          canal: "whatsapp",
          mensagem: msg
        })
      });

      const data = await res.json();
      setResposta(data);
    } catch (error) {
      setResposta({
        resposta: "Erro ao conectar com o backend.",
        analiseMensagem: {
          intencaoDetectada: "-",
          perfilHipotese: "-",
          estrategia: "-"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>M.A.C Painel de Teste</h1>

      <p>Envie uma mensagem para o M.A.C</p>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Digite a pergunta do cliente"
        style={{ width: 400, padding: 10 }}
      />

      <button
        onClick={enviarMensagem}
        style={{ marginLeft: 10, padding: 10 }}
      >
        Enviar
      </button>

      {loading && <p>Processando...</p>}

      {resposta && (
        <div style={{ marginTop: 40 }}>
          <h2>Resposta do M.A.C</h2>

          <div
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxWidth: "900px",
              lineHeight: 1.6
            }}
          >
            {resposta.resposta}
          </div>

          <h3>Intenção detectada</h3>
          <p>{resposta?.analiseMensagem?.intencaoDetectada || "-"}</p>

          <h3>Perfil DISC</h3>
          <p>{resposta?.analiseMensagem?.perfilHipotese || "-"}</p>

          <h3>Estratégia</h3>
          <p>{resposta?.analiseMensagem?.estrategia || "-"}</p>
        </div>
      )}
    </div>
  );
}
