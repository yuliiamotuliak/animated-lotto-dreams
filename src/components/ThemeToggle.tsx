
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    // Use resolvedTheme for more reliable theme detection
    const currentTheme = mounted ? resolvedTheme : "system";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    setTheme(newTheme);
    console.log(`Theme switched to: ${newTheme}`);
    
    toast.success(`Switched to ${newTheme} mode!`, {
      duration: 2000,
    });
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10 bg-background/30 backdrop-blur-sm border border-border/30 hover:bg-accent/20 transition-all duration-300 transform hover:scale-105"
        aria-label="Loading theme toggle"
      >
        <div className="h-5 w-5 animate-pulse bg-foreground/20 rounded-full" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      className="rounded-full w-10 h-10 bg-background/30 backdrop-blur-sm border border-border/30 hover:bg-accent/20 transition-all duration-300 transform hover:scale-105"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
