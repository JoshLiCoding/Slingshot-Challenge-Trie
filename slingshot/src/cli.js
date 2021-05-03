//https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
//https://www.youtube.com/watch?v=AXjmTQ8LEoI
import arg from 'arg';
import { add, search, deleteval, suggest, display } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--add': Boolean,
      '--delete': Boolean,
      '--search': Boolean,
      '--suggest': Boolean,
      '--display': Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    var: args._[0],
    add: args['--add'] || false,
    delete: args['--delete'] || false,
    search: args['--search'] || false,
    suggest: args['--suggest'] || false,
    display: args['--display'] || false,
  };
}

/*
https://stackoverflow.com/questions/19132867/adding-firebase-data-dots-and-forward-slashes
*/
export function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  if (options['add']) {
    //console.log(options['var']);
    add(options['var']);
  }
  else if (options['delete']) {
    deleteval(options['var']);
  }
  else if (options['search']) {
    search(options['var']);
  }
  else if (options['suggest']) {
    suggest(options['var']);
  }
  else if (options['display']) {
    display();
  }
}