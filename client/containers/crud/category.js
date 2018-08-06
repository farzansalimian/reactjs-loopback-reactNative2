import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    required, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab, ReferenceField,
    DisabledInput, ReferenceInput, SelectInput,
} from 'admin-on-rest/lib';
import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const CategoryFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
    </Filter>
);

export const CategoryList = props => (
    <List {...props} filters={<CategoryFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="name" />
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

const CategoryTitle = ({ record }) => <span>{record ? `${record.name}` : ''}</span>;

CategoryTitle.propTypes = {
    record: PropTypes.object,
};

export const CategoryEdit = props => (
    <Edit title={<CategoryTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <TextInput source="name" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const CategoryCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export const CategoryShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>
);  