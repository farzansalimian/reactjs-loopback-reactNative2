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

const IntroductionFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='first_name' source='first_name' />
        <TextInput label='last_name' source='last_name' />
        <TextInput label='bio"' source='bio' />
    </Filter>
);

export const IntroductionList = props => (
    <List {...props} filters={<IntroductionFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="first_name" />
                    <TextField source="last_name" />
                    <ShowButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.first_name}
                    tertiaryText={record => record.last_name}
                />
            }
        />
    </List>
);

const IntroductionTitle = ({ record }) => <span>{record ? `${record.id}` : ''}</span>;

IntroductionTitle.propTypes = {
    record: PropTypes.object,
};

export const IntroductionEdit = props => (
    <Edit {...props}>
        <CustomForm apiUrl={'http://localhost:3000/api/introductions'} apiMethod={'put'} {...props}
        />
    </Edit>
);

export const IntroductionCreate = props => (
    <Create {...props} >
        <CustomForm apiUrl={'http://localhost:3000/api/introductions'} apiMethod={'post'} {...props}
        />
    </Create>
);

export const IntroductionShow = props => (
    <Tabs >
        <TabList>
            <Tab>اطلاعات خبر</Tab>
            <Tab>فایل ها</Tab>
        </TabList>

        <TabPanel>
            <Show {...props}>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="first_name" />
                    <TextField source="last_name" />
                    <TextField source="bio" />
                </SimpleShowLayout>
            </Show>
        </TabPanel>
        <TabPanel>
            <Show {...props}>
                <ShowIntroductionFiles  {...props.match.params} />
            </Show>
        </TabPanel>
    </Tabs>

);

export class ShowIntroductionFiles extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            main_image: null,
            main_file: null,
            main_video: null,

            main_image_id: null,
            main_file_id: null,
            main_video_id: null,
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/introductions/${this.props.id}`)
            .then(res => {
                const introduction = res.data;
                this.setState({
                    main_image_id: introduction.main_image_id,
                    main_file_id: introduction.main_file_id,
                    main_video_id: introduction.main_video_id,
                });
            })
            .then(res => {

                axios.get(`http://localhost:3000/api/files/download?fileId=${this.state.main_image_id}`)
                    .then(res => {
                        const img = res['config']['url']
                        this.setState({
                            main_image: img,
                        });
                    })
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
            .then(res => {
                if (this.state.main_video_id) {
                    axios.get(`http://localhost:3000/api/files/download?fileId=${this.state.main_video_id}`)
                        .then(res => {
                            const video = res['config']['url']
                            this.setState({
                                main_video: video,
                            });
                        })
                }
            })


    }
    render() {
        return (

            <Grid>
                <Row>
                    <Col xs={6} md={4}>
                        <span style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>عکس اصلی</span>
                        <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                            <img src={this.state.main_image} style={{ maxHeight: "200px", maxWidth: "200px" }} />
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <a href={this.state.main_file} style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>فایل</a>
                    </Col>
                    <Col xs={6} md={4}>
                        <a href={this.state.main_video} style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>ویدیو</a>
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
            first_name: null,
            last_name: null,
            bio: null,
            id: this.props.match.params.id,

            main_image: null,
            main_file: null,
            main_video: null,

            main_image_new: false,
            main_file_new: false,
            main_video_new: false,

            main_image_id: null,
            main_file_id: null,
            main_video_id: null,

            main_image_show: null,

            errors: {}


        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.checkFiles = this.checkFiles.bind(this)


    }




    componentDidMount() {


        if (this.props.match.params.id) {



            axios.get(`http://localhost:3000/api/introductions/${this.props.match.params.id}`)
                .then(res => {
                    const introduction = res.data;
                    this.setState({
                        main_image_id: introduction.main_image_id,
                        main_file_id: introduction.main_file_id,
                        main_video_id: introduction.main_video_id,


                        first_name: introduction.first_name,
                        last_name: introduction.last_name,
                        bio: introduction.bio,
                    });
                })
                .then(res => {

                    axios.get(`http://localhost:3000/api/files/download?fileId=${this.state.main_image_id}`)
                        .then(res => {
                            const img = res['config']['url']
                            this.setState({
                                main_image_show: img,
                            });
                        })
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
                .then(res => {
                    if (this.state.main_video_id) {
                        axios.get(`http://localhost:3000/api/files/download?fileId=${this.state.main_video_id}`)
                            .then(res => {
                                const video = res['config']['url']
                                this.setState({
                                    main_video: video,
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
        if (!this.state.first_name) {
            errors["first_name"] = "Field Required"
        }

        if (!this.state.last_name) {
            errors["last_name"] = "Field Required"
        }
        if (!this.state.bio) {
            errors["bio"] = "Field Required"
        }
        this.setState({ errors: errors });
    }

    checkFiles() {

        if (this.state.main_image && this.state.main_image_new) {

            this.fileUpload(this.state.main_image)
                .then((response) => {
                    this.setState({
                        main_image_id: response.data['_id']
                    }, function () {
                        if (this.state.main_file && this.state.main_file_new) {
                            this.fileUpload(this.state.main_file)
                                .then((response) => {
                                    this.setState({
                                        main_file_id: response.data['_id']

                                    }, function () {
                                        if (this.state.main_video && this.state.main_video_new) {
                                            this.fileUpload(this.state.main_video)
                                                .then((response) => {
                                                    this.setState({
                                                        main_video_id: response.data['_id']
                                                    }, function () {


                                                        const url = this.state.apiUrl;
                                                        axios({
                                                            method: this.state.apiMethod,
                                                            url: url,
                                                            data: {

                                                                first_name: this.state.first_name,
                                                                last_name: this.state.last_name,
                                                                bio: this.state.bio,
                                                                id: this.state.id,

                                                                main_image_id: this.state.main_image_id,
                                                                main_file_id: this.state.main_file_id,
                                                                main_video_id: this.state.main_video_id,
                                                            }
                                                        }).then(() => {
                                                            if (!this.props.match.params.id) {
                                                                this.setState({
                                                                    bio: null,
                                                                    first_name: null,
                                                                    last_name: null,


                                                                    main_image: null,
                                                                    main_file: null,
                                                                    main_video: null,

                                                                    main_image_id: null,
                                                                    main_file_id: null,
                                                                    main_video_id: null,

                                                                    main_image_show: null

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
                                                    first_name: this.state.first_name,
                                                    last_name: this.state.last_name,
                                                    bio: this.state.bio,
                                                    id: this.state.id,

                                                    main_image_id: this.state.main_image_id,
                                                    main_file_id: this.state.main_file_id,
                                                    main_video_id: this.state.main_video_id,
                                                }
                                            }).then(() => {
                                                if (!this.props.match.params.id) {
                                                    this.setState({
                                                        bio: null,
                                                        first_name: null,
                                                        last_name: null,


                                                        main_image: null,
                                                        main_file: null,
                                                        main_video: null,

                                                        main_image_id: null,
                                                        main_file_id: null,
                                                        main_video_id: null,

                                                        main_image_show: null

                                                    });
                                                }

                                            })
                                        }
                                    })
                                })
                        }
                        else if (this.state.main_video && this.state.main_video_new) {
                            this.fileUpload(this.state.main_video)
                                .then((response) => {
                                    this.setState({
                                        main_video_id: response.data['_id']
                                    }, function () {


                                        const url = this.state.apiUrl;
                                        axios({
                                            method: this.state.apiMethod,
                                            url: url,
                                            data: {
                                                first_name: this.state.first_name,
                                                last_name: this.state.last_name,
                                                bio: this.state.bio,
                                                id: this.state.id,

                                                main_image_id: this.state.main_image_id,
                                                main_file_id: this.state.main_file_id,
                                                main_video_id: this.state.main_video_id,
                                            }
                                        }).then(() => {
                                            if (!this.props.match.params.id) {
                                                this.setState({
                                                    bio: null,
                                                    first_name: null,
                                                    last_name: null,


                                                    main_image: null,
                                                    main_file: null,
                                                    main_video: null,

                                                    main_image_id: null,
                                                    main_file_id: null,
                                                    main_video_id: null,

                                                    main_image_show: null

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

                                    first_name: this.state.first_name,
                                    last_name: this.state.last_name,
                                    bio: this.state.bio,
                                    id: this.state.id,

                                    main_image_id: this.state.main_image_id,
                                    main_file_id: this.state.main_file_id,
                                    main_video_id: this.state.main_video_id,
                                }
                            }).then(() => {
                                if (!this.props.match.params.id) {
                                    this.setState({
                                        bio: null,
                                        first_name: null,
                                        last_name: null,


                                        main_image: null,
                                        main_file: null,
                                        main_video: null,

                                        main_image_id: null,
                                        main_file_id: null,
                                        main_video_id: null,

                                        main_image_show: null

                                    });
                                }

                            })
                        }
                    })
                })


        }
        else if (this.state.main_image) {
            if (this.state.main_file && this.state.main_file_new) {
                this.fileUpload(this.state.main_file)
                    .then((response) => {
                        this.setState({
                            main_file_id: response.data['_id']

                        }, function () {
                            if (this.state.main_video && this.state.main_video_new) {
                                this.fileUpload(this.state.main_video)
                                    .then((response) => {
                                        this.setState({
                                            main_video_id: response.data['_id']
                                        }, function () {


                                            const url = this.state.apiUrl;
                                            axios({
                                                method: this.state.apiMethod,
                                                url: url,
                                                data: {

                                                    first_name: this.state.first_name,
                                                    last_name: this.state.last_name,
                                                    bio: this.state.bio,
                                                    id: this.state.id,

                                                    main_image_id: this.state.main_image_id,
                                                    main_file_id: this.state.main_file_id,
                                                    main_video_id: this.state.main_video_id,
                                                }
                                            }).then(() => {
                                                if (!this.props.match.params.id) {
                                                    this.setState({
                                                        bio: null,
                                                        first_name: null,
                                                        last_name: null,


                                                        main_image: null,
                                                        main_file: null,
                                                        main_video: null,

                                                        main_image_id: null,
                                                        main_file_id: null,
                                                        main_video_id: null,

                                                        main_image_show: null

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

                                        first_name: this.state.first_name,
                                        last_name: this.state.last_name,
                                        bio: this.state.bio,
                                        id: this.state.id,

                                        main_image_id: this.state.main_image_id,
                                        main_file_id: this.state.main_file_id,
                                        main_video_id: this.state.main_video_id,
                                    }
                                }).then(() => {
                                    if (!this.props.match.params.id) {
                                        this.setState({
                                            bio: null,
                                            first_name: null,
                                            last_name: null,


                                            main_image: null,
                                            main_file: null,
                                            main_video: null,

                                            main_image_id: null,
                                            main_file_id: null,
                                            main_video_id: null,

                                            main_image_show: null

                                        });
                                    }

                                })
                            }
                        })
                    })
            }
            else if (this.state.main_video && this.state.main_video_new) {
                this.fileUpload(this.state.main_video)
                    .then((response) => {
                        this.setState({
                            main_video_id: response.data['_id']
                        }, function () {


                            const url = this.state.apiUrl;
                            axios({
                                method: this.state.apiMethod,
                                url: url,
                                data: {
                                    first_name: this.state.first_name,
                                    last_name: this.state.last_name,
                                    bio: this.state.bio,
                                    id: this.state.id,

                                    main_image_id: this.state.main_image_id,
                                    main_file_id: this.state.main_file_id,
                                    main_video_id: this.state.main_video_id,
                                }
                            }).then(() => {
                                if (!this.props.match.params.id) {
                                    this.setState({
                                        bio: null,
                                        first_name: null,
                                        last_name: null,


                                        main_image: null,
                                        main_file: null,
                                        main_video: null,

                                        main_image_id: null,
                                        main_file_id: null,
                                        main_video_id: null,

                                        main_image_show: null

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

                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        bio: this.state.bio,
                        id: this.state.id,

                        main_image_id: this.state.main_image_id,
                        main_file_id: this.state.main_file_id,
                        main_video_id: this.state.main_video_id,
                    }
                }).then(() => {
                    if (!this.props.match.params.id) {
                        this.setState({
                            bio: null,
                            first_name: null,
                            last_name: null,


                            main_image: null,
                            main_file: null,
                            main_video: null,

                            main_image_id: null,
                            main_file_id: null,
                            main_video_id: null,

                            main_image_show: null

                        });
                    }
                })
            }
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
                            id="first_name"
                            type="text"
                            label="نام"
                            onChange={this.onChange}
                            value={this.state.first_name ? this.state.first_name : ''}
                            hasError={this.state.errors["first_name"] ? "error" : null}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["first_name"]}</span>
                        < FieldGroup
                            id="last_name"
                            type="text"
                            label="نام خانوادگی"
                            onChange={this.onChange}
                            value={this.state.last_name ? this.state.last_name : ''}
                            hasError={this.state.errors["last_name"] ? "error" : null}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["last_name"]}</span>

                        <FormGroup controlId="bio"
                            validationState={this.state.errors["bio"] ? "error" : null}>
                            <ControlLabel style={{ float: 'right' }}>توضیحات</ControlLabel>
                            <FormControl onChange={this.onChange} componentClass="textarea"
                                placeholder="توضیحات خود را وارد کنید"
                                value={this.state.bio ? this.state.bio : ''} />
                        </FormGroup>


                    </TabPanel>
                    <TabPanel>

                        <FieldGroup
                            id="main_image"
                            label="تصویر اصلی"
                            type="file"
                            onChange={this.onChange}
                        />

                        <img src={this.state.main_image_show} style={{ maxHeight: "200px", maxWidth: "200px" }} />

                        <FieldGroup
                            id="main_file"
                            label="فایل"
                            type="file"
                            onChange={this.onChange} />

                        <a href={this.state.main_file} >مشاهده فایل</a>
                        <FieldGroup

                            id="main_video"
                            label="ویدیو"
                            type="file"
                            onChange={this.onChange} />

                        <a href={this.state.main_video} >مشاهده ویدیو</a>

                    </TabPanel>
                </Tabs>
                <Button type="submit">ذخیره</Button>
            </form>
        )
    }
}

