import { LOCAL_STORAGE_PREFIX } from "@/constants/local-storage";
import { Option, defaultOptions } from "@/constants/options";

export function getUserOptions(options: typeof defaultOptions) {
  const userOptions = {} as { [key: string]: Option };

  if (typeof window !== undefined) {
    options.map((option) => {
      const localValue = localStorage.getItem(LOCAL_STORAGE_PREFIX + option.id);

      if (option.type === "number") {
        if (localValue) {
          userOptions[option.id] = {
            ...option,
            value: Number(localValue),
          };
        } else {
          userOptions[option.id] = option;
        }
      }

      if (option.type === "color") {
        if (localValue) {
          userOptions[option.id] = {
            ...option,
            value: localValue,
          };
        } else {
          userOptions[option.id] = option;
        }
      }
    });
  } else {
    defaultOptions.map((option) => {
      userOptions[option.id] = option;
    });
  }

  return userOptions;
}
