import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@mui/material';

import { IGenericButtonProps } from '@/ts/interfaces/genericButtonProps';

export default function GenericButton(props: IGenericButtonProps) {
  const { t } = useTranslation();
  const { label, onPress, full, variant, href } = props;
  return (
    <Button
      onClick={onPress}
      variant={variant ? variant : 'contained'}
      sx={
        full
          ? {
              width: 1,
            }
          : {
              maxWidth: 1,
            }
      }
      href={href}
    >
      <Typography
        variant="button"
        sx={{
          fontSize: {
            xs: '0.7rem',
            md: '0.8rem',
            lg: '0.9rem',
            xl: '1rem',
          },
        }}
      >
        {t(label)}
      </Typography>
    </Button>
  );
}
