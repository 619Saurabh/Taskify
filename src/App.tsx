import React, {useState} from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import './App.css'
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';



const App: React.FC = () => {
  //creating state todo to store single todo
  const [todo, setTodo] = useState<string>("");
  //console.log(todo);

  //creating state todos to store all of our todos
  const [todos, setTodos] = useState<Todo[]>([]);

  //Creating new state for completed todos
  const[completedTodos, setCompletedTodos] = useState<Todo[]>([]);                                                



  //Impelementing add functionality
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);//Date.now() is used to generate random unique id for each todo created
      setTodo("");
    }
    
  }      
  // console.log(todos);

 //Logic for saving the state of todo while doing drop and down
 const onDragEnd = (result: DropResult) => {
    // console.log(result);
    const {source, destination} = result;
    //Case1: if destination doesn't exist
    if(!destination) return; 
  
    //Case 2: if we take or drag the item(todo) and drop it in the same position in the same section(area)
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add;
    let active = todos;
    let complete = completedTodos;


    // Source Logic
    if(source.droppableId === "TodosList"){
      add = active[source.index];
      active.splice(source.index,1);
    }   
    else {//Similarly, if todo dragged from droppableId "TodosRemove" i.e from Completed Tasks section 
      add = complete[source.index];//taking out the todo from Completed Tasks section 
      complete.splice(source.index,1);//removing todo from Completed Tasks section 
    }
  
    // Destination Logic
    if(destination.droppableId === "TodosList"){//if todo is dropped in Active Tasks section i.e if droppableId is "TodosList"
      active.splice(destination.index,0,  {...add, isDone: false});
    }
    else{//if todo is dropped in Completed Tasks section i.e if droppableId is "TodosRemove"
      complete.splice(destination.index,0, {...add, isDone: true});
    }
    setCompletedTodos(complete);
    setTodos(active);
 }


                                        

  return (
    <DragDropContext onDragEnd={onDragEnd}>
   <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
   </div>
   </DragDropContext>
  )
}

export default App
