"use client";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import {useRouter} from "next/navigation";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import useAuthModalStore from "@/hooks/useAuthModal";
import {useEffect} from "react";

function AuthModal() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const {session} = useSessionContext();
  const {onClose, isOpen} = useAuthModalStore();
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);
  const onChange = (open: boolean) => {
    if (open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onchange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={["github"]}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        theme="dark"
      />
    </Modal>
  );
}

export default AuthModal;
// "use client";

// import React, {useEffect} from "react";
// import {Auth} from "@supabase/auth-ui-react";
// import {ThemeSupa} from "@supabase/auth-ui-shared";
// import {
//   useSessionContext,
//   useSupabaseClient,
// } from "@supabase/auth-helpers-react";
// import {useRouter} from "next/navigation";

// import useAuthModal from "@/hooks/useAuthModal";

// import Modal from "./Modal";

// const AuthModal = () => {
//   const {session} = useSessionContext();
//   const router = useRouter();
//   const { isOpen} = useAuthModal();

//   const supabaseClient = useSupabaseClient();

//   return (
//     <Modal
//       title="Welcome back"
//       description="Login to your account."
//       isOpen={isOpen}
//       // onChange={onChange}
//       onchange={() => {}}
//     >
//       <Auth
//         supabaseClient={supabaseClient}
//         providers={["github"]}
//         magicLink={true}
//         appearance={{
//           theme: ThemeSupa,
//           variables: {
//             default: {
//               colors: {
//                 brand: "#404040",
//                 brandAccent: "#22c55e",
//               },
//             },
//           },
//         }}
//         theme="dark"
//       />
//     </Modal>
//   );
// };

// export default AuthModal;
