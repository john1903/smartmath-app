// // declarations.d.ts

// declare module "*.svg" {
//   import React from "react";
//   import { SvgProps } from "react-native-svg";
//   const content: React.FC<SvgProps>;
//   export default content;
// }

// declare module "*.png" {
//   const content: any;
//   export default content;
// }

// declare module "*.jpg" {
//   const content: any;
//   export default content;
// }

// declare module "*.jpeg" {
//   const content: any;
//   export default content;
// }

// declare module "*.json" {
//   const content: any;
//   export default content;
// }

// declarations.d.ts

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.json";
declare module "*.ttf";

declare module "react-native-mathjax" {
  import * as React from "react";
  import { StyleProp, ViewStyle } from "react-native";

  export interface MathJaxProps {
    html: string;
    style?: StyleProp<ViewStyle>;
    mathJaxOptions?: Record<string, any>;
  }

  export default class MathJax extends React.Component<MathJaxProps> {}
}
