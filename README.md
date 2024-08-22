# Expense Tracker

A simple expense tracker to manage your finances.

## Requirements

Application should run from the command line and should have the following features:

- [x] Users can add an expense with description and amount.
- [x] Users can update an expense.
- [x] Users can delete an expense.
- [x] Users can view all expenses.
- [x] Users can view a summary of all expenses.
- [x] Users can view a summary of expenses for a specific month (of current year).

## Installation

1. `git clone https://github.com/JuSfrei/expense-tracker.git`
2. `cd expense-tracker`
3. `pnpm install`
4. `pnpm run build`
5. `npm install -g .`

## Usage

```md
Usage: expense-tracker [options] [command]

A command-line tool for tracking and managing your expenses efficiently.

Options:
  -V, --version      output the version number
  -h, --help         display help for command

Commands:
  add [options]      Add a new expense with a specific description and amount.
  update [options]   Update an existing expense by modifying its description or amount.
  delete [options]   Remove an expense from your records using its unique identifier.
  list               Display a list of all recorded expenses.
  summary [options]  View a summary of your expenses, with an optional filter by month.
  help [command]     display help for command
```

## Links

For further information about this project, visit the [project link](https://roadmap.sh/projects/expense-tracker).
