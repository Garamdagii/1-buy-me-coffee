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
    (donation, index) => (totalDonationAmount += donation.amount)
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
