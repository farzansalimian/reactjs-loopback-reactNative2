import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    DateField, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab, required, SelectArrayInput, RichTextField
} from 'admin-on-rest/lib';
import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const QuestionnaireFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='type' source='type' />
        <TextInput label='id' source="id" />
    </Filter>
);

export const QuestionnaireList = props => (
    <List {...props} filters={<QuestionnaireFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="type" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.id}
                />
            }
        />
    </List>
);

const QuestionnaireTitle = ({ record }) => <span>{record ? `${record.id}` : ''}</span>;

QuestionnaireTitle.propTypes = {
    record: PropTypes.object,
};

export const QuestionnaireEdit = props => (
    <Edit title={<QuestionnaireTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <TextInput source="type" validate={[required]} />

                <TextInput source="question1" validate={[required]} />
                <SelectArrayInput source="alternatives1" validate={[required]} />

                <TextInput source="question2" validate={[required]} />
                <SelectArrayInput source="alternatives2" validate={[required]} />

                <TextInput source="question3" validate={[required]} />
                <SelectArrayInput source="alternatives3" validate={[required]} />

                <TextInput source="question4" validate={[required]} />
                <SelectArrayInput source="alternatives4" validate={[required]} />

                <TextInput source="question5" validate={[required]} />
                <SelectArrayInput source="alternatives5" validate={[required]} />

                <TextInput source="question6" validate={[required]} />
                <SelectArrayInput source="alternatives6" validate={[required]} />

                <TextInput source="question7" validate={[required]} />
                <SelectArrayInput source="alternatives7" validate={[required]} />

                <TextInput source="question8" validate={[required]} />
                <SelectArrayInput source="alternatives8" validate={[required]} />

                <TextInput source="question9" validate={[required]} />
                <SelectArrayInput source="alternatives9" validate={[required]} />

                <TextInput source="question10" validate={[required]} />
                <SelectArrayInput source="alternatives10" validate={[required]} />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const QuestionnaireCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="type" validate={[required]} />

            <TextInput source="question1" validate={[required]} />
            <SelectArrayInput source="alternatives1" validate={[required]} />

            <TextInput source="question2" validate={[required]} />
            <SelectArrayInput source="alternatives2" validate={[required]} />

            <TextInput source="question3" validate={[required]} />
            <SelectArrayInput source="alternatives3" validate={[required]} />

            <TextInput source="question4" validate={[required]} />
            <SelectArrayInput source="alternatives4" validate={[required]} />

            <TextInput source="question5" validate={[required]} />
            <SelectArrayInput source="alternatives5" validate={[required]} />

            <TextInput source="question6" validate={[required]} />
            <SelectArrayInput source="alternatives6" validate={[required]} />

            <TextInput source="question7" validate={[required]} />
            <SelectArrayInput source="alternatives7" validate={[required]} />

            <TextInput source="question8" validate={[required]} />
            <SelectArrayInput source="alternatives8" validate={[required]} />

            <TextInput source="question9" validate={[required]} />
            <SelectArrayInput source="alternatives9" validate={[required]} />

            <TextInput source="question10" validate={[required]} />
            <SelectArrayInput source="alternatives10" validate={[required]} />

        </SimpleForm>
    </Create>
);

export const QuestionnaireShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="type" />

                
                <TextField source="question1" validate={[required]} />
                <RichTextField source="alternatives1" validate={[required]} />

                <TextField source="question2" validate={[required]} />
                <TextField source="alternatives2" validate={[required]} />

                <TextField source="question3" validate={[required]} />
                <RichTextField source="alternatives3" validate={[required]} />

                <TextField source="question4" validate={[required]} />
                <RichTextField source="alternatives4" validate={[required]} />

                <TextField source="question5" validate={[required]} />
                <RichTextField source="alternatives5" validate={[required]} />

                <TextField source="question6" validate={[required]} />
                <RichTextField source="alternatives6" validate={[required]} />

                <TextField source="question7" validate={[required]} />
                <RichTextField source="alternatives7" validate={[required]} />

                <TextField source="question8" validate={[required]} />
                <RichTextField source="alternatives8" validate={[required]} />

                <TextField source="question9" validate={[required]} />
                <RichTextField source="alternatives9" validate={[required]} />

                <TextField source="question10" validate={[required]} />
                <RichTextField source="alternatives10" validate={[required]} />
        </SimpleShowLayout>
    </Show>
);  