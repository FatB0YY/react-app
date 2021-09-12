import React from 'react'
import { usePagination } from '../../../hooks/usePagination'

const Pagination = ({ totalPages, page, changePage }) => {
  // сформируем массив:
  let pagesArray = usePagination(totalPages)
  return (
    <div className='page__wrapper'>
      {pagesArray.map((p) => {
        return (
          <span
            onClick={() => changePage(p)}
            key={p}
            className={page === p ? 'page page__current' : 'page'}
          >
            {p}
          </span>
        )
      })}
    </div>
  )
}

// в этом компоненте нужно получать номер текущей страницы,
// ф-ция которая этот номер изменяет и массив, на основании которрого
// необходимо рендерить страницы.
// Для создания массива нужно знать сколько всего страниц, это пропс totalPage
// Потом нужно получать номер текущей стр и ф-ция которая тек стр изменяет.

export default Pagination
