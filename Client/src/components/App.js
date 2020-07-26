import React from 'react'
import { Router,BrowserRouter,Route } from 'react-router-dom'
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import StreamList from './streams/StreamList';
import Header from './Header';
import history from '../history'


const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>  
            <Header />
            <div>
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit/:id" exact component={StreamEdit} />
                <Route path="/streams/delete" exact component={StreamDelete} />
                <Route path="/streams//show" exact component={StreamShow} />
            </div>
            </Router>
        </div>
    )
}

// we will not use BrowserRouter as we will create our own history object, which to use, we need plain ReactRouter..This will help us to gather many information from the URL, like selected stream id
// /:id is used for Wildcard Navigation...we will get this id passed on to display particular stream through the URL...[advantage of using custom browser object]..if no number is present or some number which has no data, still we will display the stream edit page

export default App;