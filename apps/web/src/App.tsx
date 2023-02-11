import { useState } from "react";
import { Route } from "wouter";
import { IndexPage } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/" component={IndexPage} />
    </div>
  );
}

export default App;
