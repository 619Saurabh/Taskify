import React from "react";
import SingleTodo from "./SingleTodo";
import "./styles.css";
import { Todo } from "../model";
import { Droppable } from "react-beautiful-dnd";

//Defining props type
interface Props {
  todos: Todo[]; //todos was an array of type Todo
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; //type of setTodos() setter function
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      {/*This todos div is for Active Tasks section*/}
      <Droppable droppableId="TodosList">
        {
          (provided, snapshot) => (//We are gonna take this parameter provided and provide it to parent <div> of this particular droppable zone
            <div 
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ""}`}
            ref={provided.innerRef} 
            {...provided.droppableProps}>{/*so that react beautiful dnd can control this as a droppable zone and we also need to spread 
                                         provided.droppableProps*/}
          <span className="todos__heading">Active Tasks</span>
          {todos.map((todo, index) => (
            <SingleTodo
              index={index}
              todo={todo}
              todos={todos}
              key={todo.id}
              setTodos={setTodos}
            />
          ))}
          {provided.placeholder}{/*It produces a empty placeholder in Active Tasks section for the todo(item) when we drag it*/}
        </div>
          )
        }
      </Droppable>

      {/*This todos div is for Completed Tasks section*/}
      <Droppable droppableId="TodosRemove">
        {
          (provided, snapshot) => (
            <div 
            className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ""}`} 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            >
        <span className="todos__heading">Completed Tasks</span>
        {completedTodos.map((todo, index) => (
          <SingleTodo
            index={index}
            todo={todo}
            todos={completedTodos}
            key={todo.id}
            setTodos={setCompletedTodos}
          />
        ))}
        {provided.placeholder}{/*Its providing us the space for todo(item) in Completed Tasks section to be drop down, when we drop the todo on it*/}
      </div>
          )
        }
      </Droppable>
    </div>
  );
};

export default TodoList;
