import React from 'react';
import { Responsive } from 'admin-on-rest/lib/mui/layout';
import {
    List, Filter, Create, SimpleForm,
    required, EditButton, DeleteButton,
    Edit, TabbedForm, FormTab,
    DisabledInput, Toolbar, ImageField,
    SaveButton, ReferenceField, ShowButton,
    CardActions, ListButton, RefreshButton,

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

const ProductFilter = props => (
    <Filter {...props} >
        <TextInput label='Search' source='q' alwaysOn />
    </Filter>
);

export const ProductList = props => (
    <List {...props} filters={<ProductFilter />}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="short_description" />
                    <TextField source="price" />
                    <TextField source="discount" />
                    <ReferenceField label="category" source="category" reference="product_categories">
                        <TextField source="name" />
                    </ReferenceField>
                    <ShowButton />
                    <DeleteButton />
                </Datagrid>
            }
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => record.category}
                    tertiaryText={record => record.short_description}
                />
            }
        />
    </List>
);

const ProductTitle = ({ record }) => <span>{record ? `${record.name}` : ''}</span>;

ProductTitle.propTypes = {
    record: PropTypes.object,
};

export const ProductEdit = props => (

    <CustomForm apiUrl={'http://localhost:3000/api/products'} apiMethod={'put'} {...props} actions={<PostEditActions />} />

);

export const ProductCreate = props => (
    <CustomForm apiUrl={'http://localhost:3000/api/products'} apiMethod={'post'} {...props} />
);

export const ProductShow = props => (
    <Tabs>
        <TabList>
            <Tab>اطلاعات محصول</Tab>
            <Tab>تصاویر</Tab>
        </TabList>

        <TabPanel>
            <Show {...props}>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="short_description" />
                    <TextField source="long_description" />
                    <TextField source="price" />
                    <TextField source="discount" />
                    <ReferenceField label="category" source="category" reference="product_categories">
                        <TextField source="name" />
                    </ReferenceField>
                </SimpleShowLayout>
            </Show>
        </TabPanel>
        <TabPanel>
            <ShowProductImages  {...props.match.params} />
        </TabPanel>
    </Tabs>

);

export class ShowProductImages extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            mainImage: null,
            firstImage: null,
            secondImage: null,
            thirdImage: null,
            forthImage: null,

            mainImageId: null,
            firstImageId: null,
            secondImageId: null,
            thirdImageId: null,
            forthImageId: null,
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/products/${this.props.id}`)
            .then(res => {
                const product = res.data;
                this.setState({
                    mainImageId: product.mainImageId,
                    firstImageId: product.firstImageId,
                    secondImageId: product.secondImageId,
                    thirdImageId: product.thirdImageId,
                    forthImageId: product.forthImageId,
                });
            })
            .then(res => {

                axios.get(`http://localhost:3000/api/product_files/download?fileId=${this.state.mainImageId}`)
                    .then(res => {
                        const img = res['config']['url']
                        this.setState({
                            mainImage: img,
                        });
                    })
            })
            .then(res => {

                axios.get(`http://localhost:3000/api/product_files/download?fileId=${this.state.firstImageId}`)
                    .then(res => {
                        const img = res['config']['url']
                        this.setState({
                            firstImage: img,
                        });
                    })
            })
            .then(res => {

                axios.get(`http://localhost:3000/api/product_files/download?fileId=${this.state.secondImageId}`)
                    .then(res => {
                        const img = res['config']['url']
                        this.setState({
                            secondImage: img,
                        });
                    })
            })
            .then(res => {

                axios.get(`http://localhost:3000/api/product_files/download?fileId=${this.state.thirdImageId}`)
                    .then(res => {
                        const img = res['config']['url']
                        this.setState({
                            thirdImage: img,
                        });
                    })
            })
            .then(res => {

                axios.get(`http://localhost:3000/api/product_files/download?fileId=${this.state.forthImageId}`)
                    .then(res => {
                        const img = res['config']['url']
                        this.setState({
                            forthImage: img,
                        });
                    })
            })
            .then(res => {

                console.log(this.state)
            })

    }
    render() {
        return (

            <Grid>
                <Row>
                    <Col xs={6} md={4}>
                        <Thumbnail src={this.state.mainImage} alt="242x200">
                            <h3 style={{ 'textAlign': 'center' }}>عکس اصلی</h3>
                            <p>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={6} md={4}>
                        <Thumbnail src={this.state.firstImage} alt="242x200">
                            <h3 style={{ 'textAlign': 'center' }}>عکس اول</h3>

                            <p>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={6} md={4}>
                        <Thumbnail src={this.state.secondImage} alt="242x200">
                            <h3 style={{ 'textAlign': 'center' }}>عکس دوم</h3>
                            <p>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={6} md={4}>
                        <Thumbnail src={this.state.thirdImage} alt="242x200">
                            <h3 style={{ 'textAlign': 'center' }}>عکس سوم</h3>
                            <p>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={6} md={4}>
                        <Thumbnail src={this.state.forthImage} alt="242x200">
                            <h3 style={{ 'textAlign': 'center' }}>عکس چهارم</h3>
                            <p>
                            </p>
                        </Thumbnail>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
function FieldGroup({ id, label, help, onChange, ...props, }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel style={{ float: 'right' }}>{label}</ControlLabel>
            <FormControl {...props} onChange={onChange} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export const PostEditActions = ({ basePath, data, resource }) => (
    <div>
        <ShowButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} resource={resource} />
        <RefreshButton />
    </div>
);


export default class CustomForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            apiUrl: props.apiUrl,
            apiMethod: props.apiMethod,
            name: null,
            price: null,
            discount: null,
            short_description: null,
            long_description: null,
            category: null,

            mainImage: null,
            firstImage: null,
            secondImage: null,
            thirdImage: null,
            forthImage: null,

            mainImageShow: null,
            firstImageShow: null,
            secondImageShow: null,
            thirdImageShow: null,
            forthImageShow: null,

            mainImageId: null,
            firstImageId: null,
            secondImageId: null,
            thirdImageId: null,
            forthImageId: null,
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.checkFiles = this.checkFiles.bind(this)
    }




    componentDidMount() {
        if (this.props.match.params.id) {


            axios.get(`http://localhost:3000/api/products/${this.props.match.params.id}`)
                .then(res => {
                    const product = res.data;
                    this.setState({
                        mainImageId: product.mainImageId,
                        firstImageId: product.firstImageId,
                        secondImageId: product.secondImageId,
                        thirdImageId: product.thirdImageId,
                        forthImageId: product.forthImageId,

                        name: product.name,
                        price: product.price,
                        discount: product.discount,
                        short_description: product.short_description,
                        long_description: product.long_description,
                        category: category,
                    });
                })
                .then(res => {
                    if (this.state.mainImageId) {
                        axios.get(`http://localhost:3000/api/product_files/download?fileId=${this.state.mainImageId}`
                            , { responseType: 'arraybuffer' })
                            .then(response => {
                                const base64 = btoa(
                                    new Uint8Array(response.data).reduce(
                                        (data, byte) => data + String.fromCharCode(byte),
                                        '',
                                    ),
                                );
                                this.setState({
                                    mainImage: "data:;base64," + base64
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

        if (this.state.mainImage) {

            this.fileUpload(this.state.mainImage)
                .then((response) => {
                    this.setState({
                        mainImageId: response.data['_id']
                    }, function () {
                        if (this.state.firstImage) {
                            this.fileUpload(this.state.firstImage)
                                .then((response) => {
                                    this.setState({
                                        firstImageId: response.data['_id']

                                    }, function () {
                                        if (this.state.secondImage) {
                                            this.fileUpload(this.state.secondImage)
                                                .then((response) => {
                                                    this.setState({
                                                        secondImageId: response.data['_id']
                                                    }, function () {
                                                        if (this.state.thirdImage) {
                                                            this.fileUpload(this.state.thirdImage)
                                                                .then((response) => {
                                                                    this.setState({
                                                                        thirdImageId: response.data['_id']
                                                                    }, function () {
                                                                        if (this.state.forthImage) {
                                                                            this.fileUpload(this.state.forthImage)
                                                                                .then((response) => {
                                                                                    this.setState({
                                                                                        forthImageId: response.data['_id']
                                                                                    }, function () {
                                                                                        const url = this.state.apiUrl;
                                                                                        axios({
                                                                                            method: this.state.apiMethod,
                                                                                            url: url,
                                                                                            data: {
                                                                                                name: this.state.name,
                                                                                                price: this.state.price,
                                                                                                discount: this.state.discount,
                                                                                                short_description: this.state.short_description,
                                                                                                long_description: this.state.long_description,
                                                                                                category: this.state.category,
                                                                                                mainImageId: this.state.mainImageId,
                                                                                                firstImageId: this.state.firstImageId,
                                                                                                secondImageId: this.state.secondImageId,
                                                                                                thirdImageId: this.state.thirdImageId,
                                                                                                forthImageId: this.state.forthImageId
                                                                                            }
                                                                                        }).then(() => {
                                                                                            this.setState({
                                                                                                name: null,
                                                                                                price: null,
                                                                                                discount: null,
                                                                                                short_description: null,
                                                                                                long_description: null,
                                                                                                category: null,

                                                                                                mainImage: null,
                                                                                                firstImage: null,
                                                                                                secondImage: null,
                                                                                                thirdImage: null,
                                                                                                forthImage: null,

                                                                                                mainImageShow: null,
                                                                                                firstImageShow: null,
                                                                                                secondImageShow: null,
                                                                                                thirdImageShow: null,
                                                                                                forthImageShow: null,

                                                                                                mainImageId: null,
                                                                                                firstImageId: null,
                                                                                                secondImageId: null,
                                                                                                thirdImageId: null,
                                                                                                forthImageId: null,
                                                                                            });

                                                                                        })
                                                                                    })
                                                                                })
                                                                        }
                                                                    })
                                                                })
                                                        }
                                                    })
                                                })
                                        }
                                    })
                                })
                        }
                    })
                })






        }

        return (true)
    }

    onChange(event) {
        const target = event.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.id;
        if (target.type === 'file') {
            var reader = new FileReader();
            var url = reader.readAsDataURL(target.files[0]);
            reader.onloadend = function (e) {
                var stateName = name + "Show"
                this.setState({
                    [stateName]: [reader.result]
                })
            }.bind(this);
        }

        this.setState({
            [name]: value
        });
    }
    fileUpload(file) {
        const url = 'http://localhost:3000/api/product_files/container/upload';
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
            <form style={{ direction: 'rtl' }} onSubmit={this.onFormSubmit}>
                {this.props.actions}
                <Tabs>
                    <TabList>
                        <Tab>اطلاعات محصول</Tab>
                        <Tab>تصاویر</Tab>
                    </TabList>
                    <TabPanel>


                        <FieldGroup
                            id="name"
                            type="text"
                            label="نام محصول"
                            onChange={this.onChange}
                            value={this.state.name ? this.state.name : ''}
                        />


                        <FieldGroup
                            id="price"
                            type="text"
                            label="قیمت"
                            onChange={this.onChange}
                            value={this.state.price ? this.state.price : ''}
                        />
                        <FieldGroup
                            id="discount"
                            type="text"
                            label="تخفیف"
                            onChange={this.onChange}
                            value={this.state.discount ? this.state.discount : ''}
                        />

                        <FieldGroup
                            id="category"
                            type="text"
                            label="نوع"
                            onChange={this.onChange}
                            value={this.state.category ? this.state.category : ''}
                        />
                        
                        <FieldGroup
                            id="short_description"
                            label="توضیح کوتاه"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.short_description ? this.state.short_description : ''} />

                        <FormGroup controlId="long_description">
                            <ControlLabel style={{ float: 'right' }}>توضیح کامل</ControlLabel>
                            <FormControl onChange={this.onChange} componentClass="textarea"
                                placeholder="توضیحات خود را وارد کنید"
                                value={this.state.long_description ? this.state.long_description : ''} />
                        </FormGroup>



                    </TabPanel>
                    <TabPanel>

                        <FieldGroup
                            id="mainImage"
                            label="تصویر اصلی"
                            type="file"
                            onChange={this.onChange}
                        />
                        <img src={this.state.mainImageShow} />

                        <FieldGroup
                            id="firstImage"
                            label="تصویر اول"
                            type="file"
                            onChange={this.onChange} />

                        <img src={this.state.firstImageShow} />
                        <FieldGroup

                            id="secondImage"
                            label="تصویر دوم"
                            type="file"
                            onChange={this.onChange} />

                        <img src={this.state.secondImageShow} />

                        <FieldGroup
                            id="thirdImage"
                            label="تصویر سوم"
                            type="file"
                            onChange={this.onChange} />

                        <img src={this.state.thirdImageShow} />

                        <FieldGroup
                            id="forthImage"
                            label="تصویر چهارم"
                            type="file"
                            onChange={this.onChange} />

                        <img src={this.state.forthImageShow} />

                    </TabPanel>
                </Tabs>
                <Button type="submit">ذخیره</Button>
            </form>
        )
    }
}

