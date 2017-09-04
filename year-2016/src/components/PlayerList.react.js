import React, {PropTypes} from 'react';

export default class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    this.getPlayers()
  }

  getPlayers(){
    let {team} = this.props

    database.ref(firepath + '/players/').orderByChild('team')
            .startAt(team.key)
            .endAt(team.key)
            .once('value', (snapshot)=>{
              let playersObj = snapshot.val();
              let playerList = [];

              for(var player in playersObj){
                playerList.push(_.extend({}, playersObj[player], {key: player}))
              }
              this.setState({players: playerList})
            })
  }

  _selectPlayer(e){
    let selectedPlayer = e.target.value;
        selectedPlayer = _.filter(this.state.players, _.matches({key: selectedPlayer}))[0]
    this.props.onSelectPlayer(selectedPlayer)
  }

  render() {
    return (<div>
    <select onChange={this._selectPlayer.bind(this)} ref="playerSelected" className="form-control">
      <option value=""> Pilih Pemain </option>
    {this.state.players.map((player, index)=>{
      return <option key={index} value={player.key}>
        {player.name}
      </option>
    })}
    </select>
    </div>);
  }
}

PlayerList.propTypes = {
};
