"use client";

import { useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { date, z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

type Data = {
  name: { common: string; official: string };
};

const validateCardNumber = (cardNumber: string) => {
  const nums = cardNumber.replaceAll(" ", "").split("").reverse();
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 !== 0) {
      let double = Number(nums[i]) * 2;
      if (double > 9) {
        sum += double - 9;
      } else {
        sum += double;
      }
    } else {
      sum += Number(nums[i]);
    }
  }
  return sum % 10 === 0;
};

const formSchema = z.object({
  selectCountry: z.string().min(1, { message: "Select country to continue" }),
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
  cardNumber: z
    .string()
    .min(1, { message: "Please enter a card number" })
    .refine((cardNumber) => validateCardNumber(cardNumber), {
      message: "Please enter a valid card number",
    }),
  expiryMonth: z.string().min(1, { message: "Please enter a expiry month" }),
  expiryYear: z.string().min(1, { message: "Please enter a expiry year" }),
  cardCVC: z.string().min(1, { message: "Please enter CVC number" }),
});

export const CardInfo = () => {
  const [countryData, setCountryData] = useState<Data[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectCountry: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cardCVC: "",
    },
  });

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const fetchCountriesData = async () => {
    const response = await axios
      .get("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => setCountryData(res.data));
  };

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("http://localhost:8000/card", values);
      console.log(response.data);
    } catch (error) {
      console.error(error, "err");
    }
    router.push("/profile-page");
  };

  const selectRef = form.register("selectCountry");

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Card className="flex border-none outline-none shadow-none w-[510px] gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-[32px] text-[#09090B]">
                How would you like to be paid?
              </CardTitle>
              <CardDescription className="text-sm leading-[20px] text-[#71717A]">
                Enter location and payment details
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="selectCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select country</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryData?.map((country, index) => (
                            <SelectItem
                              key={index}
                              {...selectRef}
                              value={country.name.common}
                            >
                              {country.name.common}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter card number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="xxxx xxxx xxxx xxxx"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Month</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Month"
                          type="number"
                          min="01"
                          max="12"
                          step="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Year"
                          type="number"
                          min="2025"
                          max="2100"
                          step="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardCVC"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input placeholder="CVC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="flex px-4 py-2 w-[246px] h-[40px] items-center rounded-md opacity-[0.2] bg-[#18181B] justify-center"
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
