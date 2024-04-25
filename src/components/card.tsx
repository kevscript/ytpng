"use client";
import { RefObject, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import useResizeObserver from "@react-hook/resize-observer";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { abbreviateNumber } from "js-abbreviation-number";
momentDurationFormatSetup(moment);
typeof moment.duration.fn.format === "function";
// typeof moment.duration.duration === "function";
moment.locale("fr");

const useSize = (target: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState<DOMRectReadOnly>();

  useLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

type CardProps = {
  userOptions: any;
  data: any;
  cardRef: RefObject<HTMLDivElement>;
};

export function Card({ userOptions, data, cardRef }: CardProps) {
  const size = useSize(cardRef);
  return (
    <>
      {size && (
        <div
          className="overflow-hidden"
          style={{
            backgroundColor: `${userOptions["bg-color"].value}`,
            borderRadius: `${
              (size?.width / 100) *
              (userOptions["outer-radius"].value as number)
            }px`,
            paddingTop: `${
              (size?.width / 100) *
              (userOptions["padding-vertical"].value as number)
            }px`,
            paddingBottom: `${
              (size?.width / 100) *
              (userOptions["padding-vertical"].value as number)
            }px`,
            paddingLeft: `${
              (size?.width / 100) *
              (userOptions["padding-horizontal"].value as number)
            }px`,
            paddingRight: `${
              (size?.width / 100) *
              (userOptions["padding-horizontal"].value as number)
            }px`,
          }}
        >
          <div
            className="relative w-full aspect-[1/0.5625] flex justify-center items-center overflow-hidden"
            style={{
              borderRadius: `${
                (size?.width / 100) *
                (userOptions["inner-radius"].value as number)
              }px`,
            }}
          >
            <Image
              className="w-full object-contain"
              src={data.items[0].snippet.thumbnails.maxres.url}
              width={0}
              height={0}
              sizes="100vw"
              alt="thumbnail"
            />
            <div
              className="absolute bottom-4 right-4 bg-neutral-950 py-1 px-2 rounded-lg flex justify-center items-center leading-[0.8]"
              style={{
                padding: `${
                  ((size?.width / 100) *
                    (userOptions["time-size"].value as number)) /
                  8
                }px`,
                bottom: `${
                  ((size?.width / 100) *
                    (userOptions["time-size"].value as number)) /
                  4
                }px`,
                right: `${
                  ((size?.width / 100) *
                    (userOptions["time-size"].value as number)) /
                  4
                }px`,
                borderRadius: `${
                  ((size?.width / 100) *
                    (userOptions["time-size"].value as number)) /
                  8
                }px`,
              }}
            >
              <span
                className="text-white"
                style={{
                  fontSize: `${
                    ((size?.width / 100) *
                      (userOptions["time-size"].value as number)) /
                    4
                  }px`,
                }}
              >
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
                fontSize: `${
                  ((size?.width / 100) *
                    (userOptions["title-size"].value as number)) /
                  4
                }px`,
                marginTop: `${
                  (size?.width / 100) *
                  (userOptions["title-margin"].value as number)
                }px`,
                color: `${userOptions["title-color"].value}`,
              }}
            >
              {data.items[0].snippet.title}
            </span>

            <div
              className="flex items-center"
              style={{
                marginTop: `${
                  (size?.width / 100) *
                  (userOptions["stats-margin"].value as number)
                }px`,
                columnGap: `${
                  ((size?.width / 100) *
                    (userOptions["stats-gap"].value as number)) /
                  4
                }px`,
                color: `${userOptions["stats-color"].value}`,
              }}
            >
              <span
                style={{
                  fontSize: `${
                    ((size?.width / 100) *
                      (userOptions["stats-size"].value as number)) /
                    4
                  }px`,
                }}
              >
                {abbreviateNumber(data.items[0].statistics.viewCount, 0) +
                  " vues"}
              </span>
              <span>•</span>
              <span
                style={{
                  fontSize: `${
                    ((size?.width / 100) *
                      (userOptions["stats-size"].value as number)) /
                    4
                  }px`,
                }}
              >
                {moment.utc(data.items[0].snippet.publishedAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
