import { prisma } from "@/lib/prisma";
import PlatformCardForm from "@/components/admin/PlatformCardForm";
import CardImageUploadForm from "@/components/admin/CardImageUploadForm";
import { updateCard, deleteCardImage, moveCardImage } from "@/app/actions/platformCards";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";

export default async function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await prisma.platformCard.findUniqueOrThrow({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  async function action(formData: FormData) {
    "use server";
    await updateCard(id, formData);
  }

  return (
    <div className="space-y-6">
      <PlatformCardForm action={action} defaultValues={card} />

      <div>
        <h2 className="text-sm font-semibold text-neutral-700">Images ({card.images.length}/5)</h2>
        <div className="mt-2 space-y-2">
          {card.images.map((img) => (
            <div key={img.id} className="flex items-center gap-3 rounded-md border border-neutral-100 p-2 text-sm">
              <img src={img.url} alt="" className="h-12 w-16 rounded-md object-cover" />
              <span className="flex-1 text-neutral-500">{img.caption ?? "—"}</span>
              <form action={moveCardImage.bind(null, id, img.id, "up")}>
                <button>
                  <ArrowUp className="h-4 w-4 text-neutral-400 hover:text-neutral-700" />
                </button>
              </form>
              <form action={moveCardImage.bind(null, id, img.id, "down")}>
                <button>
                  <ArrowDown className="h-4 w-4 text-neutral-400 hover:text-neutral-700" />
                </button>
              </form>
              <form action={deleteCardImage.bind(null, img.id)}>
                <button>
                  <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
                </button>
              </form>
            </div>
          ))}
        </div>
        {card.images.length < 5 && (
          <div className="mt-3">
            <CardImageUploadForm cardId={id} />
          </div>
        )}
      </div>
    </div>
  );
}
