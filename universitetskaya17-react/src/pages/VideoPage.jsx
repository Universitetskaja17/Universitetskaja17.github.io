export default function VideoPage() {
  return (
    <section id="main" className="container">
      <header>Подключение к видеонаблюдению</header>

      <div className="row">
        <div className="col-12">
          <section className="box">
            <header>
              <h3>Инструкция пользователя</h3>
              <p>Для получения доступа к системе видеонаблюдения.</p>
            </header>
            <ul>
              <li>
                <b>Скачать</b> приложение Macroscop в{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=MACROSCOP.Mobile"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Play
                </a>{" "}
                или{" "}
                <a
                  href="https://apps.apple.com/ru/app/macroscop/id590215695"
                  target="_blank"
                  rel="noreferrer"
                >
                  App Store
                </a>
                .
              </li>
              <li>
                <b>Нажать</b> оранжевый плюсик.
              </li>
              <li>
                <b>В поле</b> "Название системы" ввести произвольное название или
                оставить без изменений.
              </li>
              <li>
                <b>В поле</b> "IP - адрес" ввести 188.19.14.117
              </li>
              <li>
                <b>В поле</b> "Имя пользователя" ввести 1
              </li>
              <li>
                <b>Нажать</b> кнопку "Готово" или "V" в верхнем углу.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
