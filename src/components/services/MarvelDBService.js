//539beee6cf0f07274df5c6df167cf58f public
//04ab30b507d17c9f6f9e4903b67ebeaced75fd4a private

class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/"
    _apiKey = "apikey=539beee6cf0f07274df5c6df167cf58f"

    getResourse = async (url) => {
        let res = await fetch(url)

        if (!res.ok){
            throw new Error(`Could not fetch ${url} with status ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async () => {
        const chars = await this.getResourse(`${this._apiBase}characters?nameStartsWith=A&limit=36&${this._apiKey}`)
        return chars.data.results.map(this._transformData)
    }

    getCharacter = async (id) => {
        const char = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformData(char.data.results[0])
    }

    _transformData = (results) => {
        return {
            name: results.name,
            description: results.description,
            thumbnail: `${results.thumbnail.path}.${results.thumbnail.extension}`,
            homepage: results.urls[0].url,
            wiki: results.urls[1].url
        }
    }
}

export default MarvelService