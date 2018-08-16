import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    required, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab, ReferenceField,
    DisabledInput, ReferenceInput, SelectInput,
} from 'admin-on-rest';
import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const NewsCategoryFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='name' source='name'  />
    </Filter>
);

export const NewsCategoryList = props => (
    <List {...props} filters={<NewsCategoryFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.name}
                />
            }
        />
    </List>
);

const NewsCategoryTitle = ({ record }) => <span>{record ? `${record.name}` : ''}</span>;

NewsCategoryTitle.propTypes = {
    record: PropTypes.object,
};

export const NewsCategoryEdit = props => (
    <Edit title={<NewsCategoryTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <DisabledInput source='id' />
                <TextInput source="name" validate={[ required ]}/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const NewsCategoryCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[ required ]}/>
        </SimpleForm>
    </Create>
);

export const NewsCategoryShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="id" />
            
        </SimpleShowLayout>
    </Show>
);  