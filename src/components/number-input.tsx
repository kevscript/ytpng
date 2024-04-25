"use client";
import { NumberOption } from "@/constants/options";
import { minMax } from "@/utils/min-max";

type NumberInputProps = {
  option: NumberOption;
  handleOption: (id: string, value: string | number) => void;
};

export function NumberInput({ option, handleOption }: NumberInputProps) {
  return (
    <div className="flex flex-col gap-4 bg-neutral-900 text-white p-4 w-full">
      <div className="flex justify-between items-center gap-4">
        <span className="text-sm">{option.label}</span>
        <div className="h-6 rounded-full bg-white flex text-black select-none">
          <div
            className="w-6 h-full flex justify-center items-center cursor-pointer"
            onClick={() =>
              handleOption(
                option.id,
                minMax(option.min, option.max, option.value - 1)
              )
            }
          >
            -
          </div>
          <input
            type="number"
            className="h-full text-sm bg-transparent w-10 border-x outline-none text-end px-2"
            min={option.min}
            max={option.max}
            value={option.value}
            onChange={(e) =>
              handleOption(
                option.id,
                minMax(option.min, option.max, Number(e.target.value))
              )
            }
          />
          <div
            className="w-6 h-full flex justify-center items-center cursor-pointer select-none"
            onClick={() =>
              handleOption(
                option.id,
                minMax(option.min, option.max, option.value + 1)
              )
            }
          >
            +
          </div>
        </div>
      </div>

      <input
        type="range"
        className="w-full"
        min={option.min}
        max={option.max}
        value={option.value}
        onChange={(e) =>
          handleOption(
            option.id,
            minMax(option.min, option.max, Number(e.target.value))
          )
        }
      />
    </div>
  );
}
