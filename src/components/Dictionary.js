import React, {useState, useRef} from 'react';

const Dictionary = () => {
    
    const [results, setResults] = useState()

    const makeApiCall = (input) => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
        .then((res) => res.json())
        .then((data) => {
            setResults(data[0].meanings[0].definitions)
        })
        .catch((err) => console.log(err))
    }

    const wordSearch = useRef()

    const handleSearch = (event) => {
        event.preventDefault()
        makeApiCall(wordSearch.current.value)
        // wordSearch.current.value=''
    }

    console.log(results)

    const definition = results && results.map((word, index) => {
        return (
            <div key={index} className="displayedResults">
                {word.definition}
            </div>
        )
    })

    return (
        <div className="dictionary">
            
            <h1 className="title">Dictionary</h1>
            
            <div className="formContainer">
                <form className="searchBox">
                    <input
                        className="search"
                        type="search"
                        placeholder="Search a word"
                        ref={wordSearch}
                    />
                    <button onClick={handleSearch}>Search</button>
                </form>
            </div>

            <div className="definitionBox">
                {definition}
            </div>
            
        </div>
    )
}

export default Dictionary;