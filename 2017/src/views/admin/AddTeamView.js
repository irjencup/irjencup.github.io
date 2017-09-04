import React, {PropTypes} from 'react';
import PageWrapper from '../layouts/PageWrapper'
import AddTeams from '../../components/AddTeams.react'

export default class AddTeamView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <PageWrapper
        title="Add Team"
        rightButton={[{label: 'kembali', route: 'kelola/tim'}]}
        >
        <AddTeams/>
      </PageWrapper>
    </div>);
  }
}

AddTeamView.propTypes = {
};
