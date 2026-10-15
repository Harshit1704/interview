import {useContext, useState} from 'react';
import {CurrentContext} from '../context/currentContext';
import {addUser} from '../services/userService';

type ComponentAProps = {
    setUserData: Function;
};

function ComponentA({setUserData}:ComponentAProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const onSUbmit = async () => {
        if(!name || !email) {
            alert("Please fill in both name and email fields.");
            return;
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        const newUser = await addUser({ name, email });
        if (newUser) {
            setUserData((prevData: any) => [...prevData, newUser]);
        }
    };
  return (
    <div>
      <h1>Component A</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        <button onClick={onSUbmit}>
          Add User
        </button>
    </div>
  );
}

export default ComponentA;