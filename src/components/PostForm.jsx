import React, { useState, useRef } from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' })

  const addNewPost = (event) => {
    event.preventDefault()
    console.log(post.title)
    // currnet сам DOM элемент
    // console.log(bodyInputRef.current.value)
    // console.log(newPost);
    // ВАЖНО !!!
    // мы не изменяем состояние напрямую
    // мы вызываем ф-ию setPost и передаем туда новый массив,
    // куда разворачиваем старый массив
    // и добавляем в конец новый пост
    // setPosts([...posts, { ...post, id: Date.now() }])

    const newPost = {
      ...post,
      id: Date.now(),
    }
    create(newPost)
    // очитска инпутов полсе клика
    setPost({ title: '', body: '' })
  }

  //  неуправляемый инпут
  // useRef позволяет получить доступ к DOM элементу
  // и уже у этого DOM элемента забрать value.
  // Не рек напрямую манипулировать в дом
  // const bodyInputRef = useRef()

  return (
    <form>
      {/* Управляемый компонент */}
      <MyInput
        type='text'
        placeholder='Название поста'
        value={post.title}
        // onChange={(event) => setTitle(event.target.value)}
        onChange={(event) => setPost({ ...post, title: event.target.value })}
      />

      {/*Неуправляемый\Неконтролируемый компонент*/}
      <MyInput
        value={post.body}
        onChange={(event) => setPost({ ...post, body: event.target.value })}
        type='text'
        placeholder='Описание поста'
      />

      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  )
}

export default PostForm
