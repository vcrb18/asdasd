import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  Box,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/lib/headlessAuth";
import { useNavigate } from "react-router-dom";
import FullIsatecLogo from "@/assets/images/logo_isatec_completo.png";

function Buttons({ mode }: { mode: "login" | "register" }) {
  return (
    <>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {mode === "register" ? "Sign Up" : "Sign In"}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            href={mode === "register" ? "/login" : "/register"}
            variant="body2"
          >
            {mode === "register"
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        if (mode === "register") {
          await signUp(values);
        } else if (mode === "login") {
          await signIn(values);
        }
        navigate("/");
      } catch (error) {
        formik.setStatus("Error: Invalid email or password");
      }
    },
  });

  return (
    <Grid
      container
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        sx={{ display: "flex", justifyContent: "center" }}
        xs={12}
        md={12}
        lg={3}
        xl={3}
      >
        <img src={FullIsatecLogo} height={100} alt="logo" className="logo" />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10%",
        }}
        xs={12}
        md={12}
        lg={6}
        xl={6}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {mode === "register" ? "Register for ECG" : "Sign in to ECG"}
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete={
              mode === "register" ? "new-password" : "current-password"
            }
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          {formik.status && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mb: 2 }}
            >
              {formik.status}
            </Typography>
          )}
          <Buttons mode={mode} />
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 8, mb: 4 }}>
          {"© "}
          <Link color="inherit" href="/">
            ISATEC ECG
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default AuthForm;
