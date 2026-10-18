import { barriers, phones } from "../data/phones";

export default function PhonesPage() {
  return (
    <section id="main" className="container">
      <header>
        <h2>Список телефонов</h2>
      </header>

      <div className="row">
        <div className="col-12">
          {/* Телефоны управляющей компании */}
          <section className="box">
            <h3>Телефоны управляющей компании</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Телефон</th>
                    <th>Описание</th>
                    <th>ФИО</th>
                  </tr>
                </thead>
                <tbody>
                  {phones.map((p, i) => (
                    <tr key={`${p.tel}-${i}`}>
                      <td>
                        <span className="nowrap">
                          <a href={`tel:${p.tel}`}>{p.label}</a>
                        </span>
                      </td>
                      <td>{p.desc}</td>
                      <td>{p.person}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Шлагбаум */}
          <section className="box">
            <h3>Шлагбаум</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Телефон</th>
                    <th>Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {barriers.map((p, i) => (
                    <tr key={`${p.tel}-${i}`}>
                      <td>
                        <span className="nowrap">
                          <a href={`tel:${p.tel}`}>{p.label}</a>
                        </span>
                      </td>
                      <td>{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
