import React, {PropTypes} from 'react';
import Spinner from 'react-spinkit'

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
        <div className="container" style={{textAlign: 'center'}}>
          <Spinner name="three-bounc" noFadeIn/>
        </div>
    </div>);
  }
}

Loading.propTypes = {
};
