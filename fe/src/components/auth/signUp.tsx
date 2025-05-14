"use client";

import { useState } from "react";
import { CreateAccount } from "./createAccount";
import { CreateUsername } from "./createUser";

export const SignUpAccount = () => {
  const [step, setStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  if (step === 0) {
    return <CreateUsername setStep={setStep} setUsername={setUsername} />;
  } else {
    return <CreateAccount username={username} />;
  }
};
