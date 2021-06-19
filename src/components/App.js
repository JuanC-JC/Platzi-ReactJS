import React from 'react'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import BadgeNew from '../pages/BadgeNew'
import Badges from '../pages/Badges'
import Layout from './Layout'
import NotFound from '../pages/NotFound'
import BadgeEdit from '../pages/BadgeEdit'
import BadgeDetailsContainer from '../pages/BadgeDetailsContainer'

function App(){
    
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/badges" component={Badges}></Route>
                    <Route exact path="/badges/new" component={BadgeNew}></Route>
                    <Route exact path="/badges/:badgeId" component={BadgeDetailsContainer}></Route>
                    <Route exact path="/badges/:badgeId/edit" component={BadgeEdit}></Route>
                    <Route><NotFound/></Route>
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}

export default App