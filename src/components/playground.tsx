"use client";

import { defaultOptions } from "@/constants/options";
import type { Option } from "@/constants/options";
import { toPng } from "html-to-image";
import { getUserOptions } from "@/utils/get-user-options";
import { useEffect, useRef, useState } from "react";
import { NumberInput } from "./number-input";
import Image from "next/image";
import { abbreviateNumber } from "js-abbreviation-number";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import "moment/locale/fr";
import { ColorInput } from "./color-input";
import { Button } from "./button";
import { LOCAL_STORAGE_PREFIX } from "@/constants/local-storage";

momentDurationFormatSetup(moment);
typeof moment.duration.fn.format === "function";
// typeof moment.duration.duration === "function";
moment.locale("fr");

type PlaygroundProps = {
  data: any;
};

export function Playground({ data }: PlaygroundProps) {
  const [userOptions, setUserOptions] = useState<null | {
    [key: string]: Option;
  }>(null);

  const thumbRef = useRef(null);

  const [downloadBtnText, setDownloadBtnText] = useState("Download as PNG");
  const [saveAsPresetBtnText, setSaveAsPresetBtnText] =
    useState("Save as preset");
  const [resetToPresetBtnText, setResetToPresetBtnText] =
    useState("Reset to preset");
  const [resetToDefaultBtnText, setResetToDefaultBtnText] =
    useState("Reset to default");

  function generateAndDownload() {
    if (thumbRef.current && data) {
      toPng(thumbRef.current, { cacheBust: false })
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
    <div className="relative flex w-full flex-col gap-16 p-16 justify-center items-center">
      {data && userOptions && (
        <div>
          <div
            ref={thumbRef}
            className="w-[1280px] shrink-0 overflow-hidden"
            style={{
              backgroundColor: `${userOptions["bg-color"].value}`,
              borderRadius: `${userOptions["outer-radius"].value}px`,
              paddingTop: `${userOptions["padding-top"].value}px`,
              paddingLeft: `${userOptions["padding-left"].value}px`,
              paddingRight: `${userOptions["padding-right"].value}px`,
              paddingBottom: `${userOptions["padding-bottom"].value}px`,
            }}
          >
            <div
              className="relative w-full aspect-[1/0.5625] flex justify-center items-center overflow-hidden"
              style={{ borderRadius: `${userOptions["inner-radius"].value}px` }}
            >
              <Image
                className="w-full object-contain"
                src={data.items[0].snippet.thumbnails.maxres.url}
                width={0}
                height={0}
                sizes="100vw"
                alt="thumbnail"
              />
              <div className="absolute bottom-4 right-4 bg-neutral-950 py-1 px-2 rounded-lg">
                <span className="text-white text-xl">
                  {moment
                    .duration(data.items[0].contentDetails.duration, "minutes")
                    .format("hh:mm:ss", {
                      trim: "both mid",
                    })}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span
                className="line-clamp-2 font-medium"
                style={{
                  fontSize: `${userOptions["title-size"].value}px`,
                  marginTop: `${userOptions["title-margin"].value}px`,
                  color: `${userOptions["title-color"].value}`,
                }}
              >
                {data.items[0].snippet.title}
              </span>

              <div
                className="flex items-center"
                style={{
                  marginTop: `${userOptions["stats-margin"].value}px`,
                  columnGap: `${userOptions["stats-gap"].value}px`,
                  color: `${userOptions["stats-color"].value}`,
                }}
              >
                <span
                  style={{ fontSize: `${userOptions["stats-size"].value}px` }}
                >
                  {abbreviateNumber(data.items[0].statistics.viewCount, 0) +
                    " vues"}
                </span>
                <span>•</span>
                <span
                  style={{ fontSize: `${userOptions["stats-size"].value}px` }}
                >
                  {moment.utc(data.items[0].snippet.publishedAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4 text-white">
        <Button
          className="bg-red-600 font-semibold"
          onClick={generateAndDownload}
        >
          {downloadBtnText}
        </Button>
        <Button
          className="bg-neutral-900"
          onClick={() => saveAsPreset(userOptions)}
        >
          {saveAsPresetBtnText}
        </Button>
        <Button
          className="bg-neutral-900"
          onClick={() => {
            setUserOptions(getUserOptions(defaultOptions));
          }}
        >
          {resetToPresetBtnText}
        </Button>
        <Button
          className="bg-neutral-900"
          onClick={() => resetPresetToDefault(userOptions)}
        >
          {resetToDefaultBtnText}
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-8 items-center justify-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
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
