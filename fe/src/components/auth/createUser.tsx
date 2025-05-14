"use client";

import { z, ZodError } from "zod";
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
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, { message: "Please enter at least 2 letters" }),
});

export const CreateUsername = ({
  setStep,
  setUsername,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setUsername: Dispatch<SetStateAction<string>>;
}) => {
  const [error, setError] = useState<string>("");
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
    } catch (error) {
      console.error(error, "err");
      // if (
      //   error.response &&
      //   (error.response.status === 401 || error.response.status === 404)
      // ) {
      //   setError(error.response.data.message);
      // }
    }
    setUsername(values.username);
    setStep(1);
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
                      {/* {error && <p>{error}</p>} */}
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
  );
};
