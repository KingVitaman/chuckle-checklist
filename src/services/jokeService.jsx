const apiUrl = "http://localhost:8088/jokes"

export const inputJoke = (jokeObj) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObj)
    })
}

export const getAllJokes = () => {
    return fetch(apiUrl).then(res => res.json())
}

export const updateJoke = (joke) => {
    return fetch(`${apiUrl}/${joke.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    })
}

export const deleteJoke = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
}