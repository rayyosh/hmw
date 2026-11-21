import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Uchala so'rov natijalarini saqlash uchun state'lar
  const [postResult, setPostResult] = useState(null);
  const [putResult, setPutResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  // 1. POST so'rovi (forma yuborilganda)
  const handleCreate = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
    })
      .then((res) => {
        const status = res.status;
        return res.json().then((data) => ({ status, data }));
      })
      .then(({ status, data }) => {
        setPostResult({ id: data.id, status: status });
      });
  };

  // 2. PUT so'rovi ('Редактировать' tugmasi bosilganda)
  const handleUpdate = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        title: title || 'Обновленный заголовок',
        body: body || 'Обновленный текст поста',
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPutResult(data);
      });
  };

  // 3. DELETE so'rovi ('Удалить' tugmasi bosilganda)
  const handleDelete = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    }).then((res) => {
      setDeleteResult({ status: res.status });
    });
  };

  return (
    <div className="container">
      <h1>Работа с постами (POST, PUT, DELETE)</h1>

      {/* 1. Forma -> POST */}
      <form onSubmit={handleCreate} className="post-form">
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Текст"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit" className="btn-post">Создать (POST)</button>
      </form>

      {/* 2 va 3. Редактировать va Удалить tugmalari */}
      <div className="actions">
        <button onClick={handleUpdate} className="btn-put">
          Редактировать
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Удалить
        </button>
      </div>

      {/* Uchala javobni bitta ekranda ko'rsatish */}
      <div className="results">
        <div className="result-box">
          <h3>1. Ответ POST:</h3>
          {postResult ? (
            <p>ID: <strong>{postResult.id}</strong> | Статус: <strong>{postResult.status}</strong></p>
          ) : (
            <p className="empty">Нажмите "Создать (POST)"</p>
          )}
        </div>

        <div className="result-box">
          <h3>2. Ответ PUT (/posts/1):</h3>
          {putResult ? (
            <pre>{JSON.stringify(putResult, null, 2)}</pre>
          ) : (
            <p className="empty">Нажмите "Редактировать"</p>
          )}
        </div>

        <div className="result-box">
          <h3>3. Ответ DELETE (/posts/1):</h3>
          {deleteResult ? (
            <p>Статус: <strong>{deleteResult.status}</strong> (Удалено)</p>
          ) : (
            <p className="empty">Нажмите "Удалить"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;