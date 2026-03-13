export default function Page() {
  const metrics = [
    { label: "Leads novos", value: "28", hint: "+12% hoje" },
    { label: "Conversas ativas", value: "14", hint: "5 aguardando resposta" },
    { label: "Em fechamento", value: "6", hint: "2 com alta chance" },
    { label: "Risco de perda", value: "4", hint: "exigem atenção" },
  ];

  const conversations = [
    {
      name: "Marina Alves",
      message: "Quero fazer a limpeza de pele.",
      time: "09:42",
      status: "Fechamento",
    },
    {
      name: "Carlos Henrique",
      message: "Quanto custa a limpeza de pele?",
      time: "10:15",
      status: "Interesse",
    },
    {
      name: "Patrícia Souza",
      message: "Vou pensar e depois te aviso.",
      time: "11:03",
      status: "Risco alto",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-800 bg-slate-900/70 p-6 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
              M.A.C
            </p>
            <h1 className="mt-2 text-3xl font-bold">Painel</h1>
            <p className="mt-2 text-sm text-slate-400">
              Operação comercial inteligente
            </p>
          </div>

          <nav className="grid gap-2">
            <button className="rounded-xl bg-emerald-500/15 px-4 py-3 text-left font-medium text-emerald-300">
              Dashboard
            </button>
            <button className="rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-slate-800">
              Leads
            </button>
            <button className="rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-slate-800">
              Conversas
            </button>
            <button className="rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-slate-800">
              Estratégia IA
            </button>
            <button className="rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-slate-800">
              Configurações
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Dashboard operacional
            </h2>
            <p className="mt-2 text-slate-400">
              Leads, métricas e conversas em uma única interface.
            </p>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/20"
              >
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-slate-500">{item.hint}</p>
              </div>
            ))}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Inbox de conversas</h3>
                  <p className="text-sm text-slate-400">
                    Leads quentes e oportunidades recentes
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {conversations.map((item) => (
                  <div
                    key={item.name + item.time}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{item.message}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">{item.time}</p>
                        <p className="mt-2 text-xs font-medium text-emerald-400">
                          {item.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="text-lg font-semibold">Leitura comportamental</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Perfil predominante</p>
                    <p className="mt-2 text-2xl font-bold text-emerald-400">IS</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Perfil atual</p>
                    <p className="mt-2 text-2xl font-bold text-white">D</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="text-lg font-semibold">Decisão do M.A.C.</h3>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Intenção</p>
                    <p className="mt-1 font-medium text-white">Agendamento</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Estratégia</p>
                    <p className="mt-1 font-medium text-white">
                      Fechamento com micro-decisão
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/20">
                    <p className="text-sm text-emerald-300">Próxima ação sugerida</p>
                    <p className="mt-1 text-sm text-slate-200">
                      Confirmar período e conduzir para escolha de horário.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
