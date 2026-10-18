const twoGis =
  "https://2gis.ru/surgut/firm/5489291327212889?m=73.442806%2C61.250167%2F17.4";

export default function AddressPage() {
  return (
    <section id="main" className="container">
      <header>
        <h2>Адреса</h2>
      </header>

      <div className="row">
        <div className="col-12">
          <section className="box">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Наименование</th>
                    <th>Описание</th>
                    <th>Ссылка</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Офис ООО УК «Ваш Уютный дом»</td>
                    <td>
                      ул. Университетская дом 29 (вход со стороны коммерческих
                      помещений со стороны 1 подъезда)
                    </td>
                    <td>
                      <span className="nowrap">
                        <a href={twoGis} target="_blank" rel="noreferrer">
                          Ссылка 2Гис
                        </a>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Паспортный стол</td>
                    <td>ул. Университетская дом 29</td>
                    <td>
                      <span className="nowrap">
                        <a href={twoGis} target="_blank" rel="noreferrer">
                          Ссылка 2Гис
                        </a>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="box">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Наименование</th>
                    <th>Ссылка</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>УК «Ваш Уютный дом»</td>
                    <td>
                      <span className="nowrap">
                        <a href="mailto:uk_uytnyy@mail.ru">uk_uytnyy@mail.ru</a>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
