import React, { useState, useEffect, useRef } from 'react'

import ClassCounter from '../components/ClassCount'
import Counter from '../components/Counter'
import PostList from '../components/PostList'
// import PostItem from './components/PostItem'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
import MyModal from '../components/UI/MyModal/MyModal'
import MyButton from '../components/UI/button/MyButton'
import { usePosts } from '../hooks/usePosts'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'
import { getPageCount } from '../utils/pages'
import Pagination from '../components/UI/pagination/Pagination'
import { useObserver } from '../hooks/useObserver'
import MySelect from '../components/UI/select/MySelect'

// styles
// import './styles/App.css'

function Posts() {
  // состояние с массивом постов-
  const [posts, setPosts] = useState([
    { id: 1, title: 'JS', body: 'ЯП' },
    { id: 2, title: 'C++', body: 'ЯП' },
    { id: 3, title: 'Scala', body: 'ЯП' },
  ])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modalActive, setModalActive] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement = useRef()
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const res = await PostService.getAll(limit, page)
      // бескон лента
      setPosts([...posts, ...res.data])
      const totalCount = res.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
    }
  )
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)

  // создание состояния
  // 1 пар - значение по умол.
  // 2 пар - функция, которая изменяет состояние
  // теперь мы знаем, что useState возвращает массив из двух объектов,
  // мы можем сделать деструктуризация и сразу получить само состояние и
  // функцию, которая это состояние изменяет.
  // const [count, setCount] = useState(0)
  // const [value, setValue] = useState('Текст в инпуте')

  // function increment(){
  //   // мы не изменяем счетчик на прямую.
  //   // мы вызываем функцию, которая для этого предназначена
  //   setCount(count + 1)
  // }

  // function decrement(){
  //   setCount(count - 1)
  // }

  // const [title, setTitle] = useState('')
  // const [body, setBody] = useState('')

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  // посты сразу подгружаются
  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModalActive(false)
  }

  // Получаем post из дочернего элемента
  const removePost = (post) => {
    // возвращает массив, отфильтрованный по условию
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  // уже не нужна
  // const sortPosts = (sort) => {
  //   setSelectedSort(sort)
  //   console.log(sort)
  //   // ф-ция sort не возвращает новый массив, она мутирует старый
  //   // стостояние напрямую изменять незя, поэтоум мы сделаем
  //   // мы развернем посты в новыц массив
  //   // и sort уже этот массив. те копию
  //   // setPosts()
  //   // выцепляем поле, которое выбрал пользователь
  //   // и для сравнения строк используме localeCompare
  // }

  return (
    <div className='App'>
      {/* <span>Приложение работает !</span>
      <div>
        <h2>Count: {count}</h2>
        <h2>Value: {value}</h2>
        <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div> */}

      <MyButton className='open-btn' onClick={() => setModalActive(true)}>
        Открыть модалку
      </MyButton>

      <MyModal active={modalActive} setActive={setModalActive}>
        <PostForm create={createPost} />
      </MyModal>

      <Counter />
      <span>ClassCounter устаревшее</span>
      <ClassCounter />
      <span>PostItem</span>
      {/* <PostItem
        post={{
          id: 1,
          title: 'JS',
          body: 'яп',
        }}
        remove={removePost}
      /> */}
      <span>PostList</span>

      <hr style={{ margin: '15px 0px' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue='Кол-во эл на странице'
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' },
        ]}
      ></MySelect>

      {postError && <h3>Произошла ошибка ${postError}</h3>}

      {/*условная отрисовка
         предаем removePost как пропс, как ссылку */}
      <PostList
        remove={removePost}
        posts={sortedAndSearchPosts}
        title='Список постов 1'
      />
      <div
        ref={lastElement}
        style={{ height: '20px', background: 'blue' }}
      ></div>
      {isPostsLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <h3>идет загрузка...</h3>
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>

    // поле value в event.target это значение, которое в нем находится
    // так реализовывается двухстороннее связывание

    // передаем функцию как ссылку, но не вызываем

    // React.createElement('button', {
    //   onClick: () => console.log('Click'),
    //   disabled: true,
    // }, 'Кнопка')
  )
}

export default Posts

// rafce

// ф-цию обратного вызова нам пришлось прокинуть два раза
// сначала в postList, потом в postItem
// и все это для того, чтобы удалить эл из массива.

// USEMEMO
// useMemo(() => {
//   return [...posts].sort(...)
// }, deps)
// она производит вычисления, запоминает результат этих вычислений
// и кеширует - мемоизация.
// На каждую перересовку компонента, она не перешитывает заново
// она не сортирует массив вновь, она достает сорт массив из кеша.
// изменится толкьо если измен зависимоть (другая сорт)

// Жизненный цикл компонента
// три этапа: 1. Монтирование (mount) - создается компонент и монтируется в дом дерево.
// 2. Обновление компонента (update) - изменили состояние, перерендер. Когда мы его видим, когда он живет.
// 3. Размонтирование (unmount) - когда он больше не нжуен и мы его уддаляем. Скрыть или переходим на другую стр.
// ----------- (1) первичная подгрузка данныех, повесить слушатели.
// (2) можем следить за изменениями зависимостей и производить нужные действия.
// (3) очистка, от событий отписка, шлоб хранилище итд
// -----------
// useEffect(() => {
//
// }, deps)
// если масив зависимостей пустой, callback отработает единожды, когда компо был вмонтирован.
// для того, чтобы следить за изменениями, необходимо добавить зависимости в массив
// например будем отслеживать изменение filter, и каждый аз будет отрабатывать callback.
// И стадия размонтирования компонента. Если callback возвращает какую-либо функцию,
// то эта ф-ция будет вызвана в момент (3)

// Обьяснение механизма изменения состоние
// изменение состояния это асинхронный процесс.
// остается замкнутое состояние старое
// page попадает в запрос с отставанием

// useContext - глобальное хранилище
