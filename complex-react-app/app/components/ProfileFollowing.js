import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingIcon from "./LoadingIcon"

function ProfileFollowing() {
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
      {posts.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
          </Link>
        )
      })}
    </div>
  )
}

export default ProfileFollowing
