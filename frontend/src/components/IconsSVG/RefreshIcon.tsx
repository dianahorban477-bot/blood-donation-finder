import { IconBase, type IconProps } from './IconBase'

export const RefreshIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <path
      d='M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    />
  </IconBase>
)
