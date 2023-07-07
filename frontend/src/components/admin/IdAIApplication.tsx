import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import AdminBox from "./AdminBox";

interface IdAIApplicationProps {
  onClickIdApplication: (examId: string) => void;
}

function IdAIApplication({onClickIdApplication}: IdAIApplicationProps) {
  const { t } = useTranslation();

  const [examId, setExamId] = React.useState<string>("");

  const handleIdSubmit = () => {
    onClickIdApplication(examId);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamId(event.target.value);
    console.log(examId);
  };
  
  return (
    <Box display={"flex"} width={"100%"} marginY={"3%"}>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-around"}
        marginX={"10%"}
      >
        <AdminBox text="examId"/>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={6}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={4}
          width={"80%"}
        >
          <TextField
            id="folio-search"
            variant="outlined"
            size="medium"
            onChange={handleIdChange}
            sx={{ width: "80%" }}
          />
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={2}
          xs={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={4}
          width={"80%"}
        >
          <Button
            sx={{
              backgroundColor: "#007088",
              color: "#000000",
              width: "auto",
            }}
            variant="contained"
            onClick={handleIdSubmit}
            fullWidth
          >
            <Typography color={"#ffffff"}>{t("apply")}</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
export default IdAIApplication