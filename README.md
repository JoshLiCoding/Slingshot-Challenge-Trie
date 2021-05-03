# slingshot
Submission for the Slingshot Challenge. Joshua Li, Upper Canada College G11 Student


## Installation

Download ZIP of respository

Open terminal within the slingshot folder (inside of slingshot-main)

Enter the following into terminal:
```zsh
$ npm init (press enter to confirm prompts)
$ npm install esm
$ npm link
```
Note that the size of the folder will increase to ~200MB after this operation

## Thought Process

The general data structure of Trie was inspired by this [video](https://www.youtube.com/watch?v=AXjmTQ8LEoI) (stopping before the Java implementation at the end)

To integrate CLI, I followed parts of this [blog](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js). It heavily influenced the installation guide and most files with the exception of main.js

Since I was already familiar with Firebase Realtime Database (which by nature has 1 global state), I sought to implement an object-based tree structure on the platform through references. This will be discussed later below

My Javascript program makes use of a great amount of asynchronous functions for Firebase queries, which I had little real previous experience with

Lastly, various sources consulted were cited as necessary in code comments

## CLI

NOTE: cntr+C is recommended after each command since terminal does not automatically return a new line

- ```slingshot --add [keyword]```: adds the keyword, returns "successfully added"
- ```slingshot --delete [keyword]```: calls the search function -> if keyword exists, deletes the keyword and returns "successfully deleted" / else return "cannot delete keyword"
- ```slingshot --search [keyword]```: searches for the keyword, returns "has keyword [True]" if exists / "does not have keyword [False]" if not. In addition, returns "does not have keyword [False] | has prefix [True]" if prefix exists but keyword does not - in context, this is interpretted as False.
- ```slingshot --suggest [keyword prefix]```: calls the search function -> if prefix exists, returns a list of suggested keywords on each line
- ```slingshot --display```: displays a list of objects, in form of "[reference #]: {[key]:[value]...}" on each line

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

## CLI-Server Interaction

- Server database example (keywords = "hi", "b"). 
   - References: objects with a common sequence of letters (e.g. 0, 1, 2...)
   - Nodes: contained within references, made up of key-value pairs
    1) key = the next letter (e.g. h, b, i) | value = the reference to the next letter (1, 2, 3...)
    2) key = "isEnd" | value = is the current sequence of letters a keyword? true: false
```
slingshot
      |___ 0
           |___ h: 1
           |___ b: 3
           |___ isEnd: false
      |____1
           |___ i: 2
           |___ isEnd: false
      |____2
           |___ isEnd: true
      |____3
           |___ isEnd: true
```

- ADD function pseudocode:
```
for(every letter in keyword){
  if(letter already contained in current reference)
    get {letter, next reference}, move to next reference
  else{
    put letter in current reference
    get (# of total references + 1)
    create new reference = (# of total references + 1), {isEnd = false}
    move on to new reference
  }
  
  if(last letter in keyword)
    set next/new reference {isEnd = true}
}
```
- DELETE function pseudocode (note that since this function does not remove "deleted" keywords, storage-wise it may be inefficient):
```
call search(keyword), if keyword exists:
for(every letter in keyword){
  get {letter, next reference}, move to next reference
  
  if(last letter in node)
    set next/new reference {isEnd = false}
}
```
- SEARCH function pseudocode:
```
for(every letter in keyword){
  if(letter already contained in current reference)
    get {letter, next reference}, move to next reference
  else{
    return False for keyword
  }
  
  if(last letter in node){
    get next/new reference
    if(isEnd)
      return True for keyword
    else
      return False for keyword, True for prefix
  }
}
```
- SUGGEST function pseudocode:
```
call search(prefix), if keyword/prefix exists:

loop until the reference for the last letter of prefix

perform DFS, declare 2 list[] for references and prefixes
while(!list not empty){
  poll both lists
  if(isEnd)
    print <current prefix>
    
  for(nodes in current reference){
    put next reference in list
    put current prefix + node letter in other list
  }
}
```
- DISPLAY function pseudocode:
```
for(repository in database){
   print <repository #>: <{all key-value pairs}>
}
```
## Errors & Edge Cases

- CAN handle deleting keywords and suggesting prefixes that do not exist
- CAN handle multiple clients, but will process both simultaneously instead of maintaining the integrity of operations
- CANNOT handle special characters from this [StackOverflow thread](https://stackoverflow.com/questions/19132867/adding-firebase-data-dots-and-forward-slashes)
