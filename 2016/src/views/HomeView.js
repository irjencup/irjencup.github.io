import _  from 'lodash'
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

class HomeView extends Component{
    constructor(props){
        super(props)

        this.state = {
          teams: []
        }
    }

    componentDidMount(){

    }

    render(){
        let { currentUser } = this.props
        return (<div>
          <div className="container">
            <div className="col-md-12" style={{textAlign: 'center', color: '#fff', background: 'rgba(0,0,0,0.7)', marginTop: '100px'}}>
              <h1 style={{color: '#fff'}}>SELAMAT DATANG DI</h1>
              <h1 style={{color: '#fff', fontWeight: 'bold', fontSize: '80px'}}>IRJENCUP 2016</h1>
            </div>
          </div>
        </div>)
    }
}

HomeView.propTypes = {

}

HomeView.defaultProps = {
    currentUser : {}
}

HomeView.state = {

}


function mapStateToProps(state){
    return {
        currentUser: state.user
    }
}

export default connect(mapStateToProps)(HomeView)
