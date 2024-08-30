import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

const TaskSystem = ({ width = 'w-full', height = 'h-[400px]' }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Follow up with Acme Supplies", completed: false },
    { id: 2, text: "Update product listings for summer collection", completed: false },
    { id: 3, text: "Respond to customer inquiry about shipping rates", completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Card className={`${width} ${height} flex flex-col`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Task Reminders</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <form onSubmit={addTask} className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Only 3 task at a time ..."
            className="flex-grow"
          />
          <Button type="submit">Add</Button>
        </form>
        <ScrollArea className="flex-grow">
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  id={`task-${task.id}`}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {task.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTask(task.id)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TaskSystem;