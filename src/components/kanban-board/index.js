import React, { useState } from "react";
import "./index.css";

export default function KanbanBoard(props) {
  const [newTask, addNewTask] = useState("");
  let [tasks, setTasks] = React.useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
  ]);

  let [stagesNames, setStagesNames] = React.useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done",
  ]);

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }
  const addNewTaskHandler = () => {
    const temp = tasks;
    temp.push({
      name: newTask,
      stage: 0,
    });
    setTasks(temp);
    addNewTask("");
  };
  const moveForWord = (task) => {
    const temp = tasks.map((item, i) => {
      if (item === task)
        return {
          ...item,
          stage: item.stage + 1,
        };
      return item;
    });
    setTasks(temp);
  };

  const moveBackWord = (task) => {
    const temp = tasks.map((item, i) => {
      if (item === task)
        return {
          ...item,
          stage: item.stage - 1,
        };
      return item;
    });
    setTasks(temp);
  };

  const deleteTaskHandler = (task) => {
    let temp = tasks.filter((item) => item !== task);
    setTasks(temp);
  };

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
          onChange={(e) => addNewTask(e.target.value)}
          value={newTask}
        />
        <button
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
          onClick={() => addNewTaskHandler()}
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-name`}
                          >
                            {task.name}
                          </span>
                          <div className="icons">
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-back`}
                              disabled={task.stage === 0}
                              onClick={() => moveBackWord(task)}
                            >
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-forward`}
                              disabled={task.stage === 3}
                              onClick={() => moveForWord(task)}
                            >
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-delete`}
                              onClick={() => deleteTaskHandler(task)}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
