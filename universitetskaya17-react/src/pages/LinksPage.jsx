const GUIDE_PDF =
  "https://raw.githubusercontent.com/Universitetskaja17/Universitetskaja17.github.io/master/files/complete_guide_heating_meter_verification_procedure.pdf";

const infoResources = [
  {
    href: "http://uk-uytnyy.ru",
    label: "uk-uytnyy.ru",
    desc: 'Сайт управляющий компании ООО "УК "Ваш Уютный дом"',
  },
  {
    href: "https://rkc-gku.ru/",
    label: "https://rkc-gku.ru",
    desc: "Оплата услуг управляющей компании (содержание общего имущества, отопление и подогрев воды, содержание доп. Инженерного оборудования и охрана)",
  },
  {
    href: "https://gvk86.ru/personal",
    label: "https://gvk86.ru",
    desc: "Горводоканал (оплата холодной воды и водоотведения)",
  },
  {
    href: "https://lk.yritz.ru",
    label: "https://lk.yritz.ru",
    desc: "Югорский РИЦ (оплата электроэнергии и мусор ТКО)",
  },
];

const chats = [
  {
    href: "https://t.me/universitetskaya17",
    label: "Чат телеграмм",
    desc: "Группа создана для знакомства с соседями. А так же обмена информацией. Всем добро пожаловать.",
  },
  {
    href: "https://invite.viber.com/?g2=AQAZCPa2fTcI5EsESObldjZ7WTA%2FEWal3U5%2FD2lz0rM%2BOYEHCr4O%2FagWrKnyz4TY",
    label: "Чат Viber ( От собственников )",
    desc: "Чат созданный собственниками",
  },
];

function LinkTable({ rows }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Ссылка</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.href}-${i}`}>
              <td>
                <span className="nowrap">
                  <a href={r.href} target="_blank" rel="noreferrer">
                    {r.label}
                  </a>
                </span>
              </td>
              <td>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LinksPage() {
  return (
    <section id="main" className="container">
      <header>
        <h2>Ссылки</h2>
      </header>

      <div className="row">
        <div className="col-12">
          <section className="box">
            <h3>Руководство</h3>
            <LinkTable
              rows={[
                {
                  href: GUIDE_PDF,
                  label: "PDF файл",
                  desc: "Полный гайд по процедуре поверки счётчика отопления.",
                },
              ]}
            />
          </section>

          <section className="box">
            <h3>Информационные ресурсы</h3>
            <LinkTable rows={infoResources} />
          </section>

          <section className="box">
            <h3>Чаты</h3>
            <LinkTable rows={chats} />
          </section>
        </div>
      </div>
    </section>
  );
}