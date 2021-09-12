import React from 'react'
import PostItem from './PostItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PostList = function ({ posts, title, remove }) {
  if (!posts.length) {
    return <h2 style={{ textAlign: 'center' }}>Посты не найдены!</h2>
  }

  return (
    <div>
      {/* вывод массива */}
      <h1 style={{ textAlign: 'center' }}>{title}</h1>

      <TransitionGroup>
        {/* idx не использовать  */}
        {posts.map((post, idx) => {
          return (
            <CSSTransition key={post.id} timeout={300} classNames='post'>
              <PostItem remove={remove} idx={idx + 1} post={post} />
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </div>
  )
}

export default PostList
