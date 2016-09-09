import $ from '../models/lib/jquery';
import React from 'react';
// moments are highlight clips within a currently playing video

export default class CommentsArea extends React.Component {
 constructor(props){
   super(props);
   this.state ={
     comment: "",
     comments: [],
     inputz: "",
     commentCounter: 0,
     currentLike: ""
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
     url: '/comments/get/${videoId}',
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

 postComment(newComment, likeId) {
  console.log('about to use post comment')
  var newCommentObj = {
    user_id: this.props.userId,
    text: newComment,
    like_id: likeId
  }
  console.log("newCommentObj: ", newCommentObj)
   return $.ajax({
     url: '/comments/create', //posts a comment tied to a like on a video
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     // dataType: 'application/json',
     data: JSON.stringify(newCommentObj)
     
   })
   .then(function(){
    console.log("The comment has been posted to the database: ", data);
    return $.ajax({
     url: '/comments/get/'+this.props.videoId,  // retrieves all comments tied to a particular video
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
     this.state.input = ""
     this.forceUpdate();
   })
  })
}
//need to do a get request and this.forceUpdate() to make the state include the comment that was 
//posted


/*
Function on button click that will highlight the previous like zone with comment attachment and display 
that like zone's comment. 
*/
 
 goToPreviousComment(){

   this.state.commentCounter--;
   this.state.comment = this.state.comments[this.state.commentCounter];
   //need to update the current comment's moment class div color to something other than yellow
   // or "background: rgba(255, 209, 0, 0.5);" as is the current norm.
   this.forceUpdate();
 }

/*
Function on button click that will highlight the next like zone with comment attachment and display 
that like zone's comment. 
*/

 goToNextComment(){
   this.state.commentCounter++;
   this.state.comment = this.state.comments[this.state.commentCounter];
   //need to update the current comment's moment class div color to something other than yellow
   // or "background: rgba(255, 209, 0, 0.5);" as is the current norm.
   this.forceUpdate();
 }
 
/*
Function upon the click of a likezone that will set the this.state.comment to that particular comment
as well as highlight the zone.  
*/

 // clickLikeForComment(event){
 //   event.currentTarget.style.backgroundColor = '#7eb64a';
 // }
 //moved to PlayerWindow.js


//onClick={CommentsArea.clickLikeForComment()}
//import CommentsArea from './videoComments';
/*
Renders an input bar which updates the this.state.input via two way databinding and
a submitt button for comments. Underneath is a div that displays the current comment in this.state.comment.
Under that are two buttons that will set the comment display to the next or previous comment in the 
this.state.comments array.
*/

 render(){
   return (
     <div>
       <input 
       className="commentInputs" placeholder="Comment Here!" type="text" 
       defaultValue={this.state.inputz} maxLength="144" 
       onChange = {e => {
          this.state.inputz = e.currentTarget.value;
          this.forceUpdate();
        }}
       />
       <button className="commentSubmitButton" onClick={() => this.postComment(this.state.inputz, likeID)}>Submit!</button>
       <div>Comment creator username to be put here</div>
       <div className='currentComment'>
        {this.state.comment}
       </div>
       <button className="previousComment" onClick={() => this.goToPreviousComment()}>Previous Comment</button>
       <button className="nextComment" onClick={() => this.goToNextComment()}>Next Comment</button>
     </div>
   )
 }

}

