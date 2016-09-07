import React from 'react';
import $ from '../models/lib/jquery';


export default class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : this.props.params.userid,
      username: null,
      highlights : []
    };
    console.log('props.params.userid : ', this.props.params.userid)
  };

  componentDidMount() {
    Promise.all([
      $.ajax({
        url: '/users/' + this.state.userId + '/likes',
        method: 'GET'
      }).then(likes => this.state.highlights = likes),
      $.ajax({
        url: '/currentUser',
        method: 'Get'
      }).then(user => this.state.username = user.name)
      ]).then(() => this.forceUpdate());

  };

  render() {
    return (
      <div>
        <h3>{this.state.username}'s Profile</h3>
      </div>
    );
  }
}