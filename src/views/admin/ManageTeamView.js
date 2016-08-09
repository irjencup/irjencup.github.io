import React, {PropTypes} from 'react';
import PageWrapper from '../layouts/PageWrapper'
import { connect } from 'react-redux'
import Loading from '../../components/Loading.react'
import  { Link } from 'react-router'


export default class ManageTeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getTeamList()
  }

  getTeamList(){
    this.setState({loading: true})
    database.ref(firepath + '/teams/').once('value').then((snapshot)=>{
      let teamsObj = snapshot.val();
      let teamList = [];

      for(var team in teamsObj){
        teamList.push(_.extend({}, teamsObj[team], {key: team}))
      }

      this.setState({teams: teamList, loading: false})
    })
  }

  _deleteTeam(team){
    Swal({
      title: 'Yakin hapus?',
      text: team.officialname,
      type: 'warning',
      showCancelButton: true,
    }, ()=>{
      database.ref(firepath + '/teams/'+team.key).remove().then(()=>{
        this.getTeamList()
      })
    })
  }

  render() {
    let { teams } = this.state
    if(this.state.loading){
      return <div className="container"><Loading/></div>
    }
    let groupa = teams.filter((team, index)=>{
      return team.group == 1
    })
    let groupb = teams.filter((team, index)=>{
      return team.group == 2
    })

    return (<div>
      <PageWrapper
        title={<span>Kelola Tim</span>}
        rightButton={[{label: 'Add Team', route: 'kelola/tim/tambah'}]}
        >
        <div className="col-md-6">
          <h3>Group A</h3>
          <ul className="list-group">
          {groupa.map((team, index)=>{
            return (<li className="list-group-item" key={index}>
              {team.officialname}
              <div style={{float: 'right'}}>
                <Link to={`/kelola/tim/${team.key}/pemain`}>
                <button
                  style={{marginRight: '5px'}}
                  className="btn btn-xs btn-success">daftar pemain</button>
                </Link>
                <button
                  onClick={this._deleteTeam.bind(this, team)}
                  className="btn btn-xs btn-danger">x</button>
              </div>
            </li>)
          })}
          </ul>
        </div>

        <div className="col-md-6">
          <h3>Group B</h3>
          <ul className="list-group">
          {groupb.map((team, index)=>{
            return <li className="list-group-item" key={index}>
              {team.officialname}
              <div style={{float: 'right'}}>
                <Link to={`/kelola/tim/${team.key}/pemain`}>
                <button
                  style={{marginRight: '5px'}}
                  className="btn btn-xs btn-success">daftar pemain</button>
                </Link>
                <button
                  onClick={this._deleteTeam.bind(this, team)}
                  className="btn btn-xs btn-danger">x</button>
              </div>
            </li>
          })}
          </ul>
        </div>


      </PageWrapper>
    </div>);
  }
}

ManageTeamView.propTypes = {
};
