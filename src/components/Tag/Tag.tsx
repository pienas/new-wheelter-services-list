import { Flex } from '@chakra-ui/react';
import React from 'react';

import { PRIORITY, PRIORITYLT, STATUS, STATUSLT } from 'types';

interface TagProps {
  label?: string;
  type?: PRIORITY | STATUS | PRIORITYLT | STATUSLT;
}

export const Tag: React.FC<TagProps> = ({ label, type }) => {
  const getTagColors = (): string[] => {
    switch (type) {
      case PRIORITY.HIGH:
      case PRIORITYLT.HIGH:
        return ['info.100', 'info.200'];
      case PRIORITY.MEDIUM:
      case PRIORITYLT.MEDIUM:
        return ['info.300', 'info.400'];
      case PRIORITY.LOW:
      case PRIORITYLT.LOW:
        return ['info.500', 'info.600'];
      case STATUS.NEW:
      case STATUSLT.NEW:
        return ['info.100', 'info.200'];
      case STATUS.IN_PROGRESS:
      case STATUSLT.IN_PROGRESS:
        return ['warning.100', 'warning.200'];
      case STATUS.ACCEPTED:
      case STATUSLT.ACCEPTED:
        return ['success.100', 'success.200'];
      case STATUS.DECLINED:
      case STATUSLT.DECLINED:
        return ['error.100', 'error.200'];
      default:
        return ['gray.500', 'black'];
    }
  };

  const [bgColor, textColor] = getTagColors();

  return (
    <Flex
      backgroundColor={bgColor}
      color={textColor}
      borderRadius="4px"
      fontSize="10px"
      lineHeight="10px"
      fontWeight={!type ? 400 : 500}
      px="10px"
      py="4px"
      display="inline"
    >
      {!type ? label : type}
    </Flex>
  );
};
