import { CreateCategoryCommand, EditCategoryCommand } from "entity"

import {
  $categories,
  addCategory,
  getCategories,
  removeCategoryById,
} from "../store/store"
import { addNotification } from "modules/Notifications/store"

import { CategoryModal } from "./components/CategoryModal"

import { Add } from "ui/Add"
import { Header } from "ui/Table/Header"

import { headerTableCol } from "./index.data"
import style from "./index.module.sass"
import { RenderRow } from "./utils/RenderRow/RenderRow"

import { useStore } from "effector-react"
import {
  memo,
  SyntheticEvent,
  useEffect,
  useState,
  MouseEvent,
  FC,
} from "react"
import { useNavigate } from "react-router-dom"

export const Categories: FC = memo(() => {
  useEffect(() => {
    getCategories()
  }, [])

  const categories = useStore($categories)
  const isLoading = useStore(getCategories.pending)

  const navigate = useNavigate()

  // redirect на продукты
  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  const [modal, setModal] = useState<{
    isOpen: boolean
    state: EditCategoryCommand | null
  }>({ isOpen: false, state: {} })

  interface IHanleModalOpen {
    e?: MouseEvent<HTMLButtonElement>
    state?: EditCategoryCommand
  }

  const hanleModalOpen = ({ e, state }: IHanleModalOpen) => {
    if (e) {
      e.stopPropagation()
    }
    setModal({ isOpen: true, state: state || null })
  }

  const handleModalClose = () => {
    setModal({ isOpen: false, state: null })
  }

  // Обработчик удаления категории
  const handlerRemoveClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation()
    addNotification({
      onAccept: () => {
        removeCategoryById(id)
      },
      text: "Вы уверенны, что хотите удалить данную категорию?",
    })
  }

  // callback создания новой категории props for Modal
  const handlerSendNewCategory = async (
    payload: CreateCategoryCommand | EditCategoryCommand
  ) => {
    await addCategory(payload)
    await getCategories()
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="p-4 w-full">
      {modal.isOpen ? (
        <CategoryModal
          categories={categories.map(cat => ({
            key: cat.name as string,
            value: cat.id as number,
          }))}
          category={modal.state}
          handlerSave={handlerSendNewCategory}
          handlerClose={handleModalClose}
        />
      ) : null}
      <div className="flex gap-5 items-center mb-4">
        <h1 className={style.content__title}>Categories</h1>
        <Add
          handlerAdd={() => {
            hanleModalOpen({})
          }}
        />
      </div>
      {categories.length ? (
        <table
          style={{
            margin: "-10px 0",
            borderSpacing: "0 10px",
            borderCollapse: "separate",
            minWidth: "100%",
          }}>
          <Header row={headerTableCol} />
          {categories.map(cat => (
            <RenderRow category={cat} handlerClick={(id:number) => handlerRowClick(id)}/>
          ))}
        </table>
      ) : (
        <div>
          <div>Создайте категорию</div>
        </div>
      )}
    </div>
  )
})

// onClick={e => handlerRemoveClick(e, id as number)}

// onClick={e =>
//   hanleModalOpen({
//     e,
//     state: {
//       categoryId: id,
//       name: name,
//       parentCategoryId: category.parentCategoryId,
//     },
//   })
// }

{
  /* <table className={style.table}>
<thead className={cn(style.table__header, style.headerTable)}>
  <tr className={style.headerTable__row}>
    {HeaderTableRow.map((col, index) => (
      <th key={v4()}
        className={style.headerTable__col}
        colSpan={index === (HeaderTableRow.length - 1) ? 2 : 1}
      >
        {col  }
      </th>
    ))}
  </tr>
</thead>
<tbody className={cn(style.table__body, style.bodyTable)}>
  {BodyTableRows.map((category) => {
    return (
      <tr
        key={v4()}
        onClick={() => BodyTableRowClickHandler(category[0] as number)}
        className={style.bodyTable__row}
      >
        {category.map((value) => {
          return <td key={v4()} className={style.bodyTable__col}>{value}</td>
        })}
      </tr>
    )
  })}
</tbody>
</table> */
}
