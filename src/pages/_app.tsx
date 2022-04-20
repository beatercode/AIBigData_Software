import { AppBar, Box, Card, Container, CssBaseline, makeStyles, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { theme } from '../theme';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  boxColumnFixLeft: {
    flex: "25%",
    height: "100%",
  },
  boxColumnFixRight: {
    flex: "75%",
    height: "100%",
  },
  fixedCard: {
    backgroundColor: "orange"
  },
  leftInfo: {
    marginTop: "15px"
  },
  leftText: {
    textAlign: "left",
    marginTop: "5px",
    fontSize: "1em",
    marginLeft: "0.9em",
    marginRight: "0.9em",
  },
  latestLeftText: {
    marginBottom: "10px",
  },
  boxWithColumn: {
    display: "flex",
    height: "auto",
    flexDirection: "row",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
    }
  }
}));

export default function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>AI Big Data Software</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="h5" align="center">Big Data Software</Typography>
          </Toolbar>
        </AppBar>

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          <Box marginTop={10}>
            <Box marginTop={0}>
              <Component {...pageProps} className={classes.fixedCard} />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
