import { IconBase, type IconProps } from './IconBase'

export const CheckIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <path
      d='m5 12 4.5 4.5L19 7'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
