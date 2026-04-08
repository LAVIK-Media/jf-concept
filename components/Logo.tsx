import Image from "next/image";

type LogoVariant =
  | "primaryNegative"
  | "primaryPositive"
  | "secondaryNegative"
  | "secondaryPositive"
  | "iconNegative"
  | "iconPositive";

const LOGO_SRC: Record<LogoVariant, string> = {
  primaryNegative: "/brand/01_negativ-01_primary-01.svg",
  primaryPositive: "/brand/02_positiv-01_primary-01.svg",
  secondaryNegative: "/brand/01_negativ-02_secondary-01.svg",
  secondaryPositive: "/brand/02_positiv-02_secondary-01.svg",
  iconNegative: "/brand/01_negativ-03_icon-01.svg",
  iconPositive: "/brand/02_positiv-03_icon-01.svg",
};

export function Logo({
  variant = "primaryNegative",
  className,
  priority,
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={className}>
      <Image
        src={LOGO_SRC[variant]}
        alt="JF Concept"
        width={1200}
        height={600}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}

