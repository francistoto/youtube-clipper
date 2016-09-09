import React from 'react';
import { returnAllUsers } from '../models/navModel';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      allUsers: [],
    };
  }

  componentDidMount() {
    var component = this;
    $('.dropdown').foundation();
    returnAllUsers().then(function(alltheusers){
      return component.state.allUsers = alltheusers.allUsers;
    })
  }

  handleChange(value) {
    this.props.changeChannel(value);
  }

  facebookBtn(){
    if(this.props.user){
      return <li><a href="/logout">Logout</a></li>;
    }else{
      return <li><a href="/auth/facebook">Login</a></li>;
    }
  }
  displayheaderUser(){
    if(this.props.user){
      return <a className='menu dropdown'>Users</a>
    }
  }
  displayUsers(){
        console.log('LOOK AT ME PLEASE PLEASE', this.props.user)
        if(this.props.user){
       return this.state.allUsers.map(x=> <li className="notwhite"><a href={'/#/users/' + x.id}>{x.name}</a></li>);
        }
  }
  render() {
    return (

      <ul className="dropdown menu align-right" data-dropdown-menu>
        {this.facebookBtn()} 
        <li>
          <p>{this.displayheaderUser()}</p>
          <ul className="menu"> {this.displayUsers()} </ul>  
          </li> 
        <li className="is-dropdown-submenu-parent">
          <a>Channels</a>
          <ul className="menu">
            <li value="1" onClick={(e) => this.handleChange(e.currentTarget.value)}><a>Land</a></li>
            <li value="2" onClick={(e) => this.handleChange(e.currentTarget.value)}><a>Sea</a></li>
            <li value="3" onClick={(e) => this.handleChange(e.currentTarget.value)}><a>Air</a></li>
          </ul>
        </li>
        <li value="'default'" onClick={(e) => this.handleChange(e.currentTarget.value)}>
          <a href='/'>Home</a>
        </li>
      </ul>
    );
  }
}

NavBar.propTypes = {
  changeChannel: React.PropTypes.func,
};
