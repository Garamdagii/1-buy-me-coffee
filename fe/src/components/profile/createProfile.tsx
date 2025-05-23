"use client";

import { z } from "zod";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { uploadImage } from "../../../utils/image-upload";
import { Camera } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  avatarImage:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList).transform((FileList) => FileList[0]),
  // .refine((files) => files?.length >= 1, {
  //   message: "Image is required",
  // }),
  profileName: z.string().min(1, { message: "Please enter name" }),
  about: z.string().min(1, { message: "Please enter info about yourself" }),
  socialMediaURL: z.string().url(),
});

export const CreateProfile = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [image, setImage] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileName: "",
      about: "",
      socialMediaURL: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.avatarImage) {
      console.log("error");
      return;
    }
    const imageUrl = await uploadImage(values.avatarImage);

    try {
      const response = await axios.post("http://localhost:8000/profile", {
        profileName: values.profileName,
        about: values.about,
        socialMediaURL: values.socialMediaURL,
        avatarImage: imageUrl,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error, "err");
    }
    setStep(1);
  };

  const fileRef = form.register("avatarImage");

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Card className="flex border-none outline-none shadow-none w-[510px] gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-[32px] text-[#09090B]">
                Complete your profile page
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="avatarImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add photo</FormLabel>

                    <Button
                      variant="ghost"
                      className="flex rounded-full p-0 has-[>svg]:px-0 size-[160px] bg-[#FFF] border-[2px] border-dashed border-[#E4E4E7]"
                    >
                      <Camera className="size-[28px] stroke-[#18181B] stroke-opacity-[0.5] stroke-[1.5] absolute z-0" />

                      <FormControl>
                        <Input
                          className="flex absolute opacity-0 size-[50px]"
                          placeholder=""
                          type="file"
                          {...fileRef}
                          onChange={(event) => {
                            if (!event.target.files) return;
                            field.onChange(
                              event.target?.files?.[0] ?? undefined
                            );
                            setImage(
                              URL.createObjectURL(event.target.files[0])
                            );
                          }}
                        />
                      </FormControl>
                      {image && (
                        <div className="flex relative w-full h-full justify-center items-center rounded-full">
                          <Image
                            fill={true}
                            src={image}
                            alt="image"
                            id="avatarImage"
                            className="rounded-full w-[160px] h-[160px]"
                          />
                        </div>
                      )}
                    </Button>
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
                      <Input placeholder="Enter your name here" {...field} />
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
                        className="flex h-[131px] px-3 py-2 placeholder:absolute placeholder:top-[10px] placeholder:left-[10px] "
                        placeholder="Write about yourself here"
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
                    <FormLabel>Social media URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://" type="URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="flex px-4 py-2 w-[246px] h-[40px] items-center rounded-md opacity-[0.2] bg-[#18181B]"
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
