import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingIcon from "./LoadingIcon"
import Post from "./Post"
import StateContext from "../StateContext"

function ProfilePosts() {
  const appState = useContext(StateContext)

  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`)
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("There was a problem")
      }
    }
    fetchPosts()
  }, [username])

  if (isLoading) return <LoadingIcon />

  return (
    <div className="list-group">
      {posts.length > 0 &&
        posts.map(post => {
          return <Post noAuthor={true} post={post} key={post._id} />
        })}
      {posts.length == 0 && appState.user.username == username && (
        <p className="lead text-muted text-center">
          You haven&rsquo;t created any posts yet; <Link to="/create-post">create one now!</Link>
        </p>
      )}
      {posts.length == 0 && appState.user.username != username && <p className="lead text-muted text-center">{username} hasn&rsquo;t created any posts yet.</p>}
    </div>
  )
}

export default ProfilePosts
