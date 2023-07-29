"use client";

import {MyUserContextProvider} from "./useUser";

interface Props {
  children: React.ReactNode;
}

function UserProvider({children}: Props) {
  return <MyUserContextProvider children={children} />;
}

export default UserProvider;
