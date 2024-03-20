import { useContext } from "react";
import styles from "./styles.module.scss";
import { GlobalContext } from "@/providers/GlobalContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Modal() {
  const { produtoUpdate, setProdutoUpdate, updateProduto, getProdutos } =
    useContext(GlobalContext);
  const { register, handleSubmit, reset } = useForm();

  async function handleUpdate(data: any) {
    if (produtoUpdate != null) {
      const statusOk = await updateProduto(data, produtoUpdate.codigo);
      if (statusOk) {
        console.log("Atualização realizada com sucesso.");
        toast.success("Atualização realizada com sucesso.");
        reset({ descricao: "", preco: "" });
        getProdutos();
        setProdutoUpdate(null);
      } else {
        toast.error("Erro ao realizar a atualização");
        console.log("Erro ao realizar a atualização");
      }
    }
    // console.log(data);
  }

  return (
    <div className={styles.modal}>
      {produtoUpdate != null ? (
        <form
          className={styles.formProduct}
          onSubmit={handleSubmit(handleUpdate)}
        >
          <h1>Atualizar Produto</h1>
          <label htmlFor="inpDescription" className={styles.lblDescription}>
            Descrição:
          </label>
          <input
            type="text"
            id="inpDescription"
            required
            className={styles.description}
            defaultValue={`${produtoUpdate!.descricao}`}
            {...register("descricao")}
          />
          <label htmlFor="inpPrice" className={styles.lblPrice}>
            Preço:
          </label>
          <input
            type="number"
            step="0.01"
            id="inpPrice"
            required
            className={styles.price}
            defaultValue={Number(`${produtoUpdate!.preco}`)}
            {...register("preco")}
          />
          <button className={styles.btnRegister} type="submit">
            Atualizar
          </button>
        </form>
      ) : null}
    </div>
  );
}
