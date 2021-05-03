# slingshot
Submission for the Slingshot Challenge. Joshua Li, Upper Canada College G11 Student

## Thought Process

The general data structure of Trie was inspired by this [video](https://www.youtube.com/watch?v=AXjmTQ8LEoI) (stopping before the Java implementation at the end)

To integrate CLI, I followed parts of this [blog](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js). It heavily influenced the installation guide and most files with the exception of main.js

Since I was already familiar with Firebase Realtime Database (which by nature has 1 global state), I sought to implement an object-based tree structure on the platform through the use of references

My Javascript program makes use of a great amount of asynchronous functions for Firebase queries, something I became familiarized with during this challenge

Lastly, various sources consulted were cited as necessary in code comments

## Testing Suite
input: ```slingshot --add hello```

output: successfully added

input: ```slingshot --display```

output:

   0: { h: 1, isEnd: false }

   1: { e: 2, isEnd: false }

   2: { isEnd: false, l: 3 }

   3: { isEnd: false, l: 4 }

   4: { isEnd: false, o: 5 }

   5: { isEnd: true }

input: ```slingshot --add heo```

output: successfully added

input: ```slingshot --search heo```

output: has keyword [True]

input: ```slingshot --delete heo```

output:

   has keyword [True]

   successfully deleted

input: ```slingshot --search heo```

output: does not have keyword [False] | has prefix [True]

input: ```slingshot --suggest h```

ouput:

   does not have keyword [False] | has prefix [True]

   hello

## Errors & Edge Cases

- CAN handle deleting keywords and suggesting prefixes that do not exist
- CAN handle multiple clients, but will process simultaneously instead of maintaining the integrity of operations
- CANNOT handle special characters from this [StackOverflow thread](https://stackoverflow.com/questions/19132867/adding-firebase-data-dots-and-forward-slashes)
