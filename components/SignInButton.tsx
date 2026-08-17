import { googleSignIn } from "@/app/actions/auth";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {
  return (
    <form action={googleSignIn}>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-[#fdfbf6] px-4 py-3 text-sm font-medium text-stone-800 transition-colors hover:border-amber-600"
      >
        <FcGoogle className="h-5 w-5" />
        Sign in with Google to leave a message
      </button>
    </form>
  );
}
