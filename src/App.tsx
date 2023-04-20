import React, { Suspense, lazy } from 'react';
import { Grid, Container } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Footer from './footer'
import Navbar from './navbar'
import {Team} from './models/Team'
import {charactersMap} from './database/characters_database'

const Body = lazy(() => import('./Body'))
const TeamPage = lazy(() => import('./teamPage'))
const Rotation = lazy(() => import('./Rotation'))

function Content() {
    initDatabase();
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

function initDatabase(){
    // let teams : Team[] = [
    //     {
    //         name: "Team 2",
    //         characters: [charactersMap.get("jean"), charactersMap.get("bennett"), charactersMap.get("diluc")],
    //         dps: 50000,
    //         dpr: 1000000,
    //     },
    //     {
    //         name: "Team 1",
    //         characters: [charactersMap.get("jean"), charactersMap.get("diluc")],
    //         dps: 40000,
    //         dpr: 800000,
    //     }
    // ];

    // localStorage.setItem("team_generate_id", "1");

    // localStorage.setItem("teams", JSON.stringify(teams));
}

export default Content;
