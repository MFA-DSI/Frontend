import React, { useState, useEffect } from "react";
import { Modal, Button, Input, InputNumber, Select, message } from "antd";
import "./assets/index.css";
import { useActivitiesContext } from "../../providers";
import { toast } from "react-toastify";

const { Option } = Select;

const PerformanceModal = ({
  visible,
  onCancel,
  onSave,
  performance,
  activityId,
}) => {
  const { addPerformance } = useActivitiesContext();
  const [realization, setRealization] = useState(performance?.realization || 0);
  const [indicator, setIndicator] = useState(performance?.indicators || "");
  const [realizationType, setRealizationType] = useState(
    performance?.realizationType || "chiffre",
  );

  const validateRealization = () => {
    if (realizationType === "pourcentage") {
      if (realization < 0 || realization > 100) {
        message.error("Le pourcentage doit être un nombre entre 0 et 100.");
        setRealization("");
        return false;
      }
    }
    return true;
  };

  const handleRealizationChange = (value) => {
    if (realizationType === "percentage" && value > 100) {
      message.error("Le pourcentage ne peut pas dépasser 100.");
      setRealization("");
    } else {
      setRealization(value);
    }
  };

  const handleSave = async () => {
    if (validateRealization()) {
      const performanceData = {
        id: activityId.id,
        performance: {
          indicators: realization,
          realization: indicator,
          realizationType: realizationType,
        },
      };

      try {
        console.log("performance: ", performanceData);

        await addPerformance(performanceData);

        onSave(performanceData);
        onCancel();
      } catch (error) {
        message.error(
          "Une erreur s'est produite lors de la modification de cette activité",
        );
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (performance && activityId) {
      setRealization(performance.realization);
      setIndicator(performance.indicators);
      setRealizationType(performance.realizationType === "number" ? "chiffre" : "pourcentage");
    }
  }, [performance, activityId]);

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <h2>
        {performance
          ? "Modifier l'indicateur de performance"
          : "Ajouter un indicateur de performance"}
      </h2>

      <div>
        <h3>Type de Réalisation:</h3>
        <Select
          value={realizationType}
          onChange={(value) => setRealizationType(value)}
          style={{ width: 200 }}
        >
          <Option value="chiffre">Chiffre</Option>
          <Option value="percentage">Pourcentage</Option>
        </Select>
      </div>

      <div style={{ marginTop: "16px" }}>
        <h3> Indicateurs:</h3>
        <Input
          value={indicator}
          onChange={(e) => setIndicator(e.target.value)}
          placeholder="Entrez un indicateur"
        />
      </div>

      <div style={{ marginTop: "16px" }}>
        <h3>Réalisation :</h3>
        <InputNumber
          value={realization}
          min={0}
          type="number"
          onChange={handleRealizationChange}
          placeholder={
            realizationType === "pourcentage"
              ? "Entrez un pourcentage (0-100)"
              : "Entrez une valeur"
          }
          style={{ width: "100%" }}
        />
      </div>
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={onCancel} style={{ marginRight: "8px" }}>
          Annuler
        </Button>
        <Button type="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
      </div>
    </Modal>
  );
};

export default PerformanceModal;
