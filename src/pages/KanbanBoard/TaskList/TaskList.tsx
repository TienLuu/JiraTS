import TaskItem from "./TaskItem/TaskItem";
import { Droppable } from "react-beautiful-dnd";
import { StyledTaskList } from "./Styles";

interface IProps {
   taskList: any;
}

const TaskList = ({ taskList }: IProps) => {
   return (
      <Droppable droppableId={taskList?.statusId || "w1"}>
         {(provider) => (
            <StyledTaskList
               {...provider.droppableProps}
               ref={provider.innerRef}
            >
               {taskList?.lstTaskDeTail.map((task: any, index: any) => (
                  <TaskItem key={task.taskId} task={task} index={index} />
               ))}
               {provider.placeholder}
            </StyledTaskList>
         )}
      </Droppable>
   );
};

export default TaskList;
