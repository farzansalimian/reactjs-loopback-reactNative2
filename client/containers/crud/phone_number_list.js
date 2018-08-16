import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    required, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab
} from 'admin-on-rest/lib';
import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const PhoneNumberListFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
    </Filter>
);

export const PhoneNumberList = props => (
    <List {...props} filters={<PhoneNumberListFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="first_name" />
                    <TextField source="last_name" />
                    <TextField source="phone_number" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.name}
                />
            }
        />
    </List>
);

const PhoneNumberListTitle = ({ record }) => <span>{record ? `${record.name}` : ''}</span>;

PhoneNumberListTitle.propTypes = {
    record: PropTypes.object,
};

export const PhoneNumberListEdit = props => (
    <Edit title={<PhoneNumberListTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <TextInput source="first_name" validate={[ required ]} />
                <TextInput source="last_name" validate={[ required ]}/>
                <TextInput source="phone_number" validate={[ required ]}/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const PhoneNumberListCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="first_name" validate={[ required ]}/>
            <TextInput source="last_name" validate={[ required ]}/>
            <TextInput source="phone_number" validate={[ required ]}/>
        </SimpleForm>
    </Create>
);

export const PhoneNumberListShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="phone_number" />
        </SimpleShowLayout>
    </Show>
);  