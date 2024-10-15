// Liste des types de personnel
export const personnelOptions = [
  { value: "Gendarme", label: "Gendarme" },
  { value: "Militaire", label: "Militaire" },
  { value: "PC", label: "Personnel Civil" },
];


export const gendarmeGrades = [
  "GDA",   // Général d'Armée
  "GCA",   // Général de Corps d'Armée
  "GDI",   // Général de Division
  "GBR",   // Général de Brigade
  "COL",   // Colonel
  "LCL",   // Lieutenant-Colonel
  "CDT",   // Commandant
  "CNE",   // Capitaine
  "LTN",   // Lieutenant
  "SLT",   // Sous-Lieutenant
  "GPCE",  // Gendarme Principal de Classe Exceptionnelle
  "GPHC",  // Gendarme Principal Hors Classe
  "GP1C",  // Gendarme Principal 1° Classe
  "GP2C",  // Gendarme Principal 2° Classe
  "GHC",   // Gendarme Hors Classe
  "G1C",   // Gendarme de 1° Classe
  "G2C",   // Gendarme de 2° Classe
  "GST",
  
];

export const militaireGrades = [
  // Grades militaires supérieurs
  "GDA",   // Général d'Armée
  "GCA",   // Général de Corps d'Armée
  "GDI",   // Général de Division
  "GBR",   // Général de Brigade
  "COL",   // Colonel
  "LCL",   // Lieutenant-Colonel
  "CDT",   // Commandant
  "CNE",   // Capitaine
  "LTN",   // Lieutenant
  "SLT",   // Sous-Lieutenant

  // Grades sous-officiers militaires
  "ADM",   // Adjudant-Major
  "ADC",   // Adjudant-Chef
  "ADJ",   // Adjudant
  "SGM",   // Sergent-Major
  "SGC",   // Sergent-Chef
  "SGT",   // Sergent

  // Grades subalternes militaires
  "CAC",   // Caporal-Chef
  "CAL",   // Caporal
  "S1C",   // Soldat de 1° Classe
  "S2C",   // Soldat de 2° Classe

  // Grades de la Marine
  "AMIRAL", // Amiral
  "VAE",    // Vice-Amiral d'Escadre
  "VAM",    // Vice-Amiral
  "CAM",    // Contre-Amiral
  "CVA",    // Capitaine de Vaisseau
  "CFR",    // Capitaine de Frégate
  "CCO",    // Capitaine de Corvette
  "LTV",    // Lieutenant de Vaisseau
  "EV1",    // Enseigne de Vaisseau de 1° Classe
  "EV2",    // Enseigne de Vaisseau de 2° Classe
  "MAP",    // Maître Principal
  "PMA",    // Premier Maître
  "PM",     // Maître
  "SMAC",   // Second Maître Hors Classe
  "SM1",    // Second Maître de 1° Classe
  "SM2",    // Second Maître de 2° Classe
  "QM1",    // Quartier-Maître de 1° Classe
  "QM2",    // Quartier-Maître de 2° Classe
  "MO1",    // Matelot de 1° Classe
  "MO2"     // Matelot de 2° Classe
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
