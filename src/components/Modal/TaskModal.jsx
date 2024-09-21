import React, {useState, useEffect} from "react";
import {Modal, Input, DatePicker,message} from "antd";
import moment from "moment";
import { useActivitiesContext } from "../../providers";
import { toast } from "react-toastify";

const TaskModal = ({visible, onCancel, task, onSave, title, type,activityId}) => {
  const { addTaskToActivty } = useActivitiesContext(); 
  const [taskToEdit, setTaskEdit] = useState({
    id: "",
    description: "",
    dueDatetime: null,
  });
  const [activity,setActivity] = useState("")


  const updateTask = (property, value) => {
    setTaskEdit((prevTask) => ({
      ...prevTask,
      [property]: value,
    }));
  };

  useEffect(() => {
    
    if (task && activityId) {
      setTaskEdit({
        id: task.id || "",
        description: task.description || "",
        dueDatetime: task.dueDatetime ? moment(task.dueDatetime) : null,
      });
      setActivity(activityId)
    } else {
      setTaskEdit({id: "", description: "", dueDatetime: null});
      setActivity("")
    }
  }, [task,activityId]);

  const handleSave = async () => {
   
    const updateTask = {
      ...taskToEdit,
      dueDatetime: taskToEdit.dueDatetime ? taskToEdit.dueDatetime.toISOString() : null,
      description : taskToEdit.description
    };
    
    try {

      const Task = {
        id : activityId.id,
        task : updateTask
      }
       
      await addTaskToActivty(Task)
      onSave()
      message.success("Tâche modifié avec succès !");
    } catch (error) {
      message.error(
        "Une erreur s'est produite lors de la modification de cette activité"
      );
      toast.error(error.message);
    }
  
  };

  return (
    <Modal
      title={task ? `Modifier la ${title}` : `Ajouter une ${title}`}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSave}
      okText={task ? "Sauvegarder" : "Ajouter"}
      cancelText="Annuler"
    >
      <div>
        <h3>Description:</h3>
        <Input
          value={taskToEdit.description}
          onChange={(e) => updateTask("description", e.target.value)}
          placeholder={`Description de la ${title}`}
        />
      </div>
      <div>
        <h3>Date Limite:</h3>
        <DatePicker
          value={taskToEdit.dueDatetime}
          onChange={(date) => updateTask("dueDatetime", date)}
          placeholder="Date limite"
        />
      </div>
    </Modal>
  );
};

export default TaskModal;
