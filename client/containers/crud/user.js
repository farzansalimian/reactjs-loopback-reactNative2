import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Show, Edit, Create, Filter, Datagrid,
  SimpleShowLayout, SimpleForm, TabbedForm, FormTab,
   DateField, TextField, BooleanField, DisabledInput,
  TextInput, BooleanInput , EditButton,DeleteButton,
  required
} from 'admin-on-rest';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import { SimpleList } from 'admin-on-rest/lib/mui/list';

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
    <TextInput label="phone" source="phone" />
    <TextInput label="email" source="email" />
    <TextInput label="first_name" source="first_name" />
    <TextInput label="last_name" source="last_name" />
    <TextInput label="id" source="id" />
  </Filter>
);

export const UserList = props => (
  <List {...props} filters={<UserFilter />}  >
  <Responsive
  medium={
    <Datagrid>
      <TextField source='id' />
      <TextField source='first_name' />
      <TextField source='last_name'  />
      <TextField source='email' />
      <TextField source='phone' />
      <EditButton/>
      <DeleteButton/>
    </Datagrid>
    }
    small={
      <SimpleList
      primaryText={record => record.phone}
      secondaryText={record => record.email}
      tertiaryText={record =>record.first_name+" "+record.last_name }
  />
    }
    />
  </List>
);

const UserTitle = ({ record }) => <span>{record ? `${record.phone}` : ''}</span>;

UserTitle.propTypes = {
  record: PropTypes.object,
};

export const UserShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source='id' />
      <TextField source='first_name' />
      <TextField source='last_name'  />
      <DateField source='created_at' />
      <TextField source='email' />
      <TextField source='phone' />
      <BooleanField source='active' />
    </SimpleShowLayout>
  </Show>
);

export const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <TabbedForm>
      <FormTab label='generic.general'>
        <DisabledInput source='id' />
        <TextInput source='first_name' validate={[ required ]} />
        <TextInput source='last_name' validate={[ required ]} />
        <TextInput source='email' validate={[ required ]} />
        <DateField source='created_at' />
        <TextInput source='phone' validate={[ required ]}/>
        <BooleanInput source='active' />
      </FormTab>
    </TabbedForm>
  </Edit>
);


export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='first_name' validate={[ required ]} />
      <TextInput source='last_name' validate={[ required ]}/>
      <TextInput source='password' validate={[ required ]} />
      <TextInput source='email' validate={[ required ]} />
      <TextInput source='phone' validate={[ required ]}/>
      <BooleanInput source='active' />
    </SimpleForm>
  </Create>
);

