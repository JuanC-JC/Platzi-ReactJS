import React from "react"
import BadgesList from '../components/BadgesList'
import {Link} from 'react-router-dom'
import "./styles/Badges.css"
import confLogo from "../images/badge-header.svg"
import PageLoading from '../components/PageLoading'
import PageError from '../components/PageError'
import MiniLoader from "../components/MiniLoader"
import api from '../api'


class Badges extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            loading:true,
            data: undefined,
            error:null,
        }
    }

    fetchData = async () =>{
        this.setState({
            loading:true,
            error:null,
        })

        try{
            const data = await api.badges.list();
            this.setState({
                loading:false,
                data:data
            })
        }catch(error){
            this.setState({
                loading:false,
                error:error
            })
        }
    }

    //el componente ya fue cargado a pagina por primera vez
    componentDidMount(){
        this.intervalId = setInterval(this.fetchData,5000)
    }


    //el componente fue descargado de la pagina
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render(){

        if(this.state.loading===true && !this.state.data){
            return <PageLoading/>
        }
        
        if(this.state.error){
            return (
                <PageError error={this.state.error}/>
            )
        }

        return (
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img src={confLogo} alt="" className="Badges_conf-logo" />
                        </div>   
                    </div>
                </div>

                <div className="Badges__container">

                    <div className="Badges__buttons">
                        <Link to="/badges/new" className="btn btn-primary">New Badge</Link>
                    </div>

                    <div className="Badges__list">
                        <div className="Badges__container">
                            <BadgesList badges={this.state.data}/>

                            {this.state.loading && <MiniLoader/>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }


}

export default Badges

