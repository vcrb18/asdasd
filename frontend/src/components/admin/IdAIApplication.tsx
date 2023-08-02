import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AdminBox from "./AdminBox";
import { postExamIdAI } from "../../service/user.service";
import { NavigateFunction, useNavigate } from "react-router-dom";


function IdAIApplication() {
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();

  const [examId, setExamId] = useState<string>("");
  const [examIdError, setExamIdError] = useState<boolean>(false);


  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamIdError(false);
    setExamId(event.target.value);
  };

  const handleIdSubmit = () => {
    const isExamIdRequired = examId == "";
    if(isExamIdRequired){
      setExamIdError(true);
      return;
    }
      
    postExamIdAI(examId);
    navigate(`/examsview/${examId}`);
  };

  return (
    <>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-around"}
      >
        <AdminBox text="examId" />
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
            sx={{ width: "90%", bgcolor: examIdError ? "#DE8989" : "#ffffff" }}
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
    </>
  );
}
export default IdAIApplication;

