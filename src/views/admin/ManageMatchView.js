import React, {PropTypes} from 'react';
import PageWrapper from '../layouts/PageWrapper'
import EditScore from '../../components/EditScore.react'

export default class ManageMatchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      loading: true,
      editedMatch: {}
    }
  }

  componentDidMount() {
    this.getMatches()
  }

  getMatches(){
    this.setState({loading: true})
    database.ref(firepath + '/teams').once('value')
            .then((snapshot)=>{
              let teams = snapshot.val();
              let teamList = [];
              for(var team in teams){
                teams[team].key = team;
              }
              this.mergeWithMatch(teams)
            })


  }

  mergeWithMatch(teamList){
    database.ref(firepath + '/matches').once('value')
            .then((snapshot)=>{
              let matches = snapshot.val();
              let matchList = [];

              for(var the_match in matches){
                matchList.push(_.extend({}, matches[the_match], {key: the_match}))
              }

            matchList = matchList.map((tmatch, index)=>{
              tmatch.team1 = teamList[tmatch.team1]
              tmatch.team2 = teamList[tmatch.team2]
              return tmatch
            })


            this.setState({matches: matchList, loading: false})

          })
  }


  onGoalAdded(){
    this.getMatches();
  }

  _editMatch(match){
    if(match.key == this.state.editedMatch.key){
      this.setState({editedMatch: {}})
      return false;
    }
    this.setState({editedMatch: match})
  }

  _onScoreUpdate(){
    this.getMatches();
  }

  render() {
    if(this.state.loading){
      return <div className="container"><Loading/></div>
    }

    let { selectedMatch }  = this.state
    return (<div>
      <PageWrapper title="Kelola Pertandingan"
        rightButton={[{label: 'Tambah Pertandingan', route: '/kelola/pertandingan/tambah'}]}
        >
        <ul className="list-group">
          {this.state.matches.map((the_match, index)=>{
            return <li className="list-group-item" key={index} style={{marginBottom: '10px'}}>
              <div className="row">
                <div className="col-md-2">
                  <span className="btn btn-xs btn-success">{the_match.date}</span>
                </div>
                <div className="col-md-3" style={{textAlign: 'right'}}>
                  {the_match.team1.officialname}
                </div>
                <div className="col-md-2" style={{textAlign: 'center'}}>
                  <span
                    style={{marginRight: '4px'}}
                     className="btn btn-sm btn-info">{the_match.score1}</span>
                   vs
                  <span
                    style={{marginLeft: '4px'}}
                    className="btn btn-sm btn-info">{the_match.score2}</span>
                </div>
                <div className="col-md-3">
                  {the_match.team2.officialname}
                </div>
                <div className="col-md-2" style={{textAlign: 'right'}}>
                  <span onClick={this._editMatch.bind(this, the_match)} className="btn btn-xs btn-primary">edit skor</span>
                </div>
              </div>
              <EditScore
                show={this.state.editedMatch.key == the_match.key}
                match={the_match}
                onScoreUpdate={this._onScoreUpdate.bind(this)}
                />
            </li>
          })}
        </ul>
      </PageWrapper>
    </div>);
  }
}

ManageMatchView.propTypes = {
};
