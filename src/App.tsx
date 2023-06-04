import React, { Suspense, lazy } from 'react';
import { Grid, Container, Skeleton } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DBContext, DatabaseContext } from './database/Database';
import { DBLocalStorage } from './database/localStorage/LocalStorageImpl';
import NavBar from './Navbar';
import Footer from './Footer'

const Body = lazy(() => import('./pages/Home'))
const TeamPage = lazy(() => import('./pages/TeamDetails'))
const Rotation = lazy(() => import('./Rotation'))
const Test = lazy(() => import('./TestPage'))
const CharacterConfig = lazy(() => import('./components/CharacterConfig'))

function Content() {
    const dbContextObj = new DatabaseContext(new DBLocalStorage(localStorage));
    return (
        <DBContext.Provider value={dbContextObj}>
            <Grid container direction="column" minHeight="100vh">
                <Grid item>
                    <NavBar window={() => window} children={<></>} />
                </Grid>
                <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1, md: 2 }, marginTop: "32px" }}>
                    {/* <Suspense fallback={null}> */}
                    <Suspense fallback={<Skeleton variant="rectangular" height={1000} />}>
                        <BrowserRouter basename="/">
                            <Routes>
                                <Route index element={<Body />} />
                                <Route path="/TeamPage/:teamIndex" element={<TeamPage />} />
                                <Route path="/rotationPage" element={<Rotation />} />
                                <Route path="/testPage" element={<Test />} />
                                <Route path="/characterConfig" element={<CharacterConfig />} />
                            </Routes>
                        </BrowserRouter>
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
