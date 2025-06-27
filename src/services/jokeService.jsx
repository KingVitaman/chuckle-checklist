export const inputJoke = (jokeObj) => {
    fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObj)
    })
}

export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then(res => res.json())
}