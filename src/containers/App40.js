import React, { Component } from 'react'
import {demos} from '../Demos40'
import CardList from '../components/CardList40'
import SearchBox from '../components/SearchBox'

class App extends Component {
    constructor(){
        super();
        this.state = {
            demos:demos,
            searchField: ''
        }
    }
    onSearchChange = event => {
        this.setState({searchField:event.target.value});
    }
    
    render(){
        const filterDemos = this.state.demos.filter(demo =>{
            return demo.demoName.toLowerCase().includes(this.state.searchField.toLowerCase());
        });
        return (
            <div className='tc'>
                <SearchBox searchChange={this.onSearchChange}/>
                <CardList demos={filterDemos}/>
            </div>
        )
    }
}

export default App
// rafc