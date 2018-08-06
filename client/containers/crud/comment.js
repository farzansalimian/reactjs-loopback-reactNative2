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

const CommentFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
    </Filter>
);

export const CommentList = props => (
    <List {...props} filters={<CommentFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField label="sender" source="user_id" reference="users">
                        <TextField source="id" />
                    </ReferenceField>
                    <ReferenceField label="Post" source="product_id" reference="products">
                        <TextField source="id" />
                    </ReferenceField>
                    <TextField source="message" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.user_id}
                    secondaryText={record => record.message}
                />
            }
        />
    </List>
);

const CommentTitle = ({ record }) => <span>{record ? `${record.sender}` : ''}</span>;

CommentTitle.propTypes = {
    record: PropTypes.object,
};

export const CommentEdit = props => (
    <Edit title={<CommentTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <DisabledInput source='id' />
                <ReferenceInput label="username" source="user_id" reference="users">
                    <SelectInput optionText="id" />
                </ReferenceInput>
                <ReferenceInput label="product" source="product_id" reference="products">
                    <SelectInput optionText="id" />
                </ReferenceInput>
                <TextInput source="message" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const CommentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="username" source="user_id" reference="users">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput label="product" source="product_id" reference="products">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <TextInput source="message" />
        </SimpleForm>
    </Create>
);

export const CommentShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <ReferenceField label="sender" source="user_id" reference="users">
                <TextField source="id" />
            </ReferenceField>
            <ReferenceField label="Post" source="product_id" reference="users">
                <TextField source="id" />
            </ReferenceField>
            <TextField source="message" />
        </SimpleShowLayout>
    </Show>
);  