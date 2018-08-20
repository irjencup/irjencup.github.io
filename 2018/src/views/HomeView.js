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
        return (<div style={{textAlign: 'center'}}>
            <br/>
            <br/>

            <img src="assets/fight-for-now.jpg" alt="fight-for-now" width="20%"/>
            <img src="assets/ic20182.jpg" alt="ic20182" width="20%"/>
            <img src="assets/pride-forever.jpg" alt="pride-forever" width="20%"/>
            
            <br/>
            <h2>
                25 Agustus - 8 September 2018 <br/>
                @Maestro Futsal Kemayoran <br/><br/>
                Hosted by BUKP - Website by BSIP <br/>
            </h2>
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
