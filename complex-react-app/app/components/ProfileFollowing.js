import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingIcon from "./LoadingIcon"
import StateContext from "../StateContext"

function ProfileFollowing() {
  const appState = useContext(StateContext)

  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/following`)
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
        posts.map((follower, index) => {
          return (
            <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
            </Link>
          )
        })}
      {posts.length === 0 && appState.user.username === username && <p className="lead text-muted text-center">You aren&rsquo;t following anyone yet.</p>}
      {posts.length === 0 && appState.user.username !== username && <p className="lead text-muted text-center">{username} isn&rsquo;t following anyone yet.</p>}
    </div>
  )
}

export default ProfileFollowing
