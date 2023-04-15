import React, { useReducer } from "react"

// choices
type UserChoices = "signup"| "reset_password_mail" | null | "new_user" | "update_user" | "update_profile" | "view_profile" | "update_password" | "reset_password" | "verify_email" | "control_access" | "delete_user" |
  "block_user" | "unblock_user" | "make_admin" | "remove_admin" 

type LeadChoices = "create_lead" | "update_lead" | "update_remark" | "view_lead" | "close" | "display_filter"


// initial state
type ChoiceState = UserChoices | LeadChoices
const initialState: ChoiceState = null

export enum LeadChoiceActions {
  create_lead = "create_lead",
  update_lead = "update_lead",
  view_lead = "view_lead",
  close ="close",
  display_filter ="display_filter",
  update_remark = "update_remark",
}

export enum UserChoiceActions {
  signup = "signup",
  reset_password_mail = "reset_password_mail",
  close = "close",
  new_user = "new_user",
  update_user = "update_user",
  update_profile = "update_profile",
  view_profile = "view_profile",
  reset_password = "reset_password",
  update_password = "update_password",
  verify_email = "verify_email",
  block_user = "block_user",
  unblock_user = "unblock_user",
  make_admin = "make_admin",
  remove_admin = "remove_admin",
  delete_user = "delete_user",
  control_access ="control_access"
}

type Action = {
  type: UserChoiceActions | LeadChoiceActions 
}

// reducer
function reducer(state: ChoiceState, action: Action) {
  let type = action.type
  switch (type) {
    // user dialogs choices
    case UserChoiceActions.signup: return type
    case UserChoiceActions.reset_password_mail: return type
    case UserChoiceActions.new_user: return type
    case UserChoiceActions.update_user: return type
    case UserChoiceActions.update_profile: return type
    case UserChoiceActions.view_profile: return type
    case UserChoiceActions.update_password: return type
    case UserChoiceActions.reset_password: return type
    case UserChoiceActions.verify_email: return type
    case UserChoiceActions.block_user: return type
    case UserChoiceActions.unblock_user: return type
    case UserChoiceActions.make_admin: return type
    case UserChoiceActions.control_access: return type
    case UserChoiceActions.remove_admin: return type
    case UserChoiceActions.delete_user: return type
    case UserChoiceActions.close: return null

    // lead dialog choices
    case LeadChoiceActions.create_lead: return type
    case LeadChoiceActions.update_lead: return type
    case LeadChoiceActions.view_lead: return type
    case LeadChoiceActions.update_remark: return type
    case LeadChoiceActions.display_filter: return type
    case LeadChoiceActions.close: return null
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
export function ChoiceProvider(props: { children: JSX.Element }) {
  const [choice, setChoice] = useReducer(reducer, initialState)
  return (
    <ChoiceContext.Provider value={{ choice, setChoice }}>
      {props.children}
    </ChoiceContext.Provider>
  )

}
