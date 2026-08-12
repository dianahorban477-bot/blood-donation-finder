import { IconBase, type IconProps } from './IconBase'

export const ProfileIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox="0 0 24 24">
    <path
      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)
