import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0D9488",
      dark: "#0F766E",
      light: "#5EEAD4"
    },
    secondary: {
      main: "#F59E0B",
      dark: "#D97706",
      light: "#FCD34D"
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF"
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B"
    }
  },
  shape: {
    borderRadius: 18
  },
  typography: {
    fontFamily: "var(--font-body), 'Noto Sans KR', sans-serif",
    h1: {
      fontFamily: "var(--font-display), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.045em"
    },
    h2: {
      fontFamily: "var(--font-display), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.03em"
    },
    h3: {
      fontFamily: "var(--font-display), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em"
    },
    subtitle1: {
      letterSpacing: "-0.01em"
    },
    button: {
      fontFamily: "var(--font-display), 'Noto Sans KR', sans-serif",
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "-0.01em"
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(15, 23, 42, 0.06)",
          boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          boxShadow: "0 2px 12px rgba(15, 23, 42, 0.05)",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)"
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: 18,
          minHeight: 42
        }
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            background: "linear-gradient(135deg, #0D9488 0%, #0891B2 100%)",
            boxShadow: "0 4px 14px rgba(13, 148, 136, 0.3)"
          }
        }
      ]
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600
        }
      },
      variants: [
        {
          props: { color: "primary", variant: "filled" },
          style: {
            background: "#0D9488"
          }
        }
      ]
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          borderColor: alpha("#0F172A", 0.07),
          paddingInline: 14,
          fontWeight: 600,
          backgroundColor: alpha("#ffffff", 0.8),
          "&.Mui-selected": {
            backgroundColor: alpha("#0D9488", 0.1),
            color: "#0F766E",
            borderColor: alpha("#0D9488", 0.25)
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: "#FFFFFF"
        }
      }
    }
  }
});

export default theme;
