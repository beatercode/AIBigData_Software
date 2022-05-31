import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { db } from "../firebase.js";
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { AreaChart, Area } from 'recharts';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { ResponsivePie } from '@nivo/pie'
import { linearGradientDef } from '@nivo/core'

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {

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
    <>
      <Card style={{
        marginTop: "10%",
        boxShadow: "0 20px 30px -10px #26394d!important",
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: "30px",
        border: "1.2px solid gray",
        paddingTop: "25px",
        position: "relative",
        overflow: "inherit"
      }}
        className='cardWrapperMobile'>
        <h2 style={{ width: "100%", textAlign: "center", paddingBottom: "20px" }}> Mobile view not supported </h2>
      </Card>
      <Card style={{
        marginTop: "10%",
        boxShadow: "0 20px 30px -10px #26394d!important",
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: "30px",
        border: "1.2px solid gray",
        paddingTop: "25px",
        position: "relative",
        overflow: "inherit"
      }}
        className='cardWrapper'>
        <CardContent className="boxWithColumn">
          <Box marginTop={0} className="boxColumnFixLeft">
            <Accordion className="leftBorder innerColumnLeft">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                className='accordionSummary'
              >
                <Box style={{ display: "flex", width: "100%" }}>
                  <Box className='accordionTitles'><Typography variant="h6" align="center" className='leftInfo'>  📊 Project Info </Typography></Box>
                  <Box className='accordionTitles'><Typography variant="h6" align="center" className='leftInfo'>  🫂 Social Info </Typography></Box>
                  <Box className='accordionTitles'><Typography variant="h6" align="center" className='leftInfo'>  📈 Assets Info </Typography></Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Card className="leftBorder innerColumnLeft">
                  <Box className='textZoneContainer'>
                    <Box className='textZone'>
                      <Typography align="center"
                        className="leftText">
                        From these information, the AI with gather the major information
                        such as: project information amount, SEO cover, Web Indexing, Trends,
                        Documents amount and quality, major website notation
                      </Typography>
                    </Box>
                    <Box className='textZone'>
                      <Typography align="center"
                        className="leftText">
                        From this section, the AI will be able to generate a series
                        of fundamental information, some of which are: first
                        post/coherent interaction on Twitter, quantity/quality of
                        contents on Twitter, Instagram and Medium;
                        Discord channel quantity and quality and more
                      </Typography>
                    </Box>
                    <Box className='textZone'>
                      <Typography align="center"
                        className="leftText latestLeftText">
                        This section allows the AI to analyze the technical
                        aspects of the project. Governance Token, additional
                        Token/Coin, chain location, quality of the chain,
                        historical period, type of project, NFT if/when
                        released and analysis of the latter and much more
                      </Typography>
                    </Box>
                  </Box>
                </Card >
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box marginTop={0} className="boxColumnFixRight">
            <FormikStepper
              initialValues={{
                projectName: 'Everseed',
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
                nftBlacklistCheckbox: false,
                nftPrivateSaleCheckbox: false,
                projects: []
              }}
              onSubmit={async (values) => {
                await sleep(3000);
                values.projects = projects;
              }}
            >
              <FormikStep label="📊">
                < Box paddingBottom={1} paddingTop={3} style={{ marginBottom: "20px" }}>
                  Project basic information
                </Box>
                <Box paddingBottom={0}>
                  <Field fullWidth name="projectName" component={TextField} label="Project Name" />
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth name="websiteUrl" component={TextField} label="Website URL" />
                </Box>
              </FormikStep >
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
                    className="labelFixedWidth"
                    component={CheckboxWithLabel}
                    Label={{ label: 'Twitter' }} />
                  <Field name="twitterLink"
                    component={TextField}
                    label="Link Twitter "
                    disabled={!twitterCheck}
                    className="labelAlignCheckBox" />
                </Box>
                <Box>
                  <Field
                    name="discordCheckbox"
                    type="checkbox"
                    onClick={() => {
                      setDiscordCheck(!discordCheck);
                    }}
                    className="labelFixedWidth"
                    component={CheckboxWithLabel}
                    Label={{ label: 'Discord' }}
                  />
                  <Field name="discordLink"
                    component={TextField}
                    label="Link Discord "
                    disabled={!discordCheck}
                    className="labelAlignCheckBox" />
                </Box>
                <Box>
                  <Field
                    name="mediumCheckbox"
                    type="checkbox"
                    onClick={() => {
                      setMediumCheck(!mediumCheck);
                    }}
                    className="labelFixedWidth"
                    component={CheckboxWithLabel}
                    Label={{ label: 'Medium' }}
                  />
                  <Field name="mediumLink"
                    component={TextField}
                    label="Link Medium "
                    disabled={!mediumCheck}
                    className="labelAlignCheckBox" />
                </Box>
                <Box paddingBottom={2}>
                  <Field
                    name="instagramCheckbox"
                    type="checkbox"
                    onClick={() => {
                      setInstagramCheck(!instagramCheck);
                    }}
                    className="labelFixedWidt"
                    component={CheckboxWithLabel}
                    Label={{ label: 'Instagram' }}
                  />
                  <Field name="instagramLink"
                    component={TextField}
                    label="Link Instagram "
                    disabled={!instagramCheck}
                    className="labelAlignCheckBox" />
                </Box>

              </FormikStep>
              <FormikStep label="📈">

                <Box style={{ overflow: "scroll !important" }}>
                  <Box paddingTop={3} className="boxToken">
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
                        className="labelAlignCheckBoxToken"
                      />
                      <Field marginright={1} name="tokenGovernanceLaunchDate"
                        component={TextField}
                        label="Launch date "
                        disabled={!tokenGovernanceCheckbox}
                        className="labelAlignCheckBoxToken"
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

                  <Box paddingTop={3} className="boxToken">
                    <Box>
                      <Field
                        name="tokenSecondCheckbox"
                        type="checkbox"
                        onClick={() => {
                          setTokenSecondCheckbox(!tokenSecondCheckbox);
                        }
                        }
                        component={CheckboxWithLabel}
                        Label={{ label: 'Token (Second)' }}
                      />
                      < Field marginright={1} name="tokenSecondName"
                        component={TextField}
                        label="Name "
                        disabled={!tokenSecondCheckbox}
                        className="labelAlignCheckBoxToken"
                      />
                      <Field marginright={1} name="tokenSecondLaunchDate"
                        component={TextField}
                        label="Launch date "
                        disabled={!tokenSecondCheckbox}
                        className="labelAlignCheckBoxToken"
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
                      < Field
                        name="tokenSecondPrivateSaleCheckbox"
                        type="checkbox"
                        disabled={!tokenSecondCheckbox}
                        component={CheckboxWithLabel}
                        Label={{ label: 'Private sale' }}
                      />
                    </Box>
                  </Box>

                  <Box paddingTop={3} className="boxToken">
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
                      < Field marginright={1} name="nftLaunchDate"
                        component={TextField}
                        label="Launch date "
                        disabled={!nftCheckbox}
                        className="labelAlignCheckBoxToken"
                      />
                      <Field marginright={1} name="nftCollectionSize"
                        component={TextField}
                        label="Size "
                        disabled={!nftCheckbox}
                        className="labelAlignCheckBoxToken"
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
                      < Field
                        name="nftPrivateSaleCheckbox"
                        type="checkbox"
                        disabled={!nftCheckbox}
                        component={CheckboxWithLabel}
                        Label={{ label: 'Private sale' }}
                      />
                    </Box>
                  </Box>
                </Box>

              </FormikStep >
              <FormikStep
                label="✅"
              >
                <Box marginBottom={2}>
                  By continuing with the processing,
                  I confirm that I have been authorized to use this software.
                  <div>All Rights Reserved </div>
                  <div><b>2022 ©ODASoftware </b></div>
                  <div><b>2022 ©ODABigDataSoftware </b></div>
                </Box>
              </FormikStep>
            </FormikStepper >
          </Box>
        </CardContent >
      </Card >
    </>
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

  const childrenArray = Object.keys(children).map((key) => children[key]);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [ps_projectName, setPs_projectName] = useState(null);
  const [ps_websiteUrl, setPs_websiteUrl] = useState(null);
  const [ps_rateOverall, setPs_rateOverall] = useState('?');
  const [ps_image, setPs_image] = useState("");
  const [ps_rateCommunity, setPs_rateCommunity] = useState("");
  const [ps_rateEcosystem, setPs_rateEcosystem] = useState("");
  const [ps_rateTeam, setPs_rateTeam] = useState("");
  const [ps_rateTokenomics, setPs_rateTokenomics] = useState("");
  const [completedBar, setCompletedBar] = useState(false);
  const [startedLoadingBar, setStartedLoadingBar] = useState(false);

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const data_tokenomics = [
    { name: '', analizedProject: 0, averageProject: 0, amt: 100 },
    {
      name: '',
      analizedProject: ps_rateTokenomics,
      averageProject: 59,
      amt: 100,
    },
    { name: '', analizedProject: 0, averageProject: 0, amt: 100 }
  ];

  const data_team = [
    {
      name: '',
      averageProject: 0,
      analizedProject: 0,
      amt: 0,
    },
    {
      name: '',
      averageProject: 61,
      analizedProject: ps_rateTeam,
      amt: 100,
    }
  ];

  const data_ecosystem1 = [
    { name: 'Group A', value: 52 * 100 },
    { name: 'Group B', value: parseInt(ps_rateEcosystem) * 100 }
  ];

  const data_ecosystem2 = [
    { name: 'B1', value: 52 },
    { name: 'B2', value: ps_rateEcosystem },
    { name: 'B3', value: 0 },
  ];

  const comm_twitter = +ps_rateCommunity + 29;
  const comm_website = +ps_rateCommunity + 23;
  const comm_medium = +ps_rateCommunity + 2;
  const comm_discord = +ps_rateCommunity + 7;
  const comm_others = +ps_rateCommunity + 22;

  const avg_twitter = 51;
  const avg_website = 50;
  const avg_medium = 37;
  const avg_discord = 42;
  const avg_others = 39;

  const data_community = [
    {
      subject: 'Twitter',
      A: comm_twitter,
      B: avg_twitter,
      fullMark: 100,
    },
    {
      subject: 'Medium',
      A: comm_website,
      B: avg_website,
      fullMark: 100,
    },
    {
      subject: 'Website',
      A: comm_medium,
      B: avg_medium,
      fullMark: 100,
    },
    {
      subject: 'Discord',
      A: comm_discord,
      B: avg_discord,
      fullMark: 100,
    },
    {
      subject: 'Others',
      A: comm_others,
      B: avg_others,
      fullMark: 100,
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const [percentLoading, setPercentLoading] = useState(0);
  const [colorLoading, setColorLoading] = useState("#b31919");

  function startBarLoading() {
    setStartedLoadingBar(true);
    let count = 0;
    let augment = 1;
    const int = setInterval(function () {
      count += augment;
      setPercentLoading(Math.round(count));
      if (count == 20) {
        setColorLoading("#b34019");
      }
      if (count == 40) {
        augment = 2
        setColorLoading("#b36919");
      }
      if (count == 52) {
        setColorLoading("#abb319");
      }
      if (count == 72) {
        augment = 0.5;
        setColorLoading("#85b319");
      }
      if (count == 90) {
        setColorLoading("#5cb319");
      }
      if (count == 90) {
        setColorLoading("#00e676");
      }
      if (count == 100) {
        clearInterval(int);
        setCompletedBar(true);
      }
    }, 50);
  }

  const ecosTempData = [
    {
      "id": ps_projectName,
      "label": ps_projectName,
      "value": ps_rateEcosystem,
      "color": '#444454'
    },
    {
      "id": "Average",
      "label": "Average",
      "value": 52,
      "color": '#333333'
    }
  ];

  if (completed) {
    if (!completedBar && !startedLoadingBar) { startBarLoading(); }
    return (
      <Box>
        <Box style={{ width: "100%", textAlign: "center" }}>
          <span style={{ position: "relative", top: "20%" }} >
            Analizing:
          </span>
          <span style={{ fontWeight: "700 !important", position: "relative", top: "20%", left: "4px" }}>
            {ps_projectName}
          </span>
        </Box>
        <Progress
          percent={percentLoading}
          status="error"
          theme={{
            error: {
              symbol: percentLoading + '%',
              color: colorLoading,
              height: '18px',
            }
          }}
        />
        { /*
        <Box marginTop={2} className="boxResult">
        </Box>
        */ }
        <Box marginTop={1} className="loadingResult" style={{ opacity: completedBar ? '1' : '0' }}>
          <Box className='boxResultContainer'>
            <Box className="boxResultFlexColumn1">
              <Box className="boxResultFlexRow">
                <Box className="boxResultFullHeigthWrapper">
                  <Box className="textOverallRate">
                    <>
                      <span>
                        {"OVERALL RATE:"}
                      </span>
                    </>
                    <>
                      <span className='percent'>
                        {ps_rateOverall}%
                      </span>
                    </>
                  </Box>
                  <Box className="boxResultFullHeigth">
                    <Box className="boxResultImage">
                    </Box>
                    <>
                      <span>
                        {"ODA Clan"}
                      </span>
                      <br />
                      <span style={{ textDecoration: "underline" }}>
                        {"https://discord.gg/odaclan"}
                      </span>
                    </>
                    <Box className="boxResultImageOdaLogo" style={{ width: "180px !important", height: "180px !important" }}>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="boxResultFlexColumn2">
              <Box className="boxResultFlexRow">
                <Box className="boxResultDividedWrapper">
                  <span className="textInsideLoadingBar2">
                    <>
                      <span>
                        {"TOKENOMICS RATE:"}
                      </span>
                    </>
                    <>
                      <span className='percent'>
                        {ps_rateTokenomics}%
                      </span>
                    </>
                  </span>
                  <Box className="boxResultDivided">
                    <>
                      <div style={{ width: "100%", height: "200px", marginTop: "15px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            width={500}
                            height={300}
                            data={data_tokenomics}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar name={ps_projectName} dataKey="analizedProject" fill="#F47560" opacity={'0.8'} />
                            <Bar name="Average" dataKey="averageProject" fill="#00e676" opacity={'0.8'} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  </Box>
                </Box>
                <Box className="boxResultDividedWrapper">
                  <>
                    <span className="textInsideLoadingBar2">
                      <>
                        <span>
                          {"TEAM RATE:"}
                        </span>
                      </>
                      <>
                        <span className='percent'>
                          {ps_rateTeam}%
                        </span>
                      </>
                    </span>
                  </>
                  <Box className="boxResultDivided">
                    <>
                      <div style={{ width: "100%", height: "200px", marginTop: "15px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            width={500}
                            height={400}
                            data={data_team}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area name={ps_projectName} type="monotone" dataKey="analizedProject" stackId="1" stroke="#00e676" fill="#00e676" />
                            <Area name="Average" type="monotone" dataKey="averageProject" stackId="1" stroke="#F47560" fill="#F47560" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  </Box>
                </Box>
              </Box>
              <Box className="boxResultFlexRow">
                <Box className="boxResultDivided2Wrapper">
                  <>
                    <span className="textInsideLoadingBar2">
                      <>
                        <span>
                          {"ECOSYSTEM RATE:"}
                        </span>
                      </>
                      <>
                        <span className='percent'>
                          {ps_rateEcosystem}%
                        </span>
                      </>
                    </span>
                  </>
                  <Box className="boxResultDivided2">
                    { /*
                    <>
                      <div style={{ width: "100%", height: "200px", marginTop: "15px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart width={400} height={400}>
                            <Pie name={ps_projectName} data={data_ecosystem1} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                            <Pie name="Average" data={data_ecosystem2} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                    */ }
                    <>
                      <div style={{ width: "100%", height: "200px", marginTop: "15px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <ResponsivePie
                            data={ecosTempData}
                            isInteractive={false}
                            colors={['#CF6C5D', '#30A667']}
                            margin={{ top: 5, right: 5, bottom: 65, left: 5 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{
                              from: 'color',
                              modifiers: [
                                [
                                  'darker',
                                  0.2
                                ]
                              ]
                            }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#ffffff"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor="#ffffff"
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor= '#000000' 
                            defs={[
                              {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(244, 117, 96, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                              },
                              {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                              }
                            ]}
                            fill={[
                              {
                                match: {
                                  id: 'ruby'
                                },
                                id: 'dots'
                              },
                              {
                                match: {
                                  id: 'c'
                                },
                                id: 'dots'
                              },
                              {
                                match: {
                                  id: 'go'
                                },
                                id: 'dots'
                              },
                              {
                                match: {
                                  id: 'python'
                                },
                                id: 'dots'
                              },
                              {
                                match: {
                                  id: 'scala'
                                },
                                id: 'lines'
                              },
                              {
                                match: {
                                  id: 'lisp'
                                },
                                id: 'lines'
                              },
                              {
                                match: {
                                  id: 'elixir'
                                },
                                id: 'lines'
                              },
                              {
                                match: {
                                  id: 'javascript'
                                },
                                id: 'lines'
                              }
                            ]}
                            legends={[
                              {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#ffffff',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'square',
                                effects: [
                                  {
                                    on: 'hover',
                                    style: {
                                      itemTextColor: '#000'
                                    }
                                  }
                                ]
                              }
                            ]}
                          />
                        </ResponsiveContainer>
                      </div>
                    </>
                  </Box>
                </Box>
                <Box className="boxResultDivided2Wrapper">
                  <>
                    <span className="textInsideLoadingBar2">
                      <>
                        <span>
                          {"COMMUNITY RATE:"}
                        </span>
                      </>
                      <>
                        <span className='percent'>
                          {ps_rateCommunity}%
                        </span>
                      </>
                    </span>
                  </>
                  <Box className="boxResultDivided2">
                    <>
                      <div style={{ width: "100%", height: "200px", marginTop: "15px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data_community} style={{ fill: "transparent !important" }}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                            <Radar name={ps_projectName} dataKey="A" stroke="#F47560" fill="#F47560" fillOpacity={0.6} />
                            <Radar name="Average" dataKey="B" stroke="#00e676" fill="#00e676" fillOpacity={0.6} />
                            <Legend />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  </Box>
                </Box>
              </Box>
            </Box>
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
            //console.log(element);
            if (element.name === values.projectName.toLowerCase().replace(/\s/g, "")) {
              setPs_rateCommunity(element.rate_community);
              setPs_rateTeam(element.rate_team);
              setPs_rateTokenomics(element.rate_tokenomics);
              setPs_rateEcosystem(element.rate_ecosystem);
              var calcOverall = (+element.rate_community + +element.rate_team + +element.rate_tokenomics + +element.rate_ecosystem) / 4;
              console.log(calcOverall);
              setPs_rateOverall("" + calcOverall);
              setPs_image(element.imgUrl);
              document.documentElement.style.setProperty('--bg-image', "url(" + element.imgUrl + ")");
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
                  color="secondary"
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
                type="submit"
                color="secondary"
                className="myButtons"
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