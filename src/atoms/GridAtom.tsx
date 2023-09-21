import { Grid } from '@mui/material';

import { GridProps } from '@/ts/interfaces/GridProps';

export function GridAtom(props: GridProps) {
  return (
    <Grid container spacing={props.spacingRow}>
      <Grid container item spacing={props.spacingColumn}>
        {Array.from(props.element).map((element, index) => (
          <Grid item key={index}>
            {element}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
