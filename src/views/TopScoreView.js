import React, {PropTypes} from 'react';
import PageWrapperFront from './layouts/PageWrapperFront'

export default class TopScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scorers: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchTopScore();
  }

  fetchTopScore(){
    this.setState({loading: true})
    database.ref(firepath + '/players/').orderByChild('goal')
    .startAt(1)
    .endAt(100)
    .once('value', (snap)=>{
      let PlayersObj = snap.val();

      database.ref(firepath + '/teams/').once('value', (snap)=>{
        let TeamsObj = snap.val();
        let PlayersArray = [];
        for(var playerKey in PlayersObj){
          PlayersObj[playerKey].team = TeamsObj[PlayersObj[playerKey].team]
          PlayersArray.push(PlayersObj[playerKey])
        }

        PlayersArray.sort((a,b)=>{
          return b.goal-a.goal;

        })
        console.log(PlayersArray, 'PLAYERS ARRAY');
        PlayersArray = PlayersArray.filter((item, index)=>{
          return item.name.toLowerCase().indexOf('own goal') < 0;
        })
        this.setState({scorers: PlayersArray, loading: false})
      })
    })
  }

  render() {
    if(this.state.loading){
      return <div className="container"><Loading/></div>
    }
    return (<div>
      <PageWrapperFront title="Top Skor">
        <div className="col-md-6 col-md-push-3">
        <table className="table-striped table table-bordered">
          <thead>
            <tr>
              <th style={{width: '40px'}}>No</th>
              <th>Tim</th>
              <th>Pemain</th>
              <th style={{width: '50px'}}>Gol</th>
            </tr>
          </thead>
          <tbody>
            {this.state.scorers.map((scorer, index)=>{
              return <tr key={index}>
                <th>{index + 1}</th>
                <th><img src={scorer.team.logo_url} width="42px"/></th>
                <th>
                  {scorer.name} ({scorer.team.officialname})
                </th>
                <th>{scorer.goal}</th>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </PageWrapperFront>
    </div>);
  }
}

TopScore.propTypes = {
};
