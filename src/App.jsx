import { useEffect, useState } from "react"
import { getAllJokes, inputJoke, updateJoke, deleteJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"
import "./App.css"

export const App = () => {
  const [allJokes, setAllJokes] = useState([])
  const [newJoke, setNewJoke] = useState("")
  const [hasBeenTold, setHasBeenTold] = useState(false)
  const [untoldJokesList, setUntoldJokesList] = useState([])
  const [toldJokesList, setToldJokesList] = useState([])

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
            <div className="untold-count">{untoldJokesList.length}</div>
          </h2>
          <div>
            {untoldJokesList.map(joke => (
              <div className="joke-list-item" key={joke.id}>
                <div className="joke-list-item-text">{joke.text}</div>
                <div className="joke-list-action-toggle">
                  <button
                    onClick={() => {
                      updateJoke({ ...joke, told: true })
                        .then(() => getAllJokes())
                        .then(setAllJokes)
                    }}
                  >
                    <i className="fa-regular fa-laugh"></i>
                  </button>
                  <div className="joke-list-action-delete">
                  <button onClick={() => deleteJoke(joke.id).then(() => getAllJokes())
                        .then(setAllJokes)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="joke-list-container">
          <h2>
            Told Jokes
            <div className="told-count">{toldJokesList.length}</div>
          </h2>
          <div>
            {toldJokesList.map(joke => (
              <div className="joke-list-item" key={joke.id}>
                <div className="joke-list-item-text">{joke.text}</div>
                <div className="joke-list-action-toggle">
                  <button
                    onClick={() => {
                      updateJoke({ ...joke, told: false })
                        .then(() => getAllJokes())
                        .then(setAllJokes)
                    }}
                  >
                    <i className="fa-regular fa-frown"></i>
                  </button>
                  <div className="joke-list-action-delete">
                    <button onClick={() => deleteJoke(joke.id).then(() => getAllJokes())
                      .then(setAllJokes)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}