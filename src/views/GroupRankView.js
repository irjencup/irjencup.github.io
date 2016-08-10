import React, {PropTypes} from 'react';
import PageWrapper from './layouts/PageWrapper'

export default class GroupRankView extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      teams: [],
      loading: true
    }
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps)
  }

  fetchData(props){
    this.setState({loading: true})
    database.ref(firepath + '/teams/').orderByChild('group')
    .startAt(props.params.id)
    .endAt(props.params.id)
    .once('value', (snap)=>{
      let TeamsObj = snap.val();

      // now fetch all match in this group
      database.ref(firepath + '/matches/').orderByChild('group')
      .startAt(props.params.id)
      .endAt(props.params.id)
      .once('value', (snap)=>{
        let MatchesObj = snap.val();
        // now filter only a finish match
        for(var matchKey in MatchesObj){
          if(parseInt(MatchesObj[matchKey].status) != 2){
            delete MatchesObj[matchKey]
          }
        }

        this.calculatePoints(TeamsObj, MatchesObj)

      })
    })
  }

  calculatePoints(TeamsObj, MatchesObj){
    // first set default points, draw, etc
    for(var teamKey in TeamsObj){
      TeamsObj[teamKey].win = 0;
      TeamsObj[teamKey].draw = 0;
      TeamsObj[teamKey].lost = 0;
      TeamsObj[teamKey].points = 0;
      TeamsObj[teamKey].play = 0;
      TeamsObj[teamKey].goal = 0;
      TeamsObj[teamKey].goaled = 0;
    }


    for(var matchKey in MatchesObj){
      let Match = MatchesObj[matchKey]

      // DECIDE WIN and POINT
      if(Match.score1 > Match.score2){
        // first team won
        TeamsObj[Match.team1].win = (!TeamsObj[Match.team1].win ? 1 : TeamsObj[Match.team1].win + 1)
        TeamsObj[Match.team1].points = (!TeamsObj[Match.team1].points ? 3 : TeamsObj[Match.team1].points + 3)
        // second team lost
        TeamsObj[Match.team2].lost = (!TeamsObj[Match.team2].lost ? 1 : TeamsObj[Match.team2].lost + 1)
      } else if (Match.score1 < Match.score2) {
        // add one win to first team
        TeamsObj[Match.team2].win = (!TeamsObj[Match.team2].win ? 1 : TeamsObj[Match.team2].win + 1)
        TeamsObj[Match.team2].points = (!TeamsObj[Match.team2].points ? 3 : TeamsObj[Match.team2].points + 3)
        // ad one lost to fist team
        TeamsObj[Match.team1].lost = (!TeamsObj[Match.team1].lost ? 1 : TeamsObj[Match.team1].lost + 1)
      } else {
        // draw
        TeamsObj[Match.team1].draw = (!TeamsObj[Match.team1].draw ? 1 : TeamsObj[Match.team1].draw + 1)
        TeamsObj[Match.team2].draw = (!TeamsObj[Match.team2].draw ? 1 : TeamsObj[Match.team2].draw + 1)
        TeamsObj[Match.team1].points = (!TeamsObj[Match.team1].points ? 1 : TeamsObj[Match.team1].points + 1)
        TeamsObj[Match.team2].points = (!TeamsObj[Match.team2].points ? 1 : TeamsObj[Match.team2].points + 1)
      }

      // goal and goaled
      TeamsObj[Match.team1].goal = (!TeamsObj[Match.team1].goal ? Match.score1 : TeamsObj[Match.team1].goal + Match.score1)
      TeamsObj[Match.team2].goal = (!TeamsObj[Match.team2].goal ? Match.score2 : TeamsObj[Match.team2].goal + Match.score2)

      TeamsObj[Match.team1].goaled = (!TeamsObj[Match.team1].goaled ? Match.score2 : TeamsObj[Match.team1].goaled + Match.score2)
      TeamsObj[Match.team2].goaled = (!TeamsObj[Match.team2].goaled ? Match.score1 : TeamsObj[Match.team2].goaled + Match.score1)

      // match played
      TeamsObj[Match.team1].play = (!TeamsObj[Match.team1].play ? 1 : TeamsObj[Match.team1].play + 1)
      TeamsObj[Match.team2].play = (!TeamsObj[Match.team2].play ? 1 : TeamsObj[Match.team2].play + 1)



    }
    this.makeTable(TeamsObj)
  }

  makeTable(TeamsObj){
    let TeamsArray = []

    for(var teamKey in TeamsObj){
      TeamsArray.push(TeamsObj[teamKey])
    }

    TeamsArray.sort((a,b)=>{
      if (a.points > b.points) return -1
      if (b.points > a.points) return 1

      if (parseInt(a.goal) - parseInt(a.goaled) > parseInt(b.goal) - parseInt(b.goaled)) return -1
      if (parseInt(b.goal) - parseInt(b.goaled) > parseInt(a.goal) - parseInt(a.goaled)) return 1

    })

    this.setState({teams: TeamsArray, loading: false})

  }

  render() {
    let {teams} = this.state
    if(!teams.length){
      return <div className="container"><Loading></Loading></div>
    }
    return (<div>
      <PageWrapper title="Group Rank">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{width: '30px', textAlign: 'right'}}>peringkat</th>
                <th>team</th>
                <th style={{textAlign: 'center'}}>poin</th>
                <th style={{textAlign: 'center'}}>selisih gol</th>
                <th></th>
                <th style={{textAlign: 'center'}}>main</th>
                <th style={{textAlign: 'center'}}>menang</th>
                <th style={{textAlign: 'center'}}>draw</th>
                <th style={{textAlign: 'center'}}>kalah</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index)=>{
                return <tr key={index}>
                    <th style={{textAlign: 'right'}}>{index+1}</th>
                    <th>{team.officialname}</th>
                    <th style={{textAlign: 'center'}}>{team.points}</th>
                    <th style={{textAlign: 'center'}}>{parseInt(team.goal) - parseInt(team.goaled)}</th>
                    <th></th>
                    <th style={{textAlign: 'center'}}>{team.play}</th>
                    <th style={{textAlign: 'center'}}>{team.win}</th>
                    <th style={{textAlign: 'center'}}>{team.draw}</th>
                    <th style={{textAlign: 'center'}}>{team.lost}</th>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </PageWrapper>
    </div>);
  }
}

GroupRankView.propTypes = {
};
