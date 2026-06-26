// Declare the JS module to satisfy TypeScript when a declaration file is missing
import { Routes, Route, Link } from 'react-router-dom'
import Admin from '../components/admin.js'
import User from '../components/user.js'
import NewBook from '../components/NewBook.js'
import OldBook from '../components/OldBook.js'
import Login from '../components/login.js'
import {useState,useEffect} from 'react'
import './App.css'

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { OverlayToaster } from '@blueprintjs/core'
import { EditableText,InputGroup,Button} from '@blueprintjs/core'

const AppToaster = await OverlayToaster.create({
  position: "top"
})

type User ={
  id : number,
  name : string,
  email : string
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data: User[]) => setUsers(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  function addUser(){
    const name = newName.trim();
    const email = newEmail.trim();

    if (name && email) {
      fetch('https://jsonplaceholder.typicode.com/users',
        {
          method : 'POST',
          body :JSON.stringify({
            name,
            email
          }),
          headers : {
            'Content-type' : 'application/json; charset=UTF-8'
          }
        }
      ).then((response) => response.json())
      .then((data: User) => setUsers([...users, data]))
      .catch(error => console.error('Error Posting User Detais:', error));

      AppToaster.show({
        message : "User Added Succesfully..!",
        intent : "success",
        timeout : 3000
      })
    }
  }
  return (
    <div className="bp5-light">
      <>
        <h1>Hi This is Kalaippiriyan..! 👋</h1>

        <ul>
          <li><Link to="/admin">Go to Admin Page</Link></li>
          <li><Link to="/user">Go to User Page</Link></li>
          <li><Link to="/books/newBook">This is New Book</Link></li>
          <li><Link to="/books/oldBook">This is Old Book</Link></li>
          <li><Link to ="/login">Login</Link></li>
        </ul>

        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />

          <Route path='/books'>
              <Route path ='newBook' element={<NewBook />} />
              <Route path ='oldBook' element={<OldBook />} />
          </Route>
          <Route path="/login" element={<Login/>} />
        </Routes>

        <table className='bp5-html-table bp5-html-table modifier'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>(
              <tr key={user.id}>
                <td><EditableText value={String(user.id)}/></td>
                <td><EditableText value={user.name}/></td>
                <td><EditableText value={user.email}/></td>
                <td>
                  <Button intent='primary' text='Update' />
                  <Button intent='danger' text='Delete' />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
              <tr>
                <td></td>
                <td>
                  <InputGroup value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter Name" />
                </td>
                <td>
                  <InputGroup value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Enter Email" />
                </td>
                  <Button intent='success' text='Add User' onClick={addUser} />
              </tr>
          </tfoot>
        </table>
      </>
    </div>
  )
}

export default App