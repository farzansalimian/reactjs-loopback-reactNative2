import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    ReferenceField, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab, required, DisabledInput, ReferenceInput, SelectInput
} from 'admin-on-rest/lib';
import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const QuestionnaireAnswersFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='id' source="id" />
        <TextInput label='user_id' source="user_id" />
    </Filter>
);

export const QuestionnaireAnswersList = props => (
    <List {...props} filters={<QuestionnaireAnswersFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="user_id" />
                    <ReferenceField label="User Email" source="user_id" reference="app_users">
                        <TextField source="email" />
                    </ReferenceField>
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

const QuestionnaireAnswersTitle = ({ record }) => <span>{record ? `${record.id}` : ''}</span>;

QuestionnaireAnswersTitle.propTypes = {
    record: PropTypes.object,
};

export const QuestionnaireAnswersEdit = props => (
    <Edit title={<QuestionnaireAnswersTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>

                <ReferenceInput label="User Email" source="user_id" reference="app_users">
                    <SelectInput optionText="email" validate={[required]} />
                </ReferenceInput>

                <TextInput source="answer1" validate={[required]} />

                <TextInput source="answer2" validate={[required]} />

                <TextInput source="answer3" validate={[required]} />

                <TextInput source="answer4" validate={[required]} />

                <TextInput source="answer5" validate={[required]} />

                <TextInput source="answer6" validate={[required]} />

                <TextInput source="answer7" validate={[required]} />

                <TextInput source="answer8" validate={[required]} />

                <TextInput source="answer9" validate={[required]} />

                <TextInput source="answer10" validate={[required]} />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const QuestionnaireAnswersCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User Email" source="user_id" reference="app_users">
                <SelectInput optionText="email" validate={[required]} />
            </ReferenceInput>

            <ReferenceInput label="Questionnaire Type" source="questionnaire_id" reference="questionnaires">
                <SelectInput optionText="type" validate={[required]} />
            </ReferenceInput>

            <TextInput source="answer1" validate={[required]} />

            <TextInput source="answer2" validate={[required]} />

            <TextInput source="answer3" validate={[required]} />

            <TextInput source="answer4" validate={[required]} />

            <TextInput source="answer5" validate={[required]} />

            <TextInput source="answer6" validate={[required]} />

            <TextInput source="answer7" validate={[required]} />

            <TextInput source="answer8" validate={[required]} />

            <TextInput source="answer9" validate={[required]} />

            <TextInput source="answer10" validate={[required]} />

        </SimpleForm>
    </Create>
);

export const QuestionnaireAnswersShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField label="User Email" source="user_id" reference="app_users">
                <TextField source="email" validate={[required]} />
            </ReferenceField>

            <TextField source="answer1" validate={[required]} />

            <TextField source="answer2" validate={[required]} />

            <TextField source="answer3" validate={[required]} />

            <TextField source="answer4" validate={[required]} />

            <TextField source="answer5" validate={[required]} />

            <TextField source="answer6" validate={[required]} />

            <TextField source="answer7" validate={[required]} />

            <TextField source="answer8" validate={[required]} />

            <TextField source="answer9" validate={[required]} />

            <TextField source="answer10" validate={[required]} />
        </SimpleShowLayout>
    </Show>
);  