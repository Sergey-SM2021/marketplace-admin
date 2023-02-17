import { Button } from "admin/ui"

export const Counter = () => {
  return (
    <div className="flex mb-10">
      <Button>+</Button>
      <div>10 штук в наличии</div>
      <Button>-</Button>
    </div>
  )
}
