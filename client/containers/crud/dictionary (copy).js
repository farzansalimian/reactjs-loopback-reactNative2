import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    required, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab,
    NumberField, Toolbar, ImageField,
    BooleanField, ReferenceField, ShowButton,
    DateField, ListButton, RefreshButton,

} from 'admin-on-rest';
import { TextInput } from 'admin-on-rest/lib/mui/input';
import { Datagrid, SimpleList } from 'admin-on-rest/lib/mui/list';
import { TextField } from 'admin-on-rest/lib/mui/field';
import { Show, SimpleShowLayout } from 'admin-on-rest/lib/mui/detail';
import PropTypes from 'prop-types';
import axios, { post } from 'axios';
import {
    FormGroup, ControlLabel, FormControl, Button, HelpBlock,
    Grid, Row, Col, Thumbnail
} from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const DictionaryFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='word' source='word' />
        <TextInput label='translate' source='translate' />
    </Filter>
);

export const DictionaryList = props => (
    <List {...props} filters={<DictionaryFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField label='word' source='word' />
                    <TextField label='translate' source='translate' />
                    <ShowButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.word}
                    tertiaryText={record => record.translate}
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
    <Edit {...props}>
        <CustomForm apiUrl={'http://localhost:3000/api/dictionaries'} apiMethod={'put'} {...props}
        />
    </Edit>
);

export const DictionaryCreate = props => (
    <Create {...props} >
        <CustomForm apiUrl={'http://localhost:3000/api/dictionaries'} apiMethod={'post'} {...props}
        />
    </Create>
);

export const DictionaryShow = props => (
    <Tabs >
        <TabList>
            <Tab>اطلاعات خبر</Tab>
            <Tab>فایل ها</Tab>
        </TabList>

        <TabPanel>
            <Show {...props}>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="word" />
                    <TextField source="translate" />
                </SimpleShowLayout>
            </Show>
        </TabPanel>
        <TabPanel>
            <Show {...props}>
                <ShowDictionaryFiles  {...props.match.params} />
            </Show>
        </TabPanel>
    </Tabs>

);

export class ShowDictionaryFiles extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            main_file: null,

            main_file_id: null,
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/dictionaries/${this.props.id}`)
            .then(res => {
                const dictionary = res.data;
                this.setState({
                    main_file_id: dictionary.main_file_id,
                });
            })

            .then(res => {

                if (this.state.main_file_id) {
                    axios.get(`http://localhost:3000/api/files/download?fileId=${this.state.main_file_id}`)
                        .then(res => {
                            const file = res['config']['url']
                            this.setState({
                                main_file: file,
                            });
                        })
                }
            })

    }
    render() {
        return (

            <Grid>
                <Row>

                    <Col xs={12} md={12}>
                        <a href={this.state.main_file} style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>فایل</a>
                    </Col>

                </Row>
            </Grid>
        )
    }
}
function FieldGroup({ id, label, help, onChange, ...props, }) {
    return (
        <FormGroup controlId={id} >
            <ControlLabel style={{ float: 'right' }}>{label}</ControlLabel>
            <FormControl {...props} onChange={onChange} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}



export default class CustomForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            apiUrl: props.apiUrl,
            apiMethod: props.apiMethod,
            word: null,
            translate: null,
            id: this.props.match.params.id,

            main_file: null,

            main_file_new: false,

            main_file_id: null,




        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.checkFiles = this.checkFiles.bind(this)


    }




    componentDidMount() {


        if (this.props.match.params.id) {



            axios.get(`http://localhost:3000/api/dictionaries/${this.props.match.params.id}`)
                .then(res => {
                    const dictionary = res.data;
                    this.setState({
                        main_file_id: dictionary.main_file_id,

                        word: dictionary.word,
                        translate: dictionary.translate,

                    });
                })

                .then(res => {

                    if (this.state.main_file_id) {
                        axios.get(`http://localhost:3000/api/files/download?fileId=${this.state.main_file_id}`)
                            .then(res => {
                                const file = res['config']['url']
                                this.setState({
                                    main_file: file,
                                });
                            })
                    }
                })

        }

    }



    onFormSubmit(e) {
        e.preventDefault() // Stop form submit

        this.checkFiles()
    }

    checkFiles() {

        if (this.state.main_file && this.state.main_file_new) {

            this.fileUpload(this.state.main_file)
                .then((response) => {
                    this.setState({
                        main_file_id: response.data['_id']
                    }, function () {

                        const url = this.state.apiUrl;
                        axios({
                            method: this.state.apiMethod,
                            url: url,
                            data: {

                                word: this.state.word,
                                translate: this.state.translate,

                                id: this.state.id,

                                main_file_id: this.state.main_file_id,
                            }
                        }).then(() => {
                            if (!this.props.match.params.id) {
                                this.setState({
                                    word: null,
                                    translate: null,
                                    main_file: null,

                                    main_file_id: null,

                                    main_file_new: null

                                });
                            }

                        })

                    })
                })


        }
        else {
            const url = this.state.apiUrl;
            axios({
                method: this.state.apiMethod,
                url: url,
                data: {

                    word: this.state.word,
                    translate: this.state.translate,

                    id: this.state.id,

                    main_file_id: this.state.main_file_id,
                }
            }).then(() => {
                if (!this.props.match.params.id) {
                    this.setState({
                        word: null,
                        translate: null,
                        main_file: null,

                        main_file_id: null,

                        main_file_new: null

                    });
                }

            })
        }


        return (true)
    }

    onChange(event) {


        const target = event.target;
        var value;
        if (target.type === 'checkbox') {
            value = target.checked
        }
        else if (target.type === 'file') {
            value = target.files[0]
        }
        else {

            value = target.value
        }
        const name = target.id;
        if (target.type === 'file') {
            var reader = new FileReader();
            var url = reader.readAsDataURL(target.files[0]);
            reader.onloadend = function (e) {
                var stateName = name + "_show";
                var stateNameCreate = name + "_new";

                this.setState({
                    [stateName]: [reader.result],
                    [stateNameCreate]: true
                })
            }.bind(this);
        }

        this.setState({
            [name]: value
        });
    }
    fileUpload(file) {
        const url = 'http://localhost:3000/api/files/container/upload';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {


        return (
            <form style={{ direction: 'rtl' }} onSubmit={this.onFormSubmit}
                style={{ padding: "20px" }}>
                <Tabs>
                    <TabList>
                        <Tab>اطلاعات محصول</Tab>
                        <Tab>تصاویر</Tab>
                    </TabList>
                    <TabPanel>

                        <FieldGroup
                            id="word"
                            type="text"
                            label="کلمه"
                            onChange={this.onChange}
                            value={this.state.word ? this.state.word : ''}
                        />
                        <FieldGroup
                            id="translate"
                            type="text"
                            label="ترجمه"
                            onChange={this.onChange}
                            value={this.state.translate ? this.state.translate : ''}
                        />


                    </TabPanel>
                    <TabPanel>

                        <FieldGroup
                            id="main_file"
                            label="فایل"
                            type="file"
                            onChange={this.onChange} />

                        <a href={this.state.main_file} >مشاهده فایل</a>

                    </TabPanel>
                </Tabs>
                <Button type="submit">ذخیره</Button>
            </form>
        )
    }
}

