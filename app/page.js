"use client";

import { useEffect, useRef, useState } from "react";

const EMPRESA_ID = "77528633-d34c-4b1e-946d-e5658b1ee233";

export default function Page() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversa, setConversa] = useState([
    {
      tipo: "mac",
      texto: "Olá! Tudo bem? Sou o M.A.C. Como posso te ajudar hoje?",
    },
  ]);
  const [analise, setAnalise] = useState(null);

  const endRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversa, loading]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      120
    )}px`;
  }, [msg]);

  const enviarMensagem = async () => {
    if (!msg.trim() || loading) return;

    const textoCliente = msg.trim();

    setConversa((prev) => [
      ...prev,
      {
        tipo: "cliente",
        texto: textoCliente,
      },
    ]);

    setMsg("");
    setLoading(true);

    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

      const res = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empresa_id: EMPRESA_ID,
          nome: "Cliente Teste",
          telefone: "31999999999",
          canal: "whatsapp",
          mensagem: textoCliente,
        }),
      });

      const textoBruto = await res.text();
      let data = {};

      try {
        data = textoBruto ? JSON.parse(textoBruto) : {};
      } catch {
        data = {
          error: "Resposta não veio em JSON",
          details: textoBruto || "Sem conteúdo retornado pelo servidor.",
        };
      }

      const textoResposta =
        data?.resposta ||
        data?.details ||
        data?.error ||
        "Erro ao gerar resposta.";

      setConversa((prev) => [
        ...prev,
        {
          tipo: "mac",
          texto: textoResposta,
        },
      ]);

      setAnalise(data?.analise || null);
    } catch (erro) {
      console.error("ERRO FRONTEND:", erro);
      setConversa((prev) => [
        ...prev,
        {
          tipo: "mac",
          texto: "Erro ao conectar com o servidor.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        <header style={styles.header}>
          <div style={styles.avatar}>M</div>
          <div style={styles.headerText}>
            <div style={styles.headerTitle}>M.A.C</div>
            <div style={styles.headerSubtitle}>
              {loading ? "digitando..." : "online"}
            </div>
          </div>
        </header>

        <main style={styles.chatArea}>
          {conversa.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.messageRow,
                justifyContent:
                  item.tipo === "cliente" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.bubble,
                  ...(item.tipo === "cliente"
                    ? styles.clientBubble
                    : styles.macBubble),
                }}
              >
                <div style={styles.messageText}>{item.texto}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
              <div style={{ ...styles.bubble, ...styles.macBubble }}>
                <div style={styles.messageText}>digitando...</div>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </main>

        <footer style={styles.footer}>
          <div style={styles.inputWrap}>
            <textarea
              ref={textareaRef}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Digite uma mensagem"
              style={styles.textarea}
              rows={1}
            />
            <button
              onClick={enviarMensagem}
              disabled={loading || !msg.trim()}
              style={{
                ...styles.sendButton,
                opacity: loading || !msg.trim() ? 0.55 : 1,
              }}
            >
              ➤
            </button>
          </div>

          <div style={styles.analysisBar}>
            <span>Intenção: {analise?.intencao_detectada || "-"}</span>
            <span>Perfil: {analise?.perfil_hipotese || "-"}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b141a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    fontFamily: "Arial, sans-serif",
  },
  phone: {
    width: "100%",
    maxWidth: 520,
    height: "100vh",
    background: "#111b21",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    height: 64,
    background: "#202c33",
    display: "flex",
    alignItems: "center",
    padding: "0 14px",
    gap: 12,
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    flexShrink: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#25d366",
    color: "#0b141a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
    flexShrink: 0,
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  headerTitle: {
    color: "#e9edef",
    fontWeight: 600,
    fontSize: 16,
  },
  headerSubtitle: {
    color: "#8696a0",
    fontSize: 12,
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: "14px 10px",
    backgroundImage:
      "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "18px 18px",
    backgroundColor: "#0b141a",
  },
  messageRow: {
    display: "flex",
    marginBottom: 8,
  },
  bubble: {
    maxWidth: "82%",
    padding: "8px 10px",
    borderRadius: 8,
    boxShadow: "0 1px 0 rgba(0,0,0,0.25)",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    lineHeight: 1.4,
    fontSize: 14,
  },
  macBubble: {
    background: "#202c33",
    color: "#e9edef",
    borderTopLeftRadius: 2,
  },
  clientBubble: {
    background: "#005c4b",
    color: "#e9edef",
    borderTopRightRadius: 2,
  },
  messageText: {
    margin: 0,
  },
  footer: {
    background: "#202c33",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flexShrink: 0,
  },
  inputWrap: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
  },
  textarea: {
    flex: 1,
    resize: "none",
    maxHeight: 120,
    overflowY: "auto",
    border: "none",
    outline: "none",
    borderRadius: 22,
    background: "#2a3942",
    color: "#e9edef",
    padding: "12px 14px",
    fontSize: 15,
    lineHeight: 1.35,
    boxSizing: "border-box",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "none",
    background: "#25d366",
    color: "#0b141a",
    fontSize: 18,
    fontWeight: "bold",
    cursor: "pointer",
    flexShrink: 0,
  },
  analysisBar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    color: "#8696a0",
    fontSize: 12,
    padding: "0 4px",
  },
};
