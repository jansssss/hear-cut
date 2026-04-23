import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2c6c66",
      dark: "#224f4b",
      light: "#7f9f98"
    },
    secondary: {
      main: "#b67a61",
      dark: "#8f5f4b",
      light: "#d6ae9b"
    },
    background: {
      default: "#f5f1eb",
      paper: "#fffdf9"
    },
    text: {
      primary: "#1c2421",
      secondary: "#6b746f"
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
          border: "1px solid rgba(28, 36, 33, 0.07)",
          boxShadow: "0 12px 28px rgba(25, 34, 31, 0.05)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          boxShadow: "0 10px 24px rgba(25, 34, 31, 0.05)"
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
            background: "#2c6c66",
            boxShadow: "0 10px 20px rgba(44, 108, 102, 0.16)"
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
            background: "#2c6c66"
          }
        }
      ]
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          borderColor: alpha("#1c2421", 0.08),
          paddingInline: 14,
          fontWeight: 600,
          backgroundColor: alpha("#ffffff", 0.7),
          "&.Mui-selected": {
            backgroundColor: alpha("#2c6c66", 0.1),
            color: "#224f4b"
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: alpha("#ffffff", 0.78)
        }
      }
    }
  }
});

export default theme;
