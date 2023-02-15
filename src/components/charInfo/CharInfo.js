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
    }

    marvelService = new MarvelService()

    componentDidUpdate = (prevProps, prevState) => {
        const id = this.props.clickedChar;
        
        if (id !== prevProps.clickedChar) {
            this.rerollChar(id)
        }

    }

    rerollChar = (id) => {
        this.setState({
            loading: true
        })

        this.updateChar(id)
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false,
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
        const {loading, error, char} = this.state
        
        let errorMessage = error ? <ErrorMessage/> : null
        let spinner = loading ? <Spinner /> : null
        let skeleton = !spinner && !error && !char ? <Skeleton/> : null 
        const content = !(errorMessage || spinner || skeleton) ? <View char={char}/> : null
        

        return (
            <div className="char__info">
                {spinner}
                {errorMessage}
                {skeleton}
                {content}
            </div>
        )
    }
}

class View extends Component {

    render () {
        const {char} = this.props
        const comics = char.comics.map((item, i) => {
            return(
                <li key={i} className="char__comics-item">
                    <a href={item.resourceURI}>
                        {item.name}
                    </a>
                </li>
            )
        })

        const picStyles = char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? 
        {objectFit: "contain"} : {objectFit: "cover"}

        return (
            <>
                <div className="char__basics">
                    <img src={char.thumbnail} style={picStyles} alt="abyss"/>
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
                    {comics.length > 0 ? comics : <h4>No comics found</h4>}
                </ul>
            </>
        )
    }
}

export default CharInfo;