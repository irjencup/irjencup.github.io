import React, {PropTypes} from 'react';
import PageWrapperFront from './layouts/PageWrapperFront'
import EditScoreViewOnly from '../components/EditScoreViewOnly.react'

export default class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      groupa: [],
      groupb: [],
      perempatfinal: [],
      semifinal:[],
      finalmatch:[],
      loading: true,
      editedMatch: {},
      match_type: 'groupa'
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
    database.ref(firepath + '/matches').on('value',
            (snapshot)=>{
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
            this.classifyMatch(matchList)

          })
  }

  classifyMatch(matches){
    let groupa = matches.filter((match, index)=>{
      return parseInt(match.group) == 1
    })

    let groupb = matches.filter((match, index)=>{
      return parseInt(match.group) == 2
    })

    let groupc = matches.filter((match, index)=>{
      return parseInt(match.group) == 3
    })

    let perempatfinal = matches.filter((match, index)=>{
      return match.stage == 'quarter'
    })

    let semifinal = matches.filter((match, index)=>{
      return match.stage == 'semi'
    })

    let finalmatch = matches.filter((match, index)=>{
      return match.stage == 'final'
    })

    this.setState({
      groupa: groupa,
      groupb: groupb,
      groupc: groupc,
      perempatfinal: perempatfinal,
      semifinal: semifinal,
      finalmatch: finalmatch
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

  _deleteMatch(match){
    Swal({
      title: 'Yakin hapus pertandingan?',
      text: match.team1.officialname + ' vs ' + match.team2.officialname,
      showCancelButton: true,
      closeOnConfirm: false,
    }, ()=>{
      // delete match
      // TODO
      console.log(match, 'MATCH');
      if(match.scorer1 || match.scorer2){
        Swal({
          title: 'Hapus dulu semua gol!',
          text: 'Sebelum menghapus pertandingan, hapus dulu semua pencetak gol',
          type: 'error',
        }, ()=>{
        })
        return false;
      }

      // trully delete
      database.ref(firepath + '/matches/' + match.key).remove().then(()=>{
        Swal({
          title:'Berhasil Menghapus Pertandingan',
          type: 'success'
        }, ()=>{
          this.getMatches()
        })
      })

    })
  }

  _onScoreUpdate(){
    this.getMatches();
  }

  changeMatchType(e){
    let match_type = e.target.value;
    this.setState({match_type: match_type})
  }

  showTitle(){
    let {match_type} = this.state
    let title = '';
    switch (match_type) {
      case 'groupa':
        title = 'Grup 1'
        break;
      case 'groupb':
        title = 'Grup 2';
        break;
      case 'groupc':
        title = 'Grup 3';
        break;
      case 'perempatfinal':
        title = 'Perempat Final';
        break;
      case 'semifinal':
        title = 'Semi Final'
        break;
      case 'finalmatch':
        title = 'Final';
        break;
      default:

    }
    return (<h2>
      {title}
    </h2>)
  }

  render() {
    if(this.state.loading){
      return <div className="container"><Loading/></div>
    }

    let { selectedMatch }  = this.state
    return (<div>
      <PageWrapperFront title="Jadwal Pertandingan"
        >
        <div className="row">
          <div onChange={this.changeMatchType.bind(this)} className="col-md-4 col-md-push-4">
            <select className="form-control" id="">
              <option value="groupa">Grup 1</option>
              <option value="groupb">Grub 2</option>
              <option value="groupc">Grub 3</option>
              <option value="perempatfinal">Perempat Final</option>
              <option value="semifinal">Semi Final</option>
              <option value="finalmatch">Final</option>
            </select>
          </div>
        </div>
        <h2>{this.showTitle()}</h2>
        <ul className="list-group">
          {this.state[this.state.match_type].map((the_match, index)=>{
            return <li className="list-group-item" key={index} style={{ border: "1px solid gold", color: "#fff", marginBottom: "10px", background: "rgba(0,0,0,0.5)" }}>
                <div className="row">
                  <div className="col-xs-5" style={{textAlign: "right"}}>
                    <img src={the_match.team1.logo_url} alt="logo_tim" width="45px" />
                  </div>
                  <div className="col-xs-2" />
                  <div className="col-xs-5" style={{textAlign: "left"}}>
                    <img src={the_match.team2.logo_url} alt="logo_tim" width="45px" />
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-xs-5 col-xs-5" style={{ textAlign: "right" }}>
                    <div className="col-xs-8 col-md-10">
                      {the_match.team1.officialname}
                    </div>
                    <div className="col-xs-2 btn btn-sm btn-info">
                      {the_match.score1}
                    </div>
                  </div>
                  <div className="col-xs-2 col-md-2" style={{ textAlign: "center" }}>
                    vs
                  </div>
                  <div className="col-xs-5 col-md-5" style={{ textAlign: "left" }}>
                    <div className="col-xs-2 btn btn-sm btn-info">
                      {the_match.score2}
                    </div>
                    <div className="col-xs-8 col-md-10">
                      {the_match.team2.officialname}
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-xs-12">
                    <span className="btn btn-xs btn-success">
                      {the_match.date}
                    </span>
                    {parseInt(the_match.status) == 2 ? <span className="btn btn-xs btn-info">
                        selesai
                      </span> : ""}
                    {parseInt(the_match.status) == 1 ? <span className="btn btn-xs btn-info">
                        sedang berlangsung
                      </span> : ""}
                    <span style={{ float: "right" }} onClick={this._editMatch.bind(this, the_match)} className="btn btn-xs btn-primary">
                      lihat scorer
                    </span>
                  </div>
                </div>
                <EditScoreViewOnly show={this.state.editedMatch.key == the_match.key} match={the_match} onScoreUpdate={this._onScoreUpdate.bind(this)} />
              </li>;
          })}
        </ul>

      </PageWrapperFront>
    </div>);
  }
}

ScheduleView.propTypes = {
};
