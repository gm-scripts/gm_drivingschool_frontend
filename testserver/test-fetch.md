# test fetch reqs

## start quiz

```js
fetch("http://localhost:3000/question", {
  method: "post",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    foo: "bar",
    b_bar: "b_foo"
  })
})
  .then((res) => res.json())
  .then((data) => console.log(data.question));
```
