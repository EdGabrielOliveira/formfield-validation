"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const useValidation = () => {
  return Yup.object().shape({
    fullName: Yup.string().required("Nome completo é obrigatório!"),
    email: Yup.string().email("Formato inválido").required("E-mail é obrigatório!"),
    password: Yup.string().required("Senha é obrigatório!"),
    confirmPass: Yup.string()
      .required("Senha é obrigatório!")
      .oneOf([Yup.ref("password")], "Senha não coincide"),
  });
};

type InputsValidation = {
  fullName: string;
  email: string;
  password: string;
  confirmPass: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsValidation>({ resolver: yupResolver(useValidation()) });
  const onSubmit: SubmitHandler<InputsValidation> = (data) => console.log(data);

  return (
    <main className="container-main">
      <div className="flex flex-col items-center justify-center h-screen gap-12">
        <div className="text-center text-2xl font-semibold">
          <h1> Validação de Formulário </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="case-form">
            <label>Nome completo</label>
            <input className="input-form" type="text" {...register("fullName")} />
            <span className="error-form">{errors.fullName?.message}</span>
          </div>
          <div className="case-form">
            <label>E-mail</label>
            <input className="input-form" type="email" {...register("email")} />
            <span className="error-form">{errors.email?.message}</span>
          </div>
          <div className="case-form">
            <label>Senha</label>
            <input className="input-form" type="password" {...register("password")} />
            <span className="error-form">{errors.password?.message}</span>
          </div>
          <div className="case-form">
            <label>Confirmar senha</label>
            <input className="input-form" type="password" {...register("confirmPass")} />
            <span className="error-form">{errors.confirmPass?.message}</span>
          </div>
          <button className="button-form" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </main>
  );
}
