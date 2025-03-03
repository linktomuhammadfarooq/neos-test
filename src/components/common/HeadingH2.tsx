import clsx from "clsx";

interface HeadingH2 {
  title: string;
  className?: string;
}
export const HeadingH2 = ({ title, className }: HeadingH2) => {
  return (
    <h2
      className={clsx(
        "text-xl leading-normal font-inter text-card-foreground tracking-normal font-semibold",
        className
      )}
    >
      {title}
    </h2>
  );
};
