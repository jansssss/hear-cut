import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2C6C66",
      dark: "#1E4E4A",
      light: "#7FB8B3",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#B67A61",
      dark: "#8B5642",
      light: "#D4A897"
    },
    background: {
      default: "#FAF7F2",
      paper: "#F5F0E8"
    },
    text: {
      primary: "#1C2421",
      secondary: "#5B6660"
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
          background: "linear-gradient(135deg, #2C6C66 0%, #1E4E4A 100%)",
          color: "#FFFFFF",
          boxShadow: "0 2px 10px rgba(44, 108, 102, 0.28)",
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
            background: "#2C6C66"
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
            backgroundColor: alpha("#2C6C66", 0.08),
            color: "#1E4E4A",
            borderColor: alpha("#2C6C66", 0.28)
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
