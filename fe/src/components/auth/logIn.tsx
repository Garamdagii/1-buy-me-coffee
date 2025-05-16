"use client";

import { z, ZodError } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .min(1, { message: "Please enter your email" })
    .email("Please enter a valid email"),
  password: z.string().min(1, { message: "Please enter a password" }),
});

export const LogInAccount = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("http://localhost:8000/signin", {
        email: values.email,
        password: values.password,
      });
      console.log(response.data);
    } catch (error: any) {
      console.error(error, "err");
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Card className="flex border-none outline-none shadow-none w-[407px] p-6 rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-[32px] text-[#09090B]">
                Welcome back
              </CardTitle>
              {/* <CardDescription className="text-sm leading-[20px] text-[#71717A]">
                Connect email and set a password
              </CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email here"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    {errorMessage && (
                      <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
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
                      <Input
                        placeholder="Enter password here"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    {errorMessage && (
                      <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="flex px-4 py-2 w-full h-[40px] items-center rounded-md opacity-[0.2] bg-[#18181B]"
              >
                Continue
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};
