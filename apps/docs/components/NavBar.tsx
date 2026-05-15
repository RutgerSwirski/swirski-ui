import { Button, Text } from "@swirski/ui";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-5 py-5">
      <Link href="/" aria-label="Swirski UI logo">
        <Text size="2xl" className="font-anton uppercase" component="span">
          Swirski UI
        </Text>
      </Link>

      <nav
        aria-label="Docs navigation"
        className="hidden items-center gap-2 text-sm font-black uppercase md:flex"
      >
        <Button variant="white" href="/components">
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
