"use client";

import { useState } from "react";

export default function Page() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversa, setConversa] = useState([]);
  const [analise, setAnalise] = useState(null);

  const enviarMensagem = async () => {
    if (!msg.trim()) return;

    const textoCliente = msg;

    const mensagemUsuario = {
      tipo: "cliente",
      texto: textoCliente
    };

    setConversa((prev) => [...prev, mensagemUsuario]);
    setLoading(true);
    setMsg("");

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
          mensagem: textoCliente
        })
      });

      const data = await res.json();

      const mensagemMac = {
        tipo: "mac",
        texto: data?.resposta || "Erro ao gerar resposta."
      };

      setConversa((prev) => [...prev, mensagemMac]);
      setAnalise(data);
    } catch (erro) {
      setConversa((prev) => [
        ...prev,
        {
          tipo: "mac",
          texto: "Erro ao conectar com o servidor."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>M.A.C</h2>
        <p style={{ color: "#888" }}>Painel de Teste</p>

        <hr />

        <h3>Análise</h3>

        <p><b>Intenção</b></p>
        <p>{analise?.analiseMensagem?.intencaoDetectada || "-"}</p>

        <p><b>Perfil DISC</b></p>
        <p>{analise?.analiseMensagem?.perfilHipotese || "-"}</p>

        <p><b>Estratégia</b></p>
        <p>{analise?.analiseMensagem?.estrategia || "-"}</p>

        <p><b>Etapa</b></p>
        <p>{analise?.estadoConversa?.etapa_conversa || "-"}</p>

        <p><b>Origem</b></p>
        <p>{analise?.origem_resposta || "-"}</p>
      </div>

      <div style={styles.chatArea}>
        <div style={styles.header}>Simulador de Conversa</div>

        <div style={styles.chat}>
          {conversa.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.bubble,
                alignSelf: item.tipo === "cliente" ? "flex-end" : "flex-start",
                background: item.tipo === "cliente" ? "#DCF8C6" : "#FFF"
              }}
            >
              {item.texto}
            </div>
          ))}

          {loading && (
            <p style={{ color: "#888" }}>M.A.C está pensando...</p>
          )}
        </div>

        <div style={styles.inputArea}>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Digite a mensagem do cliente..."
            style={styles.input}
          />

          <button onClick={enviarMensagem} style={styles.button}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial"
  },

  sidebar: {
    width: 260,
    background: "#111",
    color: "#fff",
    padding: 20
  },

  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#F5F5F5"
  },

  header: {
    padding: 20,
    borderBottom: "1px solid #ddd",
    fontWeight: "bold"
  },

  chat: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: "auto"
  },

  bubble: {
    maxWidth: 420,
    padding: 12,
    borderRadius: 10,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  },

  inputArea: {
    display: "flex",
    padding: 20,
    borderTop: "1px solid #ddd",
    background: "#fff"
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc"
  },

  button: {
    marginLeft: 10,
    padding: "12px 18px",
    border: "none",
    background: "#4CAF50",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer"
  }
};
