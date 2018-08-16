import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    required, EditButton, DeleteButton,DisabledInput,
    Edit, TabbedForm, FormTab,RichTextField
} from 'admin-on-rest';
import RichTextInput from 'aor-rich-text-input';

import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';

const AboutUsFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='introduction' source='introduction' />
        <TextInput label='mannegersSpeach' source='mannegersSpeach' />
        <TextInput label='CodeOfConduct' source='CodeOfConduct' />
        <TextInput label='viewPoint' source='viewPoint' />
        <TextInput label='contactUs' source='contactUs' />
        <TextInput label='links' source='links' />
    </Filter>
);

export const AboutUsList = props => (
    <List {...props} filters={<AboutUsFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
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

const AboutUsTitle = ({ record }) => <span>{record ? `${record.name}` : ''}</span>;

AboutUsTitle.propTypes = {
    record: PropTypes.object,
};

export const AboutUsEdit = props => (
    <Edit title={<AboutUsTitle />} {...props}>
        <TabbedForm>
            <FormTab label='generic.general'>
                <DisabledInput source='id' />
                <RichTextInput label='introduction' source='introduction' validate={[required]} />
                <RichTextInput label='mannegersSpeach' source='mannegersSpeach' validate={[required]} />
                <RichTextInput label='CodeOfConduct' source='CodeOfConduct' validate={[required]} />
                <RichTextInput label='viewPoint' source='viewPoint' validate={[required]} />
                <RichTextInput label='contactUs' source='contactUs' validate={[required]} />
                <RichTextInput label='links' source='links' validate={[required]} />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const AboutUsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <RichTextInput label='introduction' source='introduction' validate={[required]} />
            <RichTextInput label='mannegersSpeach' source='mannegersSpeach' validate={[required]} />
            <RichTextInput label='CodeOfConduct' source='CodeOfConduct' validate={[required]} />
            <RichTextInput label='viewPoint' source='viewPoint' validate={[required]} />
            <RichTextInput label='contactUs' source='contactUs' validate={[required]} />
            <RichTextInput label='links' source='links' validate={[required]} />    

                </SimpleForm>
    </Create>
);

export const AboutUsShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <RichTextField label='introduction' source='introduction' validate={[required]} />
            <RichTextField label='mannegersSpeach' source='mannegersSpeach' validate={[required]} />
            <RichTextField label='CodeOfConduct' source='CodeOfConduct' validate={[required]} />
            <RichTextField label='viewPoint' source='viewPoint' validate={[required]} />
            <RichTextField label='contactUs' source='contactUs' validate={[required]} />
            <RichTextField label='links' source='links' validate={[required]} />    

        </SimpleShowLayout>
    </Show>
);  