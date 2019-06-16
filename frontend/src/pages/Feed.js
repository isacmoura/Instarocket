import React, { Component } from 'react'
import io from 'socket.io-client'
import api from '../services/api'

import { PostList } from './FeedStyles'

import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'

class Feed extends Component {
    state = {
        feed: [],

    }

    async componentDidMount() {
        this.registerToSocket()

        const response = await api.get('posts')

        this.setState({ feed: response.data })
    }

    handleLike = id => {
        api.post(`posts/${id}/like`)
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333')

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        })

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post)
            })
        })
    }

    render() {
        return (
            <PostList id='post-list'>
                {this.state.feed.map(posts => (
                    <article key={posts._id}>
                        <header>
                            <div className='user-info'>
                                <span>{posts.author}</span>
                                <span className="place">{posts.place}</span>
                            </div>

                            <img src={more} alt='Mais' />
                        </header>

                        <img src={`http://localhost:3333/files/${posts.image}`} alt=''/>

                        <footer>
                            <div className='actions'>
                                <button type='submit' onClick={ () => this.handleLike(posts._id)}>
                                    <img src={like} alt=''/>
                                </button>
                                <img src={comment} alt=''/>
                                <img src={send} alt=''/>
                            </div>

                            <strong>{posts.likes} curtidas</strong>
                            <p>
                                {posts.description}
                                <span>{posts.hashtags}</span>
                            </p>
                        </footer>

                    
                    </article>
                ))}
            </PostList>
        )
    }
}

export default Feed