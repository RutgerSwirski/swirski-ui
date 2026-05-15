import { Button, Text } from "@swirski/ui";

export default function NavBar() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-5 py-5">
      <a
        href="/"
        className="font-anton text-3xl uppercase leading-none tracking-normal"
      >
        <Text
          className="font-anton text-3xl uppercase leading-none text-current"
          component="span"
        >
          Swirski UI
        </Text>
      </a>

      <nav
        aria-label="Docs navigation"
        className="hidden items-center gap-2 text-sm font-black uppercase md:flex"
      >
        <Button
          variant="white"
          href="/components"
        >
          Components
        </Button>

        <Button variant="white" href="/hooks">
          Hooks
        </Button>

        <Button variant="white" href="/cli">
          CLI
        </Button>
      </nav>
    </header>
  );
}
