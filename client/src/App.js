import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [popopActive, setPopActive] = useState(false);
  const [newTodo,setNewTodo] = useState("");

  useEffect(() => {
    GetTodos()
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + '/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err))
  }

  const completeTodo = async(id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id)
      .then(res => res.json());
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }

      return todo;
    }));
  }

  const deleteTodo=async(id)=>{
    const data= await fetch(API_BASE + "/todo/delete/" + id,{method:'DELETE'})
    .then(res=>res.json())
    .catch((error)=>console.log(error.message))
    setTodos(todos=>todos.filter(todo=>todo._id !==data._id));
  }

  const addTodo=async()=>{
    const data=await fetch(API_BASE+"/todo/new",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        text:newTodo
      })
    }).then(res=>res.json());
    setTodos([...todos,data]);
    setPopActive(false);
    setNewTodo("")
  }
  return (

    <div className="App">
      <h1>Welcome,Pramod</h1>
      <h4>Your tasks</h4>


      <div className="todos">
        {
          todos.map(todo => (
            <div className={"todo " + (todo.complete ? "is-complete" : "")} key={todo._id} onClick={()=>completeTodo(todo._id)}>
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={(e)=>{e.stopPropagation(); deleteTodo(todo._id)}} >x</div>
            </div>
          ))
        }
      </div>


      <div className="addPopup" onClick={()=> setPopActive(true)}>+</div>

      {popopActive?(
          <div className="popup">
            <div className="closePopup" onClick={()=>setPopActive(false)}>x</div>
            <h3>Add Task</h3>
            <input type="text" className='add-todo-input' onChange={e=> setNewTodo(e.target.value)} value={newTodo}/>
            <button className='button' onClick={addTodo}>Create Task</button>
          </div>
      ):''}
    </div>
  );
}



export default App;

