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
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Painel de Cardápio</h1>

      <h2>Novo item</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 120px 140px 120px",
          gap: 10,
          marginBottom: 30
        }}
      >
        <input
          placeholder="Nome"
          value={novoItem.nome}
          onChange={(e) =>
            setNovoItem({ ...novoItem, nome: e.target.value })
          }
        />

        <textarea
          placeholder="Descrição"
          rows={3}
          value={novoItem.descricao}
          onChange={(e) =>
            setNovoItem({ ...novoItem, descricao: e.target.value })
          }
          style={{ resize: "vertical" }}
        />

        <input
          placeholder="Preço"
          type="number"
          step="0.01"
          value={novoItem.preco}
          onChange={(e) =>
            setNovoItem({ ...novoItem, preco: e.target.value })
          }
        />

        <select
          value={novoItem.categoria}
          onChange={(e) =>
            setNovoItem({ ...novoItem, categoria: e.target.value })
          }
        >
          <option value="salgado">Salgado</option>
          <option value="doce">Doce</option>
        </select>

        <button onClick={salvarItem}>Salvar</button>
      </div>

      <h2>Itens cadastrados</h2>

      {itens.map((item) => {
        const estaEditando = editandoId === item.id;

        return (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginBottom: 12,
              borderRadius: 8
            }}
          >
            {estaEditando ? (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 120px 140px",
                    gap: 10,
                    marginBottom: 10
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
                  />

                  <textarea
                    rows={3}
                    value={itemEditando.descricao}
                    onChange={(e) =>
                      setItemEditando({
                        ...itemEditando,
                        descricao: e.target.value
                      })
                    }
                    placeholder="Descrição"
                    style={{ resize: "vertical" }}
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
                  />

                  <select
                    value={itemEditando.categoria}
                    onChange={(e) =>
                      setItemEditando({
                        ...itemEditando,
                        categoria: e.target.value
                      })
                    }
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
                  <button onClick={() => salvarEdicao(item.id)}>Salvar alterações</button>
                  <button onClick={cancelarEdicao}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <strong>{item.nome}</strong>
                <p style={{ marginTop: 8 }}>{item.descricao}</p>

                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: 10
                  }}
                >
                  <span>Preço: R$ {Number(item.preco).toFixed(2)}</span>
                  <span>Categoria: {item.categoria}</span>
                  <span>Status: {item.ativo ? "Disponível" : "Indisponível"}</span>
                </div>

                <button onClick={() => iniciarEdicao(item)}>Editar</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
