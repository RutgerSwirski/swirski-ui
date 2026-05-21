import type { PropDoc } from "@/content/types";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Title,
} from "@swirski/ui";

type PropTableProps = {
  badgeLabel?: string;
  rows: PropDoc[];
};

export function PropTable({ badgeLabel, rows }: PropTableProps) {
  return (
    <section id="props" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#FF3131]" />
          <Title order={2} size="h3">
            Props
          </Title>
        </div>

        <Badge tone="white">{badgeLabel ?? `${rows.length} documented`}</Badge>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-hidden pb-3 pr-3">
        <Table className="min-w-[48rem]">
          <TableHead>
            <TableRow>
              <TableHeader>Prop</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Default</TableHeader>
              <TableHeader>Notes</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((prop) => (
              <TableRow key={prop.name}>
                <TableCell className="align-top text-[#0B0B0C]">
                  <code className="font-black">{prop.name}</code>
                  {prop.required && (
                    <Badge className="ml-2" size="sm">
                      Required
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="align-top">
                  <code>{prop.type}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code>{prop.defaultValue ?? "-"}</code>
                </TableCell>
                <TableCell className="max-w-md align-top">
                  {prop.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export function ReturnTable({ rows }: { rows?: PropDoc[] }) {
  if (!rows?.length) {
    return null;
  }

  return (
    <section id="returns" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#0057FF]" />
          <Title order={2} size="h3">
            Returns
          </Title>
        </div>

        <Badge tone="white">{rows.length} documented</Badge>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-hidden pb-3 pr-3">
        <Table className="min-w-[42rem]">
          <TableHead>
            <TableRow>
              <TableHeader>Value</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Notes</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((value) => (
              <TableRow key={value.name}>
                <TableCell className="align-top text-[#0B0B0C]">
                  <code className="font-black">{value.name}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code>{value.type}</code>
                </TableCell>
                <TableCell className="max-w-md align-top">
                  {value.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
