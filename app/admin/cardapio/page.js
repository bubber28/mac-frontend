"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CardapioAdmin() {
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "salgado"
  });
  const [editandoId, setEditandoId] = useState(null);
  const [itemEditando, setItemEditando] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "salgado",
    ativo: true
  });

  const empresaId = 2;

  async function carregarItens() {
    const { data, error } = await supabase
      .from("cardapio_itens")
      .select("*")
      .eq("empresa_id", empresaId)
      .order("id");

    if (!error) {
      setItens(data || []);
    }
  }

  useEffect(() => {
    carregarItens();
  }, []);

  async function salvarItem() {
    if (!novoItem.nome || !novoItem.preco) {
      alert("Nome e preço são obrigatórios");
      return;
    }

    const { error } = await supabase.from("cardapio_itens").insert({
      empresa_id: empresaId,
      nome: novoItem.nome,
      descricao: novoItem.descricao,
      preco: Number(novoItem.preco),
      categoria: novoItem.categoria,
      tipo_item: "produto",
      ativo: true,
      destaque: false
    });

    if (error) {
      alert("Erro ao salvar item");
      return;
    }

    setNovoItem({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "salgado"
    });

    carregarItens();
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id);
    setItemEditando({
      nome: item.nome || "",
      descricao: item.descricao || "",
      preco: item.preco ?? "",
      categoria: item.categoria || "salgado",
      ativo: item.ativo ?? true
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setItemEditando({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "salgado",
      ativo: true
    });
  }

  async function salvarEdicao(id) {
    if (!itemEditando.nome || itemEditando.preco === "") {
      alert("Nome e preço são obrigatórios");
      return;
    }

    const { error } = await supabase
      .from("cardapio_itens")
      .update({
        nome: itemEditando.nome,
        descricao: itemEditando.descricao,
        preco: Number(itemEditando.preco),
        categoria: itemEditando.categoria,
        ativo: itemEditando.ativo
      })
      .eq("id", id);

    if (error) {
      alert("Erro ao atualizar item");
      return;
    }

    cancelarEdicao();
    carregarItens();
  }

  return (
    <div
      style={{
        padding: 32,
        fontFamily: "Arial",
        background: "#f7f7f7",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto"
        }}
      >
        <h1 style={{ marginBottom: 24 }}>Painel de Cardápio</h1>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Novo item</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr 140px 160px 120px",
              gap: 12,
              marginBottom: 12,
              alignItems: "start"
            }}
          >
            <input
              placeholder="Nome"
              value={novoItem.nome}
              onChange={(e) =>
                setNovoItem({ ...novoItem, nome: e.target.value })
              }
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "100%"
              }}
            />

            <textarea
              placeholder="Descrição"
              rows={4}
              value={novoItem.descricao}
              onChange={(e) =>
                setNovoItem({ ...novoItem, descricao: e.target.value })
              }
              style={{
                resize: "vertical",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "100%"
              }}
            />

            <input
              placeholder="Preço"
              type="number"
              step="0.01"
              value={novoItem.preco}
              onChange={(e) =>
                setNovoItem({ ...novoItem, preco: e.target.value })
              }
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "100%"
              }}
            />

            <select
              value={novoItem.categoria}
              onChange={(e) =>
                setNovoItem({ ...novoItem, categoria: e.target.value })
              }
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "100%"
              }}
            >
              <option value="salgado">Salgado</option>
              <option value="doce">Doce</option>
            </select>

            <button
              onClick={salvarItem}
              style={{
                background: "#16a34a",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Salvar
            </button>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Itens cadastrados</h2>

          {itens.map((item) => {
            const estaEditando = editandoId === item.id;

            return (
              <div
                key={item.id}
                style={{
                  border: "1px solid #e5e5e5",
                  padding: 18,
                  marginBottom: 14,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}
              >
                {estaEditando ? (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 3fr 140px 160px",
                        gap: 12,
                        marginBottom: 12,
                        alignItems: "start"
                      }}
                    >
                      <input
                        value={itemEditando.nome}
                        onChange={(e) =>
                          setItemEditando({
                            ...itemEditando,
                            nome: e.target.value
                          })
                        }
                        placeholder="Nome"
                        style={{
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          width: "100%"
                        }}
                      />

                      <textarea
                        rows={4}
                        value={itemEditando.descricao}
                        onChange={(e) =>
                          setItemEditando({
                            ...itemEditando,
                            descricao: e.target.value
                          })
                        }
                        placeholder="Descrição"
                        style={{
                          resize: "vertical",
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          width: "100%"
                        }}
                      />

                      <input
                        type="number"
                        step="0.01"
                        value={itemEditando.preco}
                        onChange={(e) =>
                          setItemEditando({
                            ...itemEditando,
                            preco: e.target.value
                          })
                        }
                        placeholder="Preço"
                        style={{
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          width: "100%"
                        }}
                      />

                      <select
                        value={itemEditando.categoria}
                        onChange={(e) =>
                          setItemEditando({
                            ...itemEditando,
                            categoria: e.target.value
                          })
                        }
                        style={{
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          width: "100%"
                        }}
                      >
                        <option value="salgado">Salgado</option>
                        <option value="doce">Doce</option>
                      </select>
                    </div>

                    <label style={{ display: "block", marginBottom: 12 }}>
                      <input
                        type="checkbox"
                        checked={itemEditando.ativo}
                        onChange={(e) =>
                          setItemEditando({
                            ...itemEditando,
                            ativo: e.target.checked
                          })
                        }
                        style={{ marginRight: 8 }}
                      />
                      Item disponível
                    </label>

                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={() => salvarEdicao(item.id)}
                        style={{
                          background: "#16a34a",
                          color: "#fff",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Salvar alterações
                      </button>

                      <button
                        onClick={cancelarEdicao}
                        style={{
                          background: "#e5e7eb",
                          color: "#111",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <strong style={{ fontSize: 22 }}>{item.nome}</strong>
                    <p style={{ marginTop: 8, marginBottom: 12, color: "#444" }}>
                      {item.descricao}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        flexWrap: "wrap",
                        marginBottom: 12,
                        color: "#333"
                      }}
                    >
                      <span>Preço: R$ {Number(item.preco).toFixed(2)}</span>
                      <span>Categoria: {item.categoria}</span>
                      <span>
                        Status: {item.ativo ? "Disponível" : "Indisponível"}
                      </span>
                    </div>

                    <button
                      onClick={() => iniciarEdicao(item)}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      Editar
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
