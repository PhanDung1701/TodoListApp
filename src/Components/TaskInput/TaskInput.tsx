import { useState } from "react";
import PropTypes from "prop-types";
import { Todo } from "../../@types/todo.type";
import styles from "./TaskInput.module.scss";
import { TodoTypes } from "../../PropTypes/todo.proptype";

interface TaskInputProps {
  addTodo: (name: string) => void;
  editTodo: (name: string) => void;
  finishEditTodo: () => void;
  currentTodo: Todo | null;
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props;
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentTodo) {
      finishEditTodo();
      if (name) setName("");
    } else {
      addTodo(name);
      setName("");
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (currentTodo) {
      editTodo(value);
    } else {
      setName(value);
    }
  };

  return (
    <div className="mb-2">
      <h1 className={styles.title}>App to do list Vip pro</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập việc cần làm..."
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type="submit">{currentTodo ? "✔️" : "➕"}</button>
      </form>
    </div>
  );
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
};
