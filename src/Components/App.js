import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackList from './PackList';
import Stats from './Stats';

/*
const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Condom', quantity: 1, packed: true },
]
*/

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems(() => [...items, item]);
  }

  function handleRemoveItem(id) {
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);
  }

  function handleToggleItem(id) {
    const newItems = items.map((i) =>
      i.id === id ? { ...i, packed: !i.packed } : i
    );
    setItems(newItems);
  }

  function handleSortItems(sortBy) {
    // slice() to make a copy first
    if (sortBy === 'input') setItems(items.slice().sort((a, b) => a.id - b.id));

    if (sortBy === 'description')
      setItems(
        items.sort((a, b) => a.description.localeCompare(b.description))
      );

    if (sortBy === 'packed') {
      setItems(items.slice().sort((a, b) => a.packed - b.packed));
    }
  }

  function handleClearList() {
    const confirmed = window.confirm(
      'Are you sure you want to clear the list?'
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackList
        items={items}
        onRemoveItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
        onSortItems={handleSortItems}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
