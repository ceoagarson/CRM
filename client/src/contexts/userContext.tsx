import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/users/user.type";


function getInitialState() {
  const user = localStorage.getItem('user')
  if (user)
    return JSON.parse(user)
}


// usercontext
type Context = {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
};
export const UserContext = createContext<Context>({
  user: undefined,
  setUser: () => null,
});


// user provider
export function UserProvider(props: { children: JSX.Element }) {
  const [user, setUser] = useState<IUser | any>(getInitialState);
  const [localUser, setLocalUser] = useState<IUser | any>()

  useEffect(() => {
    if (user) {
      setLocalUser(user)
    }
    if (localUser) {
      localStorage.setItem('user', JSON.stringify(user))
    }

  }, [localUser, user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

