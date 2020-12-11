import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';
import * as TaskListStories from './TaskList.stories';
import { InboxScreen, Props } from './InboxScreen';

const store = {
  getState: () => {
    return {
      tasks: TaskListStories.Default.args?.tasks,
    };
  },
  subscribe: (): any => 0,
  dispatch: action('dispatch'),
};

export default {
  component: InboxScreen,
  decorators: [(story) => <Provider store={store as any}>{story()}</Provider>],
  title: 'InboxScreen',
} as Meta;

const Template: Story<Props> = (args) => <InboxScreen {...args} />;

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: 'Something',
};
