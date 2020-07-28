import React from 'react';
import ReactDOM from 'react-dom';        // because it's a portal we are importing this 


const Modal = props =>{
    return ReactDOM.createPortal( 
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={e=>e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div> 
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,document.querySelector('#modal')
    )
}

//for creating portal we wont return simple JSX..instead we will return ReactDOM.createPortal with two arguments,
// first the JSX, second the reference to the element we created just under the root element in index.html

export default Modal; 