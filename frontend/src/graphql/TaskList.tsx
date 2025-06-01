import React from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks';
import { Grid, Button, Flex, Text, View, ActionButton } from '@adobe/react-spectrum';
import Close from '@spectrum-icons/workflow/Close';
import { TaskListQuery as TaskListQueryType } from '../__generated__/TaskListQuery.graphql';

const TaskListQuery = graphql`
  query TaskListQuery {
    getAllTasks {
      id
      title
      description
      status
    }
  }
`;

const UpdateTaskStatusMutation = graphql`
  mutation TaskListUpdateTaskStatusMutation($id: ID!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

const DeleteTaskMutation = graphql`
  mutation TaskListDeleteTaskMutation($id: ID!) {
    deleteTask(id: $id)
  }
`;

export default function TaskList() {
  const [commitStatus, isStatusInFlight] = useMutation(UpdateTaskStatusMutation);
  const [commitDelete, isDeleteInFlight] = useMutation(DeleteTaskMutation);
  const [refresh, setRefresh] = React.useState(0);

  const data = useLazyLoadQuery<TaskListQueryType>(TaskListQuery, {}, { fetchKey: refresh, fetchPolicy: 'network-only' });
  console.log('Fetched tasks:', data.getAllTasks);

  const handleToggle = (task: any) => {
    commitStatus({
      variables: {
        id: task.id,
        status: task.status === 'Pending' ? 'Completed' : 'Pending',
      },
      onCompleted: (response) => {
        console.log('UpdateTaskStatus response:', response);
        setRefresh(r => r + 1);
      },
    });
  };

  const handleDelete = (task: any) => {
    commitDelete({
      variables: { id: task.id },
      onCompleted: (response) => {
        console.log('DeleteTask response:', response);
        setRefresh(r => r + 1);
      },
    });
  };

  return (
    <View
      marginTop="size-400"
      height="size-6000"
      overflow="auto"
      paddingX="size-400"
      UNSAFE_style={{ overflowX: 'hidden' }}
    >
      <Grid
        columns="repeat(auto-fit, minmax(320px, 1fr))"
        gap="size-400"
        width="100%"
        UNSAFE_style={{ boxSizing: 'border-box' }}
      >
        {data.getAllTasks.map((task: any) => (
          <View
            key={task.id}
            backgroundColor="static-white"
            borderRadius="large"
            borderWidth="thin"
            borderColor="gray-300"
            padding="size-300"
            marginY="size-200"
            maxWidth="100%"
            UNSAFE_style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              boxSizing: 'border-box',
            }}
          >
            <Flex direction="column" gap="size-100" height="100%">
              <Flex direction="row" justifyContent="end">
                {/* TEMP: Show delete button for all tasks */}
                <ActionButton
                  isQuiet
                  onPress={() => handleDelete(task)}
                  isDisabled={isDeleteInFlight}
                  aria-label="Delete Task"
                  UNSAFE_style={{ background: '#eee', borderRadius: 4 }}
                >
                  <Close size="S" />
                </ActionButton>
              </Flex>
              <Text UNSAFE_style={{ fontWeight: 'bold', fontSize: 18 }}>{task.title}</Text>
              <Text>{task.description}</Text>
              <Text UNSAFE_style={{ color: task.status === 'Completed' ? 'green' : '#007aff', fontWeight: 500 }}>{task.status}</Text>
              <Button
                variant="primary"
                onPress={() => handleToggle(task)}
                isDisabled={isStatusInFlight}
                marginTop="size-100"
              >
                Mark as {task.status === 'Pending' ? 'Completed' : 'Pending'}
              </Button>
            </Flex>
          </View>
        ))}
      </Grid>
    </View>
  );
} 