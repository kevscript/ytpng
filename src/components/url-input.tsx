"use client";

import { parseYoutubeId } from "@/utils/parse-youtube-id";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function UrlInput() {
  const router = useRouter();
  const pathname = usePathname();

  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setError(null);
    setUrl(e.target.value);
  }

  function handleSearch() {
    setError(null);
    const id = parseYoutubeId(url);
    if (!id) {
      setError(
        "Couldn't extract the ID. Try pasting the video ID directly in the URL (/?id=[VIDEO_ID_HERE])."
      );
    } else {
      handleRoute(id as string);
    }
  }

  function handleRoute(id: string) {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("id", id);
    router.replace(`${pathname}?${currentParams.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex flex-col gap-4 w-full justify-center">
      <div className="flex justify-center gap-1">
        <input
          type="text"
          className="w-full max-w-[800px] h-12 text-black px-2 outline-0"
          value={url}
          onChange={handleInputChange}
          placeholder="Youtube video URL"
        />

        <button
          onClick={handleSearch}
          className="h-12 bg-red-600 text-white font-medium w-32"
        >
          Search
        </button>
      </div>

      <div className="flex justify-center text-red-500">
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
