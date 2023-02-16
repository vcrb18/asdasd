// import { useTheme } from "@emotion/react";
import { Button, Container} from "@mui/material";
// import { createTheme} from "@mui/system";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ButtonProps {
  label: string;
}

interface MainMenuButtonProps {
  buttonLabels: ButtonProps[];
}
// const CustomContainer: React.FC<ButtonProps> = ({buttonLabels})=>{
//     return(
//         <Container fixed>
            
//             <Button>
//                 {}
//                 <ArrowForwardIcon></ArrowForwardIcon>
//             </Button>
//             </Box>
//         </Container>
//     )
// }

const MainMenuButton: React.FC<MainMenuButtonProps> = ({ buttonLabels }) => {
//   const buttonsTheme = createTheme({
//     palette: {
//       primary: {
//         main: "#006a6b",
//       },
//       secondary: {
//         main: "#404040",
//       },
//     },
//   });
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {buttonLabels != null && buttonLabels.length > 0
        ? buttonLabels.map((button, index) => (
            <Grid xs={2} sm={4} md={4} key={index}>
                <Container fixed>
                    <Box 
                    justifyContent="flex-end"
                    aling-items="flex-end"
                    // borderColor="black"
                    >
                    <Button color="primary" variant="contained">
                        {button.label}
                    </Button>
                    </Box>
                </Container>
            </Grid>
          ))
        : null}
    </Grid>
  );
};

export default MainMenuButton;
