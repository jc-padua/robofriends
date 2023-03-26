import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(users => this.setState({ robots: users }))
    }

    // Search Function
    onSearchChange = (event) => {
        // Setting new value of the searchField using setState
        this.setState({ searchfield: event.target.value })
        // console.log(event);
    }

    // Renders the components 
    render() {
        const { robots, searchfield } = this.state;
        // A container of a filtered robot from the search box 
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        });

        return !robots.length ? <h1>Loading..</h1> :
            // Components
            <div className="tc" >
                <h1>ROBOFRIENDS</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
    }
}

export default App;