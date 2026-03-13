export default function Page() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">
          M.A.C
        </h1>

        <nav className="space-y-3">
          <div className="text-slate-700 font-medium">Dashboard</div>
          <div className="text-slate-500">Leads</div>
          <div className="text-slate-500">Conversas</div>
          <div className="text-slate-500">Estratégia IA</div>
          <div className="text-slate-500">Configurações</div>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-10">

        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Dashboard operacional
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-slate-500 text-sm">Leads novos</p>
            <p className="text-3xl font-bold text-slate-900">28</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-slate-500 text-sm">Conversas ativas</p>
            <p className="text-3xl font-bold text-slate-900">14</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-slate-500 text-sm">Em fechamento</p>
            <p className="text-3xl font-bold text-slate-900">6</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-slate-500 text-sm">Risco de perda</p>
            <p className="text-3xl font-bold text-red-500">4</p>
          </div>

        </div>

        {/* INBOX */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Inbox de conversas
          </h3>

          <div className="space-y-4">

            <div className="p-4 rounded-lg bg-slate-50">
              <p className="font-semibold">Marina Alves</p>
              <p className="text-slate-600 text-sm">
                Quero fazer a limpeza de pele.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50">
              <p className="font-semibold">Carlos Henrique</p>
              <p className="text-slate-600 text-sm">
                Quanto custa a limpeza de pele?
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
