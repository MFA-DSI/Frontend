import React, {useState} from "react";
import {Input, Button, Form, Select, DatePicker} from "antd";
import moment from "moment";

export const ActivityDetailsForm = ({activity, setActivity}) => {
  const {description, observation, prediction, dueDatetime} = activity;

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
      <Form.Item label="Observation">
        <Input
          value={observation}
          onChange={(e) =>
            setActivity({...activity, observation: e.target.value})
          }
        />
      </Form.Item>
      <Form.Item label="Prédiction">
        <Input
          value={prediction}
          onChange={(e) =>
            setActivity({...activity, prediction: e.target.value})
          }
        />
      </Form.Item>
      <Form.Item label="Date d'échéance">
        <DatePicker
          value={dueDatetime ? moment(dueDatetime) : null}
          onChange={(date) => setActivity({...activity, dueDatetime: date})}
        />
      </Form.Item>
    </Form>
  );
};
export const TaskForm = ({tasks, setTasks}) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(null);

  const handleAddTask = () => {
    const newTask = {description: taskDescription, dueDatetime: taskDueDate};
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

export const NextTaskForm = ({nextTasks, setNextTasks}) => {
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

export const PerformanceIndicatorForm = ({
  performanceIndicators,
  setPerformanceIndicators,
}) => {
  const [indicators, setIndicators] = useState("");
  const [realization, setRealization] = useState("");
  const [realizationType, setRealizationType] = useState("number");
  const [errorMessage, setErrorMessage] = useState(""); // For validation error message

  const handleAddIndicator = () => {
    if (realizationType === "percentage" && realization > 100) {
      setErrorMessage(
        "La valeur ne doit pas dépasser 100% pour un pourcentage."
      );
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
      <Form.Item label="Type de Réalisation">
        <Select
          value={realizationType}
          onChange={(value) => setRealizationType(value)}
        >
          <Option value="number">Nombre</Option>
          <Option value="percentage">Pourcentage</Option>
        </Select>
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
        {errorMessage && <span style={{color: "red"}}>{errorMessage}</span>}
      </Form.Item>

      <Button
        type="primary"
        onClick={handleAddIndicator}
        disabled={!!errorMessage}
      >
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
