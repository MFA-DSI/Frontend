// Liste des types de personnel
export const personnelOptions = [
  { value: "Gendarme", label: "Gendarme" },
  { value: "Militaire", label: "Militaire" },
  { value: "PC", label: "Personnel Civil" },
];

// Liste des grades pour les gendarmes
export const gendarmeGrades = [
  "Gendarme Adjoint Volontaire",
  "Gendarme",
  "Maréchal des logis",
  "Maréchal des logis-chef",
  "Adjudant",
  "Adjudant-chef",
  "Major",
  "Lieutenant",
  "Capitaine",
  "Commandant",
  "Lieutenant-Colonel",
  "Colonel",
];

// Liste des grades pour les militaires
export const militaireGrades = [
  "Soldat",
  "Caporal",
  "Caporal-chef",
  "Sergent",
  "Sergent-chef",
  "Adjudant",
  "Adjudant-chef",
  "Major",
  "Lieutenant",
  "Capitaine",
  "Commandant",
  "Lieutenant-Colonel",
  "Colonel",
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
