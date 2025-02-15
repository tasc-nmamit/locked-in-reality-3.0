"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { LoginSchemaZ } from "~/zod/schema";
import { signIn } from "next-auth/react";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [show, setShow] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchemaZ>>({
    resolver: zodResolver(LoginSchemaZ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchemaZ>) {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid login credentials. Please try again.");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-lg border-2 p-6 py-8 shadow-lg">
      <h1 className="text-center text-3xl font-semibold">Login</h1>
      <div className="mx-auto mt-8 w-full max-w-lg space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@incridea.lir.in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-row">
                      <Input {...field} type={show ? "text" : "password"} />
                      <Button
                        variant={"ghost"}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShow(!show);
                        }}
                      >
                        {show ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
