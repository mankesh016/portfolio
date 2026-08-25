import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SignInButton from "@/components/SignInButton";
import GuestbookForm from "@/components/GuestbookForm";
import { approveEntry, hideEntry, deleteEntry } from "@/app/actions/guestbook";
import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { UserRound, Eye, EyeOff, Trash2 } from "lucide-react";

export const metadata = { title: "Guestbook" };

export default async function GuestbookPage() {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;
  const userId = session?.user?.id;

  const entries = await prisma.guestbookEntry.findMany({
    where: isAdmin ? {} : userId ? { OR: [{ approved: true }, { userId }] } : { approved: true },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const signedCount = entries.filter((e) => e.approved).length;

  return (
    <div>
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Guestbook" }]}
        heading="Guestbook"
        subtitle="Leave a mark, say hi, or share what brought you to my corner of the web."
      />

      <div className="mt-8">
        {session?.user ? <GuestbookForm userName={session.user.name ?? "You"} /> : <SignInButton />}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-stone-900">Notes</h2>
          <span className="font-mono text-sm text-stone-400">{signedCount} signed</span>
        </div>

        <div className="mt-6 divide-y divide-stone-200 rounded-2xl border border-stone-300 bg-[#fdfbf6]">
          {entries.map((entry) => (
            <div key={entry.id} className="flex gap-3 p-6">
              <Avatar
                src={entry.isAnonymous ? null : entry.user.image}
                shape="circle"
                size="xs"
                fit="cover"
                fallback={entry.isAnonymous ? <UserRound className="h-1/2 w-1/2" /> : (entry.user.name?.[0] ?? "?")}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-semibold text-stone-900">
                      {entry.isAnonymous ? "Anonymous" : entry.user.name}
                    </span>
                    <span className="font-mono text-xs text-stone-400">
                      {entry.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {!entry.approved && (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">pending</span>
                    )}
                  </div>
                  {isAdmin && !entry.approved && (
                    <div className="flex shrink-0 items-center gap-3">
                      <form action={approveEntry.bind(null, entry.id)}>
                        <button className="text-stone-400 hover:text-stone-600" title="Approve">
                          <EyeOff className="h-4 w-4" />
                        </button>
                      </form>
                      <form action={deleteEntry.bind(null, entry.id)}>
                        <button className="text-stone-400 hover:text-stone-600" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  )}
                  {isAdmin && entry.approved && (
                    <form action={hideEntry.bind(null, entry.id)} className="shrink-0">
                      <button className="text-stone-400 hover:text-stone-600" title="Unapprove">
                        <Eye className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
                <p className="mt-1 whitespace-pre-line text-stone-500">{entry.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
