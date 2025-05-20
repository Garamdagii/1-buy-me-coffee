"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const mocDataDonation = [
  {
    amount: 20,
    createdAt: "2025-05-15T23:35:29.433+00:00",
  },
  {
    amount: 10,
    createdAt: "2025-04-25T23:35:29.433+00:00",
  },
];

const donationAmounts = [
  {
    id: "1",
    amount: "$1",
  },
  {
    id: "2",
    amount: "$2",
  },
  {
    id: "3",
    amount: "$5",
  },
  {
    id: "4",
    amount: "$10",
  },
];

const FormSchema = z.object({
  donationAmount: z.string().refine((value) => value.length === 0, {
    message: "You have to select at least one item.",
  }),
});

export const DonationDashboard = () => {
  const [selectedValue, setSelectedValue] = useState<string>("10");
  const date = dayjs();
  const subtractedDate = date
    .subtract(Number(selectedValue), "day")
    .format("YYYY-MM-DD");

  const filteredByDate = mocDataDonation.filter((donation) => {
    return donation.createdAt >= subtractedDate;
  });

  let totalDonationAmount = 0;
  const donationAmountby = filteredByDate.map(
    (donation) => (totalDonationAmount += donation.amount)
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      donationAmount: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div>
      <div>
        <div className="flex gap-4 items-center">
          <h3>Earnings</h3>
          <div>
            <Select
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Last 10 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="0">All times</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <h1>${totalDonationAmount}</h1>
      </div>

      <div>
        <div>
          <h3>Recent transactions</h3>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="donationAmount"
                  render={({ field }) => ( 
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Use different settings for my mobile devices
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>

        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h3>username</h3>
          <p>socialmediaurl</p>
        </div>
        <div>
          <p>amount</p>
          <p>time</p>
        </div>
        <span>about</span>
      </div>
    </div>
  );
};
