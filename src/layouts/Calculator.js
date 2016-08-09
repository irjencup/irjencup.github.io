import React from 'react'
import { Link } from 'react-router'
import '../styles/app.css'

export default function CalculatorLayout({children}){
    return (<div>
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">IJCUP2016</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Grup <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Grup A</a></li>
                  <li><a href="#">Grup B</a></li>
                </ul>
              </li>
              <li><a href="#"> Jadwal <span className="sr-only"></span></a></li>

              <li><a href="#"> Top Skor <span className="sr-only"></span></a></li>

            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/#/kelola/tim">Kelola Tim</a></li>
              <li><a href="#">Kelola Pemain</a></li>
              <li><a href="/#/kelola/pertandingan">Kelola Pertandingan</a></li>
              <li className="dropdown">
                <a href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false">Manage Tim <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Add Tim</a></li>
                  <li><a href="#">Grup B</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        {children}
    </div>)
}