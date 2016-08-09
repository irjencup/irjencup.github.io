import React, {Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import CalculatorLayout from '../layouts/Calculator'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'
import ManageTeamView from '../views/admin/ManageTeamView'
import AddTeamView from '../views/admin/AddTeamView'
import AddTeamPlayerView from '../views/admin/AddTeamPlayerView'
import ManageMatchView from '../views/admin/ManageMatchView'
import AddMatchView from '../views/admin/AddMatchView'


export default (
    <Route path="/" component={CalculatorLayout}>
        <IndexRoute component={HomeView} />
        <Route path="/about" component={AboutView} />


        <Route path="/kelola/tim" component={ManageTeamView}/>
        <Route path="/kelola/tim/tambah" component={AddTeamView} />
        <Route path="/kelola/tim/:key/pemain" component={AddTeamPlayerView} />
        <Route path="/kelola/pertandingan" component={ManageMatchView}/>
        <Route path="/kelola/pertandingan/tambah" component={AddMatchView} />
    </Route>
)
