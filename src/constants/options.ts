export type NumberOption = {
  type: "number";
  label: string;
  id: string;
  group: string;
  min: number;
  max: number;
  value: number;
};

export type ColorOption = {
  type: "color";
  label: string;
  id: string;
  group: string;
  value: string;
};

export type Option = NumberOption | ColorOption;

export const defaultOptions: Option[] = [
  {
    label: "Padding horizontal",
    id: "padding-horizontal",
    group: "container",
    min: 0,
    max: 16,
    value: 8,
    type: "number",
  },
  {
    label: "Padding vertical",
    id: "padding-vertical",
    group: "container",
    min: 0,
    max: 16,
    value: 8,
    type: "number",
  },
  {
    label: "Outer Radius",
    id: "outer-radius",
    group: "container",
    min: 0,
    max: 32,
    value: 8,
    type: "number",
  },
  {
    label: "Inner Radius",
    id: "inner-radius",
    group: "container",
    min: 0,
    max: 32,
    value: 4,
    type: "number",
  },
  {
    label: "Background Color",
    id: "bg-color",
    group: "container",
    value: "#FFFFFF",
    type: "color",
  },
  {
    label: "Title Size",
    id: "title-size",
    group: "title",
    min: 1,
    max: 30,
    value: 16,
    type: "number",
  },
  {
    label: "Title Margin",
    id: "title-margin",
    group: "title",
    min: 0,
    max: 16,
    value: 4,
    type: "number",
  },
  {
    label: "Stats Size",
    id: "stats-size",
    group: "stats",
    min: 1,
    max: 30,
    value: 12,
    type: "number",
  },
  {
    label: "Title Color",
    id: "title-color",
    group: "title",
    value: "#000000",
    type: "color",
  },
  {
    label: "Stats Margin",
    id: "stats-margin",
    group: "stats",
    min: 0,
    max: 16,
    value: 2,
    type: "number",
  },
  {
    label: "Stats Gap",
    id: "stats-gap",
    group: "stats",
    min: 0,
    max: 30,
    value: 4,
    type: "number",
  },
  {
    label: "Stats Color",
    id: "stats-color",
    group: "stats",
    value: "#707070",
    type: "color",
  },
  {
    label: "Time Size",
    id: "time-size",
    group: "time",
    min: 1,
    max: 30,
    value: 12,
    type: "number",
  },
];
