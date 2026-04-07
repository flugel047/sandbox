const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];


function App() {
  return (
    <div className="app">
      <Logo/>
      <Form/>
      <PackagingList/>
      <Stats/>
    </div>
  );
}

function Logo(){
  return(
    <h1>EXPLORE AND SEE</h1>
  )
}

function Form(){

  function handleSubmit(e){
    e.preventDefault();
    console.log('achnikta');
  }

  return(
    <form className="add-form" onSubmit={handleSubmit}>    
    <div className="add-form">
      <h3>What do you need for your trip ?</h3>
      <select>{Array.from({length:20},(_,i)=>i+1).map
      (num=>(<option value={num} key={num}>
      {num}
      </option>
      ))}
      </select>
      <input type="text" placeholder="items"/>
      <button onClick={handleSubmit}>Add</button>
    </div>
    </form>

  )
}

function PackagingList(){
  return(
    <div className="list">
    <ul>
      {initialItems.map(item=><Item item={item} key={item.id}/>)}
    </ul>
    </div>
  )
}

function Item({item}){
  return <li>
  <span style={item.packed ? {textDecoration:"line-through"}:{}}>
    {item.quantity}  {item.description}
  </span>
      <button>❌</button>

    </li>
}

function Stats(){
  return (
  <footer className="stats">
    <em>You have X items in your list, and you already packed X items</em>
  </footer>
  )
}

export default App;
