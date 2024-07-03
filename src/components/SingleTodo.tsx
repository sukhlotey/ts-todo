import React, { useEffect, useState, useRef } from "react";
import { Todo } from "./model/model";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import "../style/styles.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [isTiming, setIsTiming] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(todo.timer);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTiming) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1000);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTiming]);

  const handleStartStop = () => {
    setIsTiming(!isTiming);
    if (!isTiming) {
      // Start timer
      // No need to update server yet
    } else {
      // Stop timer
      updateTimer(todo.id, elapsedTime); // Update timer on server
    }
  };

  const updateTimer = async (id: number, timer: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}/timer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timer }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Timer updated successfully:', data);
    } catch (error) {
      console.error('There was an error updating the timer:', error);
    }
  };
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <CiEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <MdDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <FaCheck />
            </span>
          </div>
          <div>
            <span className="icon" onClick={handleStartStop}>
              {isTiming ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
            </span>
            <span>{new Date(elapsedTime).toISOString().substring(11, 19)}</span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
