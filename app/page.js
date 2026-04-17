"use client";

import { useState, useRef, useEffect } from "react";

const EMPRESA_ID = "77528633-d34c-4b1e-946d-e5658b1ee233";

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
        behavior: "smooth",
      });
    }
  }, [conversa, loading]);

  const enviarMensagem = async () => {
    if (!msg.trim() || loading) return;

    const textoCliente = msg.trim();

    const mensagemUsuario = {
      tipo: "cliente",
      texto: textoCliente,
    };

    setConversa((prev) => [...prev, mensagemUsuario]);
    setLoading(true);
    setMsg("");

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

      let data = null;
      const textoBruto = await res.text();

      try {
        data = textoBruto ? JSON.parse(textoBruto) : {};
      } catch {
        data = {
          error: "Resposta não veio em JSON",
          details: textoBruto || "Sem conteúdo retornado pelo servidor.",
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
        texto: textoResposta,
      };

      setConversa((prev) => [...prev, mensagemMac]);
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
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.brandArea}>
          <div style={styles.logoCircle}>M</div>
          <div>
            <h1 style={styles.logoText}>M.A.C</h1>
            <p style={styles.sidebarSubtitle}>Painel de Teste</p>
          </div>
        </div>

        <div style={styles.infoBox}>
          <strong>Empresa ID</strong>
          <p style={styles.infoText}>{EMPRESA_ID}</p>
        </div>

        <div style={styles.infoBox}>
          <strong>Status</strong>
          <p style={styles.infoText}>{loading ? "Respondendo..." : "Pronto"}</p>
        </div>

        <div style={styles.infoBox}>
          <strong>Análise</strong>
          <p style={styles.infoText}>
            Intenção: {analise?.intencao_detectada || "-"}
          </p>
          <p style={styles.infoText}>
            Perfil: {analise?.perfil_hipotese || "-"}
          </p>
        </div>
      </aside>

      <main style={styles.main}>
        <div style={styles.chatHeader}>
          <div>
            <h2 style={styles.chatTitle}>Conversa com o M.A.C.</h2>
            <p style={styles.chatSubtitle}>
              Teste de atendimento com backend e Supabase
            </p>
          </div>
        </div>

        <div ref={chatRef} style={styles.chatArea}>
          {conversa.length === 0 && (
            <div style={styles.emptyState}>
              Envie uma mensagem para começar o teste.
            </div>
          )}

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
                  ...styles.messageBubble,
                  ...(item.tipo === "cliente"
                    ? styles.clienteBubble
                    : styles.macBubble),
                }}
              >
                <div style={styles.messageLabel}>
                  {item.tipo === "cliente" ? "Cliente" : "M.A.C"}
                </div>
                <div style={styles.messageText}>{item.texto}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={styles.messageRow}>
              <div style={{ ...styles.messageBubble, ...styles.macBubble }}>
                <div style={styles.messageLabel}>M.A.C</div>
                <div style={styles.messageText}>Digitando...</div>
              </div>
            </div>
          )}
        </div>

        <div style={styles.inputArea}>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Digite sua mensagem..."
            style={styles.textarea}
            rows={3}
          />
          <button
            onClick={enviarMensagem}
            disabled={loading || !msg.trim()}
            style={{
              ...styles.sendButton,
              opacity: loading || !msg.trim() ? 0.6 : 1,
            }}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    background: "#0f172a",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    gap: 0,
    flexWrap: "wrap",
  },
  sidebar: {
    width: "100%",
    maxWidth: 320,
    background: "#111827",
    padding: 20,
    boxSizing: "border-box",
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  brandArea: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#22c55e",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    flexShrink: 0,
  },
  logoText: {
    margin: 0,
    fontSize: 24,
  },
  sidebarSubtitle: {
    margin: "4px 0 0 0",
    fontSize: 14,
    color: "#94a3b8",
  },
  infoBox: {
    background: "#1f2937",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  infoText: {
    margin: "8px 0 0 0",
    fontSize: 14,
    color: "#cbd5e1",
    wordBreak: "break-word",
  },
  main: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  chatHeader: {
    padding: 20,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "#0b1220",
  },
  chatTitle: {
    margin: 0,
    fontSize: 22,
  },
  chatSubtitle: {
    margin: "6px 0 0 0",
    color: "#94a3b8",
    fontSize: 14,
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: 16,
    boxSizing: "border-box",
  },
  emptyState: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 40,
  },
  messageRow: {
    display: "flex",
    marginBottom: 12,
  },
  messageBubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 14,
    boxSizing: "border-box",
  },
  clienteBubble: {
    background: "#22c55e",
    color: "#06230f",
  },
  macBubble: {
    background: "#1e293b",
    color: "#fff",
  },
  messageLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    opacity: 0.8,
  },
  messageText: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.45,
    wordBreak: "break-word",
  },
  inputArea: {
    padding: 16,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    background: "#0b1220",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  textarea: {
    width: "100%",
    resize: "none",
    borderRadius: 12,
    border: "1px solid #334155",
    background: "#111827",
    color: "#fff",
    padding: 12,
    boxSizing: "border-box",
    fontSize: 15,
    outline: "none",
  },
  sendButton: {
    alignSelf: "flex-end",
    background: "#22c55e",
    color: "#052e16",
    border: "none",
    borderRadius: 10,
    padding: "10px 18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
