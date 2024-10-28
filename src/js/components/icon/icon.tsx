import React from 'react';

import sprite from '../../../img/sprite.svg';

interface IconProps {
  className: string;
  iconName: string;
  width: string;
  height: string;
}

function Icon({ width, height, className, iconName }: IconProps) {
  return (
    <svg
      aria-hidden
      className={className}
      focusable="false"
      width={width}
      height={height}
    >
      <use xlinkHref={`${sprite}#${iconName}`} />
    </svg>
  );
}

export default Icon;
