"use client";

import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversa, setConversa] = useState([]);
  const [analise, setAnalise] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [conversa, loading]);

  const enviarMensagem = async () => {
    if (!msg.trim() || loading) return;

    const textoCliente = msg.trim();

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
          empresa_id: 2,
          nome: "Cliente Teste",
          telefone: "31999999999",
          canal: "whatsapp",
          mensagem: textoCliente
        })
      });

      let data = null;
      const textoBruto = await res.text();

      try {
        data = textoBruto ? JSON.parse(textoBruto) : {};
      } catch {
        data = {
          error: "Resposta não veio em JSON",
          details: textoBruto || "Sem conteúdo retornado pelo servidor."
        };
      }

      console.log("RESPOSTA BACKEND:", data);

      const textoResposta =
        data?.resposta ||
        data?.details ||
        data?.error ||
        (typeof data === "object" ? JSON.stringify(data) : String(data)) ||
        "Erro ao gerar resposta.";

      const mensagemMac = {
        tipo: "mac",
        texto: textoResposta
      };

      setConversa((prev) => [...prev, mensagemMac]);
      setAnalise(data);
    } catch (erro) {
      console.error("ERRO FRONTEND:", erro);

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
        <h2 style={styles.logo}>M.A.C</h2>
        <p style={styles.sidebarSubtitle}>Painel de Teste</p>

        <hr style={styles.hr} />

        <h3 style={styles.sidebarTitle}>Análise</h3>

        <div style={styles.analysisBlock}>
          <p style={styles.label}><b>Intenção</b></p>
          <p style={styles.value}>{analise?.analiseMensagem?.intencaoDetectada || "-"}</p>

          <p style={styles.label}><b>Perfil DISC</b></p>
          <p style={styles.value}>{analise?.analiseMensagem?.perfilHipotese || "-"}</p>

          <p style={styles.label}><b>Estratégia</b></p>
          <p style={styles.value}>{analise?.analiseMensagem?.estrategia || "-"}</p>

          <p style={styles.label}><b>Etapa</b></p>
          <p style={styles.value}>{analise?.estadoConversa?.etapa_conversa || "-"}</p>

          <p style={styles.label}><b>Origem</b></p>
          <p style={styles.value}>{analise?.origem_resposta || "-"}</p>

          <p style={styles.label}><b>Status</b></p>
          <p style={styles.value}>
            {analise?.ok === true ? "OK" : analise?.error ? "Erro" : "-"}
          </p>
        </div>
      </div>

      <div style={styles.chatArea}>
        <div style={styles.header}>Simulador de Conversa</div>

        <div style={styles.chat} ref={chatRef}>
          {conversa.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.bubble,
                alignSelf: item.tipo === "cliente" ? "flex-end" : "flex-start",
                background: item.tipo === "cliente" ? "#6366f1" : "#ffffff",
                color: item.tipo === "cliente" ? "#ffffff" : "#0f172a",
                borderBottomRightRadius: item.tipo === "cliente" ? 6 : 14,
                borderBottomLeftRadius: item.tipo === "cliente" ? 14 : 6
              }}
            >
              {item.texto}
            </div>
          ))}

          {loading && (
            <p style={styles.loadingText}>M.A.C está pensando...</p>
          )}
        </div>

        <div style={styles.inputArea}>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Digite a mensagem do cliente..."
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enviarMensagem();
              }
            }}
          />

          <button
            onClick={enviarMensagem}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
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
    fontFamily: "Inter, Arial, sans-serif",
    background: "#0f172a"
  },

  sidebar: {
    width: 280,
    background: "#020617",
    color: "#e2e8f0",
    padding: 20,
    overflowY: "auto",
    borderRight: "1px solid #1e293b"
  },

  logo: {
    margin: 0,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: "0.5px"
  },

  sidebarSubtitle: {
    color: "#94a3b8",
    marginTop: 6,
    marginBottom: 0
  },

  hr: {
    borderColor: "#1e293b",
    margin: "18px 0"
  },

  sidebarTitle: {
    marginTop: 0,
    marginBottom: 16,
    fontSize: 18
  },

  analysisBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },

  label: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: 13
  },

  value: {
    marginTop: 0,
    marginBottom: 10,
    color: "#f8fafc",
    fontSize: 14,
    wordBreak: "break-word"
  },

  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#f1f5f9"
  },

  header: {
    padding: 20,
    borderBottom: "1px solid #e2e8f0",
    fontWeight: "600",
    background: "#ffffff",
    fontSize: 18,
    color: "#0f172a"
  },

  chat: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    overflowY: "auto",
    scrollBehavior: "smooth",
    background: "#eef2ff"
  },

  bubble: {
    maxWidth: 460,
    padding: "12px 14px",
    borderRadius: 14,
    fontSize: 14,
    lineHeight: 1.5,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  },

  loadingText: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 4
  },

  inputArea: {
    display: "flex",
    padding: 16,
    borderTop: "1px solid #e2e8f0",
    background: "#ffffff"
  },

  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: 14,
    background: "#f8fafc"
  },

  button: {
    marginLeft: 10,
    padding: "12px 20px",
    border: "none",
    background: "#6366f1",
    color: "#fff",
    borderRadius: 10,
    fontWeight: "600"
  }
};
