import { useEffect, useState } from "react"
import { getAllJokes, inputJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"
import "./App.css"

export const App = () => {
  const [allJokes, setAllJokes] = useState([])
  const [newJoke, setNewJoke] = useState("")
  const [hasBeenTold, setHasBeenTold] = useState(false)
  const [untoldJokesList, setUntoldJokesList] = useState([])
  const [toldJokesList, setToldJokesList] = useState([])

  useEffect(() => {
    setHasBeenTold(false)
  }, [])

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray)
    })
  }, [])

  useEffect(() => {
    const told = allJokes.filter(joke => joke.told === true)
    const untold = allJokes.filter(joke => joke.told === false)
    setToldJokesList(told)
    setUntoldJokesList(untold)
  }, [allJokes])

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>

      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={newJoke}
          placeholder="New One Liner"
          onChange={(event) => setNewJoke(event.target.value)}
        />
        <button
          className="joke-input-submit"
          onClick={() => {
            inputJoke({ text: newJoke, told: hasBeenTold })
              setNewJoke("")
              getAllJokes().then(setAllJokes)
          }}
        >
          Submit
        </button>
      </div>

      <div className="joke-lists-container">
        <section className="joke-list-container">
          <h2>
            Untold Jokes
            <span className="untold-count">{untoldJokesList.length}</span>
          </h2>
          <div>
            {untoldJokesList.map(joke => (
              <div className="joke-list-item" key={joke.id}>
                <div className="joke-list-item-text">{joke.text}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="joke-list-container">
          <h2>
            Told Jokes
            <span className="told-count">{toldJokesList.length}</span>
          </h2>
          <div>
            {toldJokesList.map(joke => (
              <div className="joke-list-item" key={joke.id}>
                <div className="joke-list-item-text">{joke.text}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

  // <article className="joke-lists-container">
    //     {allJokes.map((joke) => {
    //       return (
    //         <section className="joke-list-container" key={joke.id}>
    //           <header className="joke-list-item-text">#{joke.id}: {joke.text}</header>
    //         </section>
    //       );
    //     })}
    //   </article>