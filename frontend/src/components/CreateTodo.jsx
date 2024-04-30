import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";

const CreateTodo = ({ setFilter }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [todo, setTodo] = useState("");

  const handleCreateTodo = () => {
    if (!todo.trim()) {
      enqueueSnackbar("Todo content cannot be empty", { variant: "error" });
      return;
    }
    axios
      .post("http://localhost:5555", { content: todo })
      .then(() => {
        enqueueSnackbar("Todo created successfully", { variant: "success" });
        setTodo("");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreateTodo();
      setFilter("all");
    }
  };

  return (
    <div className="z-20 flex flex-row items-center w-4/5 max-w-[800px] h-16 mt-10 rounded-lg pl-3 bg-Very-Light-Gray cursor-pointer dark:bg-dark-cardBg">
      <div className="w-8 h-8 rounded-full border-2 border-Very-Light-Grayish-Blue dark:border-dark-circle cursor-pointer"></div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo..."
        className="cursor-pointer w-full h-full rounded-lg pl-3 outline-none bg-Very-Light-Gray dark:bg-dark-cardBg text-Very-Dark-Grayish-Blue dark:text-dark-text font-bold placeholder:text-Light-Grayish-Blue dark:placeholder:text-dark-placeholder"
      />
    </div>
  );
};

export default CreateTodo;
