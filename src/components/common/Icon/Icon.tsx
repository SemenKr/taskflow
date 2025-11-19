import { useState } from 'react';
import styles from './Icon.module.scss';

type IconProps = {
  size: string;
  className?: string;
  name: 'edit' | 'delete';
  color?: string;
  hoverColor?: string;
};

const paths = {
  edit: (
    <path
      d="M7.17272 3.49106L0.5 10.1637V13.5H3.83636L10.5091 6.82736M7.17272 3.49106L9.5654 1.09837L9.5669 1.09695C9.8962 0.767585 10.0612 0.602613 10.2514 0.540824C10.4189 0.486392 10.5993 0.486392 10.7669 0.540824C10.9569 0.602571 11.1217 0.767352 11.4506 1.09625L12.9018 2.54738C13.2321 2.87769 13.3973 3.04292 13.4592 3.23337C13.5136 3.40088 13.5136 3.58133 13.4592 3.74885C13.3974 3.93916 13.2324 4.10414 12.9025 4.43398L12.9018 4.43468L10.5091 6.82736M7.17272 3.49106L10.5091 6.82736"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  delete: (
    <>
      <path
        d="M3.87426 7.61505C3.80724 6.74386 4.49607 6 5.36983 6H12.6302C13.504 6 14.1928 6.74385 14.1258 7.61505L13.6065 14.365C13.5464 15.1465 12.8948 15.75 12.1109 15.75H5.88907C5.10526 15.75 4.4536 15.1465 4.39348 14.365L3.87426 7.61505Z"
        stroke="currentColor"
      />
      <path
        d="M14.625 3.75H3.375"
        stroke="currentColor"
        strokeLinecap="round"
      />
      ;
      <path
        d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z"
        stroke="currentColor"
      />
      ;
      <path d="M10.5 9V12.75" stroke="currentColor" strokeLinecap="round" />;
      <path d="M7.5 9V12.75" stroke="currentColor" strokeLinecap="round" />;
    </>
  ),
};

export const Icon = ({
  size,
  className,
  name,
  color = '',
  hoverColor = '',
}: IconProps) => {
  const [hover, setHover] = useState(false);

  return (
    <svg
      className={`${styles.iconSvg} ${className ?? ''}`}
      width={size}
      height={size}
      fill="none"
      name={name}
      color={hover ? (hoverColor ?? '') : (color ?? '')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {paths[name]}
    </svg>
  );
};
