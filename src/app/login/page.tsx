import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  return (
    <article className="mw-article">
      <div className="mw-pre-title">Tamer</div>
      <h1 className="mw-firstHeading">Sign in</h1>
      <p>
        One tamer account. After you sign in you can edit every form from the
        assignment sheet — stats, rank, role, and evolution connections. Nothing
        stays hardcoded once you save.
      </p>
      {error ? (
        <p className="sheet-note">Wrong user or password.</p>
      ) : null}
      <form className="login-form" method="post" action="/api/auth/login">
        <input type="hidden" name="next" value={next || "/admin"} />
        <label>
          User
          <input name="user" autoComplete="username" required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit">Sign in</button>
      </form>
      <p className="section-lead">
        Default local account is <code>admin</code> / <code>infinite</code>. Set{" "}
        <code>DMI_ADMIN_USER</code> and <code>DMI_ADMIN_PASS</code> to change
        it. There is no register page.
      </p>
    </article>
  );
}
