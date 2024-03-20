"use client";
import Dashboard from "@/components/dashboard";
import Modal from "@/components/modal";
import Register from "@/components/register";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext } from "react";

export default function Home() {
  const { produtoUpdate } = useContext(GlobalContext);
  return (
    <main>
      {produtoUpdate != null ? <Modal /> : null}
      <Register />
      <Dashboard />
    </main>
  );
}
