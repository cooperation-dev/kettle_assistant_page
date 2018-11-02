import React, {Component} from 'react';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }

    handleClick() {
        this.setState({
            count: ++this.state.count
        })
    }

    render(){
        return (
            <div>
                this is home~<br/>
                当前计数: {this.state.count}
                <button onClick={this.handleClick.bind(this)}>自增2</button>
            </div>
        )
    }
}

export default Home