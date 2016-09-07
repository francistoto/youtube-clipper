import React from 'react';
import $ from '../models/lib/jquery';


export default class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : this.props.params.userid,
      highlights : []
    };
  };

  componentDidMount() {
    $ajax({
      url: '/users/:userid/likes',
      method: 'GET'
    })
  };

  render() {
    return (
//      <DocumentTitle title={`My Profile`}></DocumentTitle>
      <div>
        <h3>My Profile</h3>
      </div>
    );
  }
}