import { Box, Button, Card, CardContent, CircularProgress, Grid, makeStyles, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { db } from "../firebase.js";
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { theme } from '../theme';

const useStyles = makeStyles((thme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  boxColumnFixLeft: {
    flex: "25%",
    overflow: "scroll",
    borderRadius: "5px",
    [theme.breakpoints.down('sm')]: {
      maxHeight: "230px",
      borderRadius: "5px",
    }
  },
  coloredCard: {
    backgroundColor: "#ff4e00",
    backgroundImage: "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)"
  },
  innerColumnLeft: {
    paddingBottom: "1em",
    borderRadius: "5px",
    [theme.breakpoints.down('sm')]: {
      borderRadius: "5px",
    }
  },
  boxColumnFixRight: {
    flex: "75%",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: "0",
      paddingRight: "0"
    }
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
  },
  // INNER COMP PAGES
  labelAlignCheckBox: {
    marginTop: "-12px",
    marginBottom: "15px"
  },
  labelAlignCheckBoxToken: {
    marginTop: "-12px",
    marginBottom: "15px",
    paddingRight: "5px"
  },
  boxToken: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    padding: "20px 15px 20px 15px",
    marginBottom: "18px",
    borderRadius: "10px"
  },
  labelFixedWidth: {
    width: "2em",
    maxWidth: "2em",
    textAlign: "left"
  },
  boxResult: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: "10px",
    height: "30px",
    overflow: "hidden"
  },
  loadingBar: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    background: "#ff5656",
    height: "100%",
    color: "transparent",
    animation: `$fill 5s forwards ${theme.transitions.easing.easeInOut}`
  },
  boxResult2: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: "10px",
    height: "100%",
    overflow: "hidden",
    textAlign: "center",
    background: "round",
    backgroundRepeatX: "repeat"
  },
  loadingResult: {
    height: 0,
    animation: `$spawn 5s forwards ${theme.transitions.easing.easeInOut}`
  },
  "@keyframes spawn": {
    "0%": {
      height: 0
    },
    "99%": {
      height: 0
    },
    "100%": {
      height: "250px"
    },
  },
  textInsideLoadingBar: {
    alignItems: "center",
    margin: "auto",
    lineHeight: "25px",
  },
  textInsideLoadingBar2: {
    alignItems: "center",
    margin: "auto",
    fontSize: "25px",
    lineHeight: "250px",
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "0 10px 0 10px",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  "@keyframes fill": {
    "0%": {
      width: "0%",
      background: "#ff5656",
      color: "transparent"
    },
    "20%": {
      width: "20%"
    },
    "60%": {
      width: "75%"
    },
    "79%": {
      width: "79%",
      background: "#e16419",
    },
    "99%": {
      color: "transparent"
    },
    "100%": {
      width: "100%",
      background: "#0eb726",
      textAlign: "center",
      color: "#ffffff",
      fontWeight: "700",
    }
  },
  centeredTextResult: {
    textAlign: "center"
  }
}));

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {

  const classes = useStyles();
  const [projectName, setProjectName] = useState(null);
  const [websiteUrl, setWebsiteUrl] = useState(null)
  const [twitterCheck, setTwitterCheck] = useState(false);
  const [instagramCheck, setInstagramCheck] = useState(false);
  const [discordCheck, setDiscordCheck] = useState(false);
  const [mediumCheck, setMediumCheck] = useState(false);
  const [tokenGovernanceCheckbox, setTokenGovernanceCheckbox] = useState(false);
  const [tokenSecondCheckbox, setTokenSecondCheckbox] = useState(false);
  const [nftCheckbox, setNftCheckbox] = useState(false);

  const [loadingProject, setLoadingProject] = useState(true);
  const [projects, setProjects] = useState([]);

  function getProjects() {
    onSnapshot(collection(db, 'projects'), (snapshot) => {
      setProjects(snapshot.docs.map(doc => doc.data()))
    });
    return projects;
  }

  useEffect(() => {
    setLoadingProject(true);
    setProjects(getProjects());
    setLoadingProject(false);
  }, []);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  if (loadingProject) {
    <h1> Loading ... </h1>
  }

  return (
    <Card>
      <CardContent className={classes.boxWithColumn}>

        <Box marginTop={0} className={classes.boxColumnFixLeft}>
          <Card className={classes.coloredCard
            + " " + classes.innerColumnLeft}>
            <Typography variant="h6" align="center"
              className={classes.leftInfo}>
              📊 Project Info
            </Typography>
            <Typography align="center"
              className={classes.leftText}>
              From these information, the AI with gather the major information
              such as: project information amount, SEO cover, Web Indexing, Trends,
              Documents amount and quality, major website notation
            </Typography>
            <Typography variant="h6" align="center"
              className={classes.leftInfo}>
              🫂 Social Info
            </Typography>
            <Typography align="center"
              className={classes.leftText}>
              From this section, the AI will be able to generate a series
              of fundamental information, some of which are: first
              post/coherent interaction on Twitter, quantity/quality of
              contents on Twitter, Instagram and Medium;
              Discord channel quantity and quality and more
            </Typography>
            <Typography variant="h6" align="center"
              className={classes.leftInfo}>
              📈 Assets Info
            </Typography>
            <Typography align="center"
              className={classes.leftText + " " + classes.latestLeftText}>
              This section allows the AI to analyze the technical
              aspects of the project. Governance Token, additional
              Token/Coin, chain location, quality of the chain,
              historical period, type of project, NFT if/when
              released and analysis of the latter and much more
            </Typography>
          </Card>
        </Box>

        <Box marginTop={0} className={classes.boxColumnFixRight}>
          <FormikStepper
            initialValues={{
              projectName: '',
              websiteUrl: '',
              twitterCheckbox: false,
              discordCheckbox: false,
              mediumCheckbox: false,
              instagramCheckbox: false,
              twitterLink: '',
              discordLink: '',
              mediumLink: '',
              instagramLink: '',
              tokenGovernanceCheckbox: false,
              tokenGovernancePresaleCheckbox: false,
              tokenGovernancePrivateSaleCheckbox: false,
              tokenSecondCheckbox: false,
              tokenSecondPresaleCheckbox: false,
              tokenSecondPrivateSaleCheckbox: false,
              nftCheckbox: false,
              nftWhitelistCheckbox: false,
              nftPrivateSaleCheckbox: false,
              projects: []
            }}
            onSubmit={async (values) => {
              await sleep(3000);
              values.projects = projects;
              console.log('values', values);
            }}
          >
            <FormikStep label="📊">
              <Box paddingBottom={1} paddingTop={3}>
                Project basic information
              </Box>
              <Box paddingBottom={0}>
                <Field fullWidth name="projectName" component={TextField} label="Project Name" />
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth name="websiteUrl" component={TextField} label="Website URL" />
              </Box>
            </FormikStep>
            <FormikStep
              label="🫂"
            >
              <Box paddingTop={3}>
                <Field
                  name="twitterCheckbox"
                  type="checkbox"
                  onClick={() => {
                    setTwitterCheck(!twitterCheck);
                  }}
                  className={classes.labelFixedWidth}
                  component={CheckboxWithLabel}
                  Label={{ label: 'Twitter' }}
                />
                <Field name="twitterLink"
                  component={TextField}
                  label="Link Twitter "
                  disabled={!twitterCheck}
                  className={classes.labelAlignCheckBox} />
              </Box>
              <Box>
                <Field
                  name="discordCheckbox"
                  type="checkbox"
                  onClick={() => {
                    setDiscordCheck(!discordCheck);
                  }}
                  className={classes.labelFixedWidth}
                  component={CheckboxWithLabel}
                  Label={{ label: 'Discord' }}
                />
                <Field name="discordLink"
                  component={TextField}
                  label="Link Discord "
                  disabled={!discordCheck}
                  className={classes.labelAlignCheckBox} />
              </Box>
              <Box>
                <Field
                  name="mediumCheckbox"
                  type="checkbox"
                  onClick={() => {
                    setMediumCheck(!mediumCheck);
                  }}
                  className={classes.labelFixedWidth}
                  component={CheckboxWithLabel}
                  Label={{ label: 'Medium' }}
                />
                <Field name="mediumLink"
                  component={TextField}
                  label="Link Medium "
                  disabled={!mediumCheck}
                  className={classes.labelAlignCheckBox} />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  name="instagramCheckbox"
                  type="checkbox"
                  onClick={() => {
                    setInstagramCheck(!instagramCheck);
                  }}
                  className={classes.labelFixedWidth}
                  component={CheckboxWithLabel}
                  Label={{ label: 'Instagram' }}
                />
                <Field name="instagramLink"
                  component={TextField}
                  label="Link Instagram "
                  disabled={!instagramCheck}
                  className={classes.labelAlignCheckBox} />
              </Box>

            </FormikStep>
            <FormikStep label="📈">

              <Box paddingTop={3} className={classes.boxToken}>
                <Box>
                  <Field
                    name="tokenGovernanceCheckbox"
                    type="checkbox"
                    onClick={() => {
                      setTokenGovernanceCheckbox(!tokenGovernanceCheckbox);
                    }}
                    component={CheckboxWithLabel}
                    Label={{ label: 'Token (Governance)' }}
                  />
                  <Field marginright={1} name="tokenGovernanceName"
                    component={TextField}
                    label="Name "
                    disabled={!tokenGovernanceCheckbox}
                    className={classes.labelAlignCheckBoxToken}
                  />
                  <Field marginright={1} name="tokenGovernanceLaunchDate"
                    component={TextField}
                    label="Launch date "
                    disabled={!tokenGovernanceCheckbox}
                    className={classes.labelAlignCheckBoxToken}
                  />
                </Box>
                <Box>
                  <Field
                    name="tokenGovernancePresaleCheckbox"
                    type="checkbox"
                    disabled={!tokenGovernanceCheckbox}
                    component={CheckboxWithLabel}
                    Label={{ label: 'Presale' }}
                  />
                  <Field
                    name="tokenGovernancePrivateSaleCheckbox"
                    type="checkbox"
                    disabled={!tokenGovernanceCheckbox}
                    component={CheckboxWithLabel}
                    Label={{ label: 'Private sale' }}
                  />
                </Box>
              </Box>

              <Box paddingTop={3} className={classes.boxToken}>
                <Box>
                  <Field
                    name="tokenSecondCheckbox"
                    type="checkbox"
                    onClick={() => {
                      setTokenSecondCheckbox(!tokenSecondCheckbox);
                    }}
                    component={CheckboxWithLabel}
                    Label={{ label: 'Token (Second)' }}
                  />
                  <Field marginright={1} name="tokenSecondName"
                    component={TextField}
                    label="Name "
                    disabled={!tokenSecondCheckbox}
                    className={classes.labelAlignCheckBoxToken}
                  />
                  <Field marginright={1} name="tokenSecondLaunchDate"
                    component={TextField}
                    label="Launch date "
                    disabled={!tokenSecondCheckbox}
                    className={classes.labelAlignCheckBoxToken}
                  />
                </Box>
                <Box>
                  <Field
                    name="tokenSecondPresaleCheckbox"
                    type="checkbox"
                    disabled={!tokenSecondCheckbox}
                    component={CheckboxWithLabel}
                    Label={{ label: 'Presale' }}
                  />
                  <Field
                    name="tokenSecondPrivateSaleCheckbox"
                    type="checkbox"
                    disabled={!tokenSecondCheckbox}
                    component={CheckboxWithLabel}
                    Label={{ label: 'Private sale' }}
                  />
                </Box>
              </Box>

              <Box paddingTop={3} className={classes.boxToken}>
                <Box>
                  <Field
                    name="nftCheckbox"
                    type="checkbox"
                    onClick={() => {
                      setNftCheckbox(!nftCheckbox);
                    }}
                    component={CheckboxWithLabel}
                    Label={{ label: 'NFT Collection' }}
                  />
                  <Field marginright={1} name="nftLaunchDate"
                    component={TextField}
                    label="Launch date "
                    disabled={!nftCheckbox}
                    className={classes.labelAlignCheckBoxToken}
                  />
                  <Field marginright={1} name="nftCollectionSize"
                    component={TextField}
                    label="Size "
                    disabled={!nftCheckbox}
                    className={classes.labelAlignCheckBoxToken}
                  />
                </Box>
                <Box>
                  <Field
                    name="nftWhitelistCheckbox"
                    type="checkbox"
                    disabled={!nftCheckbox}
                    component={CheckboxWithLabel}
                    Label={{ label: 'Whitelist' }}
                  />
                  <Field
                    name="nftPrivateSaleCheckbox"
                    type="checkbox"
                    disabled={!nftCheckbox}
                    component={CheckboxWithLabel}
                    Label={{ label: 'Private sale' }}
                  />
                </Box>
              </Box>

            </FormikStep>
            <FormikStep
              label="✅"
            >
              By continuing with the processing,
              I confirm that I have been authorized to use this software
            </FormikStep>
          </FormikStepper>
        </Box>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {

  const Project = (name, result) => { return { name: name, result: result } };

  const classes = useStyles();
  const childrenArray = Object.keys(children).map((key) => children[key]);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [ps_projectName, setPs_projectName] = useState(null);
  const [ps_websiteUrl, setPs_websiteUrl] = useState(null);
  const [ps_result, setPs_result] = useState('?');
  const [ps_image, setPs_image] = useState("");

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const boldText = {
    fontWeight: 'bold' as 'bold',
    marginLeft: '7px'
  }

  if (completed) {
    return (
      <Box>
        <Box marginTop={3} style={{ textAlign: "center" }}>
          <>
            <span>
              Analizing:
            </span>
          </>
          <>
            <span style={boldText}>
              {ps_projectName}
            </span>
          </>
        </Box>
        <Box marginTop={2} className={classes.boxResult}>
          <Box className={classes.loadingBar}>
            <>
              <span className={classes.textInsideLoadingBar}>
                DONE
              </span>
            </>
          </Box>
        </Box>
        <Box marginTop={1} className={classes.loadingResult}>
          <Box className={classes.boxResult2}
            style={{ backgroundImage: ps_image }}>
            <>
              <span className={classes.textInsideLoadingBar2}>
                <>
                  <span>
                    APPROVAL RATE:
                  </span>
                </>
                <>
                  <span style={boldText}>
                    {ps_result}%
                  </span>
                </>
              </span>
            </>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setPs_projectName(values.projectName);
          setPs_websiteUrl(values.websiteUrl);
          setCompleted(true);
          values.projects.forEach(element => {
            if (element.name === values.projectName.toLowerCase().replace(/\s/g, "")) {
              setPs_result(element.result);
              setPs_image(element.imgUrl);
            }
          });
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'ELABORATING...' : isLastStep() ? 'ELABORATE' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
