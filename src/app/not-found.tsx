import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mw-article">
      <h1 className="mw-firstHeading">There is currently no text in this page</h1>
      <p>
        You can <Link href="/">return to the Main Page</Link> or{" "}
        <Link href="/search">search the wiki</Link>.
      </p>
    </article>
  );
}
