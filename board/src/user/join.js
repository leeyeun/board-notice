import './join.css';
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";

class JoinPage extends Component{

    goToMain = () => {
        this.props.history.push('/');
    };

    render(){
        return(
            <div className="join-form">
                <h1>회원가입</h1>
                <form className="join-fo">
                    <div className="text_field">
                        <input type="text" className="userID" placeholder="아이디"></input>
                    </div>
                    <div className="text_field">
                        <input type="password" className="userPW" placeholder="비밀번호"></input>
                    </div>
                    <div className="text_field">
                        <input type="text" className="userName" placeholder="이름"></input>
                    </div>
                    <div className="select">
                        <label className="radio-input">
                            <input type="radio" className="userGender" autocomplete="off" value="남자" checked></input><span>남자</span>
                        </label>
                        <label className="radio-input">
                            <input type="radio" className="userGender" autocomplete="off" value="여자" ></input><span>여자</span>
                        </label> 
                    </div>
                    <div className="text_field">
                        <input type="email" className="userEmail" placeholder="이메일"></input>
                    </div>
                    <button className="join-btn" type="button" onClick={this.goToMain}>회원가입</button>
                </form>
            </div>
        );
    }
}
export default withRouter(JoinPage);