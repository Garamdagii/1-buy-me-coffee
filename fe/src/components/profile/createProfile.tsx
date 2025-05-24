"use client";

import { useState } from "react";
import { ProfileInfo } from "./profileInfo";
import { CardInfo } from "./cardInfo";

export const CreateProfile = () => {
  const [step, setStep] = useState<number>(0);

  if (step === 0) return <ProfileInfo setStep={setStep} />;
  return <CardInfo />;
};
