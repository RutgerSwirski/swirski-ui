import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger, type TabsProps } from "../components/tabs";

function Example(props: TabsProps) {
  return (
    <Tabs {...props}>
      <TabsList aria-label="File views">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="details" disabled>Details</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Preview content</TabsContent>
      <TabsContent value="details">Details content</TabsContent>
      <TabsContent value="code">Code content</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("links tabs and panels and moves focus with the arrow, Home, and End keys", async () => {
    const user = userEvent.setup();
    render(<Example defaultValue="preview" />);
    const preview = screen.getByRole("tab", { name: "Preview" });
    const code = screen.getByRole("tab", { name: "Code" });
    const panel = screen.getByRole("tabpanel", { name: "Preview" });
    expect(preview).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", preview.id);
    expect(document.getElementById(code.getAttribute("aria-controls")!)).toHaveAttribute("hidden");
    expect(screen.queryByText("Code content")).not.toBeInTheDocument();

    await user.tab();
    expect(preview).toHaveFocus();
    expect(code).toHaveAttribute("tabindex", "-1");
    await user.keyboard("{ArrowRight}");
    expect(code).toHaveFocus();
    expect(screen.getByRole("tabpanel", { name: "Code" })).toBeVisible();
    await user.keyboard("{ArrowRight}");
    expect(preview).toHaveFocus();
    await user.keyboard("{End}");
    expect(code).toHaveFocus();
    await user.keyboard("{Home}");
    expect(preview).toHaveFocus();
  });

  it("accepts a controlled value without requiring an initial value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(<Example value="preview" onValueChange={onValueChange} />);
    await user.click(screen.getByRole("tab", { name: "Code" }));
    expect(onValueChange).toHaveBeenCalledWith("code");
    expect(screen.getByRole("tabpanel", { name: "Preview" })).toBeVisible();
    rerender(<Example value="code" onValueChange={onValueChange} />);
    expect(screen.getByRole("tabpanel", { name: "Code" })).toBeVisible();
  });
});
