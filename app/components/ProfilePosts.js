import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const { username } = useParams()

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`)
        setIsLoading(false)
        setPosts(response.data)
      } catch (e) {
        console.log(e.response.data)
      }
    }
    fetchPosts()
  }, [])

  if (isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {posts.map(post => {
        const date = new Date(post.createdDate)
        const dateFormated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return (
          <Link to={`/posts/${post._id}`} className="list-group-item list-group-item-action" key={post._id}>
            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> <span className="text-muted small">on {dateFormated} </span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts
