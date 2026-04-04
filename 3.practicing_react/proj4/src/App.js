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
  return(
    <div className="add-form">
      <h3>What do you need for your trip ?</h3>
    </div>
  )
}

function PackagingList(){
  return(
    <li className="list">
      {initialItems.map(item=><Item item={item}/>)}
    </li>
  )
}

function Item({item}){
  return <li>{item.description}</li>
}

function Stats(){
  return (
  <footer className="stats">
    <em>You have X items in your list, and you already packed X items</em>
  </footer>
  )
}

export default App;
