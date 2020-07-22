import React from 'react';

class GoogleAuth extends React.Component {

    state= { isSignedIn:null }

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: '703856751423-q21kcsdmpao7tqgn4m8bjef3pqsrubfm.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn:this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange =()=>{
        this.setState({isSignedIn:this.auth.isSignedIn.get()});
    }

    onSignIn=()=>{
        this.auth.signIn();
    }

    onSignOut=()=>{
        this.auth.signOut();
    }

    renderAuth(){
        if(this.state.isSignedIn===null){
            return null;
        }
        else if(this.state.isSignedIn===false){
            return(<div>
                <button className="ui red google button" onClick={this.onSignIn}> 
                <i className="google icon"/>
                Sign in with Google
                </button>
            </div>)
        }
        else{
            return(<div>
                <button className="ui red google button"  onClick={this.onSignOut}> 
                <i className="google icon"/>
                Log out
                </button>
            </div>)
        }
    }

    render (){
        return (
            <div>
                {this.renderAuth()}
            </div>
        )
    }
}


export default GoogleAuth;