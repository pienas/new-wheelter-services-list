import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const DescriptionIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M16 3v0a4 4 0 0 1 4 4v7c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185C16.2 22 14.8 22 12 22h-.344c-2.476 0-3.714 0-4.682-.429a5 5 0 0 1-2.545-2.545C4 18.058 4 16.82 4 14.344v0V14M16 3a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2m8 0a1.99 1.99 0 0 0-1-1.732M8 3v0a4 4 0 0 0-4 4v3m4-7a2 2 0 0 1 2-2h2M9.5 13H12m0 0h2.5M12 13v-2.5m0 2.5v2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
