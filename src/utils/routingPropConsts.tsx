export const landingPageTabs = [
  { label: 'home', href: '/information' },
  { label: 'aboutUs', href: '' },
  { label: 'contactUs', href: '' },
];

export const landingPageButtons = [{ label: 'login', href: '/' }];

export const loginPageButtons = [{ label: 'home', href: '/information' }];

export const mainMenuPageButtons = [
  { label: 'exams', href: '/exams' },
  { label: 'metrics', href: '/metrics' },
  { label: 'alerts', href: '/alerts' },
  { label: 'report', href: '/reports' },
];

export const mainMenuTabs = [
  { label: 'exams', href: '/exams' },
  { label: 'metrics', href: '/metrics' },
  { label: 'alerts', href: '/alerts' },
  { label: 'report', href: '/report' },
];

export const mainMenuHeaderButtons = [
  { label: 'myAccount', href: '#' },
  { label: 'logOut', href: '/' },
  { label: 'admin', href: '/admin' },
];

const Roles = {
  Admin: 'Admin',
  Doctor: 'Doctor',
  Operator: 'Operator',
  SuperOperator: 'Super Operator',
} as const;

type UserRole = (typeof Roles)[keyof typeof Roles];

export { Roles };
export type { UserRole };
