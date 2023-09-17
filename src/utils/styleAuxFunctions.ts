import { IStyleProps } from '@/ts/interfaces/styleProps';

export function getStyle(params?: string) {
  const result: IStyleProps = {};

  if (params) {
    if (params.includes('num')) {
      result.type = 'number';
    }
    if (params.includes('txt')) {
      result.type = 'text';
    }
    if (params.includes('std')) {
      result.variant = 'standard';
    }
    if (params.includes('otl')) {
      result.variant = 'outlined';
    }
    if (params.includes('fill')) {
      result.variant = 'filled';
    }
    if (params.includes('sm')) {
      result.size = 'small';
    }
    if (params.includes('noNull')) {
      result.allowEmpty = true;
    }
    if (params.includes('@')) {
      result.name = 'email';
      result.autoComplete = 'email';
    }
    if (params.includes('password')) {
      result.type = 'password';
      result.name = 'password';
      result.autoComplete = 'password';
    }
  }
  return result;
}

export function range(from: number, to: number, step: number): Array<number> {
  const result: Array<number> = [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
  return result;
}
