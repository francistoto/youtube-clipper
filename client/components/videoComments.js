import $ from '../models/lib/jquery';
import React from 'react';
// moments are highlight clips within a currently playing video

export default class CommentsArea extends React.Component {
 constructor(props){
   super(props);
   this.state ={
     comment: "",
     comments: [],
     input: "",
     commentCounter: 0
   }
 }
 
 /*
 We will need upon component did mount for the database to give us back all of the comments on the 
 current video and put them into the this.state.comments array.  
 An array of comment objects, containing  the comment body, userID of comment, the likeID,
 start time of the like, and end point of the like. The current comment will have its like zone highlighted
 a different color to point out the spot. We should also have a next comment and previous comment button
 that will highlight the next comment/like zone and display it.

 3 ways to get comments:
  - First comment is rendered upon load of video
  - Clicking on "Previous Comment" and "Next comment" buttons will move one position forward or backwards
  from the current position in the array and load up that comment as the this.state.comment
  - Clicking on the like highlighted area will bring up that comment
 */

 /*
 Loads all comments via initial get request to server into this.state.comments as array. Also makes 
 this.state.comment the first comment in for that video.
 */
 componentDidMount(){
   return $.ajax({
     url: 'comments/get',
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     }
     // dataType: 'application/json',
     //data: JSON.stringify(newLike),
   })
   .done(function(data){
     console.log("This comment has been retrieved: ", data);
     this.state.comment = data.body[0];
     this.state.comments = data.body;
     this.forceUpdate();
   })
 }
 
 // getComment(videoID, time) {
 //   return $.ajax({
 //     url: 'comment/get',
 //     method: 'GET',
 //     headers: {
 //       'Content-Type': 'application/json',
 //     }
 //     // dataType: 'application/json',
 //     //data: JSON.stringify(newLike),
 //   })
 //   .done(function(data){
 //     console.log("This comment has been retrieved: ", data)

 //   })
 // };

 /*
   This function is a post request that takes the input comment as a parameter and posts it to the server.
   They will need to be storing the comment body, userID of comment, the likeID,
   start time of the like, and end point of the like.
 */

 postComment(newComment) {
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
   })
 };
 
 goToPreviousComment(){
   this.state.commentCounter--;
   this.state.comment = this.state.comments[this.state.commentCounter];
 }

 goToNextComment(){
   this.state.commentCounter++;
   this.state.comment = this.state.comments[this.state.commentCounter];
 }
 
 clickLikeForComment(){
   
 }

 render(){
   return (
     <div>
       <input 
       class="commentInputs" placeholder="Comment Here!" type="text" 
       defaultValue={this.state.input} maxlength="144" 
       onChange = {e => {
          this.state.input = e.currentTarget.value;
          this.forceUpdate();
        }}
       />
       <button class="commentSubmitButton" onClick={postComment(this.state.input)}>Submit!</button>
       <div class='currentComment'>
        {this.state.comment}
       </div>
       <button onClick={goToPreviousComment()}>Previous Comment</button>
       <button onClick={goToNextComment()}>Next Comment</button>
     </div>
   )
 }

}
}