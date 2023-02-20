import React, { createContext, useReducer } from "react";
import { Asset } from "../types/asset.type";
import { IOrganization } from "../types/organization.type";

export interface IUser {
  _id?: string,
  username: string,
  dp?: Asset,
  email?: string,
  organization?: IOrganization
  roles?: string[],
  email_verified?: Boolean,
  last_login?: Date,
  createdAt?: Date,
  createdBy?: IUser,
  is_active?: Boolean
  actions?: any
}
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
  dispatch: React.Dispatch<Action>;
};
export const UserContext = createContext<Context>({
  user: undefined,
  dispatch: () => null,
});


// user provider
export function UserProvider(props: { children: JSX.Element }) {
  const [user, dispatch] = useReducer(reducer, IntitialState);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}




