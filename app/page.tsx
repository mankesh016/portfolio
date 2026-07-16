export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-white px-6 dark:bg-black">
      <main className="text-center">
        <h1 className="text-2xl font-semibold text-black dark:text-white">Mankesh Meena</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Competitive Programmer (ICPC Regionalist x2, Codeforces Candidate Master) · SDE &amp; DevOps Engineer ·
          Ex-Google Intern
        </p>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          Full portfolio coming soon. Meanwhile, find me on{" "}
          <a
            href="https://linkedin.com/in/mankesh016"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-black dark:hover:text-white"
          >
            LinkedIn
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/mankesh016"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-black dark:hover:text-white"
          >
            GitHub
          </a>
          .
        </p>
      </main>
    </div>
  );
}
