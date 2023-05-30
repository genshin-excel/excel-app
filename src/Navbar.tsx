import React, { useState } from 'react';
import { Button, Box, useTheme, styled, Toolbar, Typography, Divider, ListItemText, ListItemIcon, ListItemButton, ListItem, List, Drawer, IconButton, useScrollTrigger, Container, Fab, Fade, useMediaQuery, CssBaseline } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function ScrollTop(props: Props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                {children}
            </Box>
        </Fade>
    );
}

const pages = [
    { name: 'Home', link: '/' },
    { name: 'Rotation', link: '/rotationPage' },
    { name: 'TestPage', link: '/testPage' },
    { name: 'Reset LocalStorage', link: '/' },
];

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function NavBar(props: Props) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {isSmallScreen && (
                <>
                    <CssBaseline />
                    <AppBar >
                        <Container maxWidth="md">
                            <Toolbar disableGutters>
                                <Typography
                                    variant="h6"
                                    component="a"
                                    href="/"
                                    sx={{
                                        ml: 2,
                                        fontWeight: 200,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}>
                                    Excel App
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                </Box>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                </Box>
                                <Box sx={{ flexGrow: 0 }}>
                                </Box>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                                    <MenuIcon />
                                </IconButton>
                            </Toolbar>
                            <Drawer
                                sx={{
                                    width: drawerWidth,
                                    flexShrink: 0,
                                    '& .MuiDrawer-paper': {
                                        width: drawerWidth,
                                        boxSizing: 'border-box',
                                    },
                                }}
                                anchor="right"
                                open={open}
                                onClose={handleDrawerClose}
                            >
                                <DrawerHeader>
                                    <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                    </IconButton>
                                </DrawerHeader>
                                <Divider />
                                <List>
                                    {pages.map((page) => (
                                        <ListItem key={page.name} disablePadding>
                                            <Button
                                                key={page.name}
                                                component="a"
                                                href={page.link}
                                                onClick={() => {
                                                    if (page.name === 'Reset LocalStorage') {
                                                        localStorage.clear();
                                                        window.location.reload();
                                                    } else {
                                                        handleDrawerClose();
                                                    }
                                                }}
                                            >
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <ChevronRightIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>{page.name}</ListItemText>
                                                </ListItemButton>
                                            </Button>
                                        </ListItem>
                                    ))}
                                </List>
                            </Drawer>
                        </Container>
                    </AppBar>
                    <Toolbar id="back-to-top-anchor" />
                    <ScrollTop {...props}>
                        <Fab
                            size="small"
                            aria-label="scroll back to top"
                            color="primary"
                        >
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                </>
            )}
            {!isSmallScreen && (
                <>
                    <CssBaseline />
                    <AppBar >
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <Typography
                                    variant="h6"
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        fontWeight: 700,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}>
                                    Excel App
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                </Box>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages.map((page) => (
                                        <Button
                                            key={page.name}
                                            component="a"
                                            href={page.link}
                                            onClick={() => {
                                                if (page.name === 'Reset LocalStorage') {
                                                    localStorage.clear();
                                                    window.location.reload();
                                                } else {
                                                    handleDrawerClose();
                                                }
                                            }}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            {page.name}
                                        </Button>
                                    ))}
                                </Box>
                                <Box sx={{ flexGrow: 0 }}>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <Toolbar id="back-to-top-anchor" />
                    <ScrollTop {...props}>
                        <Fab
                            size="small"
                            aria-label="scroll back to top"
                            color="primary"
                        >
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                </>
            )}
        </>
    );
}