import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/'
import { Link } from 'react-router-dom'

class StreamList extends React.Component {

    componentDidMount(){
        this.props.fetchStreams();
    }


    renderAdmin(stream){
        if(stream.userId!==null && stream.userId===this.props.currentUserID){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary ">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative ">Delete</Link>
                </div>
            )
        }
    }

    renderList(){
        return this.props.streams.map(stream=>{
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                        {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
            
        })
    }

    renderCreate(){
        if(this.props.isSignedIn){
            return (
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                    Create Stream
                    </Link>
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                <h2>Streams:</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return { streams: Object.values(state.streams), 
             currentUserID:state.logStat.userId,
             isSignedIn:state.logStat.isSignedIn               
    }                                                
}                                                     

// stream is stored as an object in redux state for ease of access but here to render we convert it to array so that we can use map function on it

export default connect(mapStateToProps,{ fetchStreams:fetchStreams })(StreamList); 

//connect takes 2 parameters, 1st one is mapStateToProps which maps our redux states to props of this component 
// second parameter is the ACTION CREATORS as an OBJECT and makes them available in props of this component