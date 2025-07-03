import React, { useState } from 'react';
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [reload, setReload] = useState(0); // trigger para recargar la lista

  // función para el formulario y se llama cuando se crea una tarea
  const handleNewTask = () => {
    setReload((prev) => prev + 1); // forzar TaskList a volver a hacer fetch
  };

  return (
    <main className='p-8 w-dvw h-dvh bg-neutral-500'>
      <TaskForm onTaskCreated={handleNewTask} />
      <TaskList reloadTrigger={reload} />
    </main>
  )
}

export default App
