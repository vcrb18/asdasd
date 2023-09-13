import { Button } from '@mui/material';

import { ButtonNavProps } from '@/ts/interfaces/NavBar';

function ButtonNav({ key, href, label, onClick }: ButtonNavProps) {
  return (
    <Button
      key={key}
      href={href}
      onClick={onClick}
      variant="contained"
      sx={{
        mx: 4,
        display: { xs: 'none', sm: 'flex' },
      }}
    >
      {label}
    </Button>
  );
}

export default ButtonNav;
