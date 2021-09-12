import React from 'react'
import classes from './MyButton.module.css'

// название класса генерируется в соотвествии с css модулем
// который мы сделали, таким образом, мы можем добиться изоляции стилей
// без bem.


const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {/* реакт  по умолчанию не знает, в какое место компонента
                необходимо добавлять вложенные элементы*/}
            {children}
        </button>
    )
}

export default MyButton
