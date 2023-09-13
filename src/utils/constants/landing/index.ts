import ArritmiasImage from '@/assets/images/arritmia_image.png';
import ExtrasistoleImage from '@/assets/images/extrasistole.png';
import VerificacionExamenesImage from '@/assets/images/verificacion_examenes.png';

import LogoCMM from '../../../assets/images/logo_cmm.png';
import LogoIsatecCompleto from '../../../assets/images/logo_isatec_completo.png';
import LogoUC from '../../../assets/images/logo_uc.png';
import LogoUChile from '../../../assets/images/logo_uchile.png';

export const projectsDetails = [
  {
    title: 'landing.projects.firstProject.title',
    image: VerificacionExamenesImage,
    alt: 'verificacion-examenes-image',
  },
  { title: 'landing.projects.secondProject.title', image: ArritmiasImage, alt: 'verificacion-examenes-image' },
  { title: 'landing.projects.thirdProject.title', image: ExtrasistoleImage, alt: 'verificacion-examenes-image' },
];

export const projectsDiagnosticsNames = [
  { title: 'landing.projects.fourthProject.firstDescription' },
  { title: 'landing.projects.fourthProject.secondDescription' },
  { title: 'landing.projects.fourthProject.thirdDescription' },
  { title: 'landing.projects.fourthProject.fourthDescription' },
  { title: 'landing.projects.fourthProject.fifthDescription' },
];

export const teamDescription = [{ text: 'landing.team.firstDescription' }, { text: 'landing.team.secondDescription' }];

export const logosDetails = [
  { image: LogoIsatecCompleto, alt: 'Isatec logo', width: '50%', height: '50%' },
  { image: LogoCMM, alt: 'CMM logo', width: '40%', height: '40%' },
  { image: LogoUChile, alt: 'Universidad de Chile logo', width: '25%', height: '25%' },
  { image: LogoUC, alt: 'Universidad Catolica logo', width: '30%', height: '30%' },
];
