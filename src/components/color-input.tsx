"use client";
import { ColorOption, NumberOption } from "@/constants/options";
import { HexColorPicker } from "react-colorful";

type ColorInputProps = {
  option: ColorOption;
  handleOption: (id: string, value: string) => void;
};

export function ColorInput({ option, handleOption }: ColorInputProps) {
  return (
    <div className="flex flex-col gap-4 min-w-80 w-fit bg-neutral-900 text-white p-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between items-center">
          <span>{option.label}</span>

          <input
            className="text-black w-24 outline-none rounded-full h-8 px-2"
            type="text"
            value={option.value}
            onChange={(e) => handleOption(option.id, e.target.value)}
          />
        </div>
        <div className="w-full">
          <HexColorPicker
            color={option.value}
            onChange={(color) => handleOption(option.id, color)}
          />
        </div>
      </div>
    </div>
  );
}
