// import { CarApp } from './pages/car-app.jsx'
// import { Home } from './pages/home.jsx'
// import { About } from './pages/about.jsx'
// import { CarDetails } from './pages/car-details.jsx'
// import {CarEdit} from './pages/car-edit.jsx'
import { Emails } from './pages/emails.jsx'
import { Keep } from './pages/keep.jsx'
import { AppHome } from './pages/app-home.jsx'
import { AppHeader } from './cmps/app-header.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    
    return <section>


    
    <Router>
       <AppHeader /> 
        <section className="app">
            <Switch>
                {/* <Route path="/car/edit/:carId?" component={}/>
                <Route path="/car/:carId" component={CarDetails}/> */}
                <Route path="/emails" component={Emails} />
                <Route path="/keep" component={Keep} />
                <Route path="/" component={AppHome} />
            </Switch>
        </section>
        {/* <AppFooter /> */}
        {/* <UserMsg /> */}
    </Router>
    </section>
        
}
