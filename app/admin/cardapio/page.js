"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const EMPRESA_ID = "77528633-d34c-4b1e-946d-e5658b1ee233";

export default function CardapioAdmin() {
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState({
    nome_servico: "",
    descricao: "",
    preco: "",
    tipo_item: "salgado",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [itemEditando, setItemEditando] = useState({
    nome_servico: "",
    descricao: "",
    preco: "",
    tipo_item: "salgado",
    ativo: true,
  });

  async function carregarItens() {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("empresa_id", EMPRESA_ID)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Erro ao carregar serviços:", error);
      return;
    }

    setItens(data || []);
  }

  useEffect(() => {
    carregarItens();
  }, []);

  async function salvarItem() {
    if (!novoItem.nome_servico || novoItem.preco === "") {
      alert("Nome e preço são obrigatórios");
      return;
    }

    const { error } = await supabase.from("servicos").insert({
      empresa_id: EMPRESA_ID,
      nome_servico: novoItem.nome_servico,
      descricao: novoItem.descricao,
      preco: Number(novoItem.preco),
      tipo_item: novoItem.tipo_item,
      ativo: true,
    });

    if (error) {
      console.error(error);
      alert("Erro ao salvar item");
      return;
    }

    setNovoItem({
      nome_servico: "",
      descricao: "",
      preco: "",
      tipo_item: "salgado",
    });

    carregarItens();
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id);
    setItemEditando({
      nome_servico: item.nome_servico || "",
      descricao: item.descricao || "",
      preco: item.preco ?? "",
      tipo_item: item.tipo_item || "salgado",
      ativo: item.ativo ?? true,
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setItemEditando({
      nome_servico: "",
      descricao: "",
      preco: "",
      tipo_item: "salgado",
      ativo: true,
    });
  }

  async function salvarEdicao(id) {
    if (!itemEditando.nome_servico || itemEditando.preco === "") {
      alert("Nome e preço são obrigatórios");
      return;
    }

    const { error } = await supabase
      .from("servicos")
      .update({
        nome_servico: itemEditando.nome_servico,
        descricao: itemEditando.descricao,
        preco: Number(itemEditando.preco),
        tipo_item: itemEditando.tipo_item,
        ativo: itemEditando.ativo,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Erro ao atualizar item");
      return;
    }

    cancelarEdicao();
    carregarItens();
  }

  async function alternarStatus(item) {
    const { error } = await supabase
      .from("servicos")
      .update({ ativo: !item.ativo })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      alert("Erro ao alterar status");
      return;
    }

    carregarItens();
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin do Cardápio</h1>
        <p style={styles.subtitle}>Empresa: {EMPRESA_ID}</p>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.sectionTitle}>Novo item</h2>

        <div style={styles.grid}>
          <input
            style={styles.input}
            placeholder="Nome do serviço"
            value={novoItem.nome_servico}
            onChange={(e) =>
              setNovoItem((prev) => ({ ...prev, nome_servico: e.target.value }))
            }
          />

          <input
            style={styles.input}
            placeholder="Preço"
            type="number"
            step="0.01"
            value={novoItem.preco}
            onChange={(e) =>
              setNovoItem((prev) => ({ ...prev, preco: e.target.value }))
            }
          />

          <input
            style={{ ...styles.input, gridColumn: "1 / -1" }}
            placeholder="Descrição"
            value={novoItem.descricao}
            onChange={(e) =>
              setNovoItem((prev) => ({ ...prev, descricao: e.target.value }))
            }
          />

          <select
            style={styles.input}
            value={novoItem.tipo_item}
            onChange={(e) =>
              setNovoItem((prev) => ({ ...prev, tipo_item: e.target.value }))
            }
          >
            <option value="salgado">Salgado</option>
            <option value="encomenda">Encomenda</option>
            <option value="combo">Combo</option>
            <option value="doce">Doce</option>
          </select>

          <button style={styles.primaryButton} onClick={salvarItem}>
            Salvar item
          </button>
        </div>
      </div>

      <div style={styles.listCard}>
        <h2 style={styles.sectionTitle}>Itens cadastrados</h2>

        {itens.length === 0 ? (
          <p style={styles.emptyText}>Nenhum item cadastrado.</p>
        ) : (
          <div style={styles.itemsWrap}>
            {itens.map((item) => {
              const emEdicao = editandoId === item.id;

              return (
                <div key={item.id} style={styles.itemCard}>
                  {emEdicao ? (
                    <>
                      <input
                        style={styles.input}
                        value={itemEditando.nome_servico}
                        onChange={(e) =>
                          setItemEditando((prev) => ({
                            ...prev,
                            nome_servico: e.target.value,
                          }))
                        }
                      />

                      <input
                        style={styles.input}
                        value={itemEditando.descricao}
                        onChange={(e) =>
                          setItemEditando((prev) => ({
                            ...prev,
                            descricao: e.target.value,
                          }))
                        }
                      />

                      <input
                        style={styles.input}
                        type="number"
                        step="0.01"
                        value={itemEditando.preco}
                        onChange={(e) =>
                          setItemEditando((prev) => ({
                            ...prev,
                            preco: e.target.value,
                          }))
                        }
                      />

                      <select
                        style={styles.input}
                        value={itemEditando.tipo_item}
                        onChange={(e) =>
                          setItemEditando((prev) => ({
                            ...prev,
                            tipo_item: e.target.value,
                          }))
                        }
                      >
                        <option value="salgado">Salgado</option>
                        <option value="encomenda">Encomenda</option>
                        <option value="combo">Combo</option>
                        <option value="doce">Doce</option>
                      </select>

                      <label style={styles.checkboxRow}>
                        <input
                          type="checkbox"
                          checked={itemEditando.ativo}
                          onChange={(e) =>
                            setItemEditando((prev) => ({
                              ...prev,
                              ativo: e.target.checked,
                            }))
                          }
                        />
                        Ativo
                      </label>

                      <div style={styles.actions}>
                        <button
                          style={styles.primaryButton}
                          onClick={() => salvarEdicao(item.id)}
                        >
                          Salvar
                        </button>
                        <button
                          style={styles.secondaryButton}
                          onClick={cancelarEdicao}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={styles.itemHeader}>
                        <strong>{item.nome_servico}</strong>
                        <span style={styles.badge}>
                          {item.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </div>

                      <p style={styles.itemText}>{item.descricao || "Sem descrição"}</p>
                      <p style={styles.itemText}>
                        Preço: R$ {Number(item.preco || 0).toFixed(2)}
                      </p>
                      <p style={styles.itemText}>Tipo: {item.tipo_item || "-"}</p>

                      <div style={styles.actions}>
                        <button
                          style={styles.primaryButton}
                          onClick={() => iniciarEdicao(item)}
                        >
                          Editar
                        </button>
                        <button
                          style={styles.secondaryButton}
                          onClick={() => alternarStatus(item)}
                        >
                          {item.ativo ? "Desativar" : "Ativar"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#fff",
    padding: 16,
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    margin: 0,
    fontSize: 28,
  },
  subtitle: {
    marginTop: 6,
    color: "#94a3b8",
    fontSize: 14,
    wordBreak: "break-word",
  },
  formCard: {
    background: "#111827",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  listCard: {
    background: "#111827",
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: 16,
    fontSize: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#1e293b",
    color: "#fff",
    boxSizing: "border-box",
  },
  primaryButton: {
    background: "#22c55e",
    color: "#052e16",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  secondaryButton: {
    background: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  emptyText: {
    color: "#94a3b8",
  },
  itemsWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 14,
  },
  itemCard: {
    background: "#1e293b",
    borderRadius: 14,
    padding: 14,
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    background: "#0f172a",
    color: "#cbd5e1",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
  },
  itemText: {
    margin: "6px 0",
    color: "#cbd5e1",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
    color: "#cbd5e1",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
};
