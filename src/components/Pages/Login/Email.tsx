import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ILoginPage } from "./Types";

import Input from "../../Input";
import LoginNext from "./Next";
import { EMAIL_REGEX } from "../../../lib/constants";

import styles from "./login.module.scss";

interface IForm {
  email: string;
}

const LoginEmail = (props: ILoginPage) => {
  const { setStep } = props;

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
        setStep(1);
      }, 500);
    } catch (error) {
      console.error("onNext - error: ", error);
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <form>
      <div className={styles.title}>Create account</div>
      <div className={styles.content}>
        <div className={styles.subtitle}>
          You need to log in in order to register your ticket code
        </div>

        <Input
          {...register("email", {
            required: "Please type your email",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email",
            },
          })}
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
        />

        <LoginNext
          onClick={handleSubmit(onNext)}
          disabled={loading}
          buttonText={loading ? "Loading..." : "Next"}
        />
      </div>
    </form>
  );
};

export default LoginEmail;
