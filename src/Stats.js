export default function Stats({ items }) {
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
