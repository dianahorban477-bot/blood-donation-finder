import { IconBase, type IconProps } from './IconBase'

export const PlasmaIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <path
      d='M12 3S6 9.5 6 14a6 6 0 0 0 12 0c0-4.5-6-11-6-11Z'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='m9.5 14 1.7 1.7 3.5-3.7'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
