import React from 'react';
import { Field, reduxForm } from 'redux-form' 
import { connect } from 'react-redux'
import { createStream } from '../../actions'

class StreamCreate extends React.Component {

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
        console.log(this)
        return (
            <div>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off"></input>   
                {this.renderError(formProps.meta)}    
            </div>
        )
    }

    // formProps.input has value,label,onChange all properties in it..so we just destructure by ...formProps.input

    onSubmit=(formValues)=>{
        //console.log(this)
        this.props.createStream(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>     
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

// the handleSubmit is a sugar coat that calls e.preventDefault() for us and passes the form Values only directly.
// Field is just a component..does nothing alone..we have to pass a component i.e Input field to it using the component props..
// Note that redux Field won't recognize label prop..so it will just pass it to the component inside component={}, which will be used by us to show labels.

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


const formWraped = reduxForm({     // since reduxForm is similar to connect() we are separating out into peices instead of applying connect on top of it
    form: 'streamCreate',          // this 'form' tag links redux form with the 'form' tag we use inside our render method..
    validate:validate              // the validate function will run on every interaction/re-render with the form.
})(StreamCreate);

export default connect(null,{createStream})(formWraped);  