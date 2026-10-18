import { NavLink, useLocation } from "react-router-dom";
export const NAV_LINKS = [
  { to: "/", label: "Список телефонов" },
  { to: "/links", label: "Ссылки" },
  { to: "/address", label: "Адреса" },
  { to: "/video", label: "Видеонаблюдение" },
  { to: "/payment", label: "Способы оплаты услуг ЖКХ" },
  { to: "/activity", label: "Мероприятия" },
];

export default function Header({ navOpen, onToggleNav }) {
  const { pathname } = useLocation();

  // CSS шаблона подсвечивает `#header nav > ul > li.active a`, а NavLink
  // вешает класс на <a>, поэтому активность читаем на уровне <li>.
  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <header id="header">
        <h1>Университетская 17</h1>
        <nav id="nav">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to} className={isActive(l.to) ? "active" : undefined}>
                <NavLink to={l.to} end={l.to === "/"}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div id="navPanel" aria-hidden={!navOpen}>
        <nav>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className="link depth-0"
              onClick={onToggleNav}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}

