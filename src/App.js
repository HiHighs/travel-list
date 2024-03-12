import { useState } from 'react';

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

function Logo() {
  return <h1>✈️ Vacation 🌴</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    onAddItem({
      id: new Date().valueOf(),
      description,
      quantity,
      packed: false,
    });

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What to bring on the trip? 🌞</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackList({
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

function Item({ item, onRemoveItem, onToggleItem }) {
  return (
    <li>
      <input
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
        type='checkbox'
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer className='stats'>
        <em>Start by adding some items to your packing list! 👒</em>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter((i) => i.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentage !== 100
          ? `
        You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%) 🧳`
          : 'You have packed everything and are ready to go! 🌻'}
      </em>
    </footer>
  );
}
