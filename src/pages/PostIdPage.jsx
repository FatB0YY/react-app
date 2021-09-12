import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'

const PostIdPage = () => {
  const params = useParams()

  const [post, setPost] = useState({})
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const res = await PostService.getById(id)
    setPost(res.data)
  })

  const [comments, setComments] = useState([])
  const [fecthComments, isComLoading, comError] = useFetching(async (id) => {
    const res = await PostService.getCommentsByPostId(id)
    setComments(res.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fecthComments(params.id)
  }, [])

  return (
    <div>
      <h1>Вы открыли стр поста с ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}

      <h2>Комментарии:</h2>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginTop: '15px' }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostIdPage
