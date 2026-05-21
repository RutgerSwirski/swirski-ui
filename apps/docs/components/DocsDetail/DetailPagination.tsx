import { Button, Grid } from "@swirski/ui";

type DetailPaginationProps = {
  nextHref: string;
  nextTitle: string;
  previousHref: string;
  previousTitle: string;
};

export function DetailPagination({
  nextHref,
  nextTitle,
  previousHref,
  previousTitle,
}: DetailPaginationProps) {
  return (
    <Grid
      as="section"
      columns={1}
      gap="md"
      className="border-t-4 border-black pt-8 sm:grid-cols-2 md:items-center"
    >
      <Button href={previousHref} tone="white" className="w-full text-xs sm:text-sm">
        Previous: {previousTitle}
      </Button>
      <Button
        href={nextHref}
        className="w-full items-center gap-2 text-xs sm:text-sm"
      >
        Next: {nextTitle}
      </Button>
    </Grid>
  );
}
