import * as React from "react"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme()

  const isSystemTheme = theme === "system"
  const currentTheme = isSystemTheme ? systemTheme : resolvedTheme

  const toggleTheme = () => {
    if (isSystemTheme || currentTheme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  const icon =
    currentTheme === "light" ? (
      <SunIcon className="h-6 w-6" />
    ) : (
      <MoonIcon className="h-6 w-6" />
    )

  return (
    <Button
      className="w-full bg-[#57C5B6] md:bg-transparent md:w-auto"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      {icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
