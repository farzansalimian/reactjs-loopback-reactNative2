import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Show, Edit, Create, Filter, Datagrid,
  SimpleShowLayout, SimpleForm, TabbedForm, FormTab, LatLngField,
  ReferenceField, DateField, NumberField, TextField, ChipField, BooleanField,
  NumberInput, DateInput, DisabledInput, LongTextInput, SelectInput, SelectArrayInput, ReferenceInput,
  TextInput, BooleanInput, AutocompleteInput, EditButton,DeleteButton,
  required, minLength, maxLength, minValue, maxValue, number, regex, choices,
} from 'admin-on-rest';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import { SimpleList } from 'admin-on-rest/lib/mui/list';

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
    <TextInput label="username" source="username" />
  </Filter>
);

export const UserList = props => (
  <List {...props} filters={<UserFilter />}  >
  <Responsive
  medium={
    <Datagrid>
      <TextField source='id' />
      <TextField source='first_name' />
      <DateField source='last_name'  />
      <TextField source='username' />
      <TextField source='email' />
      <TextField source='phone' />
      <EditButton/>
      <DeleteButton/>
    </Datagrid>
    }
    small={
      <SimpleList
      primaryText={record => record.username}
      secondaryText={record => record.email}
      tertiaryText={record =>record.first_name+" "+record.first_name }
  />
    }
    />
  </List>
);

const UserTitle = ({ record }) => <span>{record ? `${record.username}` : ''}</span>;

UserTitle.propTypes = {
  record: PropTypes.object,
};

export const UserShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source='id' />
      <TextField source='first_name' />
      <DateField source='last_name'  />
      <TextField source='username' />
      <TextField source='email' />
      <TextField source='address' />
      <TextField source='phone' />
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
        <TextInput source='username' />
        <TextInput source='email' validate={[ required ]} />
        <TextInput source='address' />
        <TextInput source='phone' />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const UserEditPopup = props => (
  <EditPopup resource='users' title={<UserTitle />} {...props}>
    <TabbedForm>
      <FormTab label='generic.general'>
        <DisabledInput source='id' />
        <TextInput source='first_name' validate={[ required ]} />
        <TextInput source='username' />
        <TextInput source='password' validate={[ required ]} />
        <TextInput source='email' validate={[ required ]} />
        <TextInput source='address1' />
        <TextInput source='address2' />
        <TextInput source='phone' />
        <TextInput source='phone2' />
      </FormTab>
      <FormTab label='generic.metadata'>
        <DateField source='last_name' showTime />
        <ReferenceField allowEmpty source='updaterId' reference='users'>
          <TextField source='email' />
        </ReferenceField>
        <DateField source='createdDate' showTime />
        <ReferenceField allowEmpty source='creatorId' reference='users'>
          <TextField source='email' />
        </ReferenceField>
      </FormTab>
    </TabbedForm>
  </EditPopup>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='first_name' validate={[ required ]} />
      <TextInput source='username' />
      <TextInput source='password' validate={[ required ]} />
      <TextInput source='email' validate={[ required ]} />
      <TextInput source='address' />
      <TextInput source='phone' />
    </SimpleForm>
  </Create>
);

export const UserCreatePopup = props => (
  <CreatePopup resource='users' {...props}>
    <SimpleForm>
      <TextInput source='first_name' validate={[ required ]} />
      <TextInput source='username' />
      <TextInput source='password' validate={[ required ]} />
      <TextInput source='email' validate={[ required ]} />
      <TextInput source='address1' />
      <TextInput source='address2' />
      <TextInput source='phone' />
      <TextInput source='phone2' />
    </SimpleForm>
  </CreatePopup>
);
