export default function MacSaasDashboard() {
  const metrics = [
    { label: "Leads novos", value: "28", hint: "+12% hoje" },
    { label: "Conversas ativas", value: "14", hint: "5 aguardando resposta" },
    { label: "Em fechamento", value: "6", hint: "2 com alta chance" },
    { label: "Risco de perda", value: "4", hint: "exigem atenção" },
  ];

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
        { from: "mac", text: "A limpeza de pele custa R$150. Quer que eu veja horários disponíveis?" },
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
        { from: "mac", text: "Sem problema 😊 Posso te explicar rapidinho como funciona para te ajudar a decidir." },
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
        { from: "mac", text: "A limpeza de pele remove cravos e impurezas, deixando a pele mais limpa e saudável. Se quiser, posso explicar o procedimento ou verificar horários disponíveis." },
      ],
    },
  ];

  const activeLead = leads[0];

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
              M.A.C. SaaS
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Dashboard e inbox operacional</h1>
            <p className="mt-1 text-sm text-slate-500">
              Leads, métricas, conversas e estratégia comercial em uma única interface.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              Configurações
            </button>
            <button className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
              Novo lead
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-12">
        <section className="lg:col-span-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((item) => (
            <div key={item.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold">{item.value}</p>
              <p className="mt-2 text-sm text-slate-400">{item.hint}</p>
            </div>
          ))}
        </section>

        <section className="lg:col-span-12 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Inbox de conversas</h2>
              <p className="text-sm text-slate-500">
                Acompanhe contexto, DISC, risco de perda e a resposta aplicada pelo M.A.C.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Todas
              </button>
              <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                Em fechamento
              </button>
              <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                Risco alto
              </button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-12">
            <aside className="xl:col-span-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                  placeholder="Buscar lead ou telefone"
                />
              </div>

              <div className="space-y-3">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      lead.id === activeLead.id
                        ? "border-emerald-300 bg-white shadow-sm"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{lead.name}</h3>
                        <p className="text-sm text-slate-500">{lead.phone}</p>
                      </div>
                      <span className="text-xs text-slate-400">{lead.hora}</span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-slate-700">{lead.ultimaMensagem}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(lead.etapa)}`}>
                        {lead.etapa}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(lead.risco)}`}>
                        Risco {lead.risco}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {lead.perfil} → {lead.perfilAtual}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <section className="xl:col-span-5 rounded-3xl border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-semibold">{activeLead.name}</h3>
                  <p className="text-sm text-slate-500">{activeLead.phone}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(activeLead.etapa)}`}>
                    {activeLead.etapa}
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(activeLead.risco)}`}>
                    Risco {activeLead.risco}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {activeLead.conversa.map((msg, index) => (
                  <div key={index} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${bubbleClass(msg.from)}`}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">Próxima ação sugerida</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  Confirmar disponibilidade por período e empurrar para escolha de horário.
                </p>
              </div>
            </section>

            <aside className="xl:col-span-3 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold">Leitura comportamental</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-500">Perfil predominante</p>
                    <p className="mt-1 text-lg font-semibold">{activeLead.perfil}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-500">Perfil atual</p>
                    <p className="mt-1 text-lg font-semibold">{activeLead.perfilAtual}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold">Decisão do M.A.C.</h3>
                <div className="mt-3 space-y-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-500">Intenção detectada</p>
                    <p className="mt-1 font-medium text-slate-800">{activeLead.intencao}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-500">Estratégia aplicada</p>
                    <p className="mt-1 font-medium text-slate-800">{activeLead.estrategia}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-500">Resumo operacional</p>
                    <p className="mt-1 text-slate-700">
                      Cliente com intenção forte de compra. Condução para micro-decisão com foco em agendamento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold">Atalhos rápidos</h3>
                <div className="mt-3 grid gap-2">
                  <button className="rounded-2xl border border-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-700">
                    Ver histórico completo
                  </button>
                  <button className="rounded-2xl border border-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-700">
                    Marcar como oportunidade
                  </button>
                  <button className="rounded-2xl border border-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-700">
                    Solicitar revisão humana
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
