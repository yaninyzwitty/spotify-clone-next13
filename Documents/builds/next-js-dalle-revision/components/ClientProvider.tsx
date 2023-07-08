"use client";
import {Toaster} from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

function ClientProvider({children}: Props) {
  return (
    <>
      <Toaster position="bottom-center" />
      {children}
    </>
  );
}

export default ClientProvider;
