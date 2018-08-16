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

const NewsFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
        <TextInput label='title' source='title' />
        <TextInput label='created_date' source='created_date' />
        <TextInput label='pin' source='pin' />
        <TextInput label='context' source='context' />
        <TextInput label='id' source='id' />
        <TextInput label='num_visited' source='num_visited' />
    </Filter>
);

export const NewsList = props => (
    <List {...props} filters={<NewsFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="title" />
                    <DateField source="created_date" />
                    <TextField source="category" />
                    <BooleanField source="pin" />
                    <ShowButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => record.category}
                    tertiaryText={record => record.created_date}
                />
            }
        />
    </List>
);

const NewsTitle = ({ record }) => <span>{record ? `${record.title}` : ''}</span>;

NewsTitle.propTypes = {
    record: PropTypes.object,
};

export const NewsEdit = props => (
    <Edit {...props}>
        <CustomForm apiUrl={'http://localhost:3000/api/news'} apiMethod={'put'} {...props}
        />
    </Edit>
);

export const NewsCreate = props => (
    <Create {...props} >
        <CustomForm apiUrl={'http://localhost:3000/api/news'} apiMethod={'post'} {...props}
        />
    </Create>
);

export const NewsShow = props => (
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
                    <TextField source="context" />
                    <DateField source="created_date" />
                    <TextField source="category" />
                    <TextField source="num_visited" />
                    <BooleanField source="pin" />

                </SimpleShowLayout>
            </Show>
        </TabPanel>
        <TabPanel>
            <Show {...props}>
                <ShowNewsFiles  {...props.match.params} />
            </Show>
        </TabPanel>
    </Tabs>

);

export class ShowNewsFiles extends React.Component {
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
        axios.get(`http://localhost:3000/api/news/${this.props.id}`)
            .then(res => {
                const news = res.data;
                this.setState({
                    main_image_id: news.main_image_id,
                    main_file_id: news.main_file_id,
                    main_video_id: news.main_video_id,
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
            title: null,
            context: null,
            category: "نوع اول",
            pin: null,
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



            axios.get(`http://localhost:3000/api/news/${this.props.match.params.id}`)
                .then(res => {
                    const news = res.data;
                    this.setState({
                        main_image_id: news.main_image_id,
                        main_file_id: news.main_file_id,
                        main_video_id: news.main_video_id,

                        title: news.title,
                        context: news.context,
                        pin: news.pin,
                        category: news.category,
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
        if (!this.state.title) {
            errors["title"] = "Field Required"
        }
        if (!this.state.context) {
            errors["context"] = "Field Required"
        }
        if (!this.state.pin) {
            errors["pin"] = "Field Required"
        }
        if (!this.state.category) {
            errors["category"] = "Field Required"
        }
        if (!this.state.main_image) {
            errors["main_image"] = "Field Required"
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

                                                                title: this.state.title,
                                                                pin: this.state.pin,
                                                                context: this.state.context,
                                                                category: this.state.category,
                                                                id: this.state.id,

                                                                main_image_id: this.state.main_image_id,
                                                                main_file_id: this.state.main_file_id,
                                                                main_video_id: this.state.main_video_id,
                                                            }
                                                        }).then(() => {
                                                            if (!this.props.match.params.id) {
                                                                this.setState({
                                                                    title: null,
                                                                    context: null,
                                                                    category: null,
                                                                    pin: null,

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

                                                    title: this.state.title,
                                                    pin: this.state.pin,
                                                    context: this.state.context,
                                                    category: this.state.category,
                                                    id: this.state.id,

                                                    main_image_id: this.state.main_image_id,
                                                    main_file_id: this.state.main_file_id,
                                                    main_video_id: this.state.main_video_id,
                                                }
                                            }).then(() => {
                                                if (!this.props.match.params.id) {
                                                    this.setState({
                                                        title: null,
                                                        context: null,
                                                        category: null,
                                                        pin: null,

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

                                                title: this.state.title,
                                                pin: this.state.pin,
                                                context: this.state.context,
                                                category: this.state.category,
                                                id: this.state.id,

                                                main_image_id: this.state.main_image_id,
                                                main_file_id: this.state.main_file_id,
                                                main_video_id: this.state.main_video_id,
                                            }
                                        }).then(() => {
                                            if (!this.props.match.params.id) {
                                                this.setState({
                                                    title: null,
                                                    context: null,
                                                    category: null,
                                                    pin: null,

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

                                    title: this.state.title,
                                    pin: this.state.pin,
                                    context: this.state.context,
                                    category: this.state.category,
                                    id: this.state.id,

                                    main_image_id: this.state.main_image_id,
                                    main_file_id: this.state.main_file_id,
                                    main_video_id: this.state.main_video_id,
                                }
                            }).then(() => {
                                if (!this.props.match.params.id) {
                                    this.setState({
                                        title: null,
                                        context: null,
                                        category: null,
                                        pin: null,

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

                                                    title: this.state.title,
                                                    pin: this.state.pin,
                                                    context: this.state.context,
                                                    category: this.state.category,
                                                    id: this.state.id,

                                                    main_image_id: this.state.main_image_id,
                                                    main_file_id: this.state.main_file_id,
                                                    main_video_id: this.state.main_video_id,
                                                }
                                            }).then(() => {
                                                if (!this.props.match.params.id) {
                                                    this.setState({
                                                        title: null,
                                                        context: null,
                                                        category: null,
                                                        pin: null,

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

                                        title: this.state.title,
                                        pin: this.state.pin,
                                        context: this.state.context,
                                        category: this.state.category,
                                        id: this.state.id,

                                        main_image_id: this.state.main_image_id,
                                        main_file_id: this.state.main_file_id,
                                        main_video_id: this.state.main_video_id,
                                    }
                                }).then(() => {
                                    if (!this.props.match.params.id) {
                                        this.setState({
                                            title: null,
                                            context: null,
                                            category: null,
                                            pin: null,

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

                                    title: this.state.title,
                                    pin: this.state.pin,
                                    context: this.state.context,
                                    category: this.state.category,
                                    id: this.state.id,

                                    main_image_id: this.state.main_image_id,
                                    main_file_id: this.state.main_file_id,
                                    main_video_id: this.state.main_video_id,
                                }
                            }).then(() => {
                                if (!this.props.match.params.id) {
                                    this.setState({
                                        title: null,
                                        context: null,
                                        category: null,
                                        pin: null,

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

                        title: this.state.title,
                        pin: this.state.pin,
                        context: this.state.context,
                        category: this.state.category,
                        id: this.state.id,

                        main_image_id: this.state.main_image_id,
                        main_file_id: this.state.main_file_id,
                        main_video_id: this.state.main_video_id,
                    }
                }).then(() => {
                    if (!this.props.match.params.id) {
                        this.setState({
                            title: null,
                            context: null,
                            category: null,
                            pin: null,

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
                            id="title"
                            type="text"
                            label="تیتر"
                            onChange={this.onChange}
                            value={this.state.title ? this.state.title : ''}
                            hasError={this.state.errors["title"] ? "error" : null}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["title"]}</span>



                        <FormGroup controlId="category"
                            validationState={this.state.errors["category"] ? "error" : null}>
                            <ControlLabel style={{ float: 'right' }}>نوع خبر</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" onChange={this.onChange.bind(this)}>
                                <option >نوع اول</option>
                                <option >نوع دوم</option>
                                <option >نوع سوم</option>
                                <option >نوع چهارم</option>
                                <option >نوع پنجم</option>
                                <option >نوع ششم</option>
                            </FormControl>
                        </FormGroup>
                        <span style={{ color: "red" }}>{this.state.errors["category"]}</span>

                        < FieldGroup
                            id="pin"
                            type="checkbox"
                            label="پین"
                            onChange={this.onChange}
                            checked={this.state.pin ? this.state.pin : ''}
                            hasError={this.state.errors["pin"] ? "error" : null}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["pin"]}</span>
                        <FormGroup controlId="context"
                            validationState={this.state.errors["context"] ? "error" : null}>
                            <ControlLabel style={{ float: 'right' }}>توضیح کامل</ControlLabel>
                            <FormControl onChange={this.onChange} componentClass="textarea"
                                placeholder="متن خود را وارد کنید"
                                value={this.state.context ? this.state.context : ''} />
                        </FormGroup>
                        <span style={{ color: "red" }}>{this.state.errors["context"]}</span>


                    </TabPanel>
                    <TabPanel>

                        <FieldGroup
                            id="main_image"
                            label="تصویر اصلی"
                            type="file"
                            onChange={this.onChange}
                            hasError={this.state.errors["main_image"] ? "error" : null}
                        />
                        <img src={this.state.main_image_show} style={{ maxHeight: "200px", maxWidth: "200px" }} />
                        <span style={{ color: "red" }}>{this.state.errors["main_image"]}</span>
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

