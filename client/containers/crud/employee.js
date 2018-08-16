import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    DateField, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab, required
} from 'admin-on-rest/lib';
import { TextInput, DisabledInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const EmployeeFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='id' source="id" />
        <TextInput label='first_name' source="first_name" />
        <TextInput label='last_name' source="last_name" />
        <TextInput label='staff_code' source="staff_code" />
        <TextInput label='position' source="position" />
        <TextInput label='phone' source="phone" />
    </Filter>
);

export const EmployeeList = props => (
    <List {...props} filters={<EmployeeFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField label='id' source="id" />
                    <TextField label='first_name' source="first_name" />
                    <TextField label='last_name' source="last_name" />
                    <TextField label='staff_code' source="staff_code" />
                    <TextField label='position' source="position" />
                    <TextField label='phone' source="phone" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.staff_code}
                    secondaryText={record => record.first_name + " " + record.last_name}
                    tertiaryText={record => record.position}
                />
            }
        />
    </List>
);

const EmployeeTitle = ({ record }) => <span>{record ? `${record.staff_code}` : ''}</span>;

EmployeeTitle.propTypes = {
    record: PropTypes.object,
};

export const EmployeeEdit = props => (
    <Edit title={<EmployeeTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <DisabledInput label='id' source="id" />
                <TextInput label='first_name' source="first_name" validate={[ required ]}/>
                <TextInput label='last_name' source="last_name"validate={[ required ]} />
                <TextInput label='staff_code' source="staff_code"validate={[ required ]}/>
                <TextInput label='position' source="position"validate={[ required ]} />
                <TextInput label='phone' source="phone" validate={[ required ]}/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const EmployeeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label='first_name' source="first_name" validate={[ required ]}/>
            <TextInput label='last_name' source="last_name" validate={[ required ]}/>
            <TextInput label='staff_code' source="staff_code" validate={[ required ]}/>
            <TextInput label='position' source="position" validate={[ required ]}/>
            <TextInput label='phone' source="phone" validate={[ required ]} />
        </SimpleForm>
    </Create>
);

export const EmployeeShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField label='id' source="id" />
            <TextField label='first_name' source="first_name" />
            <TextField label='last_name' source="last_name" />
            <TextField label='staff_code' source="staff_code" />
            <TextField label='position' source="position" />
            <TextField label='phone' source="phone" />
        </SimpleShowLayout>
    </Show>
);  