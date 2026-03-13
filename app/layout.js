import "./globals.css";

export const metadata = {
  title: "M.A.C",
  description: "Painel do agente inteligente",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
