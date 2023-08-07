import React, { createContext, useReducer } from "react";
import { IUser } from "../types/users/user.type";

// initial state
type UserState = IUser | undefined;
const IntitialState: UserState = undefined;

// reducer
type Action = {
  type: UserActions.login | UserActions.logout;
  payload?: IUser;
};
export enum UserActions {
  login = "login",
  logout = "logout",
}
function reducer(state: UserState, action: Action) {
  switch (action.type) {
    case UserActions.login:
      return action.payload;
    case UserActions.logout:
      return undefined;
    default:
      return state;
  }
}

// usercontext
type Context = {
  user: IUser | undefined;
  setUser: React.Dispatch<Action>;
};
export const UserContext = createContext<Context>({
  user: undefined,
  setUser: () => null,
});


// user provider
export function UserProvider(props: { children: JSX.Element }) {
  const [user, setUser] = useReducer(reducer, IntitialState);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}




