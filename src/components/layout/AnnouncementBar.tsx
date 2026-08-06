import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="announce">
      <span className="announce-tag mono">New</span>
      <p>Curiosity Cloud opens capacity conversations for 2027 deployments.</p>
      <Link href="/contact">
        Talk to us <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
