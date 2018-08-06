import React, {Component} from 'react';
import { Route, IndexRoute } from 'react-router';
import { Resource, Admin, sfSaga, apiClient } from 'admin-on-rest';
import loopbackRestClient, {authClient} from 'aor-loopback';
import { Delete } from 'admin-on-rest/lib/mui';
import messages from '../messages';

import { UserList, UserShow, UserCreate, UserEdit } from './crud/user';
import {ProductList, ProductEdit, ProductCreate, ProductShow} from './crud/product'
import {CommentList, CommentEdit, CommentCreate, CommentShow} from './crud/comment'
import {CategoryList, CategoryEdit, CategoryCreate, CategoryShow} from './crud/category'

import {PurchaseList, PurchaseEdit, PurchaseCreate, PurchaseShow} from './crud/purchase'
import {RatingList, RatingEdit, RatingCreate, RatingShow} from './crud/rating'
// auto gen crud, please don't remove this comment


class App extends Component {
  render() {
    return (
      <Admin
        restClient={loopbackRestClient(__API_URL__)}
        title='مدیریت پایگاه داده'
        messages={messages}
        logoutUrl="/logout"
        authClient={authClient('http://localhost:3000/api/users/login')}
      >
        <Resource name='users' remove={Delete} list={UserList} edit={UserEdit} create={UserCreate} show={UserShow}  />
        <Resource name='products' remove={Delete} list={ProductList} edit={ProductEdit} create={ProductCreate} show={ProductShow}/>
        <Resource name='comments' remove={Delete} list={CommentList} edit={CommentEdit} create={CommentCreate} show={CommentShow}/>
        <Resource name='purchases' remove={Delete} list={PurchaseList} edit={PurchaseEdit} create={PurchaseCreate} show={PurchaseShow}/>
        <Resource name='ratings' remove={Delete} list={RatingList} edit={RatingEdit} create={RatingCreate} show={RatingShow}/>
        <Resource name='product_categories' remove={Delete} list={CategoryList} edit={CategoryEdit} create={CategoryCreate} show={CategoryShow}/>

      </Admin>
    );
  }
}

export default App;
