import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from 'components/icons';

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}

export const Toast: React.FC<ToastProps> = ({ type, title, description }) => {
  const getColor = (): string => {
    switch (type) {
      case 'success':
        return 'success.200';
      case 'error':
        return 'error.200';
      case 'info':
        return 'info.200';
      default:
        return 'warning.200';
    }
  };

  const getIcon = (): JSX.Element => {
    switch (type) {
      case 'success':
        return <SuccessIcon boxSize={7} color="white" />;
      case 'error':
        return <ErrorIcon boxSize={7} color="white" />;
      case 'info':
        return <InfoIcon boxSize={7} color="white" />;
      default:
        return <WarningIcon boxSize={7} color="white" />;
    }
  };

  const color = getColor();

  return (
    <Flex
      alignItems="center"
      backgroundColor="white"
      p="30px"
      borderRadius="4px"
      boxShadow="0px 6px 22px rgba(0, 0, 0, 0.1)"
      borderLeft="5px solid"
      borderColor={color}
    >
      <Box backgroundColor={color} p="7px" borderRadius="100%" mr="20px">
        {getIcon()}
      </Box>
      <Box>
        <Text color="black" fontWeight={500} mb="5px">
          {title}
        </Text>
        {description && (
          <Text color="black" fontSize="14px">
            {description}
          </Text>
        )}
      </Box>
    </Flex>
  );
};
