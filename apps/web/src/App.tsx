import { useState } from "react";
import { Route } from "wouter";
import { IndexPage } from "./pages";
import "./App.css";
import { SourceIdPage } from "./pages/source/[id]";

function App() {
  return (
    <div className="App">
      <Route path="/" component={IndexPage} />
      <Route path="/source/:id" component={SourceIdPage} />
    </div>
  );
}

export default App;
