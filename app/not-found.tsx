import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[70vh] items-center py-16">
      <div className="panel mx-auto max-w-2xl p-8 text-center sm:p-12">
        <span className="section-kicker">Page Not Found</span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          The requested mock test page could not be found.
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The subject may not be registered yet, or the route may be incorrect.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="action-button-primary">
            Go Home
          </Link>
          <Link href="/subjects" className="action-button-secondary">
            Browse Subjects
          </Link>
        </div>
      </div>
    </section>
  );
}
