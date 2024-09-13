"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

export default function ThemeSwitcher({
  setIsNavOpen,
}: {
  setIsNavOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleTheme = () => {
    if (setIsNavOpen) {
      setIsNavOpen(false);
    }
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Switch
      defaultSelected={true}
      aria-label="Automatic updates"
      color="secondary"
      onClick={handleTheme}
      endContent={<SunIcon />}
      startContent={<MoonIcon />}
    />
  );
}
