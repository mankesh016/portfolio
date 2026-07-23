import { googleSignIn } from "@/app/actions/auth";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {
  return (
    <form action={googleSignIn}>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
      >
        <FcGoogle className="h-5 w-5" />
        Sign in with Google to leave a message
      </button>
    </form>
  );
}
