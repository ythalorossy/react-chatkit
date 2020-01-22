import React, { Component } from 'react'

export default class UsernameForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            username: e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    render() {
        return (
            <div>
                <h2>What is your username?</h2>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        placeholder="What is your name?"
                        onChange={this.onChange}
                    />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}


