import React, { useReducer } from "react"

type Menu = "user_menu" | "home_menu"
    | "dashboard_menu" |null|"user_table_menu"
type MenuState = {
    type: Menu
    anchorEl: HTMLElement | null
}

// initial state
const initialState: MenuState = {
    type: null,
    anchorEl: null
}

// action
export enum MenuActions {
    user_menu = "user_menu",
    home_menu = "home_menu",
    dashboard_menu = "dashboard_menu",
    close = "close",
    user_table_menu="user_table_menu"
}
type Action = {
    type: MenuActions,
    payload: MenuState
}
// reducer
function reducer(state: MenuState, action: Action) {
    switch (action.type) {
        case MenuActions.home_menu: return action.payload
        case MenuActions.user_menu: return action.payload
        case MenuActions.dashboard_menu: return action.payload
        case MenuActions.user_table_menu: return action.payload
        case MenuActions.close: return action.payload
        default: return state
    }
}
// context
type Context = {
    menu: MenuState,
    setMenu: React.Dispatch<Action>
}
export const MenuContext = React.createContext<Context>(
    {
        menu: { type: null, anchorEl: null },
        setMenu: () => null
    }
)
// provider
export function MenuProvider(props: { children: JSX.Element | JSX.Element[] }) {
    const [menu, setMenu] = useReducer(reducer,initialState)
    return (
        <MenuContext.Provider value={{ menu, setMenu }}>
            {props.children}
        </MenuContext.Provider>
    )

}
