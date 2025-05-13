"use client";

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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
  profileImage: z.instanceof(FileList).optional(),
  profileName: z.string({ required_error: "Enter name" }).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  about: z.string(),
  socialMediaURL: z.string(),
});

export const CreateProfile = () => {
  const [imageURL, setImageURL] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileName: "",
      about: "",
      socialMediaURL: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // if (data.profileImage) {
    //   const url = URL.createObjectURL();
    //   setImageURL(url);
    // }
    // console.log(imageURL);
    console.log(data.profileImage);
    // try {
    //   const response = await axios.post("http://localhost:8000/profile", {
    //     profileName: data.profileName,
    //     about: data.about,
    //     socialMediaURL: data.socialMediaURL,
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error, "err");
    //   if (
    //     error.response &&
    //     (error.response.status === 401 || error.response.status === 404)
    //   ) {
    //     setError(error.response.data.message);
    // }
  };

  const fileRef = form.register("profileImage");

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="flex flex-col w-[510px] h-fit border-none outline-none shadow-none">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <CardTitle>Complete your profile page</CardTitle>
            <CardContent>
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add photo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="file"
                        {...fileRef}
                        // onChange={(event) => {
                        //   field.onChange(event.target?.files?.[0] ?? undefined);
                        // }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write about yourself here"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMediaURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://" type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <Button
              type="submit"
              className="flex px-4 py-2 w-[246px] h-[40px] items-center rounded-md opacity-[0.2] bg-[#18181B] self-end"
            >
              Continue
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};
