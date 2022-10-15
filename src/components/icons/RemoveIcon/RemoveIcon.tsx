import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const RemoveIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="m4 5 .646 10.976c.124 2.12.187 3.18.64 3.985a4 4 0 0 0 1.733 1.635C7.849 22 8.91 22 11.035 22h1.93c2.124 0 3.186 0 4.016-.404a4 4 0 0 0 1.734-1.635c.452-.805.515-1.865.64-3.985L19.764 9M4 5H2m2 0h18m-6 0-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 0 0-.803-.578C13.938 2 13.524 2 12.694 2h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 0 0-.803.578c-.243.29-.374.684-.636 1.471L8 5m2 5v7m4-7v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
