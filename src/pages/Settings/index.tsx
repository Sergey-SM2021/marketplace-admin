import { Button } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

interface ISettings {}

export const Settings = ({}: ISettings) => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('example[0].firstName')}/>
      <Button type="submit">submit</Button>
    </form>
  )
}
