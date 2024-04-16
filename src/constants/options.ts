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
    label: "Outer Radius",
    id: "outer-radius",
    group: "container",
    min: 0,
    max: 100,
    value: 64,
    type: "number",
  },
  {
    label: "Inner Radius",
    id: "inner-radius",
    group: "container",
    min: 0,
    max: 100,
    value: 32,
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
    label: "Padding Top",
    id: "padding-top",
    group: "container",
    min: 0,
    max: 100,
    value: 64,
    type: "number",
  },
  {
    label: "Padding Left",
    id: "padding-left",
    group: "container",
    min: 0,
    max: 100,
    value: 64,
    type: "number",
  },
  {
    label: "Padding Right",
    id: "padding-right",
    group: "container",
    min: 0,
    max: 100,
    value: 64,
    type: "number",
  },
  {
    label: "Padding Bottom",
    id: "padding-bottom",
    group: "container",
    min: 0,
    max: 100,
    value: 64,
    type: "number",
  },
  {
    label: "Title Size",
    id: "title-size",
    group: "title",
    min: 1,
    max: 100,
    value: 48,
    type: "number",
  },
  {
    label: "Title Margin",
    id: "title-margin",
    group: "title",
    min: 1,
    max: 100,
    value: 32,
    type: "number",
  },
  {
    label: "Stats Size",
    id: "stats-size",
    group: "stats",
    min: 1,
    max: 100,
    value: 32,
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
    min: 1,
    max: 100,
    value: 8,
    type: "number",
  },
  {
    label: "Stats Gap",
    id: "stats-gap",
    group: "stats",
    min: 1,
    max: 100,
    value: 8,
    type: "number",
  },
  {
    label: "Stats Color",
    id: "stats-color",
    group: "stats",
    value: "#707070",
    type: "color",
  },
];
