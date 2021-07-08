import cn from 'classnames';
import { FC } from 'react';
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

const Swatch: FC<Omit<HTMLButtonElement, 'variant'> & SwatchProps> = ({
  className,
  color = '',
  label = null,
  variant = 'size',
  active,
  ...props
}) => {
  variant = variant?.toLowerCase();

  if (label) {
    label = label?.toLowerCase();
  }

  const swatchClassName = cn(
    s.swatch,
    {
      [s.active]: active,
      [s.size]: variant === 'size',
      [s.color]: color,
      [s.dark]: color ? isDark(color) : false,
      [s.textLabel]: !color && label && label.length > 3,
    },
    className
  );

  return (
    <button
      className={swatchClassName}
      style={color ? { backgroundColor: color } : {}}
      aria-label="Variant Swatch"
      {...(label && color && { title: label })}
    >
      {color && active && <span>&#10004;</span>}
      {!color ? label : null}
    </button>
  );
};

export default Swatch;
