import * as React from "react"
import { Moon, Sun } from "lucide-react"
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
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    )

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
