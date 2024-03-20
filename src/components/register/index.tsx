import { useContext } from "react";
import styles from "./styles.module.scss";
import { GlobalContext } from "@/providers/GlobalContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Register() {
  const { register, handleSubmit, reset } = useForm();
  const { registerProduto, getProdutos } = useContext(GlobalContext);

  async function handleSend(data: any) {
    const statusOk = await registerProduto(data);
    if (statusOk) {
      console.log("Registro realizado com sucesso.");
      toast.success("Registro realizado com sucesso.");
      reset({ descricao: "", preco: "" });
      getProdutos();
    } else {
      toast.error("Erro ao realizar o registro");
      console.log("Erro ao realizar o registro");
    }
  }

  return (
    <div className={styles.container}>
      <h1>Cadastrar Produtos</h1>
      <form className={styles.formProduct} onSubmit={handleSubmit(handleSend)}>
        <div className={styles.divAlign}>
          <label htmlFor="inpDescription" className={styles.lblDescription}>
            Descrição:
          </label>
          <input
            type="text"
            id="inpDescription"
            required
            className={styles.description}
            placeholder="Ex.: Arroz"
            {...register("descricao")}
          />
        </div>
        <div className={styles.divAlign}>
          <label htmlFor="inpPrice" className={styles.lblPrice}>
            Preço:
          </label>
          <input
            type="number"
            step="0.01"
            id="inpPrice"
            required
            className={styles.price}
            placeholder="Ex.: 1,99"
            {...register("preco")}
          />
        </div>
        <button className={styles.btnRegister} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
