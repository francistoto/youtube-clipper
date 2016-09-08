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
        url: '/users/' + this.state.userId,
        method: 'Get'
      }).then(user => this.state.username = user.name)
      ]).then(() => this.forceUpdate());

  };

  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="row">
              <h1 className="medium-6 columns">{this.state.username}</h1>
              <div className="medium-6 columns">
                <ul className="dropdown menu align-right" data-dropdown-menu>
                  <li value="/" onClick={(e) => e.currentTarget.value}>
                    <a>Home</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          
        </div>
      </div>
    );
  }
}