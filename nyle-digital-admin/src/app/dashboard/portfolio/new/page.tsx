import Link from 'next/link';

export default function NewPortfolioPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Add New Portfolio Project</h1>
        <p className="mt-3 text-sm text-slate-600">
          The create portfolio page is not implemented yet. You can return to the portfolio dashboard for now.
        </p>
        <Link
          href="/dashboard/portfolio"
          className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
