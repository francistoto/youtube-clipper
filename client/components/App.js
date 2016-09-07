import React from 'react';
import PlayerWindow from './PlayerWindow';
import NavBar from './NavBar';
import NavModel from '../models/navModel';
import $ from '../models/lib/jquery';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var component = this;
    component.state = {
      user: 'Guest',
      background: '',
      videos: [],
      channel: '',
      channel_id: 'default',
      id: -1,
    };
  }

  componentDidMount() {
    console.log("Component Mounted")
    $.ajax({
      url: '/currentUser',
      method: 'GET'
    }).then(user => {
      console.log("Got user: ", user);
      this.setState({user: user.displayName, id: user.id})
    })
    .then(x=>{
        NavModel.changeChannel(this.state.channel_id)
        .then(channelObj => {
          this.setState({
            background: channelObj.background,
            videos: channelObj.videos,
            channel: channelObj.name,
          });
          $('body').css('background-image', `url(${this.state.background})`);
        });
    })
  }

  changeChannel(channelId) {
    NavModel.changeChannel(channelId)
    .then(channelObj => {
      this.setState({
        background: channelObj.background,
        videos: channelObj.videos,
        channel: channelObj.name,
        channel_id: channelId,
      });
      $('body').css('background-image', `url(${this.state.background})`);
    });
  }

  render() {
    var component = this;
    console.log("Component: ", component);
    return (
      <div>
        <header>
          <div>Current User: {component.state.user}</div>
          <div className="container">
            <div className="row">
              <h1 className="medium-6 columns">The Toto Moto</h1>
              <div className="medium-6 columns">
                <NavBar user={component.state.user === "Guest" ? null : component.state.user} changeChannel={(channelId) => this.changeChannel(channelId)} />
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="row column">
            <h2>{this.state.channel}</h2>
            <PlayerWindow videos={this.state.videos} channel_id={this.state.channel_id} user_id="1" />
          </div>
        </div>
      </div>
    );
  }
}
