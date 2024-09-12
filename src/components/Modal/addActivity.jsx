import React, {useState, useEffect} from "react";
import {Modal, Input, Button, Form, Steps, Select, DatePicker} from "antd";

const {Step} = Steps;
const {Option} = Select;

const AddActivityModal = ({visible, onCancel}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activityDescription, setActivityDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [nextTasks, setNextTasks] = useState([]);
  const [performanceIndicators, setPerformanceIndicators] = useState("");
  const [selectedMission, setSelectedMission] = useState(null);
  const [newMissionDescription, setNewMissionDescription] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [nextTaskDescription, setNextTaskDescription] = useState("");
  const [nextTaskDueDate, setNextTaskDueDate] = useState(null);

  const existingMissions = [
    // Example existing missions
    {id: 1, description: "Mission A"},
    {id: 2, description: "Mission B"},
    {id: 3, description: "Mission C"},
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddTask = () => {
    const task = {
      description: taskDescription,
      dueDate: taskDueDate,
    };
    setTasks([...tasks, task]);
    setTaskDescription(""); // Clear input
    setTaskDueDate(null); // Clear date picker
  };

  const handleAddNextTask = () => {
    const nextTask = {
      description: nextTaskDescription,
      dueDate: nextTaskDueDate,
    };
    setNextTasks([...nextTasks, nextTask]);
    setNextTaskDescription(""); // Clear input
    setNextTaskDueDate(null); // Clear date picker
  };

  const handleSubmit = () => {
    // Logic to submit the activity data
    const activityData = {
      description: activityDescription,
      mission:
        selectedMission === "new" ? newMissionDescription : selectedMission,
      tasks,
      nextTasks,
      performanceIndicators,
    };
    console.log("Activity Submitted: ", activityData);
    onCancel(); // Close the modal after submission
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
                value={newMissionDescription}
                onChange={(e) => setNewMissionDescription(e.target.value)}
              />
            </Form.Item>
          )}
          {selectedMission === "existing" && (
            <Form.Item label="Sélectionner une Mission Existante">
              <Select
                placeholder="Choisissez une mission existante"
                onChange={(value) => setSelectedMission(value)}
              >
                {existingMissions.map((mission) => (
                  <Option key={mission.id} value={mission.description}>
                    {mission.description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item label="Date de l'activité">
            <DatePicker
              value={nextTaskDueDate}
              onChange={(date) => setNextTaskDueDate(date)}
            />
          </Form.Item>
          <Button type="primary" onClick={next} disabled={!selectedMission}>
            Suivant
          </Button>
        </Form>
      ),
    },
    {
      title: "Ajouter des Tâches",
      content: (
        <div>
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
            <Button onClick={prev} style={{marginRight: 8}}>
              Précédent
            </Button>
            <Button type="primary" onClick={next}>
              Suivant
            </Button>
          </Form>
        </div>
      ),
    },
    {
      title: "Ajouter des Tâches Prochaines",
      content: (
        <div>
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
                  {nextTask.dueDate
                    ? nextTask.dueDate.format("DD/MM/YYYY")
                    : "N/A"}
                  )
                </li>
              ))}
            </ul>
            <Button onClick={prev} style={{marginRight: 8}}>
              Précédent
            </Button>
            <Button type="primary" onClick={next}>
              Suivant
            </Button>
          </Form>
        </div>
      ),
    },
    {
      title: "Indicateurs de Performance",
      content: (
        <Form>
          <Form.Item label="Indicateurs de Performance">
            <Input
              value={performanceIndicators}
              onChange={(e) => setPerformanceIndicators(e.target.value)}
            />
          </Form.Item>
          <Button onClick={prev} style={{marginRight: 8}}>
            Précédent
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Soumettre
          </Button>
        </Form>
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
    </Modal>
  );
};

export default AddActivityModal;
