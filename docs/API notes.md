
```js
fetch("http://localhost:4000/users")
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })

fetch("http://localhost:4000/users", {
  method: "POST",
  body: JSON.stringify({
    id: 1,
    name: "El Amor Venezolano",
    username: "elamorvenezolamo",
    password: "Conway"
  }),
  headers: {"Content-Type": "application/json"}
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })

fetch("http://localhost:4000/users", {
  method: "POST",
  body: JSON.stringify({
    id: 1,
    name: "El Amor Venezolano",
    username: "elamorvenezolamo",
    password: "Conway"
  }),
  headers: {"Content-Type": "application/json"}
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })

fetch("http://localhost:4000/users", {
  method: "DELETE",
  body: JSON.stringify({
    id: 23,
  }),
  headers: {"Content-Type": "application/json"}
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })

fetch("http://localhost:4000/users/login", {
  method: "POST",
  body: JSON.stringify({
    username: "elamorvenezolamo",
    password: "Conway"
  }),
  headers: {"Content-Type": "application/json"}
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })

```
