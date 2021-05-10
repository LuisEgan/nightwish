import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../../lib/constants";
import Button from "../../Button";
import Input from "../../Input";
import Textarea from "../../Textarea";

interface IForm {
  name: string;
  email: string;
  ticket: string;
  message: string;
}

const SupportContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSend = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("onSend - error: ", error);
    } finally {
      // setLoading(false)
    }
  };

  return (
    <>
      <div className="text-brown-main text-6xl pb-5">Contact us</div>
      <form
        onSubmit={handleSubmit(onSend)}
        className="bg-brown-main p-10 rounded-2xl"
      >
        <Input
          containerClassName="pb-3"
          {...register("name", {
            required: "How can we call you?",
          })}
          placeholder="Your name"
          error={errors.name?.message}
        />

        <Input
          containerClassName="pb-3"
          {...register("email", {
            required: "What is your email?",
            pattern: {
              value: EMAIL_REGEX,
              message: "Weird email...",
            },
          })}
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
        />

        <Input
          containerClassName="pb-3"
          {...register("ticket", {
            required: "What is your ticket code?",
          })}
          placeholder="Your ticket code"
          error={errors.ticket?.message}
        />

        <Textarea
          containerClassName="pb-3"
          {...register("message", {
            required: "How can we help?",
          })}
          placeholder="Say hi here!"
          error={errors.message?.message}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} variant="black">
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SupportContactForm;
