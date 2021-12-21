import './main.css';
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { BrowserRouter, Link} from "react-router-dom";
import { withRouter } from "react-router";
import { json } from "body-parser";
import axios from "axios";

class Mainpage extends Component{
    
    goToWrite = () => {
        this.props.history.push('/write');
    };
    constructor(props){
        super(props);
        this.state ={
            file: null,
            userID: '',
            title: '',
            content: '',
            fileName: ''
        }
      }
      loadingData = async() => {
          try{
              const response = await axios.get("/api/lists");
              this.setState({
                  lists: response.data,
              });
          }catch(e){
              console.log(e);
          }
      };
      componentDidMount(){
          const { loadingData } = this;
          loadingData();
      }

      
      
    render(){
    
        return(
            <div>
                <a href={`/main/view/${this.props.listid}`}>
                    <div className="board-card" key={this.props.listid}>
                        <div className="board-img">
                            <img className="board-img" src={this.props.image} alt="listimg"></img>
                        </div>
                        <div className="board-content">
                            <div>{this.props.listid}</div>
                            <div>{this.props.title}</div>
                            <div>{this.props.userID}</div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
    
}
export default withRouter(Mainpage);