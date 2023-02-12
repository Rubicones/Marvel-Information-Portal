import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../services/MarvelDBService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {ReactComponent as Spinner} from '../spinner/spinner.svg';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
        comics: []
    }

    marvelService = new MarvelService()

    componentDidUpdate = () => {
        const id = this.props.clickedChar;
        
        if (!this.state.char || id !== this.state.char.id) {
            this.updateChar(id)
        }

    }

    rerollChar = () => {
        this.setState({
            loading: true
        })

        this.updateChar()
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false
        })

        this.setState({
            comics: char.comics.map(item => {
                return(
                    <li className="char__comics-item">
                        <a href={item.resourceURI}>
                            {item.name}
                        </a>
                    </li>
                )
            })
        })

    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
 
    updateChar = (id) => {
        this.marvelService.getCharacter(id)
                          .then(this.onCharLoaded)
                          .catch(this.onError)
    }


    render () {
        const {loading, error, char, comics} = this.state
        let errorMessage = error ? <ErrorMessage/> : null
        let spinner = loading ? <Spinner /> : null
        const content = !(errorMessage || spinner) ? <View loading={loading} error={error} comics={comics} char={char}/> : null

        return (
            <div className="char__info">
                {char ? content : <Skeleton/>}
            </div>
        )
    }
}

class View extends Component {

    render () {
        const {loading, error, char, comics} = this.props

        
        return (
            <>
                <div className="char__basics">
                    <img src={char.thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{char.name}</div>
                            <div className="char__btns">
                                <a href={char.homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={char.wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {char.description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics}
                </ul>
            </>
        )
    }
}

export default CharInfo;