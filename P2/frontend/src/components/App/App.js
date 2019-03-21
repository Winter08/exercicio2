import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    newMsg: "",
    currentMsgs: []
  }

  // Metodo para atulizar o campo do chat, ou seja, ira demonstrar a conversa
  renderMsgs = () => {

    let toRender = []

    for (let e in this.state.currentMsgs) {
      toRender.push(<p>{this.state.currentMsgs[e]}</p>)
    }

    return(
      toRender
      )
  }


  // Metodo auxiliar para dar "append" em mensagens
  joinNewUserMsg = (msg) => {

    let currentMsgs = this.state.currentMsgs

    currentMsgs.push(msg)

    console.log(msg)

    this.setState({currentMsgs: currentMsgs}) // Atualizando de forma assincrona

  }

  // Metodo para atualizar o campo newMsg do State em relacao ao evento onChange
  onTextChange(ev) {

    this.setState({newMsg: ev.target.value})

  }

  // Metodo para mandar mensagem para o Backend e atualizar a area de chat
  sendMsgToServer(msg) {
    axios.post('http://localhost:1337/', {
      text: msg
    })
    .then((res) => {
      
      this.joinNewUserMsg("Você: " + msg)

      let serializedData = JSON.stringify(res.data)
      let desiredContent = JSON.parse(serializedData)
      desiredContent = desiredContent.output.text

      this.joinNewUserMsg("Atendimento: " + desiredContent)

    })
    .catch((err) => {
      console.log(err);
    });

    //this.joinNewUserMsg("Você: " + msg) // Para debugar...
  }

  // Metodo para atualizar o campo currentMsgs do State ao clicar "ËNTER" na caixa de texto
  keyPress(ev){
    
    if(ev.keyCode === 13){ // Se for enter...
      ev.preventDefault();
      //this.joinNewUserMsg(ev.target.value)
      this.sendMsgToServer(ev.target.value)
    }
  }

  // Metodo para atualizar o campo newMsg do State em relacao ao evento onClick
  onButtonClick(e) {

    if (this.state.newMsg !== "") {
      //this.joinNewUserMsg(this.state.newMsg)
      this.sendMsgToServer(this.state.newMsg)
    }
  }

  
  render() {
    return (
      <div className="App">
        <h1 className="mt-3 container text-white">Atendimento PUC-Campinas</h1>

        <div className="mt-5 container bg-light shadow-sm rounded chatBox">

          <br></br>
          
          <div className="chatArea">
            {this.renderMsgs()}
          </div>

          <form className="chatInputs rounded">
            <input type="text" style={{width: '50vw' }} name="txtUser" id="txtUser" onChange={e => this.onTextChange(e)} onKeyDown={e => this.keyPress(e)}></input>
            <input type="button" className="ml-5 mr-2 btn btnSend" name="btnUserMsg" id="btnUserMsg" value="Enviar"  onClick={e => this.onButtonClick(e)}></input> 
          </form>
        </div>

      </div>
    );
  }

}

export default App;
