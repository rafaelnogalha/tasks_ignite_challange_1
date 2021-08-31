import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { returnStatement } from '@babel/types';
import { ProgressPlugin } from 'webpack';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  /* Deve ser possível adicionar uma nova task 
  no estado de tasks,
  com os campos id que deve ser gerado 
  de forma aleatória, title que deve ser um texto 
  e isComplete que deve iniciar como false.*/ 

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle){
      return;
    }
    const id = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

    const taskNew = {
      id: id,
      title: newTaskTitle,
      isComplete: false
    }
    
    setTasks(oldTaskState => 
      { 
        return [...oldTaskState, taskNew] // Usando spread para adicionar uma nova task no array das antigas tasks
      }
    );

    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newBooleanTask = tasks.map(
      task => task.id === id ? 
      {
        ...task,
        isComplete: true
      }: task
    );

    setTasks(newBooleanTask);
    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}