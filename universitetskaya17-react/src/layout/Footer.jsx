const MAX =
  "https://max.ru/join/IfJKYKhgtHDZJBBFN097d-TSWPl-OwadTQl2vpIyrmg";

export default function Footer() {
  return (
    <footer id="footer">
      <ul className="icons">
        <li>
          <a
            href={MAX}
            className="icon fa-comment-dots"
            target="_blank"
            rel="noopener noreferrer"
            title="Мессенджер MAX — Университетская 17"
          >
            <span className="label">Мессенджер MAX — Университетская 17</span>
          </a>
        </li>
      </ul>
    </footer>
  );
}
