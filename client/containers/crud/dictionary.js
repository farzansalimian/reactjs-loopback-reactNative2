import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    DateField, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab, required
} from 'admin-on-rest/lib';
import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const DictionaryFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='word_fa' source='word_fa' />
        <DateField label='word_en' source="word_en" />
    </Filter>
);

export const DictionaryList = props => (
    <List {...props} filters={<DictionaryFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="word_en" />
                    <TextField source="word_fa" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.word_en}
                    secondaryText={record => record.word_fa}
                />
            }
        />
    </List>
);

const DictionaryTitle = ({ record }) => <span>{record ? `${record.id}` : ''}</span>;

DictionaryTitle.propTypes = {
    record: PropTypes.object,
};

export const DictionaryEdit = props => (
    <Edit title={<DictionaryTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <TextInput source="word_en" validate={[required]} />
                <TextInput source="word_fa" validate={[required]} />
                <TextInput source="description_fa" />
                <TextInput source="description_en" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const DictionaryCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="word_en" validate={[required]} />
            <TextInput source="word_fa" validate={[required]} />
            <TextInput source="description_fa" />
            <TextInput source="description_en" />
        </SimpleForm>
    </Create>
);

export const DictionaryShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="word_en" />
            <TextField source="word_fa" />
            <TextField source="description_fa" />
            <TextField source="description_en" />
        </SimpleShowLayout>
    </Show>
);  