import React from "react"
import ReactDOMServer from "react-dom/server"
import fs from "fs"
import Footer from "./app/components/Footer"
import Header from "./app/components/Header"
import LoadingDotsIcon from "./app/components/LoadingDotsIcon"
import { StaticRouter as Router } from "react-router-dom"
import StateContext from "./app/StateContext"

function Shell() {
  return (
    <StateContext.Provider value={{ loggedIn: false }}>
      <Router>
        <Header staticEmpty={true} />
        <div className="py-5 my-5 text-center">
          <LoadingDotsIcon />
        </div>
        <Footer />
      </Router>
    </StateContext.Provider>
  )
}

function html(x) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Bloggy</title>
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300,400,400i,700,700i&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
      <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" integrity="sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0" crossorigin="anonymous"></script>
  
      <link rel="stylesheet" href="/main.css" />
    </head>
    <body>
      <div id="app">
      ${x}
      </div>
    </body>
  </html>
  `
}

const reactHtml = ReactDOMServer.renderToString(<Shell />)

/*
  Call "html" function which has the skeleton or
  boilerplate HTML, and give it the string that React
  generated for us. Our "html" function will insert
  the React string inside the #app div. So now we will
  have a variable in memory with the exact string we
  want, we just need to save it to a file.

*/
const overallHtmlString = html(reactHtml)

const fileName = "./app/index-template.html"
const stream = fs.createWriteStream(fileName)
stream.once("open", () => {
  stream.end(overallHtmlString)
})
