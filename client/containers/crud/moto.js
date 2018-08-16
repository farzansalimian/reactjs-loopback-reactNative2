import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    DateField, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab,required
} from 'admin-on-rest/lib';
import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const MotoFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='text' source='text'  />
        <DateField label='created_date' source="created_date" />
    </Filter>
);

export const MotoList = props => (
    <List {...props} filters={<MotoFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="text" />
                    <DateField label='created_date' source="created_date" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.text}
                />
            }
        />
    </List>
);

const MotoTitle = ({ record }) => <span>{record ? `${record.text}` : ''}</span>;

MotoTitle.propTypes = {
    record: PropTypes.object,
};

export const MotoEdit = props => (
    <Edit title={<MotoTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <TextInput source="text" validate={[ required ]}/>
                <DateField label='created_date' source="created_date" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const MotoCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="text" validate={[ required ]}/>
        </SimpleForm>
    </Create>
);

export const MotoShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="text" />
            <DateField label='created_date' source="created_date" />
        </SimpleShowLayout>
    </Show>
);  