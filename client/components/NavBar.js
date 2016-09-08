import React from 'react';
import { returnAllUsers } from '../models/navModel';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    console.log("Navbar props: ", props);
    this.state = {
      user: this.props.user,
      allUsers: [],
    };
  }

  componentDidMount() {
    console.log("COMPONENT MOUNTED IN NAVBAR.JS")
    var component = this;
    console.log('THIS THIS THIS', this.state)
    $('.dropdown').foundation();
    console.log('FUN FUN FUN', returnAllUsers)
    returnAllUsers().then(function(alltheusers){
      console.log("NAVJS allusers", alltheusers);
      return component.state.allUsers = alltheusers.allUsers;
    })
    console.log("COMPONENT MOUNT LOOK LOOK LOOK", component.state.allUsers);
  }

  handleChange(value) {
    this.props.changeChannel(value);
  }

  facebookBtn(){
    console.log("This state user: ", this.props.user);
    if(this.props.user){
      return <li><a href="/logout">Logout</a></li>;
    }else{
      return <li><a href="/auth/facebook">Login with Facebook</a></li>;
    }
  }
  displayUsers(){
        console.log('IS IT THIS OR COMP',this.state.allUsers)
       return this.state.allUsers.map(x=> <li className="notwhite"><a href={'/#/users/'+x.id}>{x.name}</a></li>);
  }
  render() {
    return (

      <ul className="dropdown menu align-right" data-dropdown-menu>
        {this.facebookBtn()} 
        <li>
          <a>Users</a>
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
          <a>Home</a>
        </li>
      </ul>
    );
  }
}

NavBar.propTypes = {
  changeChannel: React.PropTypes.func,
};
