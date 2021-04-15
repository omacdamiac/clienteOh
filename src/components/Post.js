import React, { Component } from "react";

class Post extends Component {

    state = {
        posts: []
    }

    async componentDidMount() {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json();
        console.log(data);
        this.setState({posts: data})
    }

    render() {
        return (
            <div>
                <h1>Post</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>N</th>
                        <th>Nombre completo</th>
                        <th>Edad</th>
                        <th>Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>omac villavicencio</td>
                        <td>33</td>
                        <td>06/11/1983</td>
                        </tr>
                    </tbody>
                </table>
            {this.state.posts.map(e =>{
                return <div key={e.id}>
                    <h1>{e.title}</h1>
                    <p>{e.body}</p>
                </div>
            })}
            </div>
        )
    }
}

export default Post;