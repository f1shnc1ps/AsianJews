import Link from "next/link";
import DownloadButton from "@buttons/download-button";

export default function NewsletterItem({
  title,
  subtitle,
  URL,
  url,
  link,
  btnicon,
  btntext,
}) {
  return (
    <>
      <h5>{title}</h5>
      <h6 className="mb-0">{subtitle}</h6>

      <div>
        {url ? (
          <Link href={url.url} target="_blank" rel="noopener noreferrer">
            <DownloadButton btnicon={btnicon}>{btntext}</DownloadButton>
          </Link>
        ) : null}
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <DownloadButton btnicon={btnicon}>{btntext}</DownloadButton>
          </a>
        ) : null}
      </div>
    </>
  );
}
