import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-6">
      <form
        action={loginAction}
        className="w-full max-w-[360px] bg-white rounded-card border border-ink/10 p-8"
      >
        <h1 className="font-display text-[24px] text-ink mb-1">
          Admin Pandanara
        </h1>
        <p className="text-[14px] text-ink/60 mb-6">
          Masuk untuk kelola katalog.
        </p>

        <label className="block text-[13px] text-ink/70 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full rounded-btn border border-ink/15 px-4 py-3 text-[15px] mb-4 focus:border-forest outline-none"
        />

        {params.error && (
          <p className="text-[13px] text-red-600 mb-4">Password salah.</p>
        )}

        <button
          type="submit"
          className="w-full rounded-btn bg-forest text-cream py-3 text-[15px]"
        >
          Masuk
        </button>
      </form>
    </main>
  );
}