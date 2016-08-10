import React, { PropTypes } from 'react'
import AboutView  from '../views/AboutView.js'
import {hashHistory} from 'react-router'


export default class AddTeams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
        nickname: '',
        officialname: '',
        group: ''
      },
      submitting: false,
    }
  }

  _submit(e){
    e.preventDefault();
    this.setState({submitting: true})
    let model = {};
    for(var input in this.refs){
      model[input] = this.refs[input].value
    }

    if(!model.nickname.length || !model.officialname.length){
      // all data must be filled
      Swal({
        title: 'Semua data harus diisi!',
        type: 'error'
      })

      return false;
    }

    database.ref('/2016/teams/').push(model).then((snapshot)=>{
      console.log('BERHASIL MENAMBAH', snapshot);
      hashHistory.push('/kelola/tim')
      this.setState({submitting: false})
    })

  }

  render() {
    return (<div>
          <div className="row">
              <div className="col-xs-4 col-md-push-4">
                <form>
                <input ref="nickname" placeholder="Team Nickname" type="text" className="form-control"/>
                <br/>
                <input ref="officialname" placeholder="Team Official Name" type="text" className="form-control"/>
                <br/>
                <select ref="group" className="form-control">
                  <option value="1">Group A</option>
                  <option value="2">Group B</option>
                </select>
                <br/>
                <input type="submit" className="btn btn-primary" value="save"
                  onClick={this._submit.bind(this)}
                  disabled={this.state.submitting ? "disabled" : ""}
                  />
              </form>
              </div>
          </div>
    </div>);
  }
}

AddTeams.propTypes = {
};
