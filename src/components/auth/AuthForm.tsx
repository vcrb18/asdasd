import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useAuth } from '@/hooks/AuthContext';

import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Typography } from '@mui/material';

import { LoginValidation } from '@/utils/Validations';

import { AuthPage, OAuthPage } from '@/ts/types/sessionTypes';

import FullIsatecLogo from '@/assets/images/logo_isatec_completo.png';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { CustomTextField } from './CustomTextField';


function Buttons({ mode }: { mode: AuthPage }) {
  const { t } = useTranslation();
  return (
    <>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {mode === OAuthPage.Register ? t('auth.authForm.register') : t('auth.authForm.login')}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            {t('auth.authForm.forgotPassword')}
          </Link>
        </Grid>
        <Grid item>
          <Link href={mode === OAuthPage.Register ? '/login' : '/register'} variant="body2">
            {mode === OAuthPage.Register ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

function AuthForm({ mode }: { mode: AuthPage }) {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidation,
    onSubmit: async (values: { email: string; password: string }) => {
      try {
        if (mode === OAuthPage.Register) {
          await signUp(values);
        } else if (mode === OAuthPage.Login) {
          await signIn(values);
        }
        navigate('/mainMenu');
      } catch (error) {
        formik.setStatus('Error: Invalid email or password');
      }
    },
  });

  return (
    <Grid
      container
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={12} md={12} lg={3} xl={3}>
        <img src={FullIsatecLogo} height={100} alt="logo" className="logo" />
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10%',
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
          {mode === OAuthPage.Register ? 'Register for ECG' : 'Sign in to ECG'}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <CustomTextField
            id="email"
            label={t('general.email')}
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <CustomTextField
            id="password"
            name="password"
            label={t('general.password')}
            type="password"
            autoComplete={mode === OAuthPage.Register ? 'new-password' : 'current-password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label={t('auth.authForm.rememberMe')}
          />
          {formik.status && (
            <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
              {formik.status}
            </Typography>
          )}
          <Buttons mode={mode} />
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 8, mb: 4 }}>
          {'© '}
          <Link color="inherit" href="/">
            {t('general.isatecEcg')}
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default AuthForm;
