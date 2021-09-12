import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
        <MyInput
          placeholder='Поиск...'
          value={filter.query}
          onChange={(event) => setFilter({...filter, query: event.target.value})}
        />
        <MySelect
          value={filter.sort}
          // будем вызывать функцию сеттер
          // и передавать туда то, что приходит с самого селекта
          // onChange={(sort) => setSelectedSort(sort)}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue='Сортировка'
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>
    )
}

export default PostFilter
