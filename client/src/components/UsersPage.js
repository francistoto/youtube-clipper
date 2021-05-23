import React from 'react';

class UsersPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to your YouTube Mashup profile, User {this.props.match.params.userid}!</h1>
            </div>
        );
    }
}

export default UsersPage;
