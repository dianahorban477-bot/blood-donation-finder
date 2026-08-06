import { IconBase, type IconProps } from './IconBase'

export const CloseIcon = ({
  size = 16,
  title = 'Close menu',
  ...rest
}: IconProps) => (
  <IconBase {...rest} size={size} title={title} viewBox="0 0 26 26">
    <path
      d="M18 6 6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)
