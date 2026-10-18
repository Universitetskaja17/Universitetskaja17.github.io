import { activityFirst, activitySecond } from "../data/activity";

function ActivityTable({ rows }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Наименование мероприятия</th>
            <th>Срок исполнения мероприятий</th>
            <th>Ответственный за исполнение мероприятий</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.n}>
              <td>{r.n}</td>
              <td>{r.name}</td>
              <td>{r.deadline}</td>
              <td>
                {r.owner.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < r.owner.length - 1 && <br />}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ActivityPage() {
  return (
    <section id="main" className="container">
      <header>
        <h2>Мероприятия</h2>
        <h3>
          направленные на устранение дефектов, недостатков и замечаний,
          выявленных в ходе эксплуатации жилого дома по улице Университетская 17
        </h3>
        <h4>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://cloud.mail.ru/public/g5Xk/54yx2c3Mi"
          >
            Скачать "Подписанные мероприятия.pdf"
          </a>
        </h4>
      </header>

      <div className="row">
        <div className="col-12">
          <section className="box">
            <ActivityTable rows={activityFirst} />
          </section>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <section className="box">
            <h3>
              Мероприятия, требующие общего собрания собственников помещений в
              многоквартирном доме
            </h3>
            <ActivityTable rows={activitySecond} />
          </section>
        </div>
      </div>
    </section>
  );
}
