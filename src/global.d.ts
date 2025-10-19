/// <reference types="vite/client" />

// SCSS модули
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Простые SCSS файлы (не модули)
declare module '*.scss';

// CSS модули
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Простые CSS файлы
declare module '*.css';

// Картинки
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

// Шрифты
declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

declare module '*.eot' {
  const src: string;
  export default src;
}

// Видео
declare module '*.mp4' {
  const src: string;
  export default src;
}
