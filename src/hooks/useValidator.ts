import { useState } from "react";
import toast from "react-hot-toast";

interface ValidationErrors {
  email: string;
  age: string;
}

export const useValidation = (initialEmail: string, initialAge: string) => {
  const [email, setEmail] = useState(initialEmail);
  const [age, setAge] = useState(initialAge);
  const [errors, setErrors] = useState<ValidationErrors>({ email: "", age: "" });

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      toast.error("Email обязателен");
      return "Email обязателен";
    } else if (!emailRegex.test(email)) {
      toast.error("Некорректный email");
      return "Некорректный email";
    }
    return "";
  };

  const validateAge = (age: string) => {
    if (!age) {
      toast.error("Возраст обязателен");
      return "Возраст обязателен";
    } else if (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 120) {
      toast.error("Введите корректный возраст (от 0 до 120)");
      return "Введите корректный возраст (от 0 до 120)";
    }
    return "";
  };

  const validateForm = () => {
    const emailError = validateEmail(email);
    const ageError = validateAge(age);
    setErrors({ email: emailError, age: ageError });
    return !emailError && !ageError;
  };

  return { email, setEmail, age, setAge, errors, validateForm };
};
