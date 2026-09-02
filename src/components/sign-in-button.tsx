"use client";

export function SignInButton({
  next = "/",
  className = "mw-signin",
}: {
  next?: string;
  className?: string;
}) {
  return (
    <form action="/api/auth/login" method="post">
      <input type="hidden" name="next" value={next} />
      <button type="submit" className={className}>
        Sign in
      </button>
    </form>
  );
}

export function SignOutButton({ className = "mw-signin" }: { className?: string }) {
  return (
    <form action="/api/auth/logout" method="post">
      <button type="submit" className={className}>
        Sign out
      </button>
    </form>
  );
}
