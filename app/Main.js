import React from "react"
import ReactDOM from "react-dom"

function Example() {
  return (
    <div>
      <h1>hello</h1>
      <p>aaaa</p>
    </div>
  )
}

ReactDOM.render(<Example />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
