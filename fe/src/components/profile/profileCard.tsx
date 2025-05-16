"use client";

import { useState } from "react";
import { CreateProfile } from "./createProfile";
import { CartInfo } from "./cartInfo";

export const ProfileCard = () => {
  const [step, setStep] = useState<number>(0);

  if (step === 0) return <CreateProfile setStep={setStep} />;
  return <CartInfo />;
};
