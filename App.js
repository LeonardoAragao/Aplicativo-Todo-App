import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Task = ({ task, toggleComplete, deleteTask }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.subtitle}>{task.subtitle}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => toggleComplete(task.id)}>
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={task.completed ? 'blue' : 'pink'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(task.id)}>
          <Ionicons name="trash-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Estudar React Native', subtitle: 'Fazer a atividade passada', completed: false },
    { id: 2, title: 'Lavar meu carro', subtitle: 'Lavar o carro no final da tarde', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, title: newTask, subtitle: '', completed: false }]);
    setNewTask('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adicionar nova tarefa"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Adicionar Tarefa" onPress={addTask} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Task task={item} toggleComplete={toggleComplete} deleteTask={deleteTask} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  taskContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});
