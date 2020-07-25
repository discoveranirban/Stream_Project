import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/'

class StreamList extends React.Component {

    componentDidMount(){
        this.props.fetchStreams();
    }

    render(){
        return (
            <div>
                StreamList
            </div>
        )
    }
}


export default connect(null,{ fetchStreams:fetchStreams })(StreamList); 

//connect takes 2 parameters, 1st one is mapStateToProps which maps our redux states to props of this component 
// second parameter is the ACTION CREATORS as an OBJECT and makes them available in props of this component