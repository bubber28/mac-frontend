# Criando o projeto i Love Delicitas - Estrutura completa
# App de delivery para mini salgados fritos

project_structure = """
i-love-delicitas/
├── app/
│   ├── page.tsx              # Página inicial com cardápio
│   ├── layout.tsx            # Layout principal
│   ├── globals.css           # Estilos globais
│   ├── admin/
│   │   └── page.tsx          # Painel administrativo
│   └── api/
│       └── orders/
│           └── route.ts      # API de pedidos
├── components/
│   ├── Cardapio.tsx          # Lista de produtos
│   ├── Carrinho.tsx          # Carrinho de compras
│   ├── Checkout.tsx          # Finalização de pedido
│   ├── AdminPanel.tsx        # Painel admin
│   └── OrderCard.tsx         # Card de pedido
├── lib/
│   ├── firebase.ts           # Config Firebase
│   └── data.ts               # Dados do cardápio
├── public/
│   └── images/               # Imagens dos salgados
├── package.json
├── next.config.js
└── tailwind.config.js
"""

print("📁 Estrutura do projeto i Love Delicitas criada!")
print(project_structure)
