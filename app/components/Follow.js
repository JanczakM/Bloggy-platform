import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"

function Follow(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [follow, setFollow] = useState([])
  const { username } = useParams()

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchFollow() {
      try {
        const response = await Axios.get(`/profile/${username}/${props.action}`, { cancelToken: ourRequest.token })
        setIsLoading(false)
        setFollow(response.data)
      } catch (e) {
        console.log(e.response.data)
      }
    }
    fetchFollow()
    return () => {
      ourRequest.cancel()
    }
  }, [username, props.action])

  if (isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {follow.map((follower, index) => {
        return (
          <Link to={`/profile/${follower.username}`} className="list-group-item list-group-item-action" key={index}>
            <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
          </Link>
        )
      })}
    </div>
  )
}

export default Follow
