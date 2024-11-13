// Liste des types de personnel
export const personnelOptions = [
  { value: "Gendarme", label: "Gendarme" },
  { value: "Militaire", label: "Militaire" },
  { value: "PC", label: "Personnel Civil" },
];

export const gendarmeGrades = [
  "GDA", // Général d'Armée
  "GCA", // Général de Corps d'Armée
  "GDI", // Général de Division
  "GBR", // Général de Brigade
  "COL", // Colonel
  "LCL", // Lieutenant-Colonel
  "CDT", // Commandant
  "CNE", // Capitaine
  "LTN", // Lieutenant
  "SLT", // Sous-Lieutenant
  "GPCE", // Gendarme Principal de Classe Exceptionnelle
  "GPHC", // Gendarme Principal Hors Classe
  "GP1C", // Gendarme Principal 1° Classe
  "GP2C", // Gendarme Principal 2° Classe
  "GHC", // Gendarme Hors Classe
  "G1C", // Gendarme de 1° Classe
  "G2C", // Gendarme de 2° Classe
  "GST",
];

export const militaireGrades = [
  // Grades militaires supérieurs
  "GDA", // Général d'Armée
  "GCA", // Général de Corps d'Armée
  "GDI", // Général de Division
  "GBR", // Général de Brigade
  "COL", // Colonel
  "LCL", // Lieutenant-Colonel
  "CDT", // Commandant
  "CNE", // Capitaine
  "LTN", // Lieutenant
  "SLT", // Sous-Lieutenant

  // Grades sous-officiers militaires
  "ADM", // Adjudant-Major
  "ADC", // Adjudant-Chef
  "ADJ", // Adjudant
  "SGM", // Sergent-Major
  "SGC", // Sergent-Chef
  "SGT", // Sergent

  // Grades subalternes militaires
  "CAC", // Caporal-Chef
  "CAL", // Caporal
  "S1C", // Soldat de 1° Classe
  "S2C", // Soldat de 2° Classe
];

// Fonction pour obtenir le grade en fonction du type de personnel
export const Grade = (personnelType) => {
  switch (personnelType) {
    case "Gendarme":
      return gendarmeGrades;
    case "Militaire":
      return militaireGrades;
    default:
      return [];
  }
};
