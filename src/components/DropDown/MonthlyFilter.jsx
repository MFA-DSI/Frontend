import { Select } from "antd";
const { Option } = Select;

export const MonthlyFilters = ({ dateFilter, setDateFilter, style }) => {
  const handleYearChange = (value) => {
    // Mettre à jour l'année et réinitialiser le mois
    setDateFilter({ year: value, month: null });
  };

  const handleMonthChange = (value) => {
    // Mettre à jour uniquement le mois
    setDateFilter({ ...dateFilter, month: value });
  };

  return (
    <>
      <Select
        placeholder="Année"
        style={style}
        value={dateFilter.year || undefined} // Permet d'afficher la valeur actuelle ou le placeholder
        onChange={handleYearChange}
      >
        <Option value="2023">2023</Option>
        <Option value="2024">2024</Option>
      </Select>

      <Select
        placeholder="Mois"
        style={style}
        value={dateFilter.month !== null ? dateFilter.month : undefined} // Affiche le placeholder si le mois est null
        onChange={handleMonthChange}
        disabled={!dateFilter.year} // Désactiver si aucune année n'est sélectionnée
      >
        {Array.from({ length: 12 }, (_, index) => (
          <Option key={index} value={index}>
            {new Date(0, index).toLocaleString("fr-FR", { month: "long" })}
          </Option>
        ))}
      </Select>
    </>
  );
};
