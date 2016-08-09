import configureStore from './redux/configureStore'
import {Provider} from 'react-redux'
import Root from './containers/Root'
import React, { Component } from 'react'
import {render} from 'react-dom'
import { syncReduxAndRouter } from 'react-router-redux'
import {hashHistory} from 'react-router'
import routes from './routes/index'
import Swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import _ from 'lodash'
import config from './app.config'
import Loading from './components/Loading.react'
import Modal from 'react-modal'

let store = configureStore()
let rootElement = document.getElementById('render')

let firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");

// Initialize Firebase
var fireConfig = {
  apiKey: "AIzaSyAWyScryVqNNRjXOGa5aGiV3BAZK65y-WM",
  authDomain: "ijcup2016.firebaseapp.com",
  databaseURL: "https://ijcup2016.firebaseio.com",
  storageBucket: "ijcup2016.appspot.com",
};

firebase.initializeApp(fireConfig);

// Get a reference to the database service
window.database = firebase.database();
window.Swal = Swal;
window._ = _
window.config = config;
window.firepath = config.firepath
window.Loading = Loading
window.Modal = Modal

render(<Root store={store} routes={routes} history={hashHistory}  />, rootElement)
