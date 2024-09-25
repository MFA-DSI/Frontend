import {Button} from "antd";
import react from "react";
import {dateFormatter} from "../utils/dateFormatter";

export const TaskList = ({
  title,
  tasks,
  isEditing,
  mode,
  openTaskModal,
  type,
}) => {
  return (
    <div>
      <h3>{title}:</h3>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <p key={task.id}>
            - {task.description} (Effectué le :{" "}
            {dateFormatter(task.dueDatetime).toLocaleString()})
            {mode === "mydirection" && !isEditing && (
              <Button type="link" onClick={() => openTaskModal(task, type)}>
                Modifier
              </Button>
            )}
          </p>
        ))
      ) : (
        <p>Aucune tâche</p>
      )}
      {mode === "mydirection" && !isEditing && (
        <Button type="dashed" onClick={() => openTaskModal(null, type)}>
          + Ajouter {type === "task" ? "une tâche" : "une tâche prochaine"}
        </Button>
      )}
    </div>
  );
};
