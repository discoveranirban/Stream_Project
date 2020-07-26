import React from 'react';
import { connect } from 'react-redux';
import { fetchStream,editStream } from '../../actions'
import { Field, reduxForm } from 'redux-form' 
import _ from 'lodash'

class StreamEdit extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    renderError({touched,error}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput=(formProps)=>{
        console.log(formProps)
        //console.log(this)
        return (
            <div>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off"></input>   
                {this.renderError(formProps.meta)}    
            </div>
        )
    }

    onSubmit=(formValues)=>{
        //console.log(formValues)
        this.props.editStream(this.props.match.params.id,formValues)
    }

    
    render(){
        console.log(this.props)    //as this component is rendered by React Router, component={}, we will get a lot of props passed on to us by it...from here we will extract the stream id we want to edit
        if(!this.props.initialValues){
            return <div>Loading...</div>
        }
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>     
                <Field name="title" component={this.renderInput} label="Enter Title" placeholder='aaaa'/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues=>{
    const errors={};                                          // the error object has to return key value pairs with key names  
    if(!formValues.title){                                    // same as the Field names inside our render method..then Field wil
        errors.title='You must enter a title';                // pass the error inside the component in formProps in a property named 'meta'
    }                                                         // which can be rendered to display errors..if no errors is present it will be a
    if(!formValues.description){                              // blank object so no errors will be displayed..
        errors.description='You must enter a description';
    }
    return errors;
}

const mapStateToProps=(state,ownProps)=>{
    return { 
        //initialValues:state.streams[ownProps.match.params.id]
        initialValues:_.pick(state.streams[ownProps.match.params.id],'title','description')   // pick is a used from lodash to create a new object taking out just title and description out of it, otherwise we will pass 
    }                                                                                         // userId too with it to update wich is actually not getting updated and also not necessary
}

const formWraped = reduxForm({     // since reduxForm is similar to connect() we are separating out into peices instead of applying connect on top of it
    form: 'streamEdit',            // this 'form' tag links redux form with the 'form' tag we use inside our render method..
    validate:validate              // the validate function will run on every interaction/re-render with the form.
})(StreamEdit);

export default connect(mapStateToProps,
    {
        editStream:editStream,
        fetchStream:fetchStream
})(formWraped);  



// mapStateToProps gets called with 2 parameters. 1st is the state of the redux store and 2nd is the props of our component, which has all the props passed down by reactRouter including the id we select to edit 

// BUT, if we naviagte directly to this component we will have our redux stream state empty as it gets loaded in the StreamList component at first..so
// if we navigate via StreamList we will get the stream state populate with data for us to fetch from there but if we navigate directly here it will be empty
// SO, with REACT-ROUTER each component needs to be designed to work in isolation(fetch its own data) 
