import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  // Аналог инициализации из Alpha main.js: снимаем is-preload после загрузки,
  // чтобы CSS-анимации/транзишены срабатывали.
  useEffect(() => {
    const id = window.setTimeout(() => {
      document.body.classList.remove("is-preload");
    }, 100);
    return () => window.clearTimeout(id);
  }, []);

  // Скролл наверх и закрытие мобильного меню при смене страницы.
  useEffect(() => {
    window.scrollTo(0, 0);
    setNavOpen(false);
  }, [pathname]);

  // Блокировка прокрутки, пока открыто мобильное меню.
  useEffect(() => {
    document.body.classList.toggle("navPanel-visible", navOpen);
    return () => document.body.classList.remove("navPanel-visible");
  }, [navOpen]);

  return (
    <>
      <div id="page-wrapper">
        <Header navOpen={navOpen} onToggleNav={() => setNavOpen((v) => !v)} />
        <Outlet />
        <Footer />
      </div>

      {/* Кнопка-бургер для мобильных, как в оригинальном шаблоне */}
      <div id="navButton">
        <button
          type="button"
          className="toggle"
          aria-label="Меню"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        />
      </div>

      {/* Затемнение и зона тапа справа от панели: закрывает меню без сдвига страницы. */}
      <div
        id="navOverlay"
        aria-hidden="true"
        onClick={() => setNavOpen(false)}
      />
    </>
  );
}

