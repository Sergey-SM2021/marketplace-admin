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

const item0 = [
  "01",
  "Бластер 'НЁРФ'",
  "89",
  "Игрушки",
  `бластер работает на батарейках и обеспечивает автоматический огонь дополнительными патронами, чтобы в пылу битвы не остаться безоружным. `,
  "info",
  "price",
  "rating",
]

const item1 = [
  "02",
  "Бластер 'НЁРФ'",
  "89",
  "Игрушки",
  `Пушкой наперевес? группы противников в одиночку. 
  Нерф патронами, чтобы в пылу битвы не остаться безоружным. `,
  "info",
  "price",
  "rating",
]

const item2 = [
  "03",
  "Бластер 'НЁРФ'",
  "89",
  "Игрушки",
  `Мечтал один боец. Однако не забывайте запастись дополнительными патронами, чтобы в пылу битвы не остаться безоружным. `,
  "info",
  "price",
  "rating",
]

const bodyTableRow = [item0, item1, item2]

export const Items = () => {
  return (
    <div className="p-4">
      <h1 className={style.content__title}>Items</h1>
      <table className={style.table}>
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
              {row.map((col, index) => {
                if (index === 1) {
                  return (
                    <td className={style.bodyTable__col}>
                      {col}
                    </td>
                  )
                }
                return <td className={style.bodyTable__col}>{col}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

