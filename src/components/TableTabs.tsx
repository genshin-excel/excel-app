import React from "react";
import {
  Grid,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const StyledGrid = styled(Grid)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#e0e0e0",
  marginLeft: "0px",
  marginTop: "0px",
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const StyledValue = styled(Typography)(({ theme }) => ({
}));

const StyledTotal = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const StyledTime = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const TableTabs = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const textVariant = isMediumScreen ? "body2" : "body1";

  const gridItems = [
    {
      title: "Character",
      values: ["Alhaitham", "Name", "Name", "Name"],
      total: "Total",
    },
    {
      title: "DMG Per Rotation",
      values: ["2050000", "0", "0", "0"],
      total: "0",
    },
    {
      title: "DMG Per Second",
      values: ["0", "0", "0", "0"],
      total: "0",
    },
    {
      title: "DMG Contribution",
      values: ["0", "0", "0", "0"],
      total: "0",
    },
  ];

  return (
    <Grid container justifyContent="flex-end">
      {gridItems.map((item, index) => (
        <React.Fragment key={index}>
          <StyledGrid container spacing={0} item xs={12} alignItems="center">
            <StyledGridItem item xs={3}>
              <StyledTitle variant={textVariant}>{item.title}</StyledTitle>
            </StyledGridItem>
            {item.values.map((value, subIndex) => (
              <StyledGridItem
                item
                xs={1.75}
                key={subIndex}
                sx={{ backgroundColor: "#f5f5f5" }}
              >
                <StyledValue variant={textVariant}>{value}</StyledValue>
              </StyledGridItem>
            ))}
            <StyledGridItem item xs={2}>
              <StyledTotal variant={textVariant}>{item.total}</StyledTotal>
            </StyledGridItem>
          </StyledGrid>
        </React.Fragment>
      ))}
      <StyledGrid container spacing={0} item xs={2}>
        <StyledGridItem item xs={12}>
          <StyledTime variant={textVariant}>Time: 0s</StyledTime>
        </StyledGridItem>
      </StyledGrid>
    </Grid>
  );
};

export default TableTabs;
