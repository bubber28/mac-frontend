export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "#ffffff",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#1f2937",
          border: "2px solid #22c55e",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ fontSize: "42px", margin: 0, color: "#22c55e" }}>
          M.A.C TESTE REAL
        </h1>

        <p style={{ fontSize: "20px", marginTop: "16px", color: "#e5e7eb" }}>
          Se você estiver vendo fundo escuro, card escuro e título verde,
          então a Vercel publicou este arquivo novo de verdade.
        </p>
      </div>
    </div>
  );
}
