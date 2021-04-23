// import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api";
import Button from "../components/Button";
import Input from "../components/Input";
import { EMAIL_REGEX } from "../lib/constants";

interface IForm {
  email: string;
}

const Claim = () => {
  // const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: IForm) => {
    setLoading(true);
    try {
      await api.validateEmail(values.email);
    } catch (error) {
      console.error("onSubmit - error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/4">
        <Input
          {...register("email", {
            required: "Please input your email",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email",
            },
          })}
          placeholder="your@email.com"
          title="Email"
          error={errors.email?.message}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Enter"}
        </Button>
      </form>
    </div>
  );
};

export default Claim;
