"use client";
import Button from "@/components/Button";
import useSubModal from "@/hooks/useSubModal";
import {useUser} from "@/hooks/useUser";
import {postData} from "@/lib/helpers";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

function AccountContent() {
  const router = useRouter();
  const subscribeModal = useSubModal();
  const {isLoading, subscription, user} = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
  const redirectToCustomerPortal = async () => {
    setLoading(true);

    try {
      const {url, error} = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active Plan</p>
          <Button className="w-[300px]">Subscribe</Button>
        </div>
      )}

      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name} </b>plan
          </p>
          <Button
            className="w-[300px]"
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
          >
            Open Customer portal
          </Button>
        </div>
      )}
    </div>
  );
}

export default AccountContent;
