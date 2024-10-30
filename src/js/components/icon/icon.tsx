import React from 'react';

import commonSprite from '../../../img/sprite.svg';
import genreSprite from '../../../img/genre-sprite.svg';

interface IconProps {
  width?: number;
  height?: number;
  defaultSprite?: boolean;
  iconName: string;
  className?: string;
  fill?: string;
}

function Icon({
  width = 50,
  height = 50,
  defaultSprite = true,
  iconName,
  className,
  fill = '',
}: IconProps) {
  const sprite = defaultSprite ? commonSprite : genreSprite;
  return (
    <svg
      aria-hidden
      className={className}
      focusable="false"
      width={width}
      height={height}
      fill={fill}
    >
      <use xlinkHref={`${sprite}#${iconName}`} />
    </svg>
  );
}

export default Icon;
