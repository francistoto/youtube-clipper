import $ from './lib/jquery';
import React from 'react';
// moments are highlight clips within a currently playing video

export default class CommentsArea extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      comment: "",
      comments: [],
      input: ""
    }
  }
  
  componentDidMount(){
    return $.ajax({
      url: 'comment/get',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      // dataType: 'application/json',
      //data: JSON.stringify(newLike),
    })
    .done(function(data){
      console.log("This comment has been retrieved: ", data);
      this.state.comment = "";
      this.state.comments = [];
      this.forceUpdate();
    }
  }
  
  getComment= (videoID, time) => {
    return $.ajax({
      url: 'comment/get',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      // dataType: 'application/json',
      //data: JSON.stringify(newLike),
    })
    .done(function(data){
      console.log("This comment has been retrieved: ", data)
    }
  };

  postComment = (newComment) => {
    return $.ajax({
      url: 'comment/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // dataType: 'application/json',
      data: JSON.stringify(newComment),
    })
    .done(function(data){
      console.log("This comment has been posted to the database: ", data)
      this.state.input = ""
    }
  };

  render(){
    return (
      <div>
        <input 
        class="commentInputs" placeholder="Comment Here!" type="text" 
        defaultValue={this.state.input} maxlength="144" 
        onChange = {e => {this.state.input = e.currentTarget.value;
        this.forceUpdate();}
        />
        <button class="commentSubmitButton" onClick={postComment(this.state.input)}>Submit!</button>
        <div class='currentComment'>
         {this.state.comment}
        </div>
      </div>
    )
  }

}

