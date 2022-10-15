import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#f4ecff',
      100: '#e9d9fe',
      200: '#d3b2fd',
      300: '#be8cfd',
      400: '#a865fc',
      500: '#923ffb',
      600: '#7532c9',
      700: '#582697',
      800: '#3a1964',
      900: '#1d0d32',
    },
    gray: {
      50: '#fdfefe',
      100: '#fcfcfd',
      200: '#f9f9fa',
      300: '#f5f6f8',
      400: '#f2f3f5',
      500: '#eff0f3',
      600: '#bfc0c2',
      700: '#8f9092',
      800: '#606061',
      900: '#303031',
    },
    text: {
      100: '#7e7e7e',
      200: '#696c76',
      300: '#5e5858',
    },
    checkbox: '#ced3e3',
    info: {
      100: '#ceedff',
      200: '#1eaaf9',
      300: '#ced0ff',
      400: '#221ef9',
      500: '#f2ceff',
      600: '#c01ef9',
    },
    success: {
      100: '#e6fad7',
      200: '#37d400',
    },
    warning: {
      100: '#fff2c2',
      200: '#ff9b05',
    },
    error: {
      100: '#fad7d7',
      200: '#d40000',
    },
    white: '#ffffff',
    black: '#0b132a',
  },
  fonts: {
    heading: 'Rubik',
    body: 'Rubik',
  },
  styles: {
    global: {
      heading: {
        color: 'black',
      },
      body: {
        color: 'black',
        padding: '0',
        margin: '0',
      },
    },
  },
});
