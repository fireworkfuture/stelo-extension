import { style } from "@vanilla-extract/css";
import { themeVars } from "uiv2/css/themeContract.css";

export const app = style({
  background: themeVars.color["background"],
  minWidth: "440px",
  padding: themeVars.space["3x"],
});

export const container = style({
  padding: themeVars.space["4x"],
  alignItems: "center",
  justifyContent: "space-between",
});
