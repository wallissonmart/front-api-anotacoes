import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import Notes from './Notes';

const Write = () => {
  const [title, setTtitles] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/annotations', {
      title,
      notes,
      priority,
    });

    setTtitles('');
    setNotes('');
    setPriority(false);
  }

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit');
      btn.style.background = '#b6aead';
      if (title && notes) {
        btn.style.background = '#474444';
      }
    }

    enableSubmitButton();
  }, [title, notes]);
  return (
    <Aside>
      <strong>Caderno de notas</strong>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="title">Título da anotação</label>
          <input
            name="title"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTtitles(e.target.value)}
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="notes">Anotações</label>
          <textarea
            name="notes"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            checked={priority}
            onChange={() => setPriority(priority ? false : true)}
          />
          <span>Prioridade</span>
        </div>
        <button id="btn_submit" type="submit">
          Salvar
        </button>
      </form>
    </Aside>
  );
};

export default Write;

const Aside = styled.aside`
  width: 320px;
  background: #fff;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px 20px;
  position: fixed;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
  }

  strong {
    font-size: 1.8rem;
    text-align: center;
    display: block;
    color: #333;
  }

  form {
    margin-top: 30px;
  }

  .input-block {
    margin-top: 20px;
  }
  .input-block label {
    color: #6d6565;
    font-size: 14px;
    font-weight: bold;
    display: block;
  }
  .input-block input {
    width: 100%;
    height: 32px;
    font-size: 14px;
    color: #161515;
    border: 0;
    border-bottom: 1px solid #eee;
    outline: 0;
  }

  .input-block textarea {
    margin-top: 7px;
    width: 100%;
    height: 200px;
    font-size: 14px;
    color: #161515;
    border: 0;
    border-bottom: 1px solid #eee;
    background: #fff;
    resize: none;
    outline: 0;
  }

  button[type='submit'] {
    width: 100%;
    height: 2.5rem;
    border: 0;
    margin-top: 30px;
    background: #b6aead;
    border-radius: 10px;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .checkbox {
    display: flex;
    align-items: center;
  }
  .checkbox input {
    height: 0.9rem;
    width: 1rem;
  }
  .checkbox span {
    margin-left: 0.2rem;
  }
`;
