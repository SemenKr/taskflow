type ImageProps = {
  src: string; // путь к файлу или SVG
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  isSvg?: boolean; // флаг, если SVG
};

export const Image = ({
  src,
  alt = '',
  width = '100%',
  height = 'auto',
  className,
  isSvg = false,
}: ImageProps) => {
  if (isSvg) {
    return (
      <svg className={className} width={width} height={height}>
        <use href={src} />
      </svg>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};
