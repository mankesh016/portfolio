import PlatformCardImageCarousel from "@/components/PlatformCardImageCarousel";
import CPInfoLineIcon from "@/components/CPInfoLineIcon";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";

type InfoLine = { icon: string; text: string };
type CardImage = { id: string; url: string; caption?: string | null };

export default function PlatformCard({
  heading,
  subtitle,
  logoUrl,
  infoLines,
  images,
}: {
  heading: string;
  subtitle?: string | null;
  logoUrl?: string | null;
  infoLines: InfoLine[];
  images: CardImage[];
}) {
  return (
    <Card
      radius="xl"
      padding="lg"
      className="grid gap-5 border-stone-300 bg-[#fdfbf6] transition-colors hover:border-amber-600 sm:grid-cols-2"
    >
      <PlatformCardImageCarousel images={images} />

      <div>
        <div className="flex items-center gap-3">
          <Avatar src={logoUrl} size="xs" fallback={heading[0]} />
          <div>
            <h3 className={cn(serif.className, "text-2xl text-stone-900")}>{heading}</h3>
            {subtitle && <p className="text-sm text-stone-500">{subtitle}</p>}
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          {infoLines.map((line, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-stone-600">
              <CPInfoLineIcon icon={line.icon} />
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
