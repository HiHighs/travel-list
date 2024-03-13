import { useState } from 'react';
import Item from './Item';

export default function PackList({
  items,
  onRemoveItem,
  onToggleItem,
  onSortItems,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState('input');

  function handleSortBy(sortBy) {
    setSortBy(sortBy);
    onSortItems(sortBy);
  }

  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemoveItem={onRemoveItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={(e) => handleSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
