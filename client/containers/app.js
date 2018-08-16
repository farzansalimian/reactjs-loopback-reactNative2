import React, {Component} from 'react';
import { Route, IndexRoute } from 'react-router';
import { Resource, Admin, sfSaga, apiClient } from 'admin-on-rest';
import loopbackRestClient, {authClient} from 'aor-loopback';
import { Delete } from 'admin-on-rest/lib/mui';
import messages from '../messages';

import { UserList, UserShow, UserCreate, UserEdit } from './crud/user';
import {NewsList, NewsEdit, NewsCreate, NewsShow} from './crud/news'
import {AboutUsList, AboutUsEdit, AboutUsCreate, AboutUsShow} from './crud/about_us'

import {PhoneNumberList, PhoneNumberListEdit, PhoneNumberListCreate, PhoneNumberListShow} from './crud/phone_number_list'
import {MotoList, MotoEdit, MotoCreate, MotoShow} from './crud/moto'
import {IntroductionList, IntroductionEdit, IntroductionCreate, IntroductionShow} from './crud/introduction'
import {GalleryList, GalleryEdit, GalleryCreate, GalleryShow} from './crud/gallery'
import {DictionaryList, DictionaryEdit, DictionaryCreate, DictionaryShow} from './crud/dictionary'
import {QuestionnaireList, QuestionnaireEdit, QuestionnaireCreate, QuestionnaireShow} from './crud/questionnaire'
import {QuestionnaireAnswersList, QuestionnaireAnswersEdit, QuestionnaireAnswersCreate, QuestionnaireAnswersShow} from './crud/questionnaire_answers'

import {EmployeeList, EmployeeEdit, EmployeeCreate, EmployeeShow} from './crud/employee'
// auto gen crud, please don't remove this comment


class App extends Component {
  render() {
    return (
      <Admin
        restClient={loopbackRestClient(__API_URL__)}
        title='مدیریت پایگاه داده'
        messages={messages}
        logoutUrl="/logout"
        authClient={authClient('http://localhost:3000/api/Users/login')}
      >
        <Resource name='app_users' remove={Delete} list={UserList} edit={UserEdit} create={UserCreate} show={UserShow}  />
        <Resource name='news' remove={Delete} list={NewsList} edit={NewsEdit} create={NewsCreate} show={NewsShow}/>
        <Resource name='about_us' remove={Delete} list={AboutUsList} edit={AboutUsEdit} create={AboutUsCreate} show={AboutUsShow}/>
        <Resource name='phone_number_lists' remove={Delete} list={PhoneNumberList} edit={PhoneNumberListEdit} create={PhoneNumberListCreate} show={PhoneNumberListShow}/>
        <Resource name='galleries' remove={Delete} list={GalleryList} edit={GalleryEdit} create={GalleryCreate} show={GalleryShow}/>
        <Resource name='introductions' remove={Delete} list={IntroductionList} edit={IntroductionEdit} create={IntroductionCreate} show={IntroductionShow}/>
        <Resource name='employees' remove={Delete} list={EmployeeList} edit={EmployeeEdit} create={EmployeeCreate} show={EmployeeShow}/>
        <Resource name='motos' remove={Delete} list={MotoList} edit={MotoEdit} create={MotoCreate} show={MotoShow}/>
        <Resource name='dictionaries' remove={Delete} list={DictionaryList} edit={DictionaryEdit} create={DictionaryCreate} show={DictionaryShow}/>
        <Resource name='questionnaires' remove={Delete} list={QuestionnaireList} edit={QuestionnaireEdit} create={QuestionnaireCreate} show={QuestionnaireShow}/>
        <Resource name='questionnaire_answers' remove={Delete} list={QuestionnaireAnswersList} edit={QuestionnaireAnswersEdit} create={QuestionnaireAnswersCreate} show={QuestionnaireAnswersShow}/>

      </Admin>
    );
  }
}

export default App;
