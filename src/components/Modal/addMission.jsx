import React, { useState } from "react";
import {
  Modal,
  Input,
  Button,
  Form,
  Steps,
  Select,
  DatePicker,
  message,
  Badge,
  AutoComplete,
} from "antd";
import { useMissionContext } from "../../providers/context/MissionsContext";
import moment from "moment";
import {
  ActivityDetailsForm,
  CombinedTaskForm,
  NextTaskForm,
  PerformanceIndicatorForm,
  TaskForm,
} from "./Forms/MissionDetailsForm";
import { useDirectionsContext } from "../../providers";

const { Step } = Steps;
const { Option } = Select;

const AddActivityModal = ({ visible, onCancel }) => {
  const { MissionNameByDirectionId, saveMission } = useMissionContext();
  const { fetchAllService, isLoading } = useDirectionsContext();
  const [currentStep, setCurrentStep] = useState(0);

  const [activity, setActivity] = useState({
    description: "",
    observation: "",
    prediction: "",
    dueDatetime: null,
  });
  const [tasks, setTasks] = useState([]);
  const [nextTasks, setNextTasks] = useState([]);
  const [performanceIndicators, setPerformanceIndicators] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [newMissionDescription, setNewMissionDescription] = useState("");
  const [selectedServices, setSelectedServices] = useState(null);
  const [missionType, setMissionType] = useState("");
  const [activityDetailsValid, setActivityDetailsValid] = useState(false);
  const existingMissions = MissionNameByDirectionId;
  const existingService = fetchAllService;

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  const addAnotherActivity = () => {
    setActivity((prevActivityList) => [
      ...prevActivityList,
      {
        description: activity.description,
        observation: activity.observation,
        prediction: activity.prediction,
        dueDatetime: activity.dueDatetime
          ? moment(activity.dueDatetime).format("YYYY-MM-DD")
          : null,
        task: tasks.map((task) => ({
          description: task.description,
          dueDatetime: task.dueDatetime
            ? moment(task.dueDatetime).format("YYYY-MM-DD")
            : null,
        })),
        nextTask: nextTasks.map((task) => ({
          description: task.description,
          dueDatetime: task.dueDatetime
            ? moment(task.dueDatetime).format("YYYY-MM-DD")
            : null,
        })),
        performanceRealization: performanceIndicators.map((indicator) => ({
          indicators: indicator.indicators,
          realization: indicator.realization,
          realizationType: indicator.realizationType,
        })),
      },
    ]);
  };

  const resetActivity = () => {
    setNewMissionDescription("");
    setSelectedMission(null);
    setMissionType("");
    setSelectedServices([]);
    setActivity({
      description: "",
      observation: "",
      prediction: "",
      dueDatetime: null,
    });
    setTasks([]);
    setNextTasks([]);
    setPerformanceIndicators([]);
    setCurrentStep(0); // Go back to the first step
  };

  const handleSubmit = async () => {
    const activityData = {
      id: selectedMission?.id,
      name:
        missionType === "existing"
          ? selectedMission.description
          : newMissionDescription,
      serviceId: selectedServices,
      activityList: [
        {
          description: activity.description,
          observation: activity.observation,
          prediction: activity.prediction,
          dueDatetime: activity.dueDatetime
            ? moment(activity.dueDatetime).format("YYYY-MM-DD")
            : null,
          task: tasks.map((task) => ({
            description: task.description,
            dueDatetime: task.dueDatetime
              ? moment(task.dueDatetime).format("YYYY-MM-DD")
              : null,
          })),
          nextTask: nextTasks.map((task) => ({
            description: task.description,
            dueDatetime: task.dueDatetime
              ? moment(task.dueDatetime).format("YYYY-MM-DD")
              : null,
          })),
          performanceRealization: performanceIndicators.map((indicator) => ({
            indicators: indicator.realization,
            realization: indicator.indicators,
            realizationType: indicator.realizationType,
          })),
        },
      ],
    };

    try {
      await saveMission(activityData);
      message.success("Activité ajoutée avec succès !");
      resetActivity();
      onCancel();
      setCurrentStep(0);
    } catch (error) {
      message.error("Erreur lors de l'ajout de l'activité.");
    }
  };

  const steps = [
    {
      title: "Choix de la mission et des services",
      content: (
        <Form>
          <Form.Item label="Type de mission">
            <Select
              value={missionType}
              onChange={(value) => {
                setMissionType(value);
                setSelectedMission(null);
                setNewMissionDescription("");
              }}
              placeholder="Sélectionner un type de mission"
            >
              <Option value="existing">Mission existante</Option>
              <Option value="new">Nouvelle mission</Option>
            </Select>
          </Form.Item>

          {/* Sélectionner une mission si existante */}
          {missionType === "existing" && (
            <Form.Item label="Sélectionner une mission">
              <AutoComplete
                value={selectedMission ? selectedMission.description : ""} // Affiche la description de la mission
                onChange={(value) => {
                  // Cherche la mission correspondante par description et met à jour l'état avec l'ID
                  const selected = existingMissions?.find(
                    (mission) => mission.description === value,
                  );
                  if (selected) {
                    setSelectedMission(selected); // Met à jour l'ID de la mission sélectionnée
                    setSelectedServices(selected.service.id); // Met à jour l'ID de la mission sélectionnée
                  }
                }}
                placeholder="Sélectionner une mission existante"
                options={
                  !isLoading
                    ? existingMissions.map((mission) => ({
                        key: mission.id,
                        value: mission.description, // Affiche la description dans l'input
                        label: (
                          <>
                            {mission.description}
                            <Badge
                              count={mission.service.name}
                              style={{
                                backgroundColor: "#52c41a", // Couleur du badge
                                marginLeft: "8px", // Espace entre la description et le badge
                              }}
                            />
                          </>
                        ),
                      }))
                    : []
                }
                filterOption={
                  (inputValue, option) =>
                    option.value
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) // Filtrage par description
                }
              />
            </Form.Item>
          )}

          {/* Description de la nouvelle mission */}
          {missionType === "new" && (
            <Form.Item label="Nouvelle mission">
              <Input
                value={newMissionDescription}
                onChange={(e) => setNewMissionDescription(e.target.value)}
                placeholder="Entrer la description de la nouvelle mission"
              />
            </Form.Item>
          )}

          {/* Sélection des services rattachés */}

          {missionType !== "existing" && (
            <Form.Item label="Services rattachés">
              <Select
                value={selectedServices}
                onChange={(value) => {
                  console.log(value);

                  setSelectedServices(value);
                }}
                placeholder="Sélectionner les services rattachés"
              >
                {!isLoading &&
                  existingService.map((service) => (
                    <Option key={service.id} value={service.id}>
                      {service.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      ),
    },
    {
      title: "Informations sur l'activité",
      content: (
        <ActivityDetailsForm activity={activity} setActivity={setActivity} setActivityDetailsValid={setActivityDetailsValid}/>
      ),
    },
    {
      title: "Ajouter des tâches",
      content: (
        <CombinedTaskForm
          tasks={tasks}
          setTasks={setTasks}
          nextTasks={nextTasks}
          setNextTasks={setNextTasks}
        />
      ),
    },
    {
      title: "Indicateurs de performance",
      content: (
        <PerformanceIndicatorForm
          performanceIndicators={performanceIndicators}
          setPerformanceIndicators={setPerformanceIndicators}
        />
      ),
    },
  ];

  return (
    <Modal
      title="Ajouter une activité"
      visible={visible}
      onCancel={onCancel}
      width={900}
      footer={[
        currentStep < steps.length - 1 && (
          <Button
            key="next"
            type="primary"
            onClick={next}
            disabled={currentStep === 1 && !activityDetailsValid} // Désactive "Suivant" si les champs obligatoires ne sont pas remplis
          >
            Suivant
          </Button>
        ),
        currentStep > 0 && (
          <Button key="prev" onClick={prev}>
            Précédent
          </Button>
        ),
        currentStep === steps.length - 1 && (
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Valider
          </Button>
        ),
      ]}
    >
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
    </Modal>
  );
};

export default AddActivityModal;
