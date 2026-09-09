import { IconBase, type IconProps } from './IconBase'

export const UrgencyIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <path
      d='M7 17v-5a5 5 0 0 1 10 0v5M5 20h14M6 17h12M12 4V2M5.6 6.6 4.2 5.2M18.4 6.6l1.4-1.4'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
