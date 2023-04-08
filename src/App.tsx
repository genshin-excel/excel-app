import React, { Suspense, lazy } from 'react';
import { Grid, Container } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Footer from './footer'
import Navbar from './navbar'

const Body = lazy(() => import('./Body'))

function Content() {
    return (
        <Grid container direction="column" minHeight="100vh">
            <Grid item>
                <Navbar />
            </Grid>
            <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1, md: 2 } }}>
                <Suspense>
                    <HashRouter basename="/">
                        <Routes>
                            <Route index element={<Body />} />
                        </Routes>
                    </HashRouter>
                </Suspense>
            </Container>
            {/* make sure footer is always at bottom */}
            <Grid item flexGrow={1} />
            <Grid item>
                <Footer />
            </Grid>
        </Grid>
    )
}

export default Content;
