import React from "react"
import { Redirect } from "react-router-dom"

export default class Home extends React.Component{

    state = {
        email : "",
        password : "",
        redirectState: false
    
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        console.log("inside props", this.props)

            this.props.handleAuth()
            // this.props.history.push("/dashboard")
            this.redirectHandler()
    
}
redirectHandler = ()=>{
    this.setState({
        redirectState : true
    })
}

    render(){
        const {email, password, redirectState} = this.state

        const {from} = this.props.location.state || {from: {pathname: "/"}}
        console.log ("inside from", from)
       if (redirectState === true){
           return <Redirect to = {from}/>
       }
        const {} = this.state
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <input placeholder = "email"
                    name = "email"
                    value = {email}
                    onChange = {this.handleChange}
                    />
                    <input placeholder = "password"
                    name = "password"
                    value = {password}
                    onChange = {this.handleChange}
                    />
                    <button type = "submit"
                   >Submit</button>
                </form>
            </div>
        )
    }
}