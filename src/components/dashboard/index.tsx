import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { GlobalContext, IProdutos } from "@/providers/GlobalContext";
import { toast } from "react-toastify";

export default function Dashboard() {
  const {
    produtos,
    getProdutos,
    removeProduto,
    produtoUpdate,
    setProdutoUpdate,
  } = useContext(GlobalContext);

  const [detail, setDetail] = useState<string | null>(null);

  useEffect(() => {
    getProdutos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleRemove(id: string) {
    const statusOk = await removeProduto(id);
    if (statusOk) {
      console.log("Produto removido");
      toast.success("Produto removido");
      getProdutos();
    } else {
      toast.error("Erro ao realizar a operação");
      console.log("Erro ao realizar a operação");
    }
  }

  async function handleUpdate(data: IProdutos) {
    setProdutoUpdate(data);
  }

  async function handleDetail(id: string) {
    if (detail == null) {
      setDetail(id);
    } else {
      setDetail(null);
    }
  }

  return (
    <div className={styles.container}>
      <ul>
        {produtos != null ? (
          produtos.map((i) => (
            <li key={i.codigo}>
              <div className={styles.basicInfo}>
                <h2>{i.descricao}</h2>
                <h3>R$ {i.preco}</h3>
                {detail != null && detail == i.codigo ? (
                  <>
                    <p>
                      <strong>Código:</strong>
                    </p>
                    <p>{i.codigo}</p>
                    <p>
                      <strong>Data Cadastro:</strong>
                    </p>
                    <p>
                      {`${
                        new Date(
                          Date.parse(i.data_cadastro.toString().slice(0, 10))
                        ).getDate() + 1
                      }/${
                        new Date(
                          Date.parse(i.data_cadastro.toString().slice(0, 10))
                        ).getMonth() + 1
                      }/${new Date(
                        Date.parse(i.data_cadastro.toString().slice(0, 10))
                      ).getFullYear()}`}
                    </p>
                  </>
                ) : null}
              </div>
              <div className={styles.divBtns}>
                <div
                  className={`${styles.btnEdit} ${styles.btnBasic}`}
                  onClick={() => handleUpdate(i)}
                >
                  Editar
                </div>
                <div
                  className={`${styles.btnRemove} ${styles.btnBasic}`}
                  onClick={() => handleRemove(i.codigo)}
                >
                  Excluir
                </div>
                <div
                  className={`${styles.btnDetail} ${styles.btnBasic}`}
                  onClick={() => handleDetail(i.codigo)}
                >
                  Detalhes
                </div>
              </div>
            </li>
          ))
        ) : (
          <h3>Nenhum produto cadastrado</h3>
        )}
      </ul>
    </div>
  );
}
