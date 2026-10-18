const TELEGRAM = "https://t.me/universitetskaya17";
const VIBER =
  "https://invite.viber.com/?g2=AQAZCPa2fTcI5EsESObldjZ7WTA%2FEWal3U5%2FD2lz0rM%2BOYEHCr4O%2FagWrKnyz4TY";

export default function Footer() {
  return (
    <footer id="footer">
      <ul className="icons">
        <li>
          <a href={TELEGRAM} className="icon brands fa-telegram">
            <span className="label">Telegram канал Университетская 17</span>
          </a>
        </li>
        <li>
          <a href={VIBER} className="icon brands fa-viber">
            <span className="label">Группа Viber Университетская 17</span>
          </a>
        </li>
      </ul>
    </footer>
  );
}
