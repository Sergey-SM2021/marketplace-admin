import { createDomain } from "effector"

export const isAuthDomain = createDomain()

export const makeAuth = isAuthDomain.event()

export const $auth = isAuthDomain
  .createStore(false)
  .on(makeAuth, (state, payload) => !state)
