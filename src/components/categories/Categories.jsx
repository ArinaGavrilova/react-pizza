import './categories.scss';

function Categories({ value, onChangeCateg }) {
  const categories = ['All', 'Meats', 'Veggie', 'Grill', 'Spicy', 'Covered']

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, i) => (
            <li 
              key={i} 
              onClick={() => onChangeCateg(i)} 
              className={value === i ? 'active' : ''}>{categoryName}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Categories;