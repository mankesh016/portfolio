import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SignInButton from "@/components/SignInButton";
import GuestbookForm from "@/components/GuestbookForm";
import { approveEntry } from "@/app/actions/guestbook";

export default async function GuestbookPage() {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;

  const entries = await prisma.guestbookEntry.findMany({
    where: isAdmin ? {} : { approved: true },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const signedCount = entries.filter((e) => e.approved).length;

  return (
    <div>
      <p className="text-sm text-neutral-400">
        <Link href="/" className="hover:text-neutral-600">
          Home
        </Link>{" "}
        / <span className="text-neutral-700">Guestbook</span>
      </p>

      <h1 className="mt-6 text-4xl font-bold text-neutral-900">Guestbook</h1>
      <p className="mt-2 text-neutral-500">Leave a mark, say hi, or share what brought you to my corner of the web.</p>

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
            <div key={entry.id} className="py-5">
              <div className="flex items-center gap-3">
                {entry.isAnonymous ? (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-300 text-sm font-semibold text-white">
                    ?
                  </div>
                ) : entry.user.image ? (
                  <img src={entry.user.image} alt="" className="h-9 w-9 rounded-full" />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">
                    {entry.user.name?.[0] ?? "?"}
                  </div>
                )}
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
                  {isAdmin && !entry.approved && (
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">pending</span>
                  )}
                </div>
              </div>
              <p className="mt-2 whitespace-pre-line text-neutral-600">{entry.message}</p>
              {isAdmin && !entry.approved && (
                <form action={approveEntry.bind(null, entry.id)} className="mt-2">
                  <button className="text-xs font-medium text-orange-600 hover:underline">Approve</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
