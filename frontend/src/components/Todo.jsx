import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaCheck } from "react-icons/fa";

const Todo = ({ todo, id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [completed, setCompleted] = useState(todo.completed);
  const [isHovered, setIsHovered] = useState(false);
  const handleDeleteTodo = () => {
    axios
      .delete(`http://localhost:5555/${id}`)
      .then(() => {
        enqueueSnackbar("Todo deleted successfully", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleToggleCompleted = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    axios
      .put(`http://localhost:5555/${id}`, { id, completed: newCompleted })
      .then(() => {
        enqueueSnackbar("Todo updated successfully", { variant: "success" });
      })
      .catch((error) => {
        setCompleted(!newCompleted);
        enqueueSnackbar("Error updating todo", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-4 flex items-center border-b border-Very-Light-Grayish-Blue dark:border-dark-line cursor-pointer"
    >
      {completed ? (
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-Check-bg1 to-Check-bg2 cursor-pointer"
          onClick={handleToggleCompleted}
        >
          <FaCheck className="text-Very-Light-Gray" />
        </div>
      ) : (
        <div
          className="w-8 h-8 rounded-full border-2 border-Very-Light-Grayish-Blue dark:border-dark-circle cursor-pointer hover:border-Check-bg2 dark:hover:border-Check-bg2 "
          onClick={handleToggleCompleted}
        ></div>
      )}

      <p
        onClick={handleToggleCompleted}
        className={`ml-4 font-bold cursor-pointer ${
          completed
            ? "line-through decoration-Light-Grayish-Blue dark:decoration-dark-filter text-Very-Light-Grayish-Blue dark:text-dark-completed"
            : "text-Very-Dark-Grayish-Blue dark:text-dark-text"
        }`}
      >
        {todo.content}
      </p>
      {isHovered && (
        <AiOutlineClose
          onClick={handleDeleteTodo}
          className="ml-auto text-Light-Grayish-Blue dark:text-dark-close text-3xl cursor-pointer"
        />
      )}
    </div>
  );
};

export default Todo;
