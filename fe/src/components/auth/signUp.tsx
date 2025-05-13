"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  username: z
    .string({ required_error: "Username" })
    .min(2, { message: "Please enter at least 2 letters" }),
  email: z
    .string()
    .min(2, { message: "Please enter at least 2 letters" })
    .email("Please enter a valid email"),
  password: z.string().min(4, { message: "Please enter at least 4 letters" }),
});

export const SignUpAccount = () => {
  const [step, setStep] = useState<number>(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleUsername = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        username: values.username,
      });
      console.log(response.data);
      console.log(values.username);
    } catch (error) {
      console.error(error, "err");
    }
    setStep(step + 1);
  };

  const handleUserAccount = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("http://localhost:8000/user", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error, "err");
    }
    // setStep(step + 1);
  };

  return (
    <div>
      {step === 0 ? (
        <div>
          <Card className="flex border-none outline-none shadow-none w-[407px] p-6 rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUsername)}
                className="flex flex-col gap-6"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold leading-[32px] text-[#09090B]">
                    Create Your Account
                  </CardTitle>
                  <CardDescription className="text-sm leading-[20px] text-[#71717A]">
                    Choose a username for your page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter username here" {...field} />
                        </FormControl>
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
      ) : (
        <div>
          <Card className="flex border-none outline-none shadow-none w-[407px] p-6 rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUserAccount)}
                className="flex flex-col gap-6"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold leading-[32px] text-[#09090B]">
                    Welcome,
                  </CardTitle>
                  <CardDescription className="text-sm leading-[20px] text-[#71717A]">
                    Connect email and set a password
                  </CardDescription>
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
      )}
    </div>
  );
};
