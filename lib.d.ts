declare module '*.css' {
  const style: Record<string, string>;
  export default style;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const image: string;
  export default image;
}

declare module '*.jpg' {
  const image: string;
  export default image;
}

declare module '*.jpeg' {
  const image: string;
  export default image;
}

declare module '*.gif' {
  const image: string;
  export default image;
}
