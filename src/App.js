import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./cards.json";
import "./App.css";

// Global variables set for the state
let correctGuesses = 0;
let topScore = 0;
let clickAlert =
  "Click the images to earn defense points, click the same image twiceand the zombies win.";

class App extends Component {
// Setting the state by using the global variables
  state = {
    matches,
    correctGuesses,
    topScore,
    clickAlert
  };

  setClicked = id => {
    const matches = this.state.matches;
    const clickedMatch = matches.filter(match => match.id === id);

    if (clickedMatch[0].clicked) {
      correctGuesses = 0;
      clickAlert = "Game Over! The zombies ate your brains";
    
      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }
// Reset the state to whatever is true from the above click function
      this.setState({ clickAlert });
      this.setState({ correctGuesses });
      this.setState({ matches });

    } else if (correctGuesses < 9) {
// Finding out if the clicked image does not match the previously clicked image
      clickedMatch[0].clicked = true;
// If it doesn't match previous image add 1 to the Current Score
      correctGuesses++;
      clickAlert = "You're winning! Keep going!";

// When an image gets clicked twice in a row, set topScore state to the number of correct guesses
      if (correctGuesses > topScore) {
        topScore = correctGuesses;
        this.setState({ topScore });
      }

      matches.sort(function (a, b) {
        return 0.5 - Math.random();
      });

// Reset the state to whatever is true from the above click function
      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickAlert });

    } else {
      clickedMatch[0].clicked = true;
// If correct guesses equals the amount of images in the array, reset score to 0 and set state of score to 10 (top score acheivable)
      correctGuesses = 0;
      clickAlert = "SPACE TACOS!!";
      topScore = 10;

      this.setState({ topScore });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      matches.sort(function (a, b) {
        return 0.5 - Math.random();
      });

// Reset the state to whatever is true from the above click function
      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickAlert });
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="container">
          <Title>Clicky PVZ</Title>
          <br />
          <h3 className="scoreSummary">{this.state.clickAlert}</h3>
          <h3 className="scoreSummary">
            Score: {this.state.correctGuesses} &nbsp; | &nbsp; Top Score: {this.state.topScore}
          </h3>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            {this.state.matches.map(match => (
             
              <Card
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
              />

            ))}
          </div>
        </div>
      </Wrapper>
    );
  }
}


export default App;
