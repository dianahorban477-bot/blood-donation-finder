import { IconBase, type IconProps } from './IconBase'

export const PhoneIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <path
      d='M8.4 3H5.2A2.2 2.2 0 0 0 3 5.2C3 13.9 10.1 21 18.8 21a2.2 2.2 0 0 0 2.2-2.2v-3.2l-4.2-1-1.2 2.5a14.4 14.4 0 0 1-8.7-8.7l2.5-1.2L8.4 3Z'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
