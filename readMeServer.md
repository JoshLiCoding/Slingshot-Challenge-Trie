# Server
The server is hosted on [Firebase Realtime Databse](https://console.firebase.google.com/u/0/project/slingshot-312422/database/slingshot-312422-default-rtdb/data)

I have added info@slingshotmentoring.com as an editor


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
  
  if(last letter in keyword)
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
  
  if(last letter in keyword){
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
for(references in database){
   print <reference #>: <{all key-value pairs}>
}
```
