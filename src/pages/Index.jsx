import { useState } from 'react';
import { Box, Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, useToast, Link, Text, Flex } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button onClick={addTask} colorScheme="blue">Add Task</Button>
        <List spacing={3} w="full">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Box as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
                {task.text}
              </Box>
              <Box>
                <IconButton
                  icon={<FaCheckCircle />}
                  onClick={() => toggleTaskCompletion(task.id)}
                  colorScheme={task.isCompleted ? 'green' : 'gray'}
                  aria-label="Complete Task"
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => deleteTask(task.id)}
                  colorScheme="red"
                  aria-label="Delete Task"
                  ml={2}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
      <Flex as="footer" py={4} mt={10} justifyContent="center" borderTop="1px" borderColor="gray.200">
        <Text fontSize="sm" mr={2}>© 2023 Todo App, Inc.</Text>
        <Link href="/privacy-policy" color="blue.500" fontSize="sm">Privacy Policy</Link>
      </Flex>
    </Container>
  );
};

export default Index;