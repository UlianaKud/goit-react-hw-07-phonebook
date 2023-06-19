import Form from './Form/Form.jsx';
import Contact from './Contacts/contact.jsx';
import Filter from './Filter/filter.jsx';

export const App = () => {
  return (
    <div
      style={{
        // height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        padding: '30px',
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <Form />
        <h2>Contacts</h2>
        <Filter />
        <Contact />
      </div>
    </div>
  );
};
