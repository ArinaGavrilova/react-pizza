import { useState } from 'react'

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['All', 'Meats', 'Veggie', 'Grill', 'Spicy', 'Covered']

  const onClickCateg = (index) => {
    setActiveIndex(index)
  }
    return (
      <div className="categories">
        <ul>
          {
            categories.map((el, i) => (
              <li onClick={() => onClickCateg(i)} className={activeIndex === i ? 'active' : ''}>{el}</li>
            ))
          }
        </ul>
      </div>
    )
}

export default Categories;