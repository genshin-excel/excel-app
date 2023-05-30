import { Container, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';

function Footer() {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="textSecondary" align="center" mt={2} mb={0}>
            © 2023 Excel App. All rights reserved
          </Typography>
        </Box>
      </Container>
    </Grid>
  );
}

export default Footer;
