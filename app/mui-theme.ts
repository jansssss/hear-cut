import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB",
      dark: "#1D4ED8",
      light: "#93C5FD",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#7C3AED",
      dark: "#6D28D9",
      light: "#C4B5FD"
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
    borderRadius: 4
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
          border: "1px solid rgba(15, 23, 42, 0.07)",
          boxShadow: "0 1px 6px rgba(15, 23, 42, 0.04)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "0 1px 6px rgba(15, 23, 42, 0.05)",
          transition: "box-shadow 0.18s",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(15, 23, 42, 0.1)"
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
          background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
          color: "#FFFFFF",
          boxShadow: "0 2px 10px rgba(37, 99, 235, 0.28)",
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
            background: "#2563EB"
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
            backgroundColor: alpha("#2563EB", 0.08),
            color: "#1D4ED8",
            borderColor: alpha("#2563EB", 0.28)
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
