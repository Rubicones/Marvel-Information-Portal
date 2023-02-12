import './charList.scss';
import { Component } from 'react';
import MarvelService from '../services/MarvelDBService';

class Char extends Component {
    render () {
        const {thumbnail, name, id} = this.props.char
        const picStyles = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? 
                      {objectFit: "contain", alignItems: "start"} : {objectFit: "cover"}

        return (
            <li onClick={() => {this.props.onChoose(id)}} className="char__item">
                <img src={thumbnail} style={picStyles} alt={name}/>
                <div className="char__name">{name}</div>
            </li>
        )
    }
}

class CharList extends Component {
    state = {
        chars: []
    }

    MarvelService = new MarvelService()

    componentWillMount = () => {
        this.fetchChars()
    }

    fetchChars = () => {
        this.MarvelService
        .getAllCharacters()
        .then(res => {
            res.forEach((char, i) => {
                this.setState(({chars}) => ({
                    chars: [...chars, <Char onChoose={(id) => {this.props.onChoose(id)}} char={char} key={i}/>]
                }))
            })
            console.log(res)
        })

    }


    render () {
        let characters = [...this.state.chars]
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characters}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;