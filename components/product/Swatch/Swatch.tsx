import cn from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import s from './Swatch.module.css';
import { isDark } from '@lib/colors';
interface SwatchProps {
  active?: boolean;
  children?: any;
  className?: string;
  variant?: 'size' | 'color' | string;
  color?: string;
  label?: string | null;
}

const Swatch: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & SwatchProps> = React.memo(
  ({ active, className, color = '', label = null, variant = 'size', ...props }) => {
    variant = variant?.toLowerCase();

    if (label) {
      label = label?.toLowerCase();
    }

    const swatchClassName = cn(
      s.swatch,
      {
        [s.color]: color,
        [s.active]: active,
        [s.size]: variant === 'size',
        [s.dark]: color ? isDark(color) : false,
        [s.textLabel]: !color && label && label.length > 3,
      },
      className
    );

    return (
      <button
        aria-label="Variant Swatch"
        className={swatchClassName}
        {...(label && color && { title: label })}
        style={color ? { backgroundColor: color } : {}}
        {...props}
      >
        {color && active && <span>&#10004;</span>}
        {!color ? label : null}
      </button>
    );
  }
);

export default Swatch;
