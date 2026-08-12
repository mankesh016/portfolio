import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SignInButton from "@/components/SignInButton";
import GuestbookForm from "@/components/GuestbookForm";
import { approveEntry } from "@/app/actions/guestbook";
import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";

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
          <h2 className="text-2xl font-bold text-neutral-900">Notes</h2>
          <span className="font-mono text-sm text-neutral-400">{signedCount} signed</span>
        </div>

        <div className="mt-6 divide-y divide-neutral-100">
          {entries.map((entry) => (
            <div key={entry.id} className="flex gap-3 py-6">
              <Avatar
                src={entry.isAnonymous ? null : entry.user.image}
                shape="circle"
                size="xs"
                fit="cover"
                fallback={entry.isAnonymous ? "?" : (entry.user.name?.[0] ?? "?")}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-neutral-900">
                    {entry.isAnonymous ? "Anonymous" : entry.user.name}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
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
                <p className="mt-0 whitespace-pre-line text-neutral-500">{entry.message}</p>
                {isAdmin && !entry.approved && (
                  <form action={approveEntry.bind(null, entry.id)} className="mt-3">
                    <button className="text-xs font-normal text-orange-600 hover:underline">Approve</button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
