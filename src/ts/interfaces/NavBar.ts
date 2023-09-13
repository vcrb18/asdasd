interface ButtonNavProps {
  key: string;
  href: string;
  onClick?: () => void;
  label: string;
}

export type { ButtonNavProps };

interface ButtonBoxProps {
  children: React.ReactNode;
}

export type { ButtonBoxProps };
