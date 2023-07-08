"use client";

import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGpt from "@/lib/fetchSuggestionFromChatGpt";

import React, {useState} from "react";
import {toast} from "react-hot-toast";
// import {toast} from "react-hot-toast";

import useSWR from "swr";

function PromptInput() {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGpt, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;
  const {mutate: updateImages} = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });
  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");
    // p is prompt
    const p = useSuggestion ? suggestion : inputPrompt;
    const notification = p;
    const notificationPrompt = notification.slice(0, 20);
    const realNotification = toast.loading(
      `DALLE is creating ${notificationPrompt}...`
    );
    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({prompt: p}),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error, {
        id: realNotification,
      });
    } else {
      toast.success(`Your ai-art wa created succesfully.`, {
        id: realNotification,
      });
    }
    updateImages();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row border rounded-md lg:divide-x shadow-slate-400/10"
        onSubmit={handleSubmit}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 outline-none p-4 shadow-md rounded-md"
          placeholder={
            (loading && "chatGPT is Loading your suggestion...") ||
            suggestion ||
            "Enter your prompt..."
          }
        />

        <button
          disabled={!input}
          className={`p-4 font-bold ${
            input
              ? "bg-violet-500 text-white transition-colors duration-300"
              : "text-gray-300 cursor-not-allowed"
          }`}
          type="submit"
        >
          Generate
        </button>

        <button
          type="button"
          onClick={() => submitPrompt(true)}
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Use suggestion
        </button>
        <button
          type="button"
          className="p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "ChatGPT is loading your suggestion..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}
export default PromptInput;

// ctrl shift p --> create function app azure
// ctrl shift p--> create function

// ctrl shift p ---> create blob storage
// azure download ---> download remote settings
// azure function ---> upload remote settings
// azure funcions ----> deploy to function app
