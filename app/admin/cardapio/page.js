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

    if (!error) {
      setNovoItem({
        nome: "",
        descricao: "",
        preco: "",
        categoria: "salgado"
      });

      carregarItens();
    }
  }

  async function atualizarPreco(id, preco) {
    await supabase
      .from("cardapio_itens")
      .update({ preco: Number(preco) })
      .eq("id", id);

    carregarItens();
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Painel de Cardápio</h1>

      <h2>Novo item</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
        <input
          placeholder="Nome"
          value={novoItem.nome}
          onChange={(e) =>
            setNovoItem({ ...novoItem, nome: e.target.value })
          }
        />

        <input
          placeholder="Descrição"
          value={novoItem.descricao}
          onChange={(e) =>
            setNovoItem({ ...novoItem, descricao: e.target.value })
          }
        />

        <input
          placeholder="Preço"
          type="number"
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

      {itens.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 10,
            borderRadius: 8
          }}
        >
          <strong>{item.nome}</strong>
          <p>{item.descricao}</p>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="number"
              defaultValue={item.preco}
              onBlur={(e) => atualizarPreco(item.id, e.target.value)}
            />
            <span>Categoria: {item.categoria}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
