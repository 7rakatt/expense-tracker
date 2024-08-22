#! /usr/bin/env node
import { program } from '@commander-js/extra-typings';

import { command } from './lib/commands.js';
import { helpers } from './lib/helpers.js';

program
  .name('expense-tracker')
  .description(
    'A command-line tool for tracking and managing your expenses efficiently.',
  )
  .version('0.0.1');

program
  .command('add')
  .description('Add a new expense with a specific description and amount.')
  .requiredOption(
    '-d, --description <string>',
    'A brief description of the expense (e.g., "Lunch with friends").',
    helpers.parseString,
  )
  .requiredOption(
    '-a, --amount <number>',
    'The amount spent on the expense (e.g., 25.50).',
    helpers.parseNumber,
  )
  .action(command.add);

program
  .command('update')
  .description(
    'Update an existing expense by modifying its description or amount.',
  )
  .requiredOption(
    '-i, --id <number>',
    'The unique identifier of the expense you want to update.',
    helpers.parseNumber,
  )
  .option(
    '-d, --description <string>',
    'New description for the expense, replacing the old one.',
    helpers.parseString,
  )
  .option(
    '-a, --amount <number>',
    'New amount for the expense, replacing the old one.',
    helpers.parseNumber,
  )
  .action(command.update);

program
  .command('delete')
  .description(
    'Remove an expense from your records using its unique identifier.',
  )
  .requiredOption(
    '-i, --id <number>',
    'The unique identifier of the expense to delete.',
    helpers.parseNumber,
  )
  .action(command.delete);

program
  .command('list')
  .description('Display a list of all recorded expenses.')
  .action(command.list);

program
  .command('summary')
  .description(
    'View a summary of your expenses, with an optional filter by month.',
  )
  .option(
    '-m, --month <number>',
    'Filter expenses by a specific month (0 for January, 11 for December).',
    helpers.parseMonth,
  )
  .action(command.summary);

program.parse();
