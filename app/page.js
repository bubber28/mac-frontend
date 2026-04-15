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
      // === CORREÇÃO FEITA AQUI ===
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
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
      <aside style={styles.sidebar}>
        <div style={styles.brandArea}>
          <div style={styles.logoCircle}>M</div>
          <div>
            <h1 style={styles.logoText}>M.A.C</h1>
            <p style={styles.sidebarSubtitle}>Painel de Teste</p>
          </div>
        </div>
        <hr style={styles.hr} />
        <div style={styles.analysisHeaderRow}>
          <h3 style={styles.sidebarTitle}>Análise</h3>
          <span style={styles.statusBadge}>
            {analise?.ok === true ? "Online" : analise?.error ? "Erro" : "Aguardando"}
          </span>
        </div>
        <div style={styles.analysisGrid}>
          <div style={styles.analysisCard}>
            <p style={styles.label}>Intenção</p>
            <p style={styles.value}>{analise?.analiseMensagem?.intencaoDetectada || "-"}</p>
          </div>
          <div style={styles.analysisCard}>
            <p style={styles.label}>Perfil DISC</p>
            <p style={styles.value}>{analise?.analiseMensagem?.perfilHipotese || "-"}</p>
          </div>
          <div style={styles.analysisCard}>
            <p style={styles.label}>Estratégia</p>
            <p style={styles.value}>{analise?.analiseMensagem?.estrategia || "-"}</p>
          </div>
          <div style={styles.analysisCard}>
            <p style={styles.label}>Etapa</p>
            <p style={styles.value}>{analise?.estadoConversa?.etapa_conversa || "-"}</p>
          </div>
          <div style={styles.analysisCard}>
            <p style={styles.label}>Origem</p>
            <p style={styles.value}>{analise?.origem_resposta || "-"}</p>
          </div>
          <div style={styles.analysisCard}>
            <p style={styles.label}>Status</p>
            <p style={styles.value}>
              {analise?.ok === true ? "OK" : analise?.error ? "Erro" : "-"}
            </p>
          </div>
        </div>
      </aside>

      <main style={styles.chatArea}>
        <div style={styles.chatShell}>
          <div style={styles.header}>
            <div>
              <div style={styles.headerTitle}>Simulador de Conversa</div>
              <div style={styles.headerSub}>
                Teste as respostas do M.A.C em tempo real
              </div>
            </div>
            <div style={styles.headerDotWrap}>
              <span style={styles.headerDot} />
              <span style={styles.headerStatus}>Ativo</span>
            </div>
          </div>

          <div style={styles.chat} ref={chatRef}>
            {conversa.length === 0 && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>💬</div>
                <p style={styles.emptyTitle}>Conversa pronta para teste</p>
                <p style={styles.emptyText}>
                  Digite uma mensagem para ver como o M.A.C interpreta e responde.
                </p>
              </div>
            )}

            {conversa.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: item.tipo === "cliente" ? "flex-end" : "flex-start"
                }}
              >
                <span style={styles.messageTag}>
                  {item.tipo === "cliente" ? "Cliente" : "M.A.C"}
                </span>
                <div
                  style={{
                    ...styles.bubble,
                    alignSelf: item.tipo === "cliente" ? "flex-end" : "flex-start",
                    background: item.tipo === "cliente" ? "#6366f1" : "#0f172a",
                    color: "#ffffff",
                    borderBottomRightRadius: item.tipo === "cliente" ? 6 : 16,
                    borderBottomLeftRadius: item.tipo === "cliente" ? 16 : 6,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.25)"
                  }}
                >
                  {item.texto}
                </div>
              </div>
            ))}

            {loading && (
              <div style={styles.loadingWrap}>
                <div style={styles.typingBubble}>
                  <span style={styles.dot} />
                  <span style={styles.dot} />
                  <span style={styles.dot} />
                </div>
                <p style={styles.loadingText}>M.A.C está pensando…</p>
              </div>
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
                opacity: loading ? 0.75 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Inter, Arial, sans-serif",
    background: "#020617"
  },
  sidebar: {
    width: 310,
    background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
    color: "#e2e8f0",
    padding: 22,
    overflowY: "auto",
    borderRight: "1px solid #1e293b",
    boxShadow: "inset -1px 0 0 #1e293b"
  },
  brandArea: {
    display: "flex",
    alignItems: "center",
    gap: 12
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    boxShadow: "0 8px 20px rgba(99,102,241,0.35)"
  },
  logoText: {
    margin: 0,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: "0.5px"
  },
  sidebarSubtitle: {
    color: "#94a3b8",
    marginTop: 4,
    marginBottom: 0,
    fontSize: 13
  },
  hr: {
    border: "none",
    borderTop: "1px solid #1e293b",
    margin: "20px 0"
  },
  analysisHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16
  },
  sidebarTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: "700"
  },
  statusBadge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#111827",
    color: "#cbd5e1",
    border: "1px solid #1f2937"
  },
  analysisGrid: {
    display: "grid",
    gap: 12
  },
  analysisCard: {
    background: "rgba(15, 23, 42, 0.7)",
    border: "1px solid #1e293b",
    borderRadius: 14,
    padding: 14
  },
  label: {
    margin: 0,
    color: "#94a3b8",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.4px"
  },
  value: {
    marginTop: 8,
    marginBottom: 0,
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "600",
    wordBreak: "break-word"
  },
  chatArea: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #0f172a 0%, #020617 70%)",
    padding: 24
  },
  chatShell: {
    width: "100%",
    maxWidth: 920,
    height: "92vh",
    display: "flex",
    flexDirection: "column",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
    border: "1px solid rgba(148,163,184,0.12)",
    background: "#020617"
  },
  header: {
    padding: "18px 22px",
    borderBottom: "1px solid #1e293b",
    background: "rgba(255,255,255,0.02)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f8fafc"
  },
  headerSub: {
    marginTop: 4,
    fontSize: 13,
    color: "#94a3b8"
  },
  headerDotWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  headerDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 12px rgba(34,197,94,0.8)"
  },
  headerStatus: {
    fontSize: 13,
    color: "#cbd5e1"
  },
  chat: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    overflowY: "auto",
    background:
      "linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 100%)"
  },
  emptyState: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#94a3b8",
    padding: 30
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 14
  },
  emptyTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: "700",
    color: "#e2e8f0"
  },
  emptyText: {
    marginTop: 8,
    maxWidth: 420,
    fontSize: 14,
    lineHeight: 1.5
  },
  messageTag: {
    fontSize: 11,
    color: "#94a3b8",
    marginBottom: 6,
    paddingLeft: 4,
    paddingRight: 4
  },
  bubble: {
    maxWidth: "75%",
    padding: "12px 14px",
    borderRadius: 16,
    fontSize: 14,
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  },
  loadingWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8
  },
  typingBubble: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#0f172a",
    border: "1px solid #1e293b",
    padding: "12px 14px",
    borderRadius: 16,
    width: "fit-content"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#94a3b8"
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: 13,
    margin: 0
  },
  inputArea: {
    padding: 16,
    borderTop: "1px solid #1e293b",
    background: "#020617",
    display: "flex",
    gap: 10
  },
  input: {
    flex: 1,
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #334155",
    outline: "none",
    fontSize: 14,
    background: "#0f172a",
    color: "#fff"
  },
  button: {
    padding: "14px 22px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#fff",
    borderRadius: 14,
    fontWeight: "700",
    boxShadow: "0 8px 20px rgba(99,102,241,0.35)"
  }
};
