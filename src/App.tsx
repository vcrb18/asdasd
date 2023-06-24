import { I18nextProvider } from 'react-i18next';
import { ActionFunction, createBrowserRouter, LoaderFunction, RouterProvider } from 'react-router-dom';

import client from '@/api/client';
import { AuthProvider } from '@/hooks/AuthContext';
import theme from '@/theme';

import { ThemeProvider } from '@mui/material/styles';

import i18n from '@/utils/i18n';

import '@/global.css';

interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType;
}

interface IRoute extends RouteCommon {
  path: string;
  Element: React.ComponentType;
}

interface Pages {
  [key: string]: {
    default: React.ComponentType;
  } & RouteCommon;
}

const pages: Pages = import.meta.glob('./pages/**/*.tsx', { eager: true });

const getNormalizedPathName = (fileName: string): string => {
  return fileName.includes('$') ? fileName.replace('$', ':') : fileName.replace(/\/index/, '');
};

const getRouteFromFileName = (fileName: string): string => {
  switch (fileName) {
    case 'index':
      return '/';
    case 'examView':
      return '/exam/:idExam';
    default:
      return `/${getNormalizedPathName(fileName)}`;
  }
};

const routes: IRoute[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }
  routes.push({
    path: getRouteFromFileName(fileName),
    Element: pages[path].default,
    loader: pages[path]?.loader as LoaderFunction | undefined,
    action: pages[path]?.action as ActionFunction | undefined,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  })),
);

const store = {
  get: () => localStorage.getItem('token'),
  set: (token: string) => localStorage.setItem('token', token),
  del: () => localStorage.removeItem('token'),
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider store={store} client={client}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;
