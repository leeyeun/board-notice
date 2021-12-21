import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link } from "react-router-dom";
import Mainpage from './main/main';
import WritePage from './write/write';
import { Component } from 'react';
import LoginPage from './user/login';
import JoinPage from './user/join';
import ViewPage from './main/view';
import { BrowserRouter} from "react-router-dom";
 
class App extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      list: '',
      completed:0
    }
  }

  stateRefresh = () => {
    this.setState({
      list: '',
      completed:0
    });
    this.callApi()
    .then(res => this.setState({lists: res}))
    .catch(err => console.log(err));
  }

  componentDidMount(){
    this.callApi()
    .then(res => this.setState({lists: res}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/lists');
    const body = await response.json();
    return body;
  }
  

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <div id="header">
            <div id="header-area">
              <a href="/">게시판</a>
              <Link to="/write">글쓰기</Link>
              <div>
                <Link to="/user/join">회원가입 </Link>
                <Link to="/user/login">로그인</Link>
              </div>
            </div>
          </div>
          <div id="body">
                <Route exact={true} path={"/"} component={Mainpage}>
                <div className="board-list">
                  {
                    this.state.lists ? this.state.lists.map(p => {
                        return(
                        <Mainpage path={"/"}
                            key = {p.listid}
                            listid={p.listid}
                            title = {p.title}
                            content={p.content}
                            userID={p.userID}
                            image={p.image}
                        />
                        )
                    }) : ""
                  }
                  </div>
                </Route>
              <Route exact={true} path={"/write"} component={WritePage} >
                <WritePage stateRefresh={this.stateRefresh}/>
              </Route>
              <Route exact={true} path={"/user/login"} component={LoginPage} />
              <Route exact={true} path={"/user/join"} component={JoinPage} />
              <Route exact={true} path={"/main/view/:listid"} component={ViewPage} >
              {
                this.state.lists ? this.state.lists.map(p => {
                    return(
                    <ViewPage 
                        key = {p.listid}
                        listid={p.listid}
                        title = {p.title}
                        content={p.content}
                        userID={p.userID}
                        image={p.image}
                    />
                    )
                }) : ""
              }
              </Route>
              
          </div>
          <div id="footer"></div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
