import db from '../../database/db';
import {Author} from '../../types/LocalTypes';

// get all authors
const getAllAuthors = (): Author[] => {
  return db.prepare('SELECT * FROM authors').all() as Author[];
};

// get author by id
const getAuthor = (id: number | bigint): Author => {
  const result = db
    .prepare('SELECT * FROM authors WHERE id = ?')
    .get(id) as Author;
  if (!result) {
    throw new Error('Author not found');
  }
  return result;
};

// create new author
const createAuthor = (author: Omit<Author, 'id'>): Author => {
  const result = db
    .prepare('INSERT INTO authors (name, email) VALUES (?, ?)')
    .run(author.name, author.email);
  if (!result.lastInsertRowid) {
    throw new Error('Failed to insert author');
  }
  return getAuthor(result.lastInsertRowid);
};

// update author
const updateAuthor = (
  id: number | bigint,
  name: string,
  email: string,
): Author => {
  const result = db
    .prepare('UPDATE authors SET name = ?, email = ? WHERE id = ?')
    .run(name, email, id);
  if (result.changes === 0) {
    throw new Error('Failed to update article');
  }
  return getAuthor(id);
};

// delete author
const deleteAuthor = (id: number | bigint): void => {
  const deleteArticlesResult = db
  .prepare('DELETE FROM articles WHERE author_id = ?')
  .run(id);

  const result = db.prepare('DELETE FROM authors WHERE id = ?').run(id);
  if (deleteArticlesResult.changes === 0 && result.changes === 0) {
    throw new Error('Author not found');
  }
};

export {getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor};
