export default function Item({ item, onRemoveItem, onToggleItem }) {
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
