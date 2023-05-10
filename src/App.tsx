import React, { Suspense, lazy } from 'react';
import { Grid, Container, Skeleton } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Footer from './footer'
import Navbar from './navbar'
import { DBContext, DatabaseContext } from './database/Database';
import { DBLocalStorage } from './database/localStorage/LocalStorageImpl';

const Body = lazy(() => import('./pages/Home'))
const TeamPage = lazy(() => import('./pages/TeamDetails'))
const Rotation = lazy(() => import('./Rotation'))

function Content() {
    const dbContextObj = new DatabaseContext(new DBLocalStorage(localStorage));
    return (
        <DBContext.Provider value={dbContextObj}>
            <Grid container direction="column" minHeight="100vh">
                <Grid item>
                    <Navbar />
                </Grid>
                <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1, md: 2 } }}>
                    {/* <Suspense fallback={null}> */}
                    <Suspense fallback={<Skeleton variant="rectangular" height={1000} />}>
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
        </DBContext.Provider>
    )
}

export default Content;
