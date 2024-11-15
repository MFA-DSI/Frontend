import React, { useEffect, useState } from "react";
import { Input, Button, Form, Select, DatePicker, message, ConfigProvider } from "antd";
import moment from "moment";
import frLocale from 'antd/locale/fr_FR';


export const ActivityDetailsForm = ({
  activity,
  setActivity,
  setActivityDetailsValid,
}) => {
  const [form] = Form.useForm();
  const { description, observation, prediction, dueDatetime } = activity;

  useEffect(() => {
    form
      .validateFields()
      .then(() => setActivityDetailsValid(true))
      .catch(() => setActivityDetailsValid(false));
  }, [description, dueDatetime]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Description de l'activité *"
        name="description"
        rules={[{ required: true, message: "La description est obligatoire" }]}
      >
        <Input
          value={description}
          onChange={(e) =>
            setActivity({ ...activity, description: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Observation" name="observation">
        <Input
          value={observation}
          onChange={(e) =>
            setActivity({ ...activity, observation: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Prédiction" name="prediction">
        <Input
          value={prediction}
          onChange={(e) =>
            setActivity({ ...activity, prediction: e.target.value })
          }
        />
      </Form.Item>
      <ConfigProvider locale={frLocale}>
      <Form.Item
        label="Date d'échéance *"
        name="dueDatetime"
        rules={[
          { required: true, message: "La date d'échéance est obligatoire" },
        ]}
      >
        <DatePicker
        locale="fr_FR"
          value={activity.dueDatetime ? moment(activity.dueDatetime) : null}
          onChange={(date) => setActivity({ ...activity, dueDatetime: date })}
          disabledDate={(current) => current && current.isBefore(moment(), 'day')}
        />
      </Form.Item>
    </ConfigProvider>

    </Form>
  );
};

export const TaskForm = ({ tasks, setTasks }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(null);

  const handleAddTask = () => {
    if (taskDescription.trim() === "") {
      message.error("La description de la tâche ne peut pas être vide.");
      return; // Empêche l'ajout de la tâche si la description est vide
    }

    if (taskDueDate === null) {
      message.error("La date limite ne peut pas être vide.");
      return; // Empêche l'ajout de la tâche si la date limite est null
    }
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
      
      <ConfigProvider locale={frLocale}>
      <Form.Item label="Date de la Tâche">
        <DatePicker
          value={taskDueDate}
          disabledDate={(current) => current && current.isBefore(moment(), 'day')}
          onChange={(date) => setTaskDueDate(date)}
        />
      </Form.Item>
      </ConfigProvider>
      <Button type="primary" onClick={handleAddTask}>
        Enregister cette Tâche
      </Button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.description} (fait :{" "}
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

export const NextTaskForm = ({ nextTasks, setNextTasks }) => {
  const [nextTaskDescription, setNextTaskDescription] = useState("");
  const [nextTaskDueDate, setNextTaskDueDate] = useState(null);

  const handleAddNextTask = () => {
    if (nextTaskDescription.trim() === "") {
      message.error(
        "La description de la prochaine tâche ne peut pas être vide.",
      );
      return; // Empêche l'ajout de la prochaine tâche si la description est vide
    }

    if (nextTaskDueDate === null) {
      message.error("La date limite ne peut pas être vide.");
      return; // Empêche l'ajout de la prochaine tâche si la date limite est null
    }
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

      <ConfigProvider locale={frLocale}>
      <Form.Item label="Date de la Tâche Prochaine">
        <DatePicker
          value={nextTaskDueDate}
          disabledDate={(current) => current && current.isBefore(moment(), 'day')}
          onChange={(date) => setNextTaskDueDate(date)}
        />
      </Form.Item>
      </ConfigProvider>
      <Button type="primary" onClick={handleAddNextTask}>
        Enregistrer cette Tâche Prochaine
      </Button>
      <ul>
        {nextTasks.map((nextTask, index) => (
          <li key={index}>
            {nextTask.description} (Prévu le :{" "}
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
    if (realization === "" || indicators === "" || realizationType === "") {
      message.error(
        "Veuillez vous assurer que toutes les valeurs sont renseignées.",
      );
      return;
    }
    if (realizationType === "percentage" && realization > 100) {
      setErrorMessage(
        "La valeur ne doit pas dépasser 100% pour un pourcentage.",
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
    setErrorMessage("");
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
                "La valeur ne doit pas dépasser 100% pour un pourcentage.",
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

      <Button
        type="primary"
        onClick={handleAddIndicator}
        disabled={!!errorMessage}
      >
        Enregistrer cette indicateur
      </Button>
      <ul>
        {performanceIndicators.map((indicator, index) => (
          <li key={index}>
            {indicator.indicators} - {indicator.realization} (
            {indicator.realizationType === "number" ? "nombre" : "pourcentage"})
          </li>
        ))}
      </ul>
    </Form>
  );
};

export const CombinedTaskForm = ({
  tasks,
  setTasks,
  nextTasks,
  setNextTasks,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "50vh",
        overflow: "auto",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: 1, marginRight: "10px" }}>
        <h2>Ajouter des tâches</h2>
        <TaskForm tasks={tasks} setTasks={setTasks} />
      </div>
      <div style={{ flex: 1, marginLeft: "10px" }}>
        <h2>Ajouter des prochaines tâches</h2>
        <NextTaskForm
          nextTasks={nextTasks}
          setNextTasks={setNextTasks}
          tasks={tasks}
        />
      </div>
    </div>
  );
};
