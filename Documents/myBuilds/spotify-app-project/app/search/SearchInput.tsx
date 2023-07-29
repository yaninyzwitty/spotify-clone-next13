"use client";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import Input from "@/components/Input";

function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedVal = useDebounce(value, 500);
  useEffect(() => {
    const query = {
      title: debouncedVal,
    };
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });
    router.push(url);
  }, [debouncedVal, router]);
  return (
    <Input
      placeholder="what do you want to listen to "
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default SearchInput;
