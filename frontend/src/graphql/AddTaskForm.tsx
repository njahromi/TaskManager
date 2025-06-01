import React, { useState } from 'react';
import { useMutation, graphql } from 'react-relay/hooks';
import { TextField, TextArea, Button, Flex } from '@adobe/react-spectrum';

const AddTaskMutation = graphql`
  mutation AddTaskFormMutation($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      id
      title
      description
      status
    }
  }
`;

export default function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [commit, isInFlight] = useMutation(AddTaskMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    commit({
      variables: { title, description },
      onCompleted: () => {
        setTitle('');
        setDescription('');
        window.location.reload(); // Simple refetch
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="size-200">
        <TextField
          label="Title"
          value={title}
          onChange={setTitle}
          isRequired
        />
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
        />
        <Button type="submit" variant="cta" isDisabled={isInFlight}>
          Add Task
        </Button>
      </Flex>
    </form>
  );
} 