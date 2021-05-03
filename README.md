# slingshot
Submission for the Slingshot Challenge

## Server
The server is hosted on [Firebase Realtime Databse](https://console.firebase.google.com/u/0/project/slingshot-312422/database/slingshot-312422-default-rtdb/data)

I have added info@slingshotmentoring.com as an editor

## Installation

Download ZIP of respository

Open terminal within the slingshot folder (inside of slingshot-main)

Enter the following into terminal:
```zsh
$ npm init
$ npm install esm
$ npm link
```
Note that the size of the folder will increase to ~200MB after this operation

## Thought Process

The general data structure of Trie was inspired by this [video](https://www.youtube.com/watch?v=AXjmTQ8LEoI) (stopping before the Java implementation at the end)

To integrate CLI, I followed parts of this [blog](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js). It heavily influenced the installation guide and most files with the exception of main.js

Since I was already familiar with Firebase Realtime Database (which by nature has 1 global state), I sought to implement an object-based tree structure on the platform through references. This will be discussed later below.

Lastly, various websites consulted were cited as necessary in code comments

## Functions

- ```--add [keyword]```: adds the keyword, returns "successfully added" if successful


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
