import React from 'react';
import $ from '../models/lib/jquery';
import PlayerWindow from './PlayerWindow';

export default class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : this.props.params.userid,
      username: null,
      highlights : [],
      videos : [],
      followers : [],
    };
    console.log('props.params.userid : ', this.props.params.userid);
    console.log('this.state.highlights: ', this.state.highlights);
  };

  componentDidMount() {
    Promise.all([
      $.ajax({
        url: '/users/' + this.state.userId + '/likes',
        method: 'GET'
      }).then(likes => {
        console.log("this is the likes: ", likes);
        this.state.highlights = likes}),

      $.ajax({
        url: '/users/' + this.state.userId + '/videos',
        method: 'GET'
      }).then(videos => {
        console.log('these are the videos: ', videos);
        this.state.videos = videos}),

      $.ajax({
        url: '/users/' + this.state.userId,
        method: 'Get'
      }).then(user => this.state.username = user.name),

      this.getFollowers(),

      ]).then(() => this.forceUpdate());

  };

  componentWillReceiveProps(newProps) {
    this.state.userId = newProps.params.userid;
    Promise.all([
      $.ajax({
        url: '/users/' + this.state.userId + '/likes',
        method: 'GET'
      }).then(likes => {
        console.log("this is the likes: ", likes);
        this.state.highlights = likes}),

      $.ajax({
        url: '/users/' + this.state.userId + '/videos',
        method: 'GET'
      }).then(videos => {
        console.log('these are the videos: ', videos);
        this.state.videos = videos}),

      $.ajax({
        url: '/users/' + this.state.userId,
        method: 'Get'
      }).then(user => this.state.username = user.name),

      this.getFollowers(),

      ]).then(() => this.forceUpdate());    
  }

  followme(){
    return $.ajax({
      url: '/follow/' + this.state.userId,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
    }).then(function(){console.log('posted following in userspage')})
  }

  getFollowers(){
    var component = this;
    return $.ajax({
      url: '/followers/' +this.state.userId,
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
        },
    }).then(function(allData){
      console.log('ALLDATA ALLDATA', allData.allFollowers);
      component.state.followers = allData.allFollowers;
      console.log('JUST MAKING SURE', component.state.followers)
    })
  }

 displayFollowees(){
       return this.state.followers.map(x=> <li className="notwhite"><a href={'/#/users/' + x.id}>{x.name}</a></li>);
  }

  render() {
    return (
      
      
      <div>
        <header>
          <div className="container">
            <div className="row">
              <h1 className="medium-6 columns">{this.state.username}</h1>
              <div className="medium-6 columns">
                <ul className="dropdown menu align-right" data-dropdown-menu>
                  <li>
                    <a href="/">Home</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      <button onClick={(e) => this.followme()}>follow me</button>
        </header>
          <div className="container">
            <div className="row column">
              <h2>Favorite Highlights</h2>
              <p>
              {this.state.highlights.map(e => e.id)}
              </p>
              <PlayerWindow videos={this.state.videos} channel_id="1" user_id={this.state.userId} />
            </div>
          </div>
           <a>Followees</a>
          <ul className="followees"> {this.displayFollowees()} </ul>  
      </div>
    );
  }
}