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

const { Step } = Steps;
const { Option } = Select;

const ActivityDetailsForm = ({ activity, setActivity }) => {
  const { description, observation, prediction, dueDatetime } = activity;

  return (
    <Form>
      <Form.Item label="Description de l'activité">
        <Input
          value={description}
          onChange={(e) =>
            setActivity({ ...activity, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Observation">
        <Input
          value={observation}
          onChange={(e) =>
            setActivity({ ...activity, observation: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Prédiction">
        <Input
          value={prediction}
          onChange={(e) =>
            setActivity({ ...activity, prediction: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Date d'échéance">
        <DatePicker
          value={dueDatetime ? moment(dueDatetime) : null}
          onChange={(date) =>
            setActivity({ ...activity, dueDatetime: date })
          }
        />
      </Form.Item>
    </Form>
  );
};

const TaskForm = ({ tasks, setTasks }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(null);

  const handleAddTask = () => {
    const newTask = { description: taskDescription, dueDatetime: taskDueDate };
    setTasks([...tasks, newTask]);
    setTaskDescription("");
    setTaskDueDate(null);
  };

  return (
    <Form>
      <Form.Item label="Description de la Tâche">
        <Input
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Date de la Tâche">
        <DatePicker
          value={taskDueDate}
          onChange={(date) => setTaskDueDate(date)}
        />
      </Form.Item>
      <Button type="primary" onClick={handleAddTask}>
        Ajouter une Tâche
      </Button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.description} (Due:{" "}
            {task.dueDatetime
              ? moment(task.dueDatetime).format("DD/MM/YYYY")
              : "N/A"}
            )
          </li>
        ))}
      </ul>
    </Form>
  );
};

const NextTaskForm = ({ nextTasks, setNextTasks }) => {
  const [nextTaskDescription, setNextTaskDescription] = useState("");
  const [nextTaskDueDate, setNextTaskDueDate] = useState(null);

  const handleAddNextTask = () => {
    const newNextTask = {
      description: nextTaskDescription,
      dueDatetime: nextTaskDueDate,
    };
    setNextTasks([...nextTasks, newNextTask]);
    setNextTaskDescription("");
    setNextTaskDueDate(null);
  };

  return (
    <Form>
      <Form.Item label="Description de la Tâche Prochaine">
        <Input
          value={nextTaskDescription}
          onChange={(e) => setNextTaskDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Date de la Tâche Prochaine">
        <DatePicker
          value={nextTaskDueDate}
          onChange={(date) => setNextTaskDueDate(date)}
        />
      </Form.Item>
      <Button type="primary" onClick={handleAddNextTask}>
        Ajouter une Tâche Prochaine
      </Button>
      <ul>
        {nextTasks.map((nextTask, index) => (
          <li key={index}>
            {nextTask.description} (Due:{" "}
            {nextTask.dueDatetime
              ? moment(nextTask.dueDatetime).format("DD/MM/YYYY")
              : "N/A"}
            )
          </li>
        ))}
      </ul>
    </Form>
  );
};

const PerformanceIndicatorForm = ({
  performanceIndicators,
  setPerformanceIndicators,
}) => {
  const [indicators, setIndicators] = useState("");
  const [realization, setRealization] = useState("");
  const [realizationType, setRealizationType] = useState("number");
  const [errorMessage, setErrorMessage] = useState(""); // For validation error message

  const handleAddIndicator = () => {
    if (realizationType === "percentage" && realization > 100) {
      setErrorMessage("La valeur ne doit pas dépasser 100% pour un pourcentage.");
      return;
    }
    const newIndicator = {
      indicators,
      realization,
      realizationType,
    };
    setPerformanceIndicators([...performanceIndicators, newIndicator]);
    setIndicators("");
    setRealization("");
    setErrorMessage(""); // Clear error after successful addition
  };

  return (
    <Form>
      <Form.Item label="Description de l'indicateur de performance">
        <Input
          value={indicators}
          onChange={(e) => setIndicators(e.target.value)}
          placeholder="Entrez la description"
        />
      </Form.Item>
      <Form.Item label="Réalisation">
        <Input
          value={realization}
          onChange={(e) => {
            setRealization(e.target.value);
            if (realizationType === "percentage" && e.target.value > 100) {
              setErrorMessage(
                "La valeur ne doit pas dépasser 100% pour un pourcentage."
              );
            } else {
              setErrorMessage("");
            }
          }}
          placeholder={
            realizationType === "percentage"
              ? "Entrez la réalisation (0-100%)"
              : "Entrez la réalisation (nombre)"
          }
          type="number"
          max={realizationType === "percentage" ? 100 : undefined} // Set max for percentage
        />
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      </Form.Item>
      <Form.Item label="Type de Réalisation">
        <Select
          value={realizationType}
          onChange={(value) => setRealizationType(value)}
        >
          <Option value="number">Nombre</Option>
          <Option value="percentage">Pourcentage</Option>
        </Select>
      </Form.Item>
      <Button type="primary" onClick={handleAddIndicator} disabled={!!errorMessage}>
        Ajouter un indicateur
      </Button>
      <ul>
        {performanceIndicators.map((indicator, index) => (
          <li key={index}>
            {indicator.indicators} - {indicator.realization} (
            {indicator.realizationType})
          </li>
        ))}
      </ul>
    </Form>
  );
};

const AddActivityModal = ({ visible, onCancel }) => {
  const { MissionNameByDirectionId, saveMission } = useMissionContext();
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
  const [mission, setMission] = useState();
  const [missionType, setMissionType] = useState("");
  const existingMissions = MissionNameByDirectionId;

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  const addAnotherActivity = () => {
    // Reset state for adding another activity
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
      name: missionType === "existing" ? selectedMission : newMissionDescription,
      activityList: [
        {
          description: activity.description,
          observation: activity.observation,
          prediction: activity.prediction,
          dueDatetime: activity.dueDatetime ? moment(activity.dueDatetime).format("YYYY-MM-DD") : null,
          task: tasks.map((task) => ({
            description: task.description,
            dueDatetime: task.dueDatetime ? moment(task.dueDatetime).format("YYYY-MM-DD") : null,
          })),
          nextTask: nextTasks.map((task) => ({
            description: task.description,
            dueDatetime: task.dueDatetime ? moment(task.dueDatetime).format("YYYY-MM-DD") : null,
          })),
          performanceRealization: performanceIndicators.map((indicator) => ({
            indicators: indicator.realization,
            realization: indicator.indicators,
          })),
        },
      ],
    };

    try {
      console.log("acaca"+activityData);
      
      await saveMission(activityData);
      message.success("Activité ajoutée avec succès !");
      setCurrentStep(0);} catch (error) {
        message.error("Erreur lors de l'ajout de l'activité.");
      } // Reset the stepper after successful submission
  };

  const steps = [
    {
      title: "Choix de la mission",
      content: (
        <Form>
          <Form.Item label="Type de mission">
            <Select
              value={missionType}
              onChange={(value) => {
                setMissionType(value);
                setSelectedMission(null); // Reset when type changes
                setNewMissionDescription(""); // Reset new mission description
              }}
              placeholder="Sélectionner un type de mission"
            >
              <Option value="existing">Mission existante</Option>
              <Option value="new">Nouvelle mission</Option>
            </Select>
          </Form.Item>

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

          {missionType === "new" && (
            <Form.Item label="Nouvelle mission">
              <Input
                value={newMissionDescription}
                onChange={(e) => setNewMissionDescription(e.target.value)}
                placeholder="Entrer la description de la nouvelle mission"
              />
            </Form.Item>
          )}
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
      content: <NextTaskForm nextTasks={nextTasks} setNextTasks={setNextTasks} />,
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
