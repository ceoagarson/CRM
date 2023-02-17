import React, { useReducer } from "react"

type ChoiceState = "signup" | "login" | "reset_password_mail" | null | "new_user" | "update_user" | "delete_user" | "update_profile" | "view_profile"

// initial state
const initialState: ChoiceState = null

// action
export enum ChoiceActions {
  signup = "signup",
  login = "login",
  reset_password_mail = "reset_password_mail",
  close = "close",
  new_user = "new_user",
  update_user = "update_user",
  delete_user = "delete_user",
  update_profile = "update_profile",
  view_profile = "view_profile"
}
type Action = {
  type: ChoiceActions
}
// reducer
function reducer(state: ChoiceState, action: Action) {
  let type = action.type
  switch (type) {
    case ChoiceActions.login: return type
    case ChoiceActions.signup: return type
    case ChoiceActions.reset_password_mail: return type
    case ChoiceActions.new_user: return type
    case ChoiceActions.update_user: return type
    case ChoiceActions.delete_user: return type
    case ChoiceActions.update_profile: return type
    case ChoiceActions.view_profile: return type
    case ChoiceActions.close: return null
    default: return state
  }
}
// context
type Context = {
  choice: ChoiceState,
  setChoice: React.Dispatch<Action>
}
export const ChoiceContext = React.createContext<Context>(
  {
    choice: null,
    setChoice: () => null
  }
)
// provider
export function ChoiceProvider(props: { children: JSX.Element | JSX.Element[] }) {
  const [choice, setChoice] = useReducer(reducer, initialState)
  return (
    <ChoiceContext.Provider value={{ choice, setChoice }}>
      {props.children}
    </ChoiceContext.Provider>
  )

}
