"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchemaZ } from "~/zod/schema";
import { type z } from "zod";
import { useRouter } from "next/navigation";

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
import { Label } from "~/components/ui/label";
import { Eye, EyeClosed } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function SignUp() {
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showRe, setShowRe] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchemaZ>>({
    resolver: zodResolver(RegisterSchemaZ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = api.auth.register.useMutation({
    onSuccess: () => {
      toast.success("User Registered");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
      setSubmitting(false);
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchemaZ>) {
    if (confirmPassword !== values.password) {
      toast.error("Passwords do not match");
    } else {
      try {
        setSubmitting(true);
        registerMutation.mutate(values);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-lg border-2 p-6 py-8 shadow-lg">
      <h1 className="text-center text-3xl font-semibold">Sign Up</h1>
      <div className="mx-auto mt-8 max-w-lg space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon@incridea.lir.in" {...field} />
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

            <div>
              <Label>Re-Enter Password</Label>
              <div className="flex flex-row">
                <Input
                  type={showRe ? "text" : "password"}
                  value={confirmPassword}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    if (e.target instanceof HTMLInputElement) {
                      setConfirmPassword(e.target.value);
                    }
                  }}
                />
                <Button
                  variant={"ghost"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowRe(!showRe);
                  }}
                >
                  {showRe ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
            </div>

            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
