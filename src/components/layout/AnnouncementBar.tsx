import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="announce-row">
        <span className="announce-tag mono">New</span>
        <p className="announce-text">
          Curiosity Cloud opens capacity conversations for 2027 deployments.
        </p>
      </div>
      <Link href="/contact">
        Talk to us <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
