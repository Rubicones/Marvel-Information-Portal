import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { Component } from "react";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component {
    state = {
        clickedCharId: null
    }

    onChoose = (id) => {
        if (id !== this.state.id){
            this.setState(({
                clickedCharId: id
            }))
        }
    }

    render () {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onChoose={(id) => this.onChoose(id)}/>
                        <ErrorBoundary>
                            <CharInfo clickedChar={this.state.clickedCharId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;