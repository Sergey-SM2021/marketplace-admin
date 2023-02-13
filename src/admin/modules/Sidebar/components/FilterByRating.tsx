import { ReactComponent as Star } from "admin/assets/star.svg"

export const FilterByRating = () => {
  return (
    <div className="flex w-full justify-between">
      {new Array(5).fill(<Star className="fill-orange-500" />)}
    </div>
  )
}
