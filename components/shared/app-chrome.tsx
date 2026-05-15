"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/constants/exam";

type AppChromeProps = {
  children: React.ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isExamRoute =
    pathname?.startsWith("/test/") || pathname?.startsWith("/review/") || false;

  if (isExamRoute) {
    return <div className="relative min-h-screen overflow-x-hidden">{children}</div>;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="page-shell flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
              IB
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-900">{APP_NAME}</div>
              <div className="text-xs text-slate-500">
                IBPS SO IT Mains Professional Knowledge
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <Link href="/" className="rounded-full px-4 py-2 transition hover:bg-slate-100">
              Home
            </Link>
            <Link
              href="/subjects"
              className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Subjects
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200/80 bg-white/70">
        <div className="page-shell flex flex-col gap-3 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Built for structured IBPS SO IT mains practice with exam-style navigation.</p>
          <p>JSON-driven architecture for quick subject expansion.</p>
        </div>
      </footer>
    </div>
  );
}
