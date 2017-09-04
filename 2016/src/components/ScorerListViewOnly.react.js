import React, {PropTypes} from 'react';

export default class ScorerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    this.getPlayers(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.getPlayers(nextProps)
  }

  getPlayers(props){
    let {team} = props

    database.ref(firepath + '/players/').orderByChild('team')
            .startAt(team.key)
            .endAt(team.key)
            .once('value', (snapshot)=>{
              let playersObj = snapshot.val();
              let playerList = [];

              for(var player in playersObj){
                playerList.push(_.extend({}, playersObj[player], {key: player}))
              }
            this.mergeWithPlayerObjects(playerList, props)
            })
  }

  mergeWithPlayerObjects(players, props){
    let scorers = null;
    switch(parseInt(props.side)){
      case 1:
        scorers = props.match.scorer1;
      break;
      case 2:
        scorers = props.match.scorer2;
      break;
    }
    console.log(scorers, 'SCORERS BRO');
    if(null == scorers){
      return;
    }

    console.log(scorers, 'SCORERS');

    let scorerList = [];
    for ( var player in scorers){
      scorerList.push(_.filter(players, _.matches({key: scorers[player]}))[0])
    }

    console.log(players, scorerList, 'after');



    this.setState({players: scorerList})

  }

  _selectPlayer(e){
    let selectedPlayer = e.target.value;
        selectedPlayer = _.filter(this.state.players, _.matches({key: selectedPlayer}))[0]
    this.props.onSelectPlayer(selectedPlayer)
  }

  _deleteGoal(player, goalKe){
    let team = null;
    let side = parseInt(this.props.side)
    let match = this.props.match;
    switch(parseInt(this.props.side)){
      case 1:
        team = this.props.match.team1;
      break;
      case 2:
        team = this.props.match.team2;
      break;
    }

    // to delete a goal
    // 1 decrease score of match
    // 2 decrease player goal
    // 3 delete player from match scorer

    let scorersObj = match['scorer'+side];
    let scorerList = []
    for(var scorer in scorersObj){
      scorerList.push(_.extend({}, {key: scorer}, {scorerKey:scorersObj[scorer]}))
    }

    scorerList.splice(goalKe, 1);
    let newScorersObj = {}
    scorerList.map((scorer, index)=>{
      newScorersObj[scorer.key] = scorer.scorerKey
    })



    let updates = {}
    updates[firepath + '/matches/' + match.key + '/score'+ side] = (parseInt(match['score' + side]) - 1) < 0 ? 0 : parseInt(match['score' + side]) - 1;
    updates[firepath + '/matches/' + match.key + '/scorer' + side] = newScorersObj;
    updates[firepath + '/players/' + player.key + '/goal'] = (parseInt(player.goal) - 1) < 0 ? 0 : parseInt(player.goal) - 1;

    console.log(updates, 'updates');

    database.ref().update(updates).then(()=>{
      this.props.onDeleteScorer()
    })

  }

  render() {
    console.log(this.state.players, 'PLAYERS');
    return (<div>
      <ul className="list-group">
        {this.state.players.map((player, index)=>{
          return <li key={index} value={player.key} className="list-group-item">
            {player.name}
          </li>
        })}
      </ul>
    </div>);
  }
}

ScorerList.propTypes = {
};
