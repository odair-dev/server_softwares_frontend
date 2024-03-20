"use client";
import { api } from "@/services/api";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface IProdutos {
  codigo: string;
  descricao: string;
  preco: number;
  data_cadastro: string;
}

export interface IRegisterProduto {
  descricao: string;
  preco: number;
}

interface IGlobalProviderProps {
  children: React.ReactNode;
}

interface IGlobalContext {
  produtos: IProdutos[] | null;
  setProdutos: Dispatch<SetStateAction<IProdutos[] | null>>;
  registerProduto: (data: IRegisterProduto) => Promise<boolean>;
  getProdutos: () => Promise<boolean>;
  updateProduto: (data: IRegisterProduto, id: string) => Promise<boolean>;
  removeProduto: (id: string) => Promise<boolean>;
  produtoUpdate: IProdutos | null;
  setProdutoUpdate: Dispatch<SetStateAction<IProdutos | null>>;
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }: IGlobalProviderProps) {
  const [produtos, setProdutos] = useState<IProdutos[] | null>(null);
  const [produtoUpdate, setProdutoUpdate] = useState<IProdutos | null>(null);

  async function registerProduto(data: IRegisterProduto) {
    try {
      const response = await api.post("/produtos", {
        ...data,
      });
      return true;
    } catch (error) {
      console.log("Não foi possível realizar o cadastro. \n", error);
      return false;
    }
  }

  async function getProdutos() {
    try {
      const response = await api.get(`/produtos`);
      setProdutos(response.data);
      return true;
    } catch (error) {
      console.log("Erro ao buscar informações");
      //toast.error("Erro ao buscar informações");
      return false;
    }
  }

  async function updateProduto(data: IRegisterProduto, id: string) {
    try {
      const response = await api.patch(`/produtos/${id}`, {
        ...data,
      });
      //console.log(response.data);
      //setUser(response.data);
      return true;
    } catch (error) {
      console.log("Não foi possível realizar a atualização. \n", error);
      return false;
    }
  }
  async function removeProduto(id: string) {
    try {
      const response = await api.delete(`/produtos/${id}`);
      return true;
    } catch (error) {
      console.log("Não foi possível realizar esta operação. \n", error);
      return false;
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        produtos,
        setProdutos,
        registerProduto,
        getProdutos,
        updateProduto,
        removeProduto,
        produtoUpdate,
        setProdutoUpdate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
