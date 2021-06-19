import React from 'react'
import logo from '../images/logo.svg'
import "./styles/Navbar.css"
import {Link} from 'react-router-dom'


class Navbar extends React.Component{

    render(){
        return(
            <div className="Navbar">
                <div className="container-fluid">
                    <Link className="Navbar__brand" to="">
                        <img className="Navbar__brand-logo" src={logo} alt="Logo"/>
                        <span className="fw-light">Platzi</span>
                        <span className="fw-bold">Conf</span>
                        <p>{this.props.prueba}</p>
                    </Link>
                </div>
            </div>
        )
    }
}


export default Navbar