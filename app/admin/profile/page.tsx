import { prisma } from "@/lib/prisma";
import { updateProfile } from "@/app/actions/profile";
import PhotoUploadField from "@/components/admin/PhotoUploadField";

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findUnique({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Profile</h1>
      <form action={updateProfile} className="mt-4 space-y-3">
        <PhotoUploadField defaultSmall={profile?.photoSmallUrl ?? ""} defaultMedium={profile?.photoMediumUrl ?? ""} />
        <input
          name="name"
          placeholder="Name"
          defaultValue={profile?.name}
          required
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="tagline"
          placeholder="Short tagline"
          defaultValue={profile?.tagline}
          required
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <textarea
          name="about"
          placeholder="About paragraph"
          defaultValue={profile?.about}
          rows={4}
          required
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="githubUsername"
          placeholder="GitHub username (for contributions graph)"
          defaultValue={profile?.githubUsername ?? ""}
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <button className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">Save</button>
      </form>
    </div>
  );
}
