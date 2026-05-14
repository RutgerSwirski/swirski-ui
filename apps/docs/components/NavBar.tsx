import { Button } from "@swirski/ui";

export default function NavBar() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-5 py-5">
      <a
        href="/"
        className="font-anton text-3xl uppercase leading-none tracking-normal"
      >
        Swirski UI
      </a>

      <nav
        aria-label="Docs navigation"
        className="hidden items-center gap-2 text-sm font-black uppercase md:flex"
      >
        <Button
          variant="blue"
          // className="border-4 border-black bg-[#FFD400] px-4 py-2 shadow-[4px_4px_0_#0B0B0C]"
          href="/components"
        >
          Components
        </Button>

        <Button
          variant="white"
          // className="border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0_#0B0B0C]"
          href="#start"
        >
          Start
        </Button>
      </nav>
    </header>
  );
}
