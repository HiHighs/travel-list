export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>✈️ Vacation Time 🌴</h1>;
}

function Form() {
  return (
    <div className='add-form'>
      <h3>What to bring on the trip? 🌞</h3>
    </div>
  );
}

function PackList() {
  return <div className='list'>LIST</div>;
}

function Stats() {
  return (
    <footer className='stats'>
      <em>You have X items on your list, and you already packed X (X%) 🧳</em>
    </footer>
  );
}
