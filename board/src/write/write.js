import './write.css';
import React, { Component } from "react";
import { post } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class WritePage extends Component{
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

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addList()
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
        this.setState({
            file:null,
            userID: "",
            title: "",
            content: "",
            fileName: ""
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    addList = () => {
        const url = '/api/lists';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('userID', this.state.userID);
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }
    render(){
        return(
            <div className="board-write">
                <div >
                <h1>게시글 작성</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <table class="table table-striped">
                        <tbody>       
                            <tr>
                                <td colspan="5">
                                    <input placeholder="이미지" class="form-control" type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <input placeholder="아이디" type="text" class="form-control" name="userID" value={this.state.userID} onChange={this.handleValueChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <input placeholder="글제목" type="text" class="form-control" name="title" value={this.state.title} onChange={this.handleValueChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <textarea placeholder="글내용" class="form-control" name="content" maxLength="2048" value={this.state.content} onChange={this.handleValueChange}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="write-btn" type="submit">글쓰기</button>
                </form>
            </div>
            </div>
        );
    }
}
export default WritePage;