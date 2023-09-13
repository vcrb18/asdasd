import { MenuButton } from '@/ts/interfaces/menuButton';

import alertsImage from '@/assets/images/alertas.png';
import examImage from '@/assets/images/examenes.png';
import metricsImage from '@/assets/images/metricas.png';
import reportsImage from '@/assets/images/reportes.png';

export const mainMenuPageButtons: MenuButton[] = [
  { label: 'exams', href: '/exams', image: examImage },
  { label: 'metrics', href: '/metrics', image: metricsImage },
  { label: 'alerts', href: '/alerts', image: alertsImage },
  { label: 'report', href: '/reports', image: reportsImage },
];
