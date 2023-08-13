import React, { useReducer } from "react"

type UserChoices = "signup" | "reset_password_mail" | "close_user" | "new_user" | "update_user" | "update_profile" | "view_profile" | "update_password" | "reset_password" | "verify_email" | "control_access" | "delete_user" |
  "block_user" | "unblock_user" | "make_admin" | "remove_admin" | "refresh_whatsapp"

type LeadChoices = "create_lead" | "update_lead" | "update_remark" | "view_remarks" | "close_lead" | "display_filter" | "delete_lead" | "convert_customer" | "open_filter"

type BotChoices = "create_flow"
  | "refresh_whatsapp"
  | "update_flow"
  | "toogle_bot_status"
  | "update_tracker"
  | "delete_flow"
  | "close_bot"

type ChoiceState = UserChoices | LeadChoices | BotChoices

const initialState: ChoiceState | null = null


export enum BotChoiceActions {
  create_flow = "create_flow",
  refresh_whatsapp = "refresh_whatsapp",
  update_flow = "update_flow",
  toogle_bot_status = "toogle_bot_status",
  update_tracker = "update_tracker",
  delete_flow = "delete_flow",
  close_bot = "close_bot"
}
export enum LeadChoiceActions {
  create_lead = "create_lead",
  update_lead = "update_lead",
  delete_lead = "delete_lead",
  view_remarks = "view_remarks",
  close_lead = "close_lead",
  convert_customer = "convert_customer",
  display_filter = "display_filter",
  update_remark = "update_remark",
  open_filter = "open_filter"
}

export enum UserChoiceActions {
  signup = "signup",
  reset_password_mail = "reset_password_mail",
  close_user = "close_user",
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
  control_access = "control_access",
  refresh_whatsapp = "refresh_whatsapp"
}

type Action = {
  type: UserChoiceActions | LeadChoiceActions | BotChoiceActions
}

// reducer
function reducer(state: ChoiceState | null, action: Action) {
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
    case UserChoiceActions.close_user: return type

    // lead dialog choices
    case LeadChoiceActions.create_lead: return type
    case LeadChoiceActions.update_lead: return type
    case LeadChoiceActions.view_remarks: return type
    case LeadChoiceActions.update_remark: return type
    case LeadChoiceActions.display_filter: return type
    case LeadChoiceActions.delete_lead: return type
    case LeadChoiceActions.convert_customer: return type
    case LeadChoiceActions.open_filter: return type
    case LeadChoiceActions.close_lead: return type


    //bot choice actions
    case BotChoiceActions.refresh_whatsapp: return type
    case BotChoiceActions.delete_flow: return type
    case BotChoiceActions.update_flow: return type
    case BotChoiceActions.create_flow: return type
    case BotChoiceActions.update_tracker: return type
    case BotChoiceActions.toogle_bot_status: return type
    case BotChoiceActions.close_bot: return type

    default: return state
  }
}
// context
type Context = {
  choice: ChoiceState | null,
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
