import { useState } from "react";
import { LoginForm } from "../components/molecules/loginForm";
import { RegisterForm } from "../components/molecules/registerForm";

export const AuthScreen = () => {
  const [strategy, setStrategy] = useState<"login" | "register">("login");

  return strategy === "login" ? (
    <LoginForm setStrategy={setStrategy} />
  ) : (
    <RegisterForm setStrategy={setStrategy} />
  );
};
