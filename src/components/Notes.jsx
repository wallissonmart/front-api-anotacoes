import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/UseContext';

const Notes = () => {
  const [selectedValue, setSelectedValue] = useState('false');
  const [allNotes, setAllNotes] = useState([]);
  const [changeNote, setChangeNote] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);

  useEffect(() => {
    if (selectedValue === 'false') {
      getAllNotes();
    } 

  }, [auth.updateNotes]);

  async function getAllNotes() {
    const response = await api.get('/annotations');

    setAllNotes(response.data);
    setLoading(true);
  }

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`);

    if (deletedNote) {
      setAllNotes(allNotes.filter((note) => note._id !== id));
    }
  }

  function handleEdit(e, priority) {
    e.style.cursor = 'text';
    e.style.borderRadius = '5px';

    if (priority) {
      e.style.boxShadow = '0 0 5px white';
    } else {
      e.style.boxShadow = '0 0 5px gray';
    }
  }

  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`);
    if (note && selectedValue === 'true') {
      loadNotesPriority();
    } else if (note) {
      getAllNotesPriority();
    }
  }

  async function handleSave(note, e, notes) {
    e.style.cursor = 'default';
    e.style.boxShadow = 'none';

    if (changeNote && changeNote !== notes) {
      await api.post(`/contents/${note._id}`, {
        notes: changeNote,
      });
    }
  }

  async function loadNotesPriority() {
    const response = await api.get('/priorities?priority=true');

    if (response) {
      setAllNotes(response.data);
    }
  }

  function handleChange(e) {
    setSelectedValue(e.value);

    if (e.checked && e.value === 'true') {
      loadNotesPriority();
    } else {
      getAllNotes();
    }
  }

  return (
    <Container>
      <Radio>
        <div>
          <input
            type="radio"
            name="false"
            id="false"
            value="false"
            checked={selectedValue === 'false'}
            onChange={(e) => handleChange(e.target)}
          />
          <span>Todas</span>
        </div>
        <div>
          <input
            type="radio"
            name="true"
            id="true"
            value="true"
            checked={selectedValue === 'true'}
            onChange={(e) => handleChange(e.target)}
          />
          <span>Prioridades</span>
        </div>
      </Radio>
      {loading ? (
        <ul>
          {allNotes.map((note) => {
            return (
              <li
                key={note._id}
                className={
                  note.priority ? 'notepad-infos-priority' : 'notepad-infos'
                }
              >
                <div>
                  <strong>{note.title}</strong>
                  <div onClick={() => handleDelete(note._id)}>x</div>
                </div>
                <textarea
                  defaultValue={note.notes}
                  onClick={(e) => handleEdit(e.target, note.priority)}
                  onChange={(e) => setChangeNote(e.target.value)}
                  onBlur={(e) => handleSave(note, e.target, note.notes)}
                ></textarea>
                <span onClick={() => handleChangePriority(note._id)}>!</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="loading">
          <span>Carregando...</span>
        </div>
      )}
    </Container>
  );
};

export default Notes;

const Container = styled.main`
  margin-left: 350px;

  @media (max-width: 768px) {
    margin: 0;
    margin-top: 2rem;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    list-style: none;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
  .loading span {
    color: #f5f1f1;
    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;
  }

  .notepad-infos div {
    display: flex;
    justify-content: space-between;
  }

  .notepad-infos {
    background-color: #fff;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0 0.2px);
    border-radius: 10px;
    padding: 20px 20px 10px 20px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .notepad-infos strong {
    display: block;
    font-size: 16px;
    color: #333;
  }
  .notepad-infos div div {
    color: #131212;
    cursor: pointer;
  }
  .notepad-infos div div:hover {
    color: #e71212;
    transform: 0.2s;
  }

  .notepad-infos textarea {
    padding: 7px;
    margin-top: 7px;
    margin-bottom: 5px;
    width: 100%;
    height: 130px;
    font-size: 14px;
    color: #666;
    border: 0;
    background-color: #fff;
    resize: none;
    outline: 0;
  }

  .notepad-infos span {
    color: #131212;
    cursor: pointer;
  }
  .notepad-infos span:hover {
    color: #e71212;
    transition: 0.2s;
  }

  .notepad-infos-priority div {
    display: flex;
    justify-content: space-between;
  }

  .notepad-infos-priority {
    background-color: #249e14;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0 0.2px);
    border-radius: 10px;
    padding: 20px 20px 10px 20px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .notepad-infos-priority strong {
    display: block;
    font-size: 16px;
    color: #fff;
  }
  .notepad-infos-priority div div {
    color: #fff;
    cursor: pointer;
  }
  .notepad-infos-priority div div:hover {
    color: #e71212;
    transform: 0.2s;
  }

  .notepad-infos-priority textarea {
    padding: 7px;
    margin-top: 7px;
    margin-bottom: 5px;
    width: 100%;
    height: 130px;
    font-size: 14px;
    color: #fff;
    border: 0;
    background-color: #249e14;
    resize: none;
    outline: 0;
  }

  .notepad-infos-priority span {
    color: #fff;
    cursor: pointer;
  }
  .notepad-infos-priority span:hover {
    color: #e71212;
    transition: 0.2s;
  }
`;

const Radio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  gap: 2rem;

  span {
    margin-left: 0.1rem;
    font-weight: 700;
    color: #111010;
    font-size: 1.2rem;
  }
`;
