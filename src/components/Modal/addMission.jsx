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
} from "antd";
import { useMissionContext } from "../../providers/context/MissionsContext";
import moment from "moment";
import {
  ActivityDetailsForm,
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
  const [selectedServices, setSelectedServices] = useState([]);
  const [missionType, setMissionType] = useState("");
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
      name:
        missionType === "existing" ? selectedMission : newMissionDescription,
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
          {/* Sélection du type de mission */}
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
              <Select
                value={selectedMission}
                onChange={(value) => setSelectedMission(value)}
                placeholder="Sélectionner une mission existante"
              >
                {existingMissions?.map((mission) => (
                  <Option key={mission.id} value={mission.description}>
                    {mission.description}
                  </Option>
                ))}
              </Select>
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
          <Form.Item label="Services rattachés">
            <Select
              value={selectedServices}
              onChange={(value) => setSelectedServices(value)}
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
        </Form>
      ),
    },
    {
      title: "Informations sur l'activité",
      content: (
        <ActivityDetailsForm activity={activity} setActivity={setActivity} />
      ),
    },
    {
      title: "Ajouter des tâches",
      content: <TaskForm tasks={tasks} setTasks={setTasks} />,
    },
    {
      title: "Ajouter des prochaines tâches",
      content: (
        <NextTaskForm nextTasks={nextTasks} setNextTasks={setNextTasks} tasks={tasks} />
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
      footer={[
        currentStep < steps.length - 1 && (
          <Button key="next" type="primary" onClick={next}>
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
