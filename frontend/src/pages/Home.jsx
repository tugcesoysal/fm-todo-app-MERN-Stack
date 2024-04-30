import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../components/Todo";
import CreateTodo from "../components/CreateTodo";
import { useSnackbar } from "notistack";
import FilterBar from "../components/FilterBar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [left, setLeft] = useState();
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const clearCompleted = () => {
    axios
      .delete(`http://localhost:5555/completed`)
      .then(() => {
        setTodos(todos.filter((todo) => !todo.completed));
        enqueueSnackbar("Completed todos cleared successfully", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Error clearing completed todos", {
          variant: "error",
        });
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5555");
        setTodos(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [todos]);

  useEffect(() => {
    const filteredResult = filterTodos(todos, filter);
    setFilteredTodos(filteredResult);
    const leftCount = todos.filter((todo) => !todo.completed).length;
    setLeft(leftCount);
  }, [filter, todos]);

  const filterTodos = (todos, filter) => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedTodos = Array.from(filteredTodos);
    const [removed] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, removed);

    try {
      await axios.put("http://localhost:5555/reorder", {
        newOrder: updatedTodos,
      });
    } catch (error) {
      console.error("Error updating todo order:", error);
    }
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="absolute top-0 left-0 w-full h-[300px] z-20 bg-cover bg-light-mobile dark:bg-dark-mobile md:bg-light-desktop dark:md:bg-dark-desktop"></div>
      <div className="w-full z-15 font-custom text-[18px] flex flex-col items-center min-h-screen relative dark:bg-dark-bodyBg">
        <div className="z-20 w-4/5 max-w-[800px] mt-16 flex flex-row justify-between items-center ">
          <h1 className=" text-Very-Light-Gray text-4xl font-bold tracking-wider">
            T O D O
          </h1>
          {darkMode ? (
            <IoIosSunny
              onClick={() => setDarkMode(!darkMode)}
              className="text-Very-Light-Gray text-4xl cursor-pointer"
            />
          ) : (
            <FaMoon
              onClick={() => setDarkMode(!darkMode)}
              className="text-Very-Light-Gray text-4xl cursor-pointer"
            />
          )}
        </div>
        <CreateTodo setFilter={setFilter} />
        <div className="w-4/5 max-w-[800px] h-[450px] md:h-[500px] mt-10 rounded-lg bg-Very-Light-Gray z-50 shadow-xl flex flex-col dark:bg-dark-cardBg">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <div
                  className="todos"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredTodos.map((todo, index) => (
                    <Draggable
                      key={todo._id}
                      draggableId={todo._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={todo._id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Todo todo={todo} id={todo._id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="mt-auto mx-2 text-Light-Grayish-Blue dark:text-dark-completed font-bold p-5 flex items-center justify-between">
            {left} items left{" "}
            <div className="w-3/5 mx-auto justify-evenly text-Dark-Grayish-Blue bg-Very-Light-Gray dark:text-dark-filter dark:bg-dark-cardBg font-bold hidden md:flex">
              <button
                className={
                  filter === "all"
                    ? "text-Bright-Blue"
                    : "hover:text-Very-Dark-Grayish-Blue"
                }
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={
                  filter === "active"
                    ? "text-Bright-Blue"
                    : "hover:text-Very-Dark-Grayish-Blue"
                }
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={
                  filter === "completed"
                    ? "text-Bright-Blue"
                    : "hover:text-Very-Dark-Grayish-Blue"
                }
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            <button
              className="ml-auto hover:text-Dark-Grayish-Blue "
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
          </div>
        </div>
        <FilterBar filter={filter} setFilter={setFilter} />
        <p className="absolute bottom-6 text-Light-Grayish-Blue dark:text-dark-completed font-bold">
          Drag and drop to reorder list
        </p>
      </div>
    </div>
  );
};

export default Home;
