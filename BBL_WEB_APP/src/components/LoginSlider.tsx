import { Box, MobileStepper, useTheme } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import loginSlider1 from "../assets/login-slider-1.png";
import loginSlider2 from "../assets/login-slider-2.png";
import loginSlider3 from "../assets/login-slider-3.png";
import loginSlider4 from "../assets/login-slider-4.jpeg";
import LoginSliderItem from "./LoginSliderItem";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "“Bize biri lazım sayesinde 2 ay içerisinde iş sahibi oldum.”",
    src: loginSlider1,
    name: "Adem Şimşek",
    location: "Türkiye, Ankara",
  },
  {
    label: "“Bize biri lazım sayesinde 2 ay içerisinde iş sahibi oldum.”",
    src: loginSlider2,
    name: "Adem Şimşek",
    location: "Türkiye, Ankara",
  },
  {
    label: "“Bize biri lazım sayesinde 2 ay içerisinde iş sahibi oldum.”",
    src: loginSlider3,
    name: "Adem Şimşek",
    location: "Türkiye, Ankara",
  },
  {
    label: "“Bize biri lazım sayesinde 2 ay içerisinde iş sahibi oldum.”",
    src: loginSlider4,
    name: "Adem Şimşek",
    location: "Türkiye, Ankara",
  },
];

export default function LoginSlider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(4);
  const maxSteps = images.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          background: theme.palette.primary.main,
          boxShadow: "-15px 4px 71px rgba(0, 178, 255, 0.2)",
          borderRadius: "80px 0px 0px 300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AutoPlaySwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={"slider" + index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <LoginSliderItem
                  src={step.src}
                  label={step.label}
                  name={step.name}
                  location={step.location}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          sx={{
            background: "transparent",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            //white color dot and zoom when active
            "& .MuiMobileStepper-dotActive": {
              backgroundColor: "white",
            },
          }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={<></>}
          backButton={<></>}
        />
      </Box>
    </Box>
  );
}
