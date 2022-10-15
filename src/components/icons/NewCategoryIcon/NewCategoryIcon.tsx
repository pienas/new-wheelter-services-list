import { Icon } from '@chakra-ui/react';

import { IconProps } from 'types/icon';

export const NewCategoryIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M4 10v-.5 0c0-2.33 0-3.495.38-4.413A5 5 0 0 1 7.088 2.38C8.005 2 9.17 2 11.5 2h.278c1.133 0 1.699 0 2.233.119a5 5 0 0 1 1.604.664c.462.294.862.695 1.663 1.495l.379.379c.865.865 1.297 1.297 1.606 1.802.274.447.476.935.599 1.445.138.575.138 1.187.138 2.41V14c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185C16.2 22 14.8 22 12 22h-.5c-2.33 0-3.495 0-4.413-.38a5 5 0 0 1-2.706-2.707C4 17.995 4 16.83 4 14.5v0-.5m5.5 0H12m0 0h2.5M12 14v-2.5m0 2.5v2.5m2-14V6a2 2 0 0 0 2 2v0h1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
