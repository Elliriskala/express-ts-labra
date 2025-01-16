import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../src/api/models/articleModel';
import {
  createAuthor,
  getAuthor,
  getAllAuthors,
  updateAuthor,
  deleteAuthor,
} from '../src/api/models/authorModel';
import {Article, Author} from '../src/types/LocalTypes';

// Create new article for testing
const testArticle: Article = {
  id: 1, // some random id
  title: 'Test Article',
  description: 'This is the content of article 1',
  author_id: 1, // some random author id
  author_email: 'pekka.koistinen@metropolia.fi',
  author_name: 'Pekka',
};

// Create new author for testing
const testAuthor: Author = {
  id: 1,
  name: 'Test Author',
  email: 'testi@metropolia.fi',
};

// Unit tests to test functions in src/api/models/articleModel.ts
describe('Article functions', () => {
  // Test order matters: Create -> Get -> GetAll -> Update -> Delete
  it('createArticle should return the new article', () => {
    try {
      const newArticle = createArticle(testArticle);
      expect(newArticle).toBeDefined();
      expect(newArticle.title).toBe(testArticle.title);
      expect(newArticle.description).toBe(testArticle.description);
      testArticle.id = newArticle.id; // Update the reference article id
    } catch (error) {
      throw new Error(
        `Failed to create article: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test getArticle function
  it('getArticle should return the article', () => {
    try {
      const foundArticle = getArticle(testArticle.id);
      expect(foundArticle).toBeDefined();
      expect(foundArticle).toEqual(testArticle);
    } catch (error) {
      throw new Error(
        `Failed to get article: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test getAllArticles function
  it('getAllArticles should return an array of articles', () => {
    try {
      const articles = getAllArticles();
      expect(Array.isArray(articles)).toBe(true);
      articles.forEach((article) => {
        expect(article).toHaveProperty('id', expect.any(Number));
        expect(article).toHaveProperty('title', expect.any(String));
        expect(article).toHaveProperty('description', expect.any(String));
      });
    } catch (error) {
      throw new Error(
        `Failed to get all articles: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test updateArticle function
  it('updateArticle should return the updated article', () => {
    try {
      const updatedArticle = updateArticle(
        testArticle.id,
        'Updated Title',
        'Updated Description',
        testArticle.author_id,
      );
      expect(updatedArticle).toBeDefined();
      expect(updatedArticle.title).toBe('Updated Title');
      expect(updatedArticle.description).toBe('Updated Description');
      expect(updatedArticle.id).toBe(testArticle.id);
    } catch (error) {
      throw new Error(
        `Failed to update article: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test deleteArticle function
  it('deleteArticle should delete the article', () => {
    try {
      deleteArticle(testArticle.id, testArticle.author_id);
      expect(() => getArticle(testArticle.id)).toThrow();
    } catch (error) {
      throw new Error(
        `Failed to delete article: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  it('getArticle should throw error for non-existent article', () => {
    expect(() => getArticle(999999)).toThrow('Article not found');
  });
});

// Unit tests to test functions in src/api/models/authorModel.ts

describe('Author functions', () => {
  // Test order matters: Create -> Get -> GetAll -> Update -> Delete
  it('createAuthor should return the new author', () => {
    try {
      const newAuthor = createAuthor(testAuthor);
      expect(newAuthor).toBeDefined();
      expect(newAuthor.name).toBe(testAuthor.name);
      expect(newAuthor.email).toBe(testAuthor.email);
      testAuthor.id = newAuthor.id; // Update the reference author id
      testAuthor.name = newAuthor.name; // Update the reference author name
      testAuthor.email = newAuthor.email; // Update the reference author email
    } catch (error) {
      throw new Error(
        `Failed to create author: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test getAuthor function
  it('getAuthor should return the author', () => {
    try {
      const foundAuthor = getAuthor(testAuthor.id);
      expect(foundAuthor).toBeDefined();
      expect(foundAuthor).toEqual(testAuthor);
    } catch (error) {
      throw new Error(
        `Failed to get author: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test getAllAuthors function
  it('getAllAuthors should return an array of authors', () => {
    try {
      const authors = getAllAuthors();
      expect(Array.isArray(authors)).toBe(true);
      authors.forEach((author) => {
        expect(author).toHaveProperty('id', expect.any(Number));
        expect(author).toHaveProperty('name', expect.any(String));
        expect(author).toHaveProperty('email', expect.any(String));
      });
    } catch (error) {
      throw new Error(
        `Failed to get all authors: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test updateAuthor function
  it('updateAuthor should return the updated author', () => {
    try {
      const updatedAuthor = updateAuthor(
        testAuthor.id,
        'Updated Name',
        'Updated Email',
      );
      expect(updatedAuthor).toBeDefined();
      expect(updatedAuthor.name).toBe('Updated Name');
      expect(updatedAuthor.email).toBe('Updated Email');
      expect(updatedAuthor.id).toBe(testAuthor.id);
    } catch (error) {
      throw new Error(
        `Failed to update author: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test deleteAuthor function
  it('deleteAuthor should delete the author', () => {
    try {
      deleteAuthor(testAuthor.id);
      expect(() => getAuthor(testAuthor.id)).toThrow();
    } catch (error) {
      throw new Error(
        `Failed to delete author: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  });

  // Test getAuthor function
  it('getArticle should throw error for non-existent article', () => {
    expect(() => getArticle(999999)).toThrow('Article not found');
  });
});
