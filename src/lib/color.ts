import type { AccentColor } from "./data";

export interface ColorTokens {
  solid: string;
  solidDeep: string;
  soft: string;
  softBorder: string;
  text: string;
  textOn: string;
}

export const colorMap: Record<AccentColor, ColorTokens> = {
  frame: {
    solid: "bg-frame",
    solidDeep: "bg-frame-deep",
    soft: "bg-frame/15",
    softBorder: "border-frame",
    text: "text-frame",
    textOn: "text-ink",
  },
  tape: {
    solid: "bg-tape",
    solidDeep: "bg-tape-deep",
    soft: "bg-tape/15",
    softBorder: "border-tape",
    text: "text-tape",
    textOn: "text-white",
  },
  signal: {
    solid: "bg-signal",
    solidDeep: "bg-signal-deep",
    soft: "bg-signal/15",
    softBorder: "border-signal",
    text: "text-signal",
    textOn: "text-white",
  },
  moss: {
    solid: "bg-moss",
    solidDeep: "bg-moss-deep",
    soft: "bg-moss/15",
    softBorder: "border-moss",
    text: "text-moss",
    textOn: "text-white",
  },
  terracotta: {
    solid: "bg-terracotta",
    solidDeep: "bg-terracotta",
    soft: "bg-terracotta/15",
    softBorder: "border-terracotta",
    text: "text-terracotta",
    textOn: "text-white",
  },
  plum: {
    solid: "bg-plum",
    solidDeep: "bg-plum",
    soft: "bg-plum/15",
    softBorder: "border-plum",
    text: "text-plum",
    textOn: "text-white",
  },
};

export const solid = (color: AccentColor) => colorMap[color].solid;
export const solidDeep = (color: AccentColor) => colorMap[color].solidDeep;
export const softBg = (color: AccentColor) => colorMap[color].soft;
export const softBorder = (color: AccentColor) => colorMap[color].softBorder;
export const textColor = (color: AccentColor) => colorMap[color].text;
export const textOn = (color: AccentColor) => colorMap[color].textOn;
