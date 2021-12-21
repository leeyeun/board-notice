import './login.css';
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";

class LoginPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            userID: "",
            usrePW: "",

        };
    }
    goToMain = () => {
        this.props.history.push('/');
    };
    idCheck = (e) => {

    };
    pwCheck = (e) => {

    };

    render(){
        return(
            <div className="login-form">
                <h1>로그인</h1>
                <form action="">
                <div className="text_field">
                    <input
                        type="text" 
                        ref={ref => (this.LoginID = ref)}
                        placeholder="아이디"></input>
                </div>
                <div className="text_field">
                    <input 
                    type="password" 
                    ref={ref => (this.LoginPW = ref)}
                    placeholder="비밀번호"></input>
                </div>
                <button className="login-btn" type="button" onClick={this.goToMain}>확인</button>
                </form>
            </div>
        );
    }
}
export default withRouter(LoginPage);