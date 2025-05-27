"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
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
import { CoverImageButton } from "./coverImageButton";
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
  const [image, setImage] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values.coverImage);
  };

  const saveCoverPhoto = () => {
    <CoverImageButton
      isChangeCover={true}
      children="Change cover"
      className="bg-[#F4F4F5] text-[#18181B]"
    />;
  };

  const fileRef = form.register("coverImage");

  return (
    <div className="flex w-full h-[319px] bg-[#F4F4F5] justify-center items-center absolute pt-[50px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <Button className="flex absolute z-0 gap-2 px-4 py-2 h-[40px] justify-center items-center rounded-md bg-[#18181B]">
                  <Camera className="size-[16px] stroke-[#FAFAFA]" />
                  Add a cover image
                  <FormControl>
                    <Input
                      className="flex absolute opacity-0 size-[150px]"
                      placeholder=""
                      type="file"
                      {...fileRef}
                      onChange={(event) => {
                        if (!event.target.files) return;
                        field.onChange(event.target?.files?.[0] ?? undefined);
                        setImage(URL.createObjectURL(event.target.files[0]));
                      }}
                    />
                  </FormControl>
                </Button>
                <FormMessage />
                {image && (
                  <div>
                    <div className="flex w-screen h-[319px] relative">
                      <Image
                        fill={true}
                        src={image}
                        alt="image"
                        id="coverImage"
                        priority
                        // style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                    <CoverImageButton
                      isChangeCover={false}
                      children="Save changes"
                      className="bg-[#18181B] text-[#FAFAFA]"
                      onClick={saveCoverPhoto}
                    />
                  </div>
                )}
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
