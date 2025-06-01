import React from 'react';
import { Provider, defaultTheme, Heading, View } from '@adobe/react-spectrum';
import RelayEnvironment from './relay/RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import AddTaskForm from './graphql/AddTaskForm';
import TaskList from './graphql/TaskList';

function App() {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <View padding="size-400">
          <Heading level={1}>Task Manager</Heading>
          <AddTaskForm />
          <TaskList />
        </View>
      </RelayEnvironmentProvider>
    </Provider>
  );
}

export default App;
