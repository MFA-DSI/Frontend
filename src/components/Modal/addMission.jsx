import React, {useState} from "react";
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
import {useMissionContext} from "../../providers/context/MissionsContext";
import moment from "moment";

const {Step} = Steps;
const {Option} = Select;

const ActivityDetailsForm = ({activity, setActivity}) => {
  const {description, date} = activity;

  return (
    <Form>
      <Form.Item label="Description de l'activité">
        <Input
          value={description}
          onChange={(e) =>
            setActivity({...activity, description: e.target.value})
          }
        />
      </Form.Item>
      <Form.Item label="Date de l'activité">
        <DatePicker
          value={date}
          onChange={(date) => setActivity({...activity, date})}
        />
      </Form.Item>
    </Form>
  );
};

const TaskForm = ({tasks, setTasks}) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(null);

  const handleAddTask = () => {
    const newTask = {description: taskDescription, dueDate: taskDueDate};
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
            {task.dueDate ? task.dueDate.format("DD/MM/YYYY") : "N/A"})
          </li>
        ))}
      </ul>
    </Form>
  );
};

const NextTaskForm = ({nextTasks, setNextTasks}) => {
  const [nextTaskDescription, setNextTaskDescription] = useState("");
  const [nextTaskDueDate, setNextTaskDueDate] = useState(null);

  const handleAddNextTask = () => {
    const newNextTask = {
      description: nextTaskDescription,
      dueDate: nextTaskDueDate,
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
            {nextTaskDueDate ? nextTaskDueDate.format("DD/MM/YYYY") : "N/A"})
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
  const [indicatorDescription, setIndicatorDescription] = useState("");
  const [realizationType, setRealizationType] = useState("number"); // Default to number
  const [realizationValue, setRealizationValue] = useState("");

  const handleValueChange = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, "");
    setRealizationValue(numericValue);

    // Validate if the type is percentage
    if (realizationType === "percentage" && parseFloat(numericValue) > 100) {
      message.error("La valeur ne doit pas dépasser 100%.");
      setRealizationValue(""); // Clear the input if it exceeds 100
    }
  };

  const handleAddIndicator = () => {
    const newIndicator = {
      description: indicatorDescription,
      realizationType,
      realization: realizationValue,
    };
    setPerformanceIndicators([...performanceIndicators, newIndicator]);
    setIndicatorDescription("");
    setRealizationType("number");
    setRealizationValue("");
  };

  return (
    <Form>
      <Form.Item label="Description de l'indicateur de performance">
        <Input
          value={indicatorDescription}
          onChange={(e) => setIndicatorDescription(e.target.value)}
          placeholder="Entrez la description"
        />
      </Form.Item>
      <Form.Item label="Type de réalisation">
        <Select value={realizationType} onChange={setRealizationType}>
          <Option value="number">Chiffre</Option>
          <Option value="percentage">Pourcentage</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Réalisation">
        <Input
          value={realizationValue}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={
            realizationType === "number"
              ? "Entrez un chiffre"
              : "Entrez un pourcentage"
          }
        />
      </Form.Item>
      <Button type="primary" onClick={handleAddIndicator}>
        Ajouter un indicateur
      </Button>
      <ul>
        {performanceIndicators.map((indicator, index) => (
          <li key={index}>
            {indicator.description} - {indicator.realization} (
            {indicator.realizationType === "percentage" ? "%" : ""})
          </li>
        ))}
      </ul>
    </Form>
  );
};

const AddActivityModal = ({visible, onCancel}) => {
  const {MissionNameByDirectionId,saveMission
  } = useMissionContext();
  const [currentStep, setCurrentStep] = useState(0);

  const [activity, setActivity] = useState({description: "", date: null});
  const [tasks, setTasks] = useState([]);
  const [nextTasks, setNextTasks] = useState([]);
  const [performanceIndicators, setPerformanceIndicators] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [newMissionDescription, setNewMissionDescription] = useState("");
  const [mission, setMission] = useState();

  const existingMissions = MissionNameByDirectionId;

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  const addAnotherActivity = () => {
    // Reset state for adding another activity
    setActivity({description: "", date: null});
    setTasks([]);
    setNextTasks([]);
    setPerformanceIndicators([]);
    setCurrentStep(0); // Go back to the first step
  };

  const handleSubmit = async () => {
    const activityData = {
      ...activity,
      id: mission,
      name:
        selectedMission === "new"
          ? newMissionDescription
          : existingMissions.find((e) => e.id === mission)?.description,
      activityList: [
        {
          description: activity.description,
          date: activity.date
            ? moment(activity.date).format("DD-MM-YYYY")
            : null,
          tasks,
          nextTasks,
          performanceIndicators,
        },
      ],
    };
    try {
      console.log(activityData);
      
      await saveMission(activityData); 

      addAnotherActivity();
      onCancel();
    } catch (error) {
      console.error("Error saving mission: ", error);
      toast.error("Failed to save the mission. Please try again."); // Notify the user of the error
    }
  };

  const steps = [
    {
      title: "Sélectionner la Mission",
      content: (
        <Form>
          <Form.Item label="Mission">
            <Select
              value={selectedMission}
              onChange={setSelectedMission}
              placeholder="Sélectionnez une mission"
            >
              <Option value="existing">Mission Existante</Option>
              <Option value="new">Nouvelle Mission</Option>
            </Select>
          </Form.Item>
          {selectedMission === "new" && (
            <Form.Item label="Description de la Mission">
              <Input
                onChange={(e) => setNewMissionDescription(e.target.value)}
              />
            </Form.Item>
          )}
          {selectedMission === "existing" && (
            <Form.Item label="Sélectionner une Mission Existante">
              <Select
                placeholder="Choisissez une mission existante"
                onChange={(e) => setMission(e)}
              >
                {existingMissions.map((mission) => (
                  <Option key={mission.id} value={mission.id}>
                    {mission.description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <ActivityDetailsForm activity={activity} setActivity={setActivity} />
          <Button
            type="primary"
            onClick={next}
            disabled={
              !selectedMission || !activity.description || !activity.date
            }
          >
            Suivant
          </Button>
        </Form>
      ),
    },
    {
      title: "Ajouter des Tâches",
      content: (
        <>
          <TaskForm tasks={tasks} setTasks={setTasks} />
          <Button type="primary" onClick={next} style={{marginTop: 16}}>
            Suivant
          </Button>
          <Button onClick={prev} style={{marginTop: 16, marginLeft: 8}}>
            Précédent
          </Button>
        </>
      ),
    },
    {
      title: "Ajouter des Tâches Prochaines",
      content: (
        <>
          <NextTaskForm nextTasks={nextTasks} setNextTasks={setNextTasks} />
          <Button type="primary" onClick={next} style={{marginTop: 16}}>
            Suivant
          </Button>
          <Button onClick={prev} style={{marginTop: 16, marginLeft: 8}}>
            Précédent
          </Button>
        </>
      ),
    },
    {
      title: "Indicateurs de Performance",
      content: (
        <>
          <PerformanceIndicatorForm
            performanceIndicators={performanceIndicators}
            setPerformanceIndicators={setPerformanceIndicators}
          />
          <Button onClick={prev} style={{marginRight: 8}}>
            Précédent
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Soumettre
          </Button>
        </>
      ),
    },
  ];

  return (
    <Modal
      title="Ajouter une Activité"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{marginTop: 20}}>{steps[currentStep].content}</div>
      {currentStep === 3 && (
        <Button
          type="default"
          onClick={addAnotherActivity}
          style={{marginTop: 16}}
        >
          Ajouter une autre activité
        </Button>
      )}
    </Modal>
  );
};

export default AddActivityModal;
