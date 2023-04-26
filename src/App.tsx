import React, { Suspense, lazy } from 'react';
import { Grid, Container, Skeleton } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Footer from './footer'
import Navbar from './navbar'

const Body = lazy(() => import('./Body'))
const TeamPage = lazy(() => import('./teamPage'))
const Rotation = lazy(() => import('./Rotation'))

function Content() {
    return (
        <Grid container direction="column" minHeight="100vh">
            <Grid item>
                <Navbar />
            </Grid>
            <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1, md: 2 } }}>
                <Suspense fallback={<Skeleton variant="rectangular" height={400} />}>
                    <HashRouter basename="/">
                        <Routes>
                            <Route index element={<Body />} />
                            <Route path="/TeamPage/:teamIndex" element={<TeamPage />} />
                            <Route path="/rotationPage" element={<Rotation />} />
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
