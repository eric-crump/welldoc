import Stack, { onEntryChange } from "./cstack";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "./components/Page";

import './App.css';
import Homepage from "./components/Homepage";
import Course from "./components/Course";

function App() {
  const [entry, setEntry] = useState({});

  async function getEntry() {
    let theEntry = await Stack.getElementWithRefs('blt69847e009602edeb', 'home_page', ['lessons.curriculum_template'])
    setEntry(theEntry);
  }

  useEffect(() => {
    onEntryChange(getEntry);
  }, []);

  return (
    <div className="container-fluid">
      <Routes>
        <Route path='/' element={<Homepage entry={entry} />} />
        <Route path='/course/:uid' element={<Course />} />
        <Route path='/course/:uid/:page_id' element={<Course />} />
        <Route path='/:uid' element={<Page />} />
      </Routes>

    </div>
  );
}

export default App;
