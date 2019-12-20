import React from 'react';
import {Link, Route, Switch, Redirect} from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Products from "./components/Products"

//Higher order component
const PrivateRoute = ({component: Component, auth, ...rest})=>{
  return(
    <Route 
    {...rest}
    render = {(props)=> auth === true
                                      ? <Component {...props}  />
                                      : <Redirect to = {{pathname: "/login", state: {from: props.location}}}/>
    }
    />
  )
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      auth : false
    }
  }
  handleAuth=()=>{
    this.setState({
      auth : true
    })
  }
  logoutHandler = ()=>{
    this.setState({
      auth: false
    })
  }

  render(){
    const {auth} = this.state
    return(
      
      <>
      <Link to = "/">Home</Link>
      <Link to = "/about">About</Link>
      <Link to = "/Dashboard">Dashboard</Link>
      
      <Link to = "/products">Products</Link>
      {this.state.auth === true? <button onClick = {this.logoutHandler}>Logout</button>:
       <Link to = "/Login">Login</Link>
       }
        
        

      <Switch>
        <Route exact path = "/" component ={Home}/>
        <Route  path = "/about" component ={About}/>
        <Route path = "/login" render ={(props)=> <Login {...props} handleAuth = {this.handleAuth} auth = {auth}/>}/>
        <PrivateRoute auth = {auth} path = "/dashboard" component = {Dashboard}/>
         <PrivateRoute auth = {auth} path = "/products" component = {Products} />
        {/* {auth === true? <Route  path = "/dashboard" component ={Dashboard}/>
        :   <Redirect to = "/login"/>
      }
      {auth === true? <Route  path = "/products" component ={Products}/>
        :   <Redirect to = "/login"/>
      } */}

         

      </Switch>
      </>

    )
  }
}
export default App;
