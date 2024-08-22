import { helpers } from './helpers.js';
import { storage } from './storage.js';

export const command = (() => {
  const add = async (args: { description: string; amount: number }) => {
    const expense = await storage.setItem(args);
    helpers.log(`Expense added successfully! (ID: ${expense.id})`);
  };

  const update = async (args: {
    id: number;
    description?: string | undefined;
    amount?: number | undefined;
  }) => {
    try {
      await storage.updateItem(args);
      helpers.log(`Expense updated successfully!`);
    } catch (error) {
      helpers.logError(String(error));
    }
  };

  const delete_ = async (args: { id: number }) => {
    await storage.removeItem(args);
    helpers.log(`Expense deleted successfully!`);
  };

  const list = () => {
    const expenses = storage.getAll();

    if (!expenses.length) {
      helpers.log('No expenses found.');
      return;
    }

    const expensesList = expenses
      .map((expense) => {
        const updatedAt = new Date(expense.updated_at).toLocaleDateString();
        return `#${expense.id} - ${updatedAt} - ${expense.description}`;
      })
      .join('\n');

    helpers.log(expensesList);
  };

  const summary = (args: { month?: number | undefined }) => {
    const expenses = storage.getAll();

    if (!expenses.length) {
      helpers.log('No expenses recorded.');
      return;
    }

    const isFilteringByMonth = args.month !== undefined;

    const totalAmount = expenses.reduce((sum, expense) => {
      if (isFilteringByMonth) {
        if (new Date(expense.created_at).getMonth() !== args.month) {
          return sum;
        }
      }
      return sum + expense.amount;
    }, 0);

    if (!totalAmount) {
      return helpers.log(`No expenses recorded.`);
    }

    if (isFilteringByMonth) {
      return helpers.log(
        `Total expenses for month ${args.month} are: $${totalAmount.toFixed(2)}`,
      );
    } else {
      helpers.log(`Total expenses: $${totalAmount.toFixed(2)}`);
    }
  };

  return {
    add,
    update,
    delete: delete_,
    summary,
    list,
  };
})();
