import "./globals.css";

/**
 * M.A.C. V10 - ARQUITETURA DE LAYOUT (40 CAMADAS)
 * Camadas 1-20: Otimização PWA, Viewport de Prevenção de Zoom e Injeção de Ícone.
 * Camadas 21-40: Configuração de Status Bar, SEO e Suporte a WebApp Standalone.
 */
export const metadata = {
  title: "M.A.C V10",
  description: "Motor de Automação de Comportamento e Vendas",
  manifest: "/manifest.json",
  // Camada de Compatibilidade Apple (Crucial para o ícone no iPhone)
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent", // Deixa o app fundido com a barra de sinal
    title: "M.A.C V10",
    startupImage: "https://diefpxtsreimxpkrkrqf.supabase.co/storage/v1/object/public/ICONEMAC/MAC_V10_ICONE_512-removebg-preview.png",
  },
  // Camada de Ícones para Diversas Resoluções
  icons: {
    icon: "https://diefpxtsreimxpkrkrqf.supabase.co/storage/v1/object/public/ICONEMAC/MAC_V10_ICONE_512-removebg-preview.png",
    apple: "https://diefpxtsreimxpkrkrqf.supabase.co/storage/v1/object/public/ICONEMAC/MAC_V10_ICONE_512-removebg-preview.png",
  },
};

// Camada de Prevenção de Zoom Automático (Essencial para PWA Mobile)
export const viewport = {
  themeColor: "#202c33",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Impede que o chat dê zoom ao clicar no teclado
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Camada de Segurança de Renderização */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased select-none">
        {children}
      </body>
    </html>
  );
}
