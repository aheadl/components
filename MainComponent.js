import React, { Component } from 'react';

import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { COMMENTS } from '../shared/comments';
// import { PARTNERS } from '../shared/partners';
// import { PROMOTIONS } from '../shared/promotions';
// import { CAMPSITES } from '../shared/campsites';
import { addComment } from '../redux/ActionCreators';
import About from './AboutComponent';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text))
};

class Main extends Component {
    //********Contructor deleted to replace with Redux store
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         campsites: CAMPSITES,
    //         comments: COMMENTS,
    //         partners: PARTNERS,
    //         promotions: PROMOTIONS
    //     };
    // }
    //******************************************************* 

   
    render() {
        const HomePage = () => {
            return (
                <Home  
                    // campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    // promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    // partner={this.state.partners.filter(partner => partner.featured)[0]}

                    //***********Using Redux state */
                    campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            );
        };

        const CampsiteWithId = ({match}) => {
            return (
                //<CampsiteInfo 
                    // campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    // comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                     //***********Using Redux state */
                     <CampsiteInfo 
                     campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
                     comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                     addComment={this.props.addComment}
                 />
                
            );
        };    
        //match.params is used to dig out the router 'campsiteId' parameter passed in /directory/:campsiteId when CampsiteWithId is called
       
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                   
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
                    
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));