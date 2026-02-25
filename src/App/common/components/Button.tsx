type ButtonProps = {
  name: string
  theme?: "light" | "dark"
}

export function Button({ name, theme = "dark" }: ButtonProps) {
  const baseClasses =
    "select-none border rounded-full tracking-tight transition-colors text-nowrap font-light"

  const darkThemeClasses =
    "px-[clamp(0.6rem,1.2vw,1rem)] py-[clamp(0.2rem,0.6vw,0.5rem)] text-[clamp(0.75rem,1vw,0.9rem)] hover:text-emerald-700"

  const lightThemeClasses =
    "hidden md:flex bg-[var(--color-paper)] text-[var(--color-paper-fg)] px-[2.2vw] py-[1.2vh]"

  return (
    <button
      className={`${baseClasses} ${
        theme === "light" ? lightThemeClasses : darkThemeClasses
      }`}
    >
      {name}
    </button>
  )
}
