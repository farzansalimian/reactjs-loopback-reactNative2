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

const GalleryFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='title' source='title' />
    </Filter>
);

export const GalleryList = props => (
    <List {...props} filters={<GalleryFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="title" />
                    <ShowButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.title}
                />
            }
        />
    </List>
);

const GalleryTitle = ({ record }) => <span>{record ? `${record.id}` : ''}</span>;

GalleryTitle.propTypes = {
    record: PropTypes.object,
};

export const GalleryEdit = props => (
    <Edit {...props}>
        <CustomForm apiUrl={'http://localhost:3000/api/galleries'} apiMethod={'put'} {...props}
        />
    </Edit>
);

export const GalleryCreate = props => (
    <Create {...props} >
        <CustomForm apiUrl={'http://localhost:3000/api/galleries'} apiMethod={'post'} {...props}
        />
    </Create>
);

export const GalleryShow = props => (
    <Tabs >
        <TabList>
            <Tab>اطلاعات خبر</Tab>
            <Tab>فایل ها</Tab>
        </TabList>

        <TabPanel>
            <Show {...props}>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="title" />
                </SimpleShowLayout>
            </Show>
        </TabPanel>
        <TabPanel>
            <Show {...props}>
                <ShowGalleryFiles  {...props.match.params} />
            </Show>
        </TabPanel>
    </Tabs>

);

export class ShowGalleryFiles extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            main_file: null,

            main_file_id: null,
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/galleries/${this.props.id}`)
            .then(res => {
                const gallery = res.data;
                this.setState({
                    main_file_id: gallery.main_file_id,
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
function FieldGroup({ id, label, help, onChange, hasError, ...props, }) {
    return (
        <FormGroup controlId={id} validationState={hasError}>
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
            title: null,
            id: this.props.match.params.id,

            main_file: null,

            main_file_new: false,

            main_file_id: null,

            errors: {}




        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.checkFiles = this.checkFiles.bind(this)


    }




    componentDidMount() {


        if (this.props.match.params.id) {



            axios.get(`http://localhost:3000/api/galleries/${this.props.match.params.id}`)
                .then(res => {
                    const gallery = res.data;
                    this.setState({
                        main_file_id: gallery.main_file_id,

                        title: gallery.title,
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
        this.handleValidation()

        if (! Object.keys(this.state.errors ).length) {
            this.checkFiles()
        }
    }
    handleValidation() {
        let errors = {};
        if (!this.state.title) {
            errors["title"] = "Field Required"
        }

        if (!this.state.main_file) {
            errors["main_file"] = "Field Required"
        }
        this.setState({ errors: errors });
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

                                title: this.state.title,
                                id: this.state.id,

                                main_file_id: this.state.main_file_id,
                            }
                        }).then(() => {
                            if (!this.props.match.params.id) {
                                this.setState({
                                    title: null,
                                    main_file: null,

                                    main_file_id: null,

                                    main_file_new: null

                                });
                            }

                        })

                    })
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

        let errors = this.state.errors
        errors[name] = null
        this.setState({
            [name]: value,
            errors: errors

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
                            id="title"
                            type="text"
                            label="تیتر"
                            onChange={this.onChange}
                            value={this.state.title ? this.state.title : ''}
                            hasError={this.state.errors["title"] ? "error" : null}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["title"]}</span>


                    </TabPanel>
                    <TabPanel>

                        <FieldGroup
                            id="main_file"
                            label="فایل"
                            type="file"
                            onChange={this.onChange}
                            hasError={this.state.errors["main_file"] ? "error" : null} />
                        <span style={{ color: "red" }}>{this.state.errors["main_file"]}</span>

                        <a href={this.state.main_file} >مشاهده فایل</a>

                    </TabPanel>
                </Tabs>
                <Button type="submit">ذخیره</Button>
            </form>
        )
    }
}

