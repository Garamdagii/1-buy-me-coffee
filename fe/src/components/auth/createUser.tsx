"use client";

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
import { Dispatch, SetStateAction, useState } from "react";

const formSchema = z.object({
  username: z.string().min(1, { message: "Please enter a username" }),
});

export const CreateUsername = ({
  setStep,
  setUsername,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setUsername: Dispatch<SetStateAction<string>>;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        username: values.username,
      });
      setStep(1);
      console.log(response.data);
    } catch (error: any) {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
      }
    }
    setUsername(values.username);
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
