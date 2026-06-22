import { createMuiTheme } from '@material-ui/core/styles';

/** Airbnb circa-2019 palette (Rausch coral, Babu teal, neutral grays). */
export const airbnbColors = {
  rausch: '#FF5A5F',
  babu: '#00A699',
  hackberry: '#484848',
  foggy: '#767676',
  border: '#EBEBEB',
  background: '#FFFFFF',
  pageGray: '#F7F7F7',
};

export const airbnbTheme = createMuiTheme({
  palette: {
    primary: { main: airbnbColors.rausch },
    secondary: { main: airbnbColors.babu },
    background: { default: airbnbColors.background, paper: airbnbColors.background },
    text: { primary: airbnbColors.hackberry, secondary: airbnbColors.foggy },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 700, color: airbnbColors.hackberry },
    h5: { fontWeight: 600, color: airbnbColors.hackberry },
    h6: { fontWeight: 600, color: airbnbColors.hackberry },
    body1: { color: airbnbColors.hackberry },
    body2: { color: airbnbColors.foggy },
  },
  shape: { borderRadius: 12 },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
        fontWeight: 600,
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: airbnbColors.background,
        color: airbnbColors.hackberry,
      },
    },
  },
});
