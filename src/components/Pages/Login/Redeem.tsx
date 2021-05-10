import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./login.module.scss";
import Input from "../../Input";
import LoginNext from "./Next";
import { ROUTES } from "../../../lib/constants";

interface IForm {
  ticket: string;
}

const LoginRedeem = () => {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [loading, setLoading] = useState<boolean>(false);

  const onNext = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        push(ROUTES.PRIVATE_ROUTES.events);
      }, 2000);
    } catch (error) {
      console.error("onNext - error: ", error);
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <form>
      <div className={styles.title}>Congratulations! Redeem Your Ticket</div>
      <div className="text-lg text-brown-main text-center pb-10">
        This ticket is VIP Europe for Fri, May 28th, 17:00 and 18:00
      </div>

      <div className={styles.content}>
        <div className={styles.subtitle}>Enter your ticket code</div>

        <Input
          {...register("ticket", {
            required: "Please input your ticket",
          })}
          placeholder="Ticket code"
          error={errors.ticket?.message}
        />

        <LoginNext
          onClick={handleSubmit(onNext)}
          disabled={loading}
          buttonText={loading ? "Loading..." : "Validate"}
        />
      </div>
    </form>
  );
};

export default LoginRedeem;
