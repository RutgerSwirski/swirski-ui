import { Card, Button } from "@swirski/ui";
import styles from "./coexistence.module.css";

export function CoexistenceProbe() {
  return (
    <>
      <div className="grid p-6" data-host="outside">Host outside</div>
      <input data-host="outside-input" aria-label="Host outside input" />
      <Card>
        <div className="grid p-6" data-host="nested">Nested content</div>
        <div data-swirski-unscoped="">
          <div className="grid p-6" data-host="opt-out">Host inside boundary</div>
          <input data-host="opt-out-input" aria-label="Host inside input" />
          <button className="bg-primary text-primary-foreground host-button" data-host="button">
            Host button
          </button>
        </div>
        <Button className={styles.override} data-host="override">CSS Module override</Button>
        <Button className="px-host" data-host="utility-override">Host utility override</Button>
      </Card>
    </>
  );
}
