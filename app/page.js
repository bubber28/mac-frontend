export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 grid grid-cols-[260px_1fr]">

      {/* SIDEBAR */}
      <aside className="bg-white border-r border-slate-200 p-6">
        <h1 className="text-2xl font-bold mb-8">M.A.C</h1>

        <nav className="space-y-3 text-slate-600">
          <p className="font-semibold text-slate-900">Dashboard</p>
          <p>Leads</p>
          <p>Conversas</p>
          <p>Estratégia IA</p>
          <p>Configurações</p>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="p-10">

        <h2 className="text-3xl font-bold mb-8">Dashboard operacional</h2>

        {/* CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-slate-500">Leads novos</p>
            <p className="text-3xl font-bold">28</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-slate-500">Conversas ativas</p>
            <p className="text-3xl font-bold">14</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-slate-500">Em fechamento</p>
            <p className="text-3xl font-bold">6</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-slate-500">Risco de perda</p>
            <p className="text-3xl font-bold text-red-500">4</p>
          </div>

        </div>

        {/* INBOX */}
        <div className="bg-white rounded-xl shadow border p-6">
          <h3 className="text-lg font-semibold mb-4">
            Inbox de conversas
          </h3>

          <div className="space-y-4">

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="font-semibold">Marina Alves</p>
              <p className="text-sm text-slate-600">
                Quero fazer a limpeza de pele.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="font-semibold">Carlos Henrique</p>
              <p className="text-sm text-slate-600">
                Quanto custa a limpeza de pele?
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
