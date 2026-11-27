"use client";

import { useState } from "react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent, Button,
  Checkbox, CursorPicker, CursorProvider, Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger,
  Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  InputField, Popover, PopoverContent, PopoverTrigger, RadioGroup, Select,
  MobileMenu, MobileMenuClose, MobileMenuContent, MobileMenuTrigger,
  Slider, SwirskiProvider, Switch, Tabs, TabsContent, TabsList, TabsTrigger,
  ThemeToggle, Tooltip,
} from "@swirski/ui";

const options = [{ value: "blue", label: "Blue" }, { value: "red", label: "Red" }];

function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Archive</DropdownMenuItem>
        <DropdownMenuItem disabled>Blocked</DropdownMenuItem>
        <DropdownMenuItem>Rename</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function InteractionProbe({ initiallyOpen = false, siblings = false }) {
  const [moreOptions, setMoreOptions] = useState(true);
  const [submitted, setSubmitted] = useState("");
  const [scheme, setScheme] = useState<"light" | "dark">("light");
  return (
    <SwirskiProvider colorScheme={scheme}>
      <main>
        <h1>Interaction checks</h1>
        <Button>Background action</Button>
        <MobileMenu>
          <MobileMenuTrigger />
          <MobileMenuContent>
            <MobileMenuClose>Close mobile menu</MobileMenuClose>
          </MobileMenuContent>
        </MobileMenu>
        <Dialog defaultOpen={initiallyOpen || siblings}>
          <DialogTrigger>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Parent dialog</DialogTitle>
            <Drawer defaultOpen={initiallyOpen}>
              <DrawerTrigger>Open drawer</DrawerTrigger>
              <DrawerContent>
                <DrawerTitle>Child drawer</DrawerTitle>
                <Popover>
                  <PopoverTrigger>Open popover</PopoverTrigger>
                  <PopoverContent aria-label="Nested popover">
                    <Select aria-label="Nested color" options={options} />
                    <Menu />
                    <Button>After menu</Button>
                  </PopoverContent>
                </Popover>
                <DrawerClose>Done with drawer</DrawerClose>
              </DrawerContent>
            </Drawer>
            <DialogClose>Done with dialog</DialogClose>
          </DialogContent>
        </Dialog>
        {siblings && (
          <Dialog defaultOpen>
            <DialogContent>
              <DialogTitle>Sibling dialog</DialogTitle>
              <DialogClose>Close sibling</DialogClose>
            </DialogContent>
          </Dialog>
        )}
        <Menu />
        <Button>After standalone menu</Button>
        <Tooltip content="Changes are saved immediately.">
          <Button>Save changes</Button>
        </Tooltip>
        <form onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(String(new FormData(event.currentTarget).get("color")));
        }}>
          <label htmlFor="fixture-color">Color</label>
          <Select id="fixture-color" name="color" required defaultValue="" options={moreOptions ? options : options.slice(0, 1)} />
          <Button type="submit">Submit color</Button>
          <Button type="reset">Reset color</Button>
          <output>{submitted}</output>
        </form>
        <button type="button" data-shrink="" onClick={() => setMoreOptions(false)}>Shrink options</button>
        <Accordion>
          <AccordionItem>
            <AccordionTrigger>Disclosure heading</AccordionTrigger>
            <AccordionContent>Disclosure body</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Tabs defaultValue="one">
          <TabsList aria-label="Sample tabs">
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">First tab</TabsContent>
          <TabsContent value="two">Second tab</TabsContent>
        </Tabs>
        <Checkbox label="Accept terms" />
        <Switch label="Notifications" />
        <ThemeToggle colorScheme={scheme} onColorSchemeChange={setScheme} />
        <RadioGroup aria-label="Size" name="sample-size" options={[{ value: "small", label: "Small" }, { value: "large", label: "Large" }]} />
        <Slider aria-label="Volume" />
        <InputField label="Email" />
        <CursorProvider>
          <CursorPicker />
        </CursorProvider>
      </main>
    </SwirskiProvider>
  );
}
