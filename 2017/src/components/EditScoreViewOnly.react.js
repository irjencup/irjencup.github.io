import React, {PropTypes} from 'react';
import PlayerList from './PlayerList.react'
import ScorerListViewOnly from './ScorerListViewOnly.react'


export default class EditScore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: null,
      player2: null
    }
  }

  _addGoal(team){
    let t = null;
    let the_scorers = null;
    let player = null;
    let scoreFor = ''
    switch(team){
      case 'team1':
        t = this.props.match.team1;
        the_scorers = this.props.match.scorer1;
        player = this.state.player1;
        scoreFor = 1
      break;
      case 'team2':
        t = this.props.match.team2;
        the_scorers = this.props.match.scorer2;
        player = this.state.player2;
        scoreFor = 2
      break;
    }

    if(player == null){
      Swal({
        type: 'error',
        title: 'Pilih Pencetak Gol Dulu!'
      })
      return false;
    }

    let { match } = this.props
    // let scorers = _.extend({}, the_scorers)
    let scorerKey = database.ref(firepath + '/matches/'+match.key + '/scorer'+ scoreFor).push(player.key).key;


    let updates = {}
        updates[firepath + '/matches/'+ match.key + '/score'+scoreFor] = parseInt(match['score'+scoreFor]) + 1;
        updates[firepath + '/players/'+ player.key + '/goal'] = parseInt(player.goal) + 1

        database.ref().update(updates).then(()=>{
          this.props.onScoreUpdate()
        })
  }

  _onSelectPlayer(team, player){
    console.log(team);
    switch(team){
      case 'team1':
        this.setState({player1: player})
      break;
      case 'team2':
        this.setState({player2: player})
      break;
    }
  }

  _onDeleteScorer(){
    this.props.onScoreUpdate()
  }

  _onStatusChange(e){
    let status = e.target.value;

    // change match
    let updates = {}
        updates[firepath + '/matches/' + this.props.match.key + '/status'] = status;

    database.ref().update(updates).then(()=>{
      this.props.onScoreUpdate()
    })
  }

  render() {
    let { match, show } = this.props;
    return (<div style={show ? {display: 'block', overflow: 'hidden'} : {display: 'none'}}>
    <hr/>

      <div className="row">
        <div className="col-md-3">
          <ScorerListViewOnly
            side={1}
            match={match}
            team={match.team1}
            onDeleteScorer={this._onDeleteScorer.bind(this)}
            onSelectPlayer={this._onSelectPlayer.bind(this, 'team1')} />
        </div>
        <div className="col-md-2">
        </div>
        <div className="col-md-2">
        </div>
        <div className="col-md-3">
          <ScorerListViewOnly
            side={2}
            match={match}
            team={match.team2}
            onDeleteScorer={this._onDeleteScorer.bind(this)}
            onSelectPlayer={this._onSelectPlayer.bind(this, 'team2')} />
        </div>
        <div className="col-md-2">
        </div>
      </div>

    </div>);
  }
}

EditScore.propTypes = {
};
