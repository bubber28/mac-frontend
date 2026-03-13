"use client";

export default function MacSaasDashboard() {

  /* =============================
     MÉTRICAS DO DASHBOARD
  ============================== */

  const metrics = [
    { label: "Leads novos", value: "28", hint: "+12% hoje" },
    { label: "Conversas ativas", value: "14", hint: "5 aguardando resposta" },
    { label: "Em fechamento", value: "6", hint: "2 com alta chance" },
    { label: "Risco de perda", value: "4", hint: "exigem atenção" },
  ];


  /* =============================
     LEADS (DADOS MOCK)
  ============================== */

  const leads = [
    {
      id: 1,
      name: "Marina Alves",
      phone: "(31) 99999-1020",
      perfil: "IS",
      perfilAtual: "D",
      etapa: "Fechamento",
      risco: "Médio",
      intencao: "Agendamento",
      estrategia: "Fechamento com micro-decisão",
      ultimaMensagem: "Quero fazer a limpeza de pele.",
      hora: "09:42",
      conversa: [
        { from: "cliente", text: "Oi, quero fazer uma limpeza de pele." },
        { from: "mac", text: "Perfeito! Você prefere manhã ou tarde?" },
        { from: "cliente", text: "Tarde." },
      ],
    },

    {
      id: 2,
      name: "Carlos Henrique",
      phone: "(31) 98888-5544",
      perfil: "D",
      perfilAtual: "D",
      etapa: "Interesse",
      risco: "Baixo",
      intencao: "Orçamento",
      estrategia: "Resposta curta direta",
      ultimaMensagem: "Quanto custa a limpeza de pele?",
      hora: "10:15",
      conversa: [
        { from: "cliente", text: "Quanto custa a limpeza de pele?" },
        { from: "mac", text: "A limpeza custa R$150. Quer que eu veja horários?" },
      ],
    },

    {
      id: 3,
      name: "Patrícia Souza",
      phone: "(31) 97777-3311",
      perfil: "S",
      perfilAtual: "S",
      etapa: "Consideração",
      risco: "Alto",
      intencao: "Hesitação",
      estrategia: "Recuperação de venda",
      ultimaMensagem: "Vou pensar e depois te aviso.",
      hora: "11:03",
      conversa: [
        { from: "cliente", text: "Ainda estou pensando se faço ou não." },
        { from: "mac", text: "Sem problema 😊 Posso explicar rapidinho." },
        { from: "cliente", text: "Vou pensar e depois te aviso." },
      ],
    },

    {
      id: 4,
      name: "João Pedro",
      phone: "(31) 96666-4400",
      perfil: "C",
      perfilAtual: "C",
      etapa: "Consideração",
      risco: "Médio",
      intencao: "Explicação",
      estrategia: "Resposta clara detalhada",
      ultimaMensagem: "Como funciona a limpeza de pele?",
      hora: "11:26",
      conversa: [
        { from: "cliente", text: "Como funciona a limpeza de pele?" },
        {
          from: "mac",
          text: "A limpeza remove cravos e impurezas e melhora a saúde da pele.",
        },
      ],
    },
  ];


  const activeLead = leads[0];


  /* =============================
     CORES DOS BADGES
  ============================== */

  const badgeClass = (value) => {

    if (value === "Alto") return "bg-red-100 text-red-700";
    if (value === "Médio") return "bg-amber-100 text-amber-700";
    if (value === "Baixo") return "bg-emerald-100 text-emerald-700";

    if (value === "Fechamento") return "bg-blue-100 text-blue-700";
    if (value === "Consideração") return "bg-violet-100 text-violet-700";
    if (value === "Interesse") return "bg-slate-100 text-slate-700";

    return "bg-slate-100 text-slate-700";
  };


  const bubbleClass = (from) =>
    from === "cliente"
      ? "ml-auto bg-emerald-600 text-white"
      : "mr-auto bg-slate-100 text-slate-900";


  /* =============================
     INTERFACE
  ============================== */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
              M.A.C. SaaS
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              Dashboard e inbox operacional
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Leads, métricas e estratégia comercial em uma única interface.
            </p>
          </div>

          <div className="flex gap-3">

            <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium">
              Configurações
            </button>

            <button className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
              Novo lead
            </button>

          </div>
        </div>
      </header>


      {/* DASHBOARD */}

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-12">


        {/* MÉTRICAS */}

        <section className="lg:col-span-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {metrics.map((item) => (

            <div
              key={item.label}
              className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >

              <p className="text-sm text-slate-500">{item.label}</p>

              <p className="mt-2 text-3xl font-semibold">{item.value}</p>

              <p className="mt-2 text-sm text-slate-400">{item.hint}</p>

            </div>

          ))}

        </section>


        {/* INBOX */}

        <section className="lg:col-span-12 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">

          <h2 className="text-lg font-semibold mb-4">
            Inbox de conversas
          </h2>


          <div className="grid gap-4 xl:grid-cols-12">


            {/* LISTA DE LEADS */}

            <aside className="xl:col-span-4 space-y-3">

              {leads.map((lead) => (

                <div
                  key={lead.id}
                  className="rounded-2xl border p-4 bg-white"
                >

                  <div className="flex justify-between">

                    <div>
                      <h3 className="font-semibold">{lead.name}</h3>
                      <p className="text-sm text-slate-500">{lead.phone}</p>
                    </div>

                    <span className="text-xs text-slate-400">
                      {lead.hora}
                    </span>

                  </div>

                  <p className="mt-3 text-sm">
                    {lead.ultimaMensagem}
                  </p>

                </div>

              ))}

            </aside>


            {/* CONVERSA */}

            <section className="xl:col-span-5 border rounded-3xl p-4">

              {activeLead.conversa.map((msg, index) => (

                <div
                  key={index}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm mt-3 ${bubbleClass(
                    msg.from
                  )}`}
                >

                  {msg.text}

                </div>

              ))}

            </section>


            {/* PERFIL */}

            <aside className="xl:col-span-3 space-y-4">

              <div className="border rounded-3xl p-4">

                <h3 className="font-semibold">
                  Leitura comportamental
                </h3>

                <p className="mt-3 text-sm">
                  Perfil predominante: {activeLead.perfil}
                </p>

                <p className="text-sm">
                  Perfil atual: {activeLead.perfilAtual}
                </p>

              </div>


              <div className="border rounded-3xl p-4">

                <h3 className="font-semibold">
                  Decisão do M.A.C.
                </h3>

                <p className="mt-2 text-sm">
                  Intenção: {activeLead.intencao}
                </p>

                <p className="text-sm">
                  Estratégia: {activeLead.estrategia}
                </p>

              </div>

            </aside>

          </div>

        </section>

      </main>

    </div>
  );
}
