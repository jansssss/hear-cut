import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#14766b",
      dark: "#0d524a",
      light: "#4faaa2"
    },
    secondary: {
      main: "#f08e5a",
      dark: "#c76837",
      light: "#f6b086"
    },
    background: {
      default: "#f7f2eb",
      paper: "#fffaf5"
    },
    text: {
      primary: "#16211b",
      secondary: "#607168"
    }
  },
  shape: {
    borderRadius: 20
  },
  typography: {
    fontFamily: "var(--font-body), 'Noto Sans KR', sans-serif",
    h1: {
      fontFamily: "var(--font-display), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.06em"
    },
    h2: {
      fontFamily: "var(--font-display), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.05em"
    },
    h3: {
      fontFamily: "var(--font-display), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.04em"
    },
    button: {
      fontFamily: "var(--font-display), 'Noto Sans KR', sans-serif",
      textTransform: "none",
      fontWeight: 700
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(22, 33, 27, 0.08)",
          boxShadow: "0 18px 40px rgba(15, 44, 47, 0.08)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 16px 32px rgba(15, 44, 47, 0.08)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          paddingInline: 18,
          minHeight: 44
        }
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            boxShadow: "0 14px 30px rgba(20, 118, 107, 0.22)"
          }
        }
      ]
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700
        }
      },
      variants: [
        {
          props: { color: "primary", variant: "filled" },
          style: {
            background: "linear-gradient(135deg, #14766b 0%, #0d524a 100%)"
          }
        }
      ]
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          borderColor: alpha("#16211b", 0.1),
          paddingInline: 14,
          fontWeight: 700,
          "&.Mui-selected": {
            backgroundColor: alpha("#14766b", 0.12),
            color: "#0d524a"
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: alpha("#ffffff", 0.72)
        }
      }
    }
  }
});

export default theme;
