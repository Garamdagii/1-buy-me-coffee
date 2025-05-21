"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import dayjs from "dayjs";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export const DonationDashboard = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="gap-2"
                >
                  <ChevronDown className="opacity-50" />
                  Amount{" "}
                  {value &&
                    donationAmounts.find((amount) => amount.amount === value)
                      ?.amount}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {donationAmounts.map((el) => (
                        <CommandItem
                          key={el.id}
                          value={el.amount}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {el.amount}
                            </label>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
