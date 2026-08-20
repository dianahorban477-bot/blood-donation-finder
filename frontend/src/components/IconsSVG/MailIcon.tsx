import { IconBase, type IconProps } from './IconBase'

export const MailIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <rect
      x='3'
      y='5'
      width='18'
      height='14'
      rx='2'
      stroke='currentColor'
      strokeWidth='1.8'
    />
    <path
      d='m4 7 8 6 8-6'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
