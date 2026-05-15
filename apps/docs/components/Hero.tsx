import {
  HeroKicker,
  HeroTitle,
  HeroLead,
  HeroActions,
  Button,
} from "@swirski/ui";

export default function Hero() {
  return (
    <div>
      <HeroKicker>Docs for the Swirski visual system</HeroKicker>

      <HeroTitle className="mt-5 max-w-3xl text-6xl md:text-8xl">
        Design loud.
        <br />
        Ship sharp.
      </HeroTitle>

      <HeroLead className="mt-7 max-w-2xl text-xl text-black/75">
        A practical reference for composing Swirski Studio and Swirski Dev style
        interfaces with the shared UI package: expressive, structured and ready
        for real product screens.
      </HeroLead>

      <HeroActions className="mt-9">
        <Button href="/get-started"
        // icon="arrow-up-right"
        // iconSide="right"
        >Get Started</Button>
        <Button href="https://github.com/rutgerswirski/@swirski/ui"
        variant="white"
        icon="github"

        >
          GitHub 
        </Button>
      </HeroActions>

      {/* <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                        {["React", "Tailwind", "TypeScript"].map((item) => (
                          <div
                            key={item}
                            className="border-4 border-black bg-[#F5F5F3] px-4 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#0B0B0C]"
                          >
                            {item}
                          </div>
                        ))}
                      </div> */}
    </div>
  );
}
