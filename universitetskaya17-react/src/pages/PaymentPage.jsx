export default function PaymentPage() {
  return (
    <section id="main" className="container">
      <header>Способы оплаты услуг ЖКХ</header>

      <div className="row">
        <div className="col-12">
          <section className="box">
            <ol>
              <li>
                Можно оплачивать услуги поставщиков отдельно в личном кабинете
                каждого поставщика услуг.
              </li>
              <li>
                Все услуги можно оплачивать в ОДНОМ месте – через личный кабинет{" "}
                <a href="https://rkc-gku.ru" target="_blank" rel="noreferrer">
                  https://rkc-gku.ru
                </a>
                , путем добавления в разделе «Мои услуги» через знак + следующие
                разделы:
                <ul>
                  <li>Услуги ЖКУ (оплата услуг управляющей компании);</li>
                  <li>Услуги КУ (оплата услуг Горводоканала);</li>
                  <li>Обращение с ТКО (оплата услуг АО «Югра –Экология»);</li>
                  <li>Электроснабжение (оплата услуг ЭК «Восток»).</li>
                </ul>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}
