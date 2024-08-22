import { existsSync } from 'node:fs';
import * as fs from 'node:fs/promises';

const path = 'db.json';

/*

| housing 
| food 
| transportation 
| healthcare 
| education 
| leisure-and-entertainment 
| clothing-and-retirement 
| debt-and-financing 
| technology-and-communication

{ 
  id: 1, 
  created_at: new Date(), 
  updated_at: new Date(),
  relative_date: new Date() | new Date(new Date().setMonth(0))
  description: 'netflix subscription', 
  amount: 9, 
  category: null, 
}

*/

const seed = {
  counter: 0,
  data: [],
} as {
  counter: number;
  data: Expense[];
};

export const storage = await (async () => {
  while (!existsSync(path)) {
    await fs.writeFile(path, JSON.stringify(seed));
  }

  const buffer = await fs.readFile(path);
  const db = JSON.parse(buffer.toString()) as typeof seed;

  const setItem = async (
    input: Omit<Expense, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    db.counter++;
    const item = {
      id: db.counter,
      created_at: new Date(),
      updated_at: new Date(),
      ...input,
    };

    db.data.push(item);
    await fs.writeFile(path, JSON.stringify(db));
    return item;
  };

  const updateItem = async (
    input: Pick<Expense, 'id'> &
      Partial<Omit<Expense, 'created_at' | 'updated_at'>>,
  ) => {
    const expenseIdx = db.data.findIndex((expense) => expense.id === input.id);

    if (expenseIdx === -1) {
      throw new Error(`Can't find expense.`);
    }

    db.data[expenseIdx] = {
      ...db.data[expenseIdx],
      updated_at: new Date(),
      ...input,
    };

    await fs.writeFile(path, JSON.stringify(db));
  };

  const getItem = (input: Pick<Expense, 'id'>) => {
    const expenseIdx = db.data.findIndex((expense) => expense.id === input.id);

    if (expenseIdx === -1) {
      throw new Error(`Can't find expense.`);
    } else {
      return db.data[expenseIdx];
    }
  };

  const removeItem = async (input: Pick<Expense, 'id'>) => {
    db.data = db.data.filter((expense) => expense.id !== input.id);
    await fs.writeFile(path, JSON.stringify(db));
  };

  const getAll = () => db.data;

  return {
    setItem,
    getItem,
    updateItem,
    removeItem,
    getAll,
  };
})();
