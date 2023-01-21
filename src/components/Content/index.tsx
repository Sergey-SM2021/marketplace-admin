import style from "./index.module.sass"
import cn from "classnames"

const headerTableCol = [
  "id",
  "name",
  "categoryId",
  "category",
  "features",
  "info",
  "price",
  "rating",
]

const bodyTableCol = [
  "01",
  "Бластер 'НЁРФ'",
  "89",
  "Игрушки",
  `Мечтали превратиться в настоящего Рембо или Терминатора с огромной пушкой наперевес? Тогда не стоит ждать - взгляните на Nerf Titan! Этот огромный бластер тут же бросается в глаза, выделяя вас на поле боя. Внушительная скорострельность и большая обойма на 50 дротиков позволяют вести подавляющий огонь и побеждать целый группы противников в одиночку. 
  Нерф Титан CS-50 купить стоит ради его мощности. Этот бластер работает на батарейках и обеспечивает автоматический огонь, если нажат спусковой крючок, так что против вас не осмелится выйти ни один боец. Однако не забывайте запастись дополнительными патронами, чтобы в пылу битвы не остаться безоружным. `,
  "info",
  "price",
  "rating",
]

const bodyTableRow = [bodyTableCol, bodyTableCol, bodyTableCol]

export const Content = () => {
  return (
    <div className={style.content}>
      <h1 className={style.content__title}>items</h1>
      <table className={cn(style.content__table, style.table)}>
        <thead className={cn(style.table__header, style.headerTable)}>
          <tr className={style.headerTable__row}>
            {headerTableCol.map((col) => (
              <th className={style.headerTable__col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className={cn(style.table__body, style.bodyTable)}>
          {bodyTableRow.map((row) => (
            <tr className={style.bodyTable__row}>
              {row.map((col) => (
                <td className={style.bodyTable__col}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
