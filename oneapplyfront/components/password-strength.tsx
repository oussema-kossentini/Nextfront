"use client";

import { useState, useEffect } from "react";

interface PasswordStrengthProps {
  password: string;
  onStrengthChange?: (strength: "weak" | "medium" | "strong") => void; // ✅ Ajout du callback
}

export function PasswordStrength({ password, onStrengthChange }: PasswordStrengthProps) {
  const [strength, setStrength] = useState<"weak" | "medium" | "strong">("weak");
  const [message, setMessage] = useState("");

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  const calculateStrength = (password: string) => {
    let score = 0;

    if (!password) {
      setStrength("weak");
      setMessage("");
      return;
    }

    // Critères de complexité
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let finalStrength: "weak" | "medium" | "strong" = "weak";
    if (score >= 4) finalStrength = "strong";
    else if (score >= 2) finalStrength = "medium";

    setStrength(finalStrength);
    setMessage(finalStrength === "weak" ? "Weak" : finalStrength === "medium" ? "Good" : "Strong");

    if (onStrengthChange) {
      onStrengthChange(finalStrength); // ✅ Envoie la valeur au parent
    }
  };

  const getColor = () => {
    switch (strength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  return (
      <div className="mt-1 space-y-2">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div className={`transition-all duration-300 ${getColor()}`} style={{ width: strength === "weak" ? "33%" : strength === "medium" ? "66%" : "100%" }} />
        </div>
        {message && <p className={`text-xs ${strength === "weak" ? "text-red-500" : strength === "medium" ? "text-yellow-600" : "text-green-600"}`}>{message}</p>}
      </div>
  );
}
