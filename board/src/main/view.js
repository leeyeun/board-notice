import React,{history, Component } from "react";
import axios from "axios";

class ViewPage extends Component{
   constructor(props){
    super(props);
    this.state ={
        list: '',
    }
   }
  
    loadingData = async() => {
        try{
            const {listid} = this.props.listid;
            console.log(listid); 
            const response = await axios.get("/api/lists/");
            this.setState({
                list:response.data,
            });
        }catch(e){
            console.log(e);
        }
    } 
    componentDidMount(){
        const { loadingData } = this;
        loadingData();
    }
    render(){
        
        return(
            <div key={this.props.listid}>
                <div>
                <div id="board-name">
                        <span>id : {this.props.listid} </span>
                    </div>
                    <div id="board-name">
                        <span>제목 : {this.props.title} </span>
                    </div>
                    <div id="board-userid">
                        <span>아이디 : {this.props.userID}</span>
                    </div>
                    <div id="board-image">
                        <span>사진 : <img src={this.props.image} alt="listimg" width="50px" height="50px"></img></span>
                    </div>
                    <div id="board-content">
                        <span>내용 : {this.props.content}</span>
                    </div>
                </div>
            </div>
        );
    
    }
}
export default ViewPage;