import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define the translation resources for your app
const resources = {
  en: {
    translation: {
      patology: "Patology",
      patologies: "Patologies",
      state: "State",
      landingTitle: "Artificial Intelligence for Cardiology",
      landingFirstText:
        "Welcome to ISATEC Heart, a research and development team dedicated to exploring the dedicated to exploring the potential of artificial intelligence (AI) in the field of cardiology.",
      landingSecondText:
        "Our team is focused on developing cutting-edge AI tools and technologies to help improve the diagnosis, treatment and management of heart disease. Through our research, we seek to push the boundaries of what is possible in the field of cardiology and contribute to the advancement of medical science.",
      ourProjects: "Our Projects",
      verificationExams: "Verification of Examinations",
      arrhythmias: "Arrhythmias",
      extrasystole: "Extrasystole",
      diagnostics: "Diagnostics",
      firstTextDiagnostics: "Sinus rhythm",
      secondTextDiagnostics: "Requires medical verification",
      thirdTextDiagnostics: "Plotting within the limits",
      fourthTextDiagnostics: "Multiple anomalies",
      team: "Team",
      firstTextTeam:
        "Our team is comprised of talented researchers, engineers and medical professionals who are passionate about improving the lives of patients with heart disease.",
      secondTextTeam:
        "We work closely with leading medical institutions and organizations to ensure that our research is at the forefront of the latest scientific developments.",
      home: "Home",
      aboutUs: "About Us",
      contactUs: "Contact Us",
      login: "Login",
      contact: "Contact",
      exams: "Exams",
      metrics: "Metrics",
      alerts: "Alerts",
      report: "Report",
      myAccount: "My Account",
      logOut: "Log Out",
      mainMenu: "Main Menu",
      filter: "Filters",
      urgencyLevel: 'Urgency Level: ',
      urgency: "Urgency",
      otherFilters: "Other Filters",
      normal: 'Normal',
      results: 'Results',
      date: 'Date',
      pacient: 'Pacient',
      from: 'From',
      to: 'To',
      cancel: 'Cancel',
      add: 'Add',
      fiducialPoints: 'Fiducial Points',
      applyFilters: 'Apply Filters',
      folioSearch: 'Filter by Folio',
      es: "Spanish",
      en: "English",
    },  
  },
  es: {
    translation: {
      patology: "Patología",
      patologies: "Patologías",
      state: "Estado",
      landingTitle: "Inteligencia Artificial para Cardiología",
      landingFirstText:
        "Bienvenido a ISATEC Heart, un equipo de investigación y desarrollo dedicado a explorar el potencial de la inteligencia artificial (IA) en el campo de la cardiología.",
      landingSecondText:
        "Nuestro equipo se centra en desarrollar herramientas y tecnologías de IA de vanguardia para ayudar a mejorar el diagnóstico, tratamiento y manejo de las enfermedades del corazón. A través de nuestra investigación, buscamos ampliar los límites de lo que es posible en el campo de la cardiología y contribuir al avance de la ciencia médica.",
      ourProjects: "Nuestros Proyectos",
      verificationExams: "Verificación de Exámenes",
      arrhythmias: "Arritmias",
      extrasystole: "Extrasístoles",
      diagnostics: "Diagnósticos",
      firstTextDiagnostics: "Ritmo sinusal",
      secondTextDiagnostics: "Requiere verificación médica",
      thirdTextDiagnostics: "Trazado dentro de los limites",
      fourthTextDiagnostics: "Multiples anomalías",
      team: "Equipo",
      firstTextTeam:
        "Nuestro equipo está compuesto por investigadores, ingenieros y profesionales médicos talentosos que están apasionados por mejorar la vida de los pacientes con enfermedades del corazón.",
      secondTextTeam:
        "Trabajamos en estrecha colaboración con las principales instituciones y organizaciones médicas para asegurar que nuestra investigación esté a la vanguardia de los últimos desarrollos científicos.",
      home: "Inicio",
      aboutUs: "Sobre Nosotros",
      contactUs: "Contactanos",
      login: "Iniciar Sesión",
      contact: "Contacto",
      exams: "Exámenes",
      metrics: "Métricas",
      alerts: "Alertas",
      report: "Reporte",
      myAccount: "Mi Cuenta",
      logOut: "Cerrar Sesión",
      mainMenu: "Menú Principal",
      filter: "Filtros",
      urgencyLevel: 'Nivel de Urgencia: ',
      urgency: "Urgencia",
      otherFilters: "Otros Filtros",
      normal: 'Normal',
      results: 'Resultados',
      pacient: 'Paciente',
      date: 'Fecha',
      from: 'Desde',
      to: 'Hasta',
      cancel: 'Cancelar',
      add: 'Agregar',
      fiducialPoints: "Puntos fiduciales",
      applyFilter: 'Aplicar Filtros',
      folioSearch: 'Buscar por Fiolio',
      es: "Español",
      en: "Inglés",
    },
  },
};

// Initialize the i18n library
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es", // Set the default language
    fallbackLng: "en", // Use English as the fallback language
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log("i18n initialized successfully");
  })
  .catch((error) => {
    console.log("i18n initialization error:", error);
  });

export default i18n;
