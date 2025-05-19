"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
const formSchema = z.object({
  coverImage:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          // .refine((files) => files?.length >= 1, {
          //   message: "Image is required",
          // })
          .transform((FileList) => FileList[0]),
});

export const CoverImage = () => {
  const [image, setImage] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values.coverImage);
  };

  const fileRef = form.register("coverImage");

  return (
    <div className="flex w-screen h-[319px] bg-[#F4F4F5] justify-center items-center relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <Button className="flex gap-2 px-4 py-2 h-[40px] justify-center items-center rounded-md bg-[#18181B]">
                  <Camera className="size-[16px] stroke-[#FAFAFA]" />
                  Add a cover image
                  <FormControl>
                    <Input
                      className="flex absolute opacity-0 size-[150px]"
                      placeholder=""
                      type="file"
                      {...fileRef}
                      onChange={(event) => {
                        field.onChange(event.target?.files?.[0] ?? undefined);
                        setImage(URL.createObjectURL(event.target.files[0]));
                      }}
                    />
                  </FormControl>
                  {image && (
                    <div className="flex relative w-screen h-[319px]">
                      <Image
                        layout="fill"
                        // fill={true}
                        src={image}
                        alt="image"
                        id="coverImage"
                        priority
                        // style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  )}
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="opacity-0">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
