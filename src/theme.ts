import { useMemo, useState } from 'react';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const tokens = {
  light: {
    primary: {
      100: '#97b6c1',
      200: '#6c93a3',
      300: '#427083',
      400: '#195e64',
      500: '#086F89',
      600: '#066178',
      700: '#045465',
      800: '#024752',
      900: '#01343F',
    },
    secondary: {
      100: '#ffb84d',
      200: '#ffaa00',
      300: '#cc8800',
      400: '#996600',
      500: '#664400',
      600: '#402b00',
      700: '#1a1300',
      800: '#000000',
      900: '#000000',
    },
    greys: {
      100: 'hsl(192, 15%, 90%)',
      200: 'hsl(192, 15%, 75%)',
      300: 'hsl(192, 15%, 65%)',
      400: 'hsl(192, 15%, 45%)',
      500: 'hsl(192, 15%, 40%)',
      600: 'hsl(192, 15%, 30%)',
      700: 'hsl(192, 15%, 22%)',
      800: 'hsl(192, 15%, 20%)',
      900: 'hsl(192, 15%, 10%)',
    },
  },
  dark: {
    primary: {
      100: '#97b6c1',
      200: '#6c93a3',
      300: '#427083',
      400: '#195e64',
      500: '#086F89',
      600: '#066178',
      700: '#045465',
      800: '#024752',
      900: '#01343F',
    },

    secondary: {
      900: '#e65c00',
      800: '#cc5100',
      700: '#b34600',
      600: '#993b00',
      500: '#7f3000',
      400: '#661f00',
      300: '#4c1400',
      200: '#330900',
      100: '#190000',
    },
    greys: {
      100: 'hsl(192, 15%, 90%)',
      200: 'hsl(192, 15%, 75%)',
      300: 'hsl(192, 15%, 65%)',
      400: 'hsl(192, 15%, 45%)',
      500: 'hsl(192, 15%, 40%)',
      600: 'hsl(192, 15%, 30%)',
      700: 'hsl(192, 15%, 22%)',
      800: 'hsl(192, 15%, 20%)',
      900: 'hsl(192, 15%, 10%)',
    },
  },
};

const themeSettings = (mode: 'light' | 'dark'): ThemeOptions => {
  const colors = tokens[mode];
  return {
    palette: {
      mode,
      primary: {
        main: colors.primary[500],
        light: colors.primary[300],
        dark: colors.primary[700],
      },
      secondary: {
        main: colors.secondary[500],
        light: colors.secondary[300],
        dark: colors.secondary[700],
      },
      text: {
        primary: colors.greys[900],
        secondary: colors.greys[700],
        disabled: colors.greys[500],
      },
      background: {
        default: colors.greys[100],
        paper: colors.greys[200],
      },
      divider: colors.greys[300],
      action: {
        active: colors.greys[700],
        hover: colors.greys[600],
        selected: colors.greys[500],
        disabled: colors.greys[400],
        disabledBackground: colors.greys[200],
      },
      grey: {
        900: colors.greys[900],
        800: colors.greys[800],
        700: colors.greys[700],
        600: colors.greys[600],
        500: colors.greys[500],
        400: colors.greys[400],
        300: colors.greys[300],
        200: colors.greys[200],
        100: colors.greys[100],
      },
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  };
};

const theme = createTheme(themeSettings('light'));

export const useThemeMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return { theme, mode, setMode };
};

export default theme;
