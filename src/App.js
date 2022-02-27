import logo from './logo.svg';
import './App.css';
import {useState} from "react";

const fuzz = require('fuzzball');

//test cloud9
function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const handleInput = e => setInput(e.target.value);
  const analyzeText = () => {
      console.log(input);
      const sentences = input.split(/[.,!;?\n]/).filter(sent => sent.length > 30);
      const matchedSentences = sentences.map(sent => {
          return {
              source: sent,
              matched: sentences.filter(sent2 => {
                  const ratio = fuzz.token_set_ratio(sent, sent2);
                  return ratio > 56 && ratio < 100;
              }),
          };
      })
      const result = matchedSentences.filter(sent => sent.matched.length > 0)
          .map(sent => ("source: " + sent.source + "\n matched:" + sent.matched.join("\n ->")))
          .join("\n ---- \n");
      setOutput(result);
  }
  return (
    <div className="App">
      <textarea value={input} onChange={handleInput}></textarea>
      <button onClick={analyzeText}>Process</button>
        <div style={{whiteSpace: "pre-line"}}>
            {output}
        </div>
    </div>
  );
}

export default App;
