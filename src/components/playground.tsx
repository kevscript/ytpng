"use client";

import { defaultOptions } from "@/constants/options";
import type { Option } from "@/constants/options";
import { toPng } from "html-to-image";
import { getUserOptions } from "@/utils/get-user-options";
import { useEffect, useRef, useState } from "react";
import { NumberInput } from "./number-input";
import { ColorInput } from "./color-input";
import { Button } from "./button";
import { LOCAL_STORAGE_PREFIX } from "@/constants/local-storage";
import { Card } from "./card";
import useResizeObserver from "use-resize-observer";

type PlaygroundProps = {
  data: any;
};

export function Playground({ data }: PlaygroundProps) {
  const [userOptions, setUserOptions] = useState<null | {
    [key: string]: Option;
  }>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver<HTMLDivElement>({
    ref: cardRef,
  });

  function generateAndDownload() {
    if (cardRef.current && data) {
      const ratio = 640 / cardRef.current.clientWidth;
      toPng(cardRef.current, {
        cacheBust: false,
        canvasWidth: 640,
        canvasHeight: cardRef.current.clientHeight * ratio,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${data.items[0].snippet.title}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function saveAsPreset(options: typeof userOptions) {
    for (const id in options) {
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}${id}`,
        String(options[id].value)
      );
    }
    setUserOptions(getUserOptions(defaultOptions));
  }

  function resetPresetToDefault(options: typeof userOptions) {
    for (const id in options) {
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${id}`);
    }
    setUserOptions(getUserOptions(defaultOptions));
  }

  function handleOption(id: string, value: string | number) {
    const newOptions = Object.assign({}, userOptions);
    newOptions[id].value = value;
    setUserOptions(newOptions);
  }

  useEffect(() => {
    setUserOptions(getUserOptions(defaultOptions));
  }, []);

  return (
    <div className="relative flex w-full gap-8 md:flex-row flex-col">
      {(!data || !userOptions) && (
        <div className="w-full flex justify-center items-center text-white">
          <span>Loading...</span>
        </div>
      )}
      {data && userOptions && (
        <div className="flex flex-col gap-8 max-w-[640px] md:sticky md:top-16 h-fit">
          <div ref={cardRef}>
            {width && (
              <Card
                userOptions={userOptions}
                data={data}
                size={{ width, height }}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-white">
            <Button
              className="bg-red-600 font-semibold"
              onClick={generateAndDownload}
            >
              Download as PNG
            </Button>
            <Button
              className="bg-neutral-900"
              onClick={() => saveAsPreset(userOptions)}
            >
              Save as preset
            </Button>
            <Button
              className="bg-neutral-900"
              onClick={() => {
                setUserOptions(getUserOptions(defaultOptions));
              }}
            >
              Reset to preset
            </Button>
            <Button
              className="bg-neutral-900"
              onClick={() => resetPresetToDefault(userOptions)}
            >
              Reset to default
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1 w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-1">
          {userOptions &&
            Object.entries(userOptions).map(([key, value]) => {
              if (value.type === "number") {
                return (
                  <NumberInput
                    key={value.id}
                    option={value}
                    handleOption={handleOption}
                  />
                );
              }

              return null;
            })}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-1">
          {userOptions &&
            Object.entries(userOptions).map(([key, value]) => {
              if (value.type === "color") {
                return (
                  <ColorInput
                    key={value.id}
                    option={value}
                    handleOption={handleOption}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
}
