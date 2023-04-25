import React, { useReducer } from "react"

// choices
type UserChoices = "signup"| "reset_password_mail" | null | "new_user" | "update_user" | "update_profile" | "view_profile" | "update_password" | "reset_password" | "verify_email" | "control_access" | "delete_user" |
  "block_user" | "unblock_user" | "make_admin" | "remove_admin" 

type LeadChoices = "create_lead" | "update_lead" | "update_remark" | "view_remarks" | null | "display_filter" |"delete_lead"

type ProductionChoices = "new_production_page" | null | "update_production_page" | "update_production" | "report_machine_wise" |"report_category_wise"

type MachineChoices = "new_machine" | "update_machine" | null
type CategoryChoices = "new_category" | "update_category" | null

// initial state
type ChoiceState = UserChoices | LeadChoices | ProductionChoices | MachineChoices | CategoryChoices

const initialState: ChoiceState = null

export enum LeadChoiceActions {
  create_lead = "create_lead",
  update_lead = "update_lead",
  delete_lead = "delete_lead",
  view_remarks = "view_remarks",
  close ="close",
  display_filter ="display_filter",
  update_remark = "update_remark",
}
export enum CategoryChoiceActions{
  update_category = "update_category",
  new_category = "new_category",
  close = "close"
}
export enum MachineChoiceActions{
  update_machine = "update_machine",
  new_machine = "new_machine",
  close="close"
}
export enum ProductionChoiceActions {
  new_production_page="new_production_page",
  close = "close",
  update_production ="update_production",
  update_production_page ="update_production_page",
  report_machine_wise ="report_machine_wise",
  report_category_wise ="report_category_wise"
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
  type: UserChoiceActions | LeadChoiceActions | ProductionChoiceActions | MachineChoiceActions | CategoryChoiceActions
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
    case LeadChoiceActions.view_remarks: return type
    case LeadChoiceActions.update_remark: return type
    case LeadChoiceActions.display_filter: return type
    case LeadChoiceActions.delete_lead: return type
    case LeadChoiceActions.close: return null

    //production dialog choices
    case ProductionChoiceActions.new_production_page: return type
    case ProductionChoiceActions.update_production: return type
    case ProductionChoiceActions.update_production_page: return type
    case ProductionChoiceActions.report_category_wise: return type
    case ProductionChoiceActions.report_machine_wise: return type
    case ProductionChoiceActions.close: return null

    //machine dialog choices
    case MachineChoiceActions.new_machine: return type
    case MachineChoiceActions.update_machine: return type
    case MachineChoiceActions.close: return null
    
    //category dialog choices
    case CategoryChoiceActions.new_category: return type
    case CategoryChoiceActions.update_category: return type
    case CategoryChoiceActions.close: return null


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
