import { Box, type BoxProps, type SxProps, type Theme } from "@mui/material";

type StackProps = Omit<BoxProps, "display"> & {
  [key: string]: any;
  direction?: any;
  spacing?: any;
  gap?: any;
  alignItems?: any;
  justifyContent?: any;
  flexWrap?: any;
  useFlexGap?: boolean;
};

export default function Stack({
  direction = "column",
  spacing = 0,
  gap,
  alignItems,
  justifyContent,
  flexWrap,
  sx,
  children,
  ...rest
}: StackProps) {
  return (
    <Box
      {...rest}
      sx={[
        {
          display: "flex",
          flexDirection: direction,
          gap: gap ?? spacing,
          alignItems,
          justifyContent,
          flexWrap
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      {children}
    </Box>
  );
}
