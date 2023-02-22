import React, { useReducer } from "react"

// choices
type UserChoices = "signup" | "login" | "reset_password_mail" | null | "new_user" | "update_user" | "update_profile" | "view_profile" | "update_password" | "reset_password" | "verify_email" | "change_role" | "delete_user" |
  "block_user" | "unblock_user" | "make_admin" | "revoke_permission" | "make_owner"

type ConversionChoices = "convert_resource" | "close"

type LeadChoices = "create_lead" | "update_lead" | "open_close_lead" | "close" | "view_lead"

type AccountChoices = "create_account" | "update_account" | "open_close_account" | "close" | "view_account"

type OpportunityChoices = "create_opportunity" | "update_opportunity" | "open_close_opportunity" | "close" | "view_opportunity"

type ActivityChoices = "create_activity" | "update_activity" | "open_close_activity" | "close" | "view_activity" | "delete_activity"

// initial state
type ChoiceState = UserChoices | LeadChoices | AccountChoices | OpportunityChoices | ActivityChoices | ConversionChoices
const initialState: ChoiceState = null

// actions
export enum ConversionChoiceActions {
  convert_resource = "convert_resource",
  close = "close"
}
export enum LeadChoiceActions {
  create_lead = "create_lead",
  update_lead = "update_lead",
  open_close_lead = "open_close_lead",
  view_lead = "view_lead",
  close = "close",
}
export enum AccountChoiceActions {
  create_account = "create_account",
  update_account = "update_account",
  open_close_account = "open_close_account",
  view_account = "view_account",
  close = "close"
}
export enum OpportunityChoiceActions {
  create_opportunity = "create_opportunity",
  update_opportunity = "update_opportunity",
  open_close_opportunity = "open_close_opportunity",
  close = "close",
  view_opportunity = "view_opportunity"
}
export enum ActivityChoiceActions {
  create_activity = "create_activity",
  update_activity = "update_activity",
  open_close_activity = "open_close_activity",
  close = "close",
  view_activity = "view_activity",
  delete_activity = "delete_activity"

}

export enum UserChoiceActions {
  signup = "signup",
  login = "login",
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
  revoke_permission = "revoke_permission",
  make_owner = "make_owner",
  delete_user = "delete_user"
}

type Action = {
  type: UserChoiceActions | LeadChoiceActions | AccountChoiceActions | OpportunityChoiceActions | ActivityChoiceActions | ConversionChoiceActions
}

// reducer
function reducer(state: ChoiceState, action: Action) {
  let type = action.type
  switch (type) {
    // user dialogs choices
    case UserChoiceActions.login: return type
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
    case UserChoiceActions.make_owner: return type
    case UserChoiceActions.revoke_permission: return type
    case UserChoiceActions.delete_user: return type
    case UserChoiceActions.close: return null

    // conversion dialog choices
    case ConversionChoiceActions.convert_resource: return type
    case ConversionChoiceActions.close: return null

    // lead dialog choices


    case LeadChoiceActions.create_lead: return type
    case LeadChoiceActions.update_lead: return type
    case LeadChoiceActions.open_close_lead: return type
    case LeadChoiceActions.view_lead: return type
    case LeadChoiceActions.close: return null

    // account dialog choices
    case AccountChoiceActions.create_account: return type
    case AccountChoiceActions.update_account: return type
    case AccountChoiceActions.open_close_account: return type
    case AccountChoiceActions.view_account: return type
    case AccountChoiceActions.close: return null

    // opportunity dialog choices
    case OpportunityChoiceActions.create_opportunity: return type
    case OpportunityChoiceActions.update_opportunity: return type
    case OpportunityChoiceActions.open_close_opportunity: return type
    case OpportunityChoiceActions.view_opportunity: return type
    case OpportunityChoiceActions.close: return null

    // activity dialog choices
    case ActivityChoiceActions.create_activity: return type
    case ActivityChoiceActions.update_activity: return type
    case ActivityChoiceActions.open_close_activity: return type
    case ActivityChoiceActions.view_activity: return type
    case ActivityChoiceActions.delete_activity: return type
    case ActivityChoiceActions.close: return null
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
