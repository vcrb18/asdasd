import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define the translation resources for your app
const resources = {
  en: {
    translation: {
      timeLeft: "Time Left",
      goBack: "Go back",
      exam: "Exam",
      review: "Review",
      reviewed: "Reviewed",
      toReview: "Waiting for Review",
      user: "User",
      password: "Password",
      forgotPassword: "I forgot my password",
      view: "View",
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
      diagnostic: "Diagnóstico",
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
      filterByReview: "Filter by Review",
      filterByState: "Filter by State",
      filter: "Filters",
      urgencyLevel: "Urgency Level: ",
      urgency: "Urgency",
      otherFilters: "Other Filters",
      normal: "Normal",
      results: "Results",
      date: "Date",
      patient: "Patient",
      from: "From",
      to: "To",
      cancel: "Cancel",
      add: "Add",
      fiducialPoints: "Fiducial Points",
      applyFilters: "Apply Filters",
      folioSearch: "Filter by Folio",
      es: "Spanish",
      en: "English",
      folio: "Folio",
      validateMeasurements: "Validate measurements",
      analysis: "Analisis",
      undoValidation: "Undo validation",
      accepted: "Accepted",
      rejected: "Rejected",
      confirmDelete: "Confirm Delete",
      askBeforeDeleting: "Are you sure you want to delete",
      delete: "Delete",
      suggestedDiagnoses: "Suggested diagnoses",
      newItem: "New item",
      submit: "Submit",
      derivation: "Derivation",
      derivations: "Derivations",
      restore: "Restore",
      saveChanges: "Save changes",
      values: "values",
      pathologiesPrediction: "Pathologies Prediction",
      comments: "Comments",
      commentsLabel: "Enter your comments here",
      reason: "Reason",
      change: "Change",
      wrongCredentials: "Invalid user or password",
      examTimeRemaining: "remaining",
      examTimeAgo: "ago",
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      diagnostic1: "Sinus arrhythmia",
      diagnostic2: "Atrial fibrillation with adequate ventricular response",
      diagnostic3: "Atrial fibrillation with slow ventricular response",
      diagnostic4: "Atrial fibrillation with rapid ventricular response",
      diagnostic5: "Atrial flutter with variable AV block",
      diagnostic6: "Atrial extrasystole normally conducted",
      diagnostic7: "Isolated atrial extrasystole",
      diagnostic8: "Conducted atrial extrasystole with aberrancy",
      diagnostic9: "Atrial extrasystoles in saves",
      diagnostic10: "Blocked atrial extrasystole",
      diagnostic11: "Paroxysmal supraventricular tachycardia",
      diagnostic12: "Unspecified supraventricular tachycardia, paroxysmal?",
      diagnostic13: "Supraventricular tachycardia with aberrant conduction",
      diagnostic14: "Atrial tachycardia with A-V block 3:1",
      diagnostic15: "Isolated ventricular extrasystole",
      diagnostic16: "Bigeminy ventricular extrasystoles",
      diagnostic17: "Ventricular extrasystoles in multifocal pairs",
      diagnostic18: "Ventricular-nodal-atrial parastasis",
      diagnostic19: "Extrasystole of the AV junction with aberrancy",
      diagnostic20: "Reciprocal complexes (echoes)",
      diagnostic21: "Twisting of the tips",
      diagnostic22: "Fusion complexes",
      diagnostic23: "Ventricular fibrillation",
      diagnostic24: "Monomorphic sustained ventricular tachycardia",
      diagnostic25: "Monomorphic self-limited ventricular tachycardia",
      diagnostic26: "Polymorphic ventricular tachycardia",
      diagnostic27: "Atrioventricular dissociation",
      diagnostic28: "Accelerated nodal rhythm",
      diagnostic29: "Sinus arrest",
      diagnostic30: "3:1 sinoatrial block",
      diagnostic31: "Atrioventricular block, first degree",
      diagnostic32: "Second-degree AV block, Mobitz I (Wenckebach)",
      diagnostic33: "High degree AV block 3:1",
      diagnostic34: "Complete atrioventricular block",
      diagnostic35: "Incomplete right bundle branch block",
      diagnostic36: "Complete right bundle branch block",
      diagnostic37: "Complete left bundle branch block",
      diagnostic38: "Ill-defined intraventricular block",
      diagnostic39: "Left anterior hemiblock",
      diagnostic40: "Left posterior hemiblock",
      diagnostic41: "ECG suggestive of Brugada",
      diagnostic42: "Right atrial reaction",
      diagnostic43: "Left atrial reaction",
      diagnostic44: "Left ventricular hypertrophy by voltage and repolarization alterations.",
      diagnostic45: "Right ventricular hypertrophy",
      diagnostic46: "Biauricular growth",
      diagnostic47: "Biventricular growth",
      diagnostic48: "Pacemaker Rhythm",
      diagnostic49: "Does not capture consistently",
      diagnostic50: "Atrial or coronary pacing",
      diagnostic51: "Ventricular demand pacing",
      diagnostic52: "Sequential Stimulation (VA)",
      diagnostic53: "Ventricular stimulation, complete control",
      diagnostic54: "Bicameral pacemaker, atrial sensing",
      diagnostic55: "Pacer dysfunction: does not sense consistently",
      diagnostic56: "Pacer dysfunction: no discharge",
      diagnostic57: "Pacer dysfunction: slow",
      diagnostic58: "Absence of spikes",
      diagnostic59: "Chaotic atrial rhythm",
      diagnostic60: "Pauses up to seconds",
      diagnostic61: "Mobitz II AV block",
      diagnostic62: "Extrasystoles of the AV junction",
      diagnostic63: "Full control of PM function is suggested",
      diagnostic64: "Extensive anterior wall ischemia",
      diagnostic65: "Anteroseptal ischemia",
      diagnostic66: "Anterolateral ischemia",
      diagnostic67: "Inferior ischemia",
      diagnostic68: "High Lateral Ischemia",
      diagnostic69: "Sinus tachycardia",
      diagnostic70: "Posterolateral ischemia",
      diagnostic71: "Myocardial infarction with ST-segment elevation in the anterior wall",
      diagnostic72: "Infarction with ST-segment elevation in septal wall",
      diagnostic73: "Lateral wall ST-segment elevation myocardial infarction",
      diagnostic74: "Infarction with ST-segment elevation in the inferolateral wall.",
      diagnostic75: "Myocardial infarction with ST-segment elevation in inferior wall",
      diagnostic76: "ST-segment elevation infarction in anteroapical wall",
      diagnostic77: "Evolving wall infarction",
      diagnostic78: "Control in 30 minutes",
      diagnostic79: "Sequelae of antero-apical wall necrosis (Q in V1-V2 to V4-V6)",
      diagnostic80: "Sequelae of extensive anterior wall necrosis (Q in V1-V2 to V4-V6, aVL and sometimes I",
      diagnostic81: "Sequence of lower wall necrosis (Q in D2, D3 and aVF)",
      diagnostic82: "Wolff Parkinson White",
      diagnostic83: "AV junction escape complexes",
      diagnostic84: "Accelerated AV junctional rhythm",
      diagnostic85: "AV junction rhythm",
      diagnostic86: "Atrioventricular dissociation",
      diagnostic87: "Accelerated idioventricular rhythm",
      diagnostic88: "Isorhythmic dissociation",
      diagnostic89: "Short QT interval",
      diagnostic90: "Prolonged QT interval",
      diagnostic91: "Atrial flutter with AV block 2:1",
      diagnostic92: "Left ventricular hypertrophy due to altered repolarization",
      diagnostic93: "Subendocardial lesion in anterior wall",
      diagnostic94: "Subendocardial lesion in lateral wall",
      diagnostic95: "Subendocardial lesion in inferior wall",
      diagnostic96: "Septal wall necrosis sequelae (q in V1 and V2).",
      diagnostic97: "Sequelae of lateral wall necrosis (RS in V1-V2 and/or Q in aVL, V6 and/or decreased R in V6).",
      diagnostic98: "RS, short PR, normal QRS",
      diagnostic99: "MP Migration",
      diagnostic100: "Normal layout",
      diagnostic101: "Tracing within normal limits",
      diagnostic102: "Sinus rhythm",
      diagnostic103: "Normal AV conduction",
      diagnostic104: "Normal complexes for age",
      diagnostic105: "Normal complexes",
      diagnostic106: "Normal normotopic complexes",
      diagnostic107: "Fibrillated baseline artifacts",
      diagnostic108: "Normal ventricular complexes",
      diagnostic109: "Repeat",
      diagnostic110: "Compared to the layout of",
      diagnostic111: "Inverted cables",
      diagnostic112: "Artifacts",
      diagnostic113: "Dextrocardia",
      diagnostic114: "Nonspecific alterations of ST-T",
      diagnostic115: "Early repolarization (normal variant)",
      diagnostic116: "Juvenile T-waves (normal variant)",
      diagnostic117: "ST-T abnormalities suggestive of acute pericarditis",
      diagnostic118: "Sharp T-waves (rule out electrolyte disturbances or ischemia)",
      diagnostic119: "Prominent U-waves (rule out electrolyte disturbances; or normal variant)",
      diagnostic120: "Decreased voltage only in classic shunts",
      diagnostic121: "Decreased voltage, in classic and precordial derivations.",
      diagnostic122: "Axis deviation to the left",
      diagnostic123: "Axis deviation to the right",
      diagnostic124: "Decreased voltage only in precordials",
      diagnostic125: "Monofocal ventricular extrasystoles with fixed coupling",
      diagnostic126: "Monofocal ventricular extrasystoles without fixed coupling",
      diagnostic127: "Ambulatory Blood Pressure Monitoring in high normal range (when 24-hour average values are 1-2 mmHg above 130/80 with daytime and nighttime values within normal ranges).",
      diagnostic128: "Stage 1 Arterial Hypertension",
      diagnostic129: "Stage 1 hypertension under antihypertensive treatment",
      diagnostic130: "Stage 2 Arterial Hypertension",
      diagnostic131: "Ambulatory blood pressure monitoring in high normal range, under antihypertensive treatment",
      diagnostic132: "Stage 2 hypertension under antihypertensive treatment",
      diagnostic133: "Ambulatory monitoring of normal blood pressure",
      diagnostic134: "Ambulatory monitoring of normal blood pressure, under antihypertensive treatment",
      diagnostic135: "Sinus Bradycardia",
      diagnostic136: "Left ventricular hypertrophy by voltage criteria only",
      diagnostic137: "Mild nonspecific ST-T alterations.",
      diagnostic139: "Atrial flutter",
      diagnostic140: "Atrial flutter 2:1",
      diagnostic141: "Atrial flutter 3:1",
      diagnostic142: "Isolated atrial extrasystoles",
      diagnostic143: "Monomorphic ventricular tachycardia",
      diagnostic144: "Atrial tachycardia with A-V block 2:1",
      diagnostic145: "2:1 sinoatrial block",
      diagnostic146: "High degree AV block 2:1",
      diagnostic147: "Trigeminated ventricular extrasystoles",
      diagnostic148: "Quadrigeminated ventricular extrasystoles",
      diagnostic149: "Infarction with ST Supra-ST Level in Anterior Wall",
      diagnostic150: "Sinus rhythm, Normal AV conduction, Normal complexes",
      diagnostic404: "Diagnosis not registered in the DB",
      locked: "Locked",
      male: "Male",
      female: "Female",
      yearsOld: "years old",
      dayAgo: "X day ago",
      hourAgo: "X hour ago",
      minuteAgo: "X minute ago",
      daysAgo: "X days ago",
      hoursAgo: "X hours ago",
      minutesAgo: "X minutes ago",
      day: "day",
      hour: "hour",
      minute: "minute",
      validationMessage: "Exam validated successfully",
      undoValidationMessage: "Exam validation undone successfully",
      position: "Position",
      time: "Time",
      rejectionReason1: "INCOMPLETE DERIVATION",
      rejectionReason2: "poorly taken exams",
      rejectionReason3: "ARTIFACTS BY FIBRILLATED BASELINE",
      rejectionReason4: "ARTIFACTS",
      rejectionReason5: "INVERTED CABLES",
      rejectionReason6: "FLAT DERIVATION",
      rejectionReason7: "REPEATED EXAM",
      rejectionReason8: "EXAM TAKEN IN LESS THAN 10 SECONDS",
      rejectionReason9: "INCOMPLETE DATA",
      rejectionReason10: "WRONG DATA",
      rejectionReason11: "DIFFUSE TRACED",
      admin: "Admin IA",
      medicalCenter: "Medical Center",
      medicalCenterSearch: "Search by Medical Center",
      activeTime: "Active Time",
      selectTime: "Select time",
      applyChanges: "Apply Changes",
      apply: "Apply",
      examId: "Exam Id",
      centerSelection: "Select a center",
      selectAll: "Select all",
      allCentersSelected: "All centers are selected",
      allCentersActivated: "All centers are activated",
      deactivateAIFirst: "Deactivate AI first",
      modifyParams: "Modify Parameters",
      upperLimit: "Upper limit",
      lowerLimit: "Lower limit",
      revertChanges: "Revert changes",
      confidence: "Confidence",
      append: "Add",
      modifyParameters: "Modify Parameters",
      accept: "Accept",
      reject: "Reject",
      unauthorized: "You are not authorized to access this page.",
      backToMenu: "Back to menu",
      background: "Background",
      sendToDoctor: "Send to doctor",
      close: "Close",
      download: "Download",
      selectDoctor: "Select a doctor",
      symptoms: "Symptoms",
      captureScreenshot: "Capture screenshot",
      moreThan: "More than ",
      restrictions: "Restrictions",
      responseTime: "Response time",
    },
  },
  es: {
    translation: {
      timeLeft: "Tiempo restante",
      goBack: "Volver",
      exam: "Examen",
      review: "Revisión",
      reviewed: "Revisado",
      toReview: "Por Revisar",
      user: "Usuario",
      password: "Contraseña",
      forgotPassword: "He olvidado mi contraseña",
      view: "Ver",
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
      diagnostic: "Diagnóstico",
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
      filterByReview: "Filtrar por Revisión",
      filterByState: "Filtrar por Estado",
      urgencyLevel: "Nivel de Urgencia: ",
      urgency: "Urgencia",
      otherFilters: "Otros Filtros",
      normal: "Normal",
      results: "Resultados",
      patient: "Paciente",
      date: "Fecha",
      from: "Desde",
      to: "Hasta",
      cancel: "Cancelar",
      add: "Agregar",
      fiducialPoints: "Puntos fiduciales",
      applyFilter: "Aplicar Filtros",
      folioSearch: "Buscar por Folio",
      es: "Español",
      en: "Inglés",
      folio: "Folio",
      validateMeasurements: "Validar mediciones",
      undoValidation: "Deshacer validación",
      analysis: "Análisis",
      accepted: "Aceptado",
      rejected: "Rechazado",
      confirmDelete: "Confirmar borrado",
      askBeforeDeleting: "Estas seguro/a de que quieres borrar",
      delete: "Eliminar",
      suggestedDiagnoses: "Diagnósticos sugeridos",
      newItem: "Nuevo item",
      submit: "Enviar",
      derivation: "Derivación",
      derivations: "Derivaciones",
      restore: "Restaurar",
      saveChanges: "Guardar cambios",
      values: "Valores",
      pathologiesPrediction: "Predicción de Patologías",
      comments: "Comentarios",
      commentsLabel: "Ingrese aquí sus comentarios",
      reason: "Motivo",
      change: "Cambiar",
      wrongCredentials: "Usuario o contraseña inválidos",
      examTimeRemaining: "restante",
      examTimeAgo: "atrás",
      days: "días",
      hours: "horas",
      minutes: "minutos",
      seconds: "segundos",
      diagnostic1: "Arritmia sinusal",
      diagnostic2: "Fibrilación auricular con respuesta ventricular adecuada",
      diagnostic3: "Fibrilación auricular con respuesta ventricular lenta",
      diagnostic4: "Fibrilación auricular con respuesta ventricular rápida",
      diagnostic5: "Flutter auricular con bloqueo AV variable",
      diagnostic6: "Extrasístole auricular conducido normalmente",
      diagnostic7: "Extrasístole auricular aislado",
      diagnostic8: "Extrasístole auricular conducido con aberrancia",
      diagnostic9: "Extrasístoles auriculares en salva",
      diagnostic10: "Extrasístole auricular bloqueado",
      diagnostic11: "Taquicardia paroxística supraventricular",
      diagnostic12: "Taquicardia supraventricular no especificada ¿paroxística?",
      diagnostic13: "Taquicardia supraventricular con conducción aberrante",
      diagnostic14: "Taquicardia auricular con bloqueo A-V 3:1",
      diagnostic15: "Extrasístole ventricular aislado",
      diagnostic16: "Extrasístoles ventriculares bigeminados",
      diagnostic17: "Extrasístoles ventriculares en pares-multifocales",
      diagnostic18: "Parasístole ventricular-nodal-auricular",
      diagnostic19: "Extrasístole de la unión AV con aberrancia",
      diagnostic20: "Complejos recíprocos (ecos)",
      diagnostic21: "Torsión de las puntas",
      diagnostic22: "Complejos de fusión",
      diagnostic23: "Fibrilación ventricular",
      diagnostic24: "Taquicardia ventricular sostenida monomórfica",
      diagnostic25: "Taquicardia ventricular autolimitada monomórfica",
      diagnostic26: "Taquicardia ventricular polimórfica",
      diagnostic27: "Disociación aurículo ventricular",
      diagnostic28: "Ritmo nodal acelerado",
      diagnostic29: "Paro sinusal",
      diagnostic30: "Bloqueo sinoauricular 3:1",
      diagnostic31: "Bloqueo aurículo-ventricular primer grado",
      diagnostic32: "Bloqueo AV de segundo grado, Mobitz I (Wenckebach)",
      diagnostic33: "Bloqueo AV de alto grado 3:1",
      diagnostic34: "Bloqueo aurículo-ventricular completo",
      diagnostic35: "Bloqueo incompleto de rama derecha",
      diagnostic36: "Bloqueo completo rama derecha",
      diagnostic37: "Bloqueo completo rama izquierda",
      diagnostic38: "Bloqueo intraventricular mal definido",
      diagnostic39: "Hemibloqueo izquierdo anterior",
      diagnostic40: "Hemibloqueo izquierdo posterior",
      diagnostic41: "ECG sugerente de Brugada",
      diagnostic42: "Reacción de aurícula derecha",
      diagnostic43: "Reacción de aurícula izquierda",
      diagnostic44: "Hipertrofia de ventrículo izquierdo por voltaje y alteraciones repolarización",
      diagnostic45: "Hipertrofia de ventrículo derecho",
      diagnostic46: "Crecimiento biauricular",
      diagnostic47: "Crecimiento biventricular",
      diagnostic48: "Ritmo de Marcapasos",
      diagnostic49: "No captura en forma constante",
      diagnostic50: "Estimulación auricular o coronaria",
      diagnostic51: "Estimulación ventricular de demanda",
      diagnostic52: "Estimulación secuencial (AV)",
      diagnostic53: "Estimulación ventricular, control completo",
      diagnostic54: "Marcapaso bicameral, sensado auricular",
      diagnostic55: "Disfunción de marcapaso: no sensa en forma constante",
      diagnostic56: "Disfunción de marcapaso: no descarga",
      diagnostic57: "Disfunción de marcapaso: lento",
      diagnostic58: "Ausencia de espigas",
      diagnostic59: "Ritmo auricular caótico",
      diagnostic60: "Pausas hasta de??seg",
      diagnostic61: "Bloqueo AV Mobitz II",
      diagnostic62: "Extrasístoles de la unión AV",
      diagnostic63: "Se sugiere control completo de función de MP",
      diagnostic64: "Isquemia pared anterior extensa",
      diagnostic65: "Isquemia anteroseptal.",
      diagnostic66: "Isquemia anterolateral.",
      diagnostic67: "Isquemia inferior.",
      diagnostic68: "Isquemia Lateral Alta",
      diagnostic69: "Taquicardia sinusal",
      diagnostic70: "Isquemia posterolateral",
      diagnostic71: "Infarto con supradesnivel del ST en pared anterior",
      diagnostic72: "Infarto con supradesnivel del ST en pared septal",
      diagnostic73: "Infarto con supradesnivel del ST en pared lateral",
      diagnostic74: "Infarto con supradesnivel del ST en pared inferolateral",
      diagnostic75: "Infarto con supradesnivel del ST en pared inferior",
      diagnostic76: "Infarto con supradesnivel del ST en pared anteroapical",
      diagnostic77: "Infarto en evolución de pared",
      diagnostic78: "Control en 30 minutos",
      diagnostic79: "Secuela de necrosis pared antero- apical (Q en V1-V2 a V4-V6).",
      diagnostic80: "Secuela de necrosis pared anterior extensa (Q en V1-V2 a V4-V6, aVL y a veces I",
      diagnostic81: "Secuela de necrosis pared inferior ( Q en D2, D3 y aVF)",
      diagnostic82: "Wolff Parkinson White",
      diagnostic83: "Complejos de escape de la unión AV",
      diagnostic84: "Ritmo acelerado de la unión AV",
      diagnostic85: "Ritmo de la unión AV",
      diagnostic86: "Disociación aurículo-ventricular",
      diagnostic87: "Ritmo idioventricular acelerado",
      diagnostic88: "Disociación isorrítmica",
      diagnostic89: "Intervalo QT corto",
      diagnostic90: "Intervalo QT prolongado",
      diagnostic91: "Flutter auricular con bloqueo AV 2:1",
      diagnostic92: "Hipertrofia de v. izquierdo por alt. repolarización",
      diagnostic93: "Lesión subendocárdica en pared anterior",
      diagnostic94: "Lesión subendocárdica en pared lateral",
      diagnostic95: "Lesión subendocárdica en pared inferior",
      diagnostic96: "Secuela de necrosis pared septal (q en V1 y V2)",
      diagnostic97: "Secuela de necrosis pared lateral (RS en V1-V2 y/o Q en aVL, V6 y/o R disminuida en V6.)",
      diagnostic98: "RS, PR corto, QRS normal",
      diagnostic99: "Migración de MP",
      diagnostic100: "Trazado normal",
      diagnostic101: "Trazado dentro de los límites normales",
      diagnostic102: "Ritmo sinusal",
      diagnostic103: "Conducción AV normal",
      diagnostic104: "Complejos normales para la edad",
      diagnostic105: "Complejos normales",
      diagnostic106: "Complejos normotópicos normales",
      diagnostic107: "Artefactos por línea de base fibrilada",
      diagnostic108: "Complejos ventriculares normales",
      diagnostic109: "Repetir",
      diagnostic110: "En comparación a trazado de",
      diagnostic111: "Cables Invertidos",
      diagnostic112: "Artefactos",
      diagnostic113: "Dextrocardia",
      diagnostic114: "Alteraciones inespecíficas de ST-T",
      diagnostic115: "Repolarización precoz (variante normal)",
      diagnostic116: "Ondas T juveniles (variante normal)",
      diagnostic117: "Alteraciones de ST-T sugerente de pericarditis aguda",
      diagnostic118: "Ondas T puntiagudas (descartar alteraciones electrolíticas o isquemia)",
      diagnostic119: "Ondas U prominentes (descartar alteraciones electrolíticas; o variante normal)",
      diagnostic120: "Voltaje disminuido sólo en derivaciones clásicas",
      diagnostic121: "Voltaje disminuido, en derivaciones clásicas y precordiales",
      diagnostic122: "Desviación del eje a la izquierda",
      diagnostic123: "Desviación del eje a la derecha",
      diagnostic124: "Voltaje disminuido solo en precordiales",
      diagnostic125: "Extrasístoles ventriculares monofocales con acoplamiento fijo",
      diagnostic126: "Extrasístoles ventriculares monofocales sin acoplamiento fijo",
      diagnostic127: "Monitoreo Ambulatorio de Presión Arterial en rango normal alto (cuando los valores promedio de 24 horas están 1-2 mmHg sobre 130/80 con valores diurnos y nocturnos dentro de rangos normales)",
      diagnostic128: "Hipertensión Arterial en Etapa 1",
      diagnostic129: "Hipertensión Arterial en Etapa 1 bajo tratamiento antihipertensivo",
      diagnostic130: "Hipertensión Arterial en Etapa 2",
      diagnostic131: "Monitoreo Ambulatorio de Presión Arterial en rango normal alto, bajo tratamiento antihipertensivo",
      diagnostic132: "Hipertensión Arterial en Etapa 2 bajo tratamiento antihipertensivo",
      diagnostic133: "Monitoreo Ambulatorio de Presión Arterial normal",
      diagnostic134: "Monitoreo Ambulatorio de Presión Arterial normal, bajo tratamiento antihipertensivo",
      diagnostic135: "Bradicardia Sinusal",
      diagnostic136: "Hipertrofia  ventricular izquierda sólo por criterios voltaje",
      diagnostic137: "Leves alteraciones inespecíficas de ST-T",
      diagnostic139: "Flutter auricular",
      diagnostic140: "Flutter auricular 2:1",
      diagnostic141: "Flutter auricular 3:1",
      diagnostic142: "Extrasístoles auriculares aislados",
      diagnostic143: "Taquicardia ventricular monomorfa",
      diagnostic144: "Taquicardia auricular con bloqueo A-V 2:1",
      diagnostic145: "Bloqueo sinoauricular 2:1",
      diagnostic146: "Bloqueo AV de alto grado 2:1",
      diagnostic147: "Extrasístoles ventriculares trigeminados",
      diagnostic148: "Extrasístoles ventriculares cuadrigeminados",
      diagnostic149: "Infarto con Supradesnivel de ST en Pared Anterior.",
      diagnostic150: "Ritmo sinusal, Conducción AV normal, Complejos normales",
      diagnostic404: "Diagnóstico no registrado en la BD",
      locked: "Bloqueado",
      male: "Masculino",
      female: "Femenino",
      yearsOld: "años",
      dayAgo: "Hace X día",
      hourAgo: "Hace X hora",
      minuteAgo: "Hace X minuto",
      daysAgo: "Hace X días",
      hoursAgo: "Hace X horas",
      minutesAgo: "Hace X minutos",
      day: "día",
      hour: "hora",
      minute: "minuto",
      validationMessage: "Examen validado con éxito",
      undoValidationMessage: "Validación del examen deshecha con éxito",
      position: "Posición",
      time: "Tiempo",
      rejectionReason1: "DERIVACION INCOMPLETA",
      rejectionReason2: "examenes mal tomados",
      rejectionReason3: "ARTEFACTOS POR LINEA BASE FIBRILADA",
      rejectionReason4: "ARTEFACTOS",
      rejectionReason5: "CABLES INVERTIDOS",
      rejectionReason6: "DERIVACION PLANA",
      rejectionReason7: "EXAMEN REPETIDO",
      rejectionReason8: "EXAMEN TOMADO EN MENOS DE 10 SEGUNDOS",
      rejectionReason9: "DATOS INCOMPLETOS",
      rejectionReason10: "DATOS ERRONEOS",
      rejectionReason11: "TRAZADO DIFUSO",
      admin: "Admin IA",
      medicalCenter: "Centro Médico",
      medicalCenterSearch: "Buscar por Centro Médico",
      activeTime: "Tiempo Activo",
      selectTime: "Seleccione tiempo",
      applyChanges: "Aplicar Cambios",
      apply: "Aplicar",
      examId: "Id del Examen",
      centerSelection: "Seleccione un centro",
      selectAll: "Seleccionar todos",
      allCentersSelected: "Están todos los centros seleccionados",
      allCentersActivated: "Están todos los centros activados",
      deactivateAIFirst: "Desactive la IA primero",
      modifyParams: "Modificar Parámetros",
      upperLimit: "Límite superior",
      lowerLimit: "Límite inferior",
      revertChanges: "Revertir cambios",
      confidence: "Confianza",
      append: "Añadir",
      modifyParameters: "Modificar Parámetros",
      accept: "Aceptar",
      reject: "Rechazar",
      unauthorized: "No estás autorizado para acceder a esta página.",
      backToMenu: "Volver al menú",
      background: "Antecedentes",
      sendToDoctor: "Enviar a doctor",
      close: "Cerrar",
      download: "Descargar",
      selectDoctor: "Seleccione un doctor",
      symptoms: "Síntomas",
      captureScreenshot: "Capturar screenshot",
      moreThan: "Mayor a ",
      restrictions: "Restricciones",
      responseTime: "Tiempo de respuesta",
    },
  },
};

// Initialize the i18n library
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "es", // Set the default language
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
