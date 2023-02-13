import { makeAuth } from "./store/store"

import { AuthModal } from "./components/AuthModal"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface IAuth {}

export enum EMode {
  login = "login",
  register = "register",
}

export const Auth = () => {
  const [mode, setMode] = useState<Boolean>(false)
  const nav = useNavigate()
  const handlerLogin = () => {
    makeAuth()
    nav('/')
  }
  const handlerRegister = () => {
    setMode(true)
  }
  return (
    <AuthModal
      mode={mode}
      onLogin={handlerLogin}
      onRegister={handlerRegister}
    />
  )
}
