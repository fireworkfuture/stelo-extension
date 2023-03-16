import { style } from "@vanilla-extract/css";
import { themeVars } from "uiv2/css/themeContract.css";

export const app = style({
  background: themeVars.color["background"],
  minWidth: "200px",
  padding: themeVars.space["3x"],
});
