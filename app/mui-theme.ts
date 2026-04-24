import { alpha, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxl: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1C1C1E",
      dark: "#000000",
      light: "#3A3A3C",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#FF6B6B",
      dark: "#E53E3E",
      light: "#FFA0A0",
      contrastText: "#FFFFFF"
    },
    background: {
      default: "#F7F7F7",
      paper: "#FFFFFF"
    },
    text: {
      primary: "#1C1C1E",
      secondary: "#6B6B6B"
    }
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, xxl: 1920 }
  },
  shape: {
    borderRadius: 4
  },
  typography: {
    fontFamily: "var(--font-sans), 'Noto Sans KR', sans-serif",
    h1: {
      fontFamily: "var(--font-sans), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.045em"
    },
    h2: {
      fontFamily: "var(--font-sans), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.03em"
    },
    h3: {
      fontFamily: "var(--font-sans), 'Noto Sans KR', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em"
    },
    subtitle1: {
      letterSpacing: "-0.01em"
    },
    button: {
      fontFamily: "var(--font-sans), 'Noto Sans KR', sans-serif",
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
          border: "1px solid rgba(15, 23, 42, 0.07)",
          boxShadow: "0 1px 6px rgba(15, 23, 42, 0.04)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
          "&:hover": {
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            transform: "translateY(-3px)",
            borderColor: "rgba(255,107,107,0.3)",
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          paddingInline: 16,
          minHeight: 40
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #1C1C1E 0%, #000000 100%)",
          color: "#FFFFFF",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.28)",
          "& .MuiButton-endIcon": { color: "#FFFFFF" },
          "& .MuiButton-startIcon": { color: "#FFFFFF" },
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontWeight: 600
        }
      },
      variants: [
        {
          props: { color: "primary", variant: "filled" },
          style: {
            background: "#1C1C1E"
          }
        }
      ]
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          borderColor: alpha("#0F172A", 0.08),
          paddingInline: 12,
          fontWeight: 600,
          backgroundColor: "#FFFFFF",
          "&.Mui-selected": {
            backgroundColor: alpha("#1C1C1E", 0.08),
            color: "#1C1C1E",
            borderColor: alpha("#1C1C1E", 0.28)
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          backgroundColor: "#FFFFFF"
        }
      }
    }
  }
});

export default theme;
