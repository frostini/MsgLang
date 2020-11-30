import { grommet } from "grommet";
import { deepMerge } from "grommet/utils";

export const theme = deepMerge(grommet, {
  global: {
    colors: {
      active: "dark-6",
      brand: "#0085ff",
      "dark-2": "rgba(41, 47, 76, 0.7)"
    },
    elevation: {
      light: {
        small: "0 0 1px 0 rgba(0, 0, 0, 0.40), 0 1px 2px 0 rgba(0,0,0,0.40)",
        medium: "0 0 2px 0 rgba(0,0,0,0.40), 0 2px 4px 0 rgba(0,0,0,0.40)",
        large: "0 0 1px 0 rgba(0,0,0,0.40), 0 4px 8px 0 rgba(0,0,0,0.40)",
        xlarge: "0 0 1px 0 rgba(0,0,0,0.40), 0 8px 16px 0 rgba(0,0,0,0.40)"
      }
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    size: {
      avatar: "36px",
      sidebar: "65px"
    }
  }
});