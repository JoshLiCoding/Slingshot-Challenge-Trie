# CLI

## Installation

Download ZIP of respository

Open terminal within the slingshot folder (inside of slingshot-main)

Enter the following into terminal:
```zsh
$ npm init //(press enter to confirm prompts)
$ npm install esm
$ npm link
```
Note that the size of the folder will increase to ~200MB after installation

## Use

NOTE: cntr+C is recommended after each command since terminal does not automatically return a new line

- ```slingshot --add [keyword]```: adds the keyword, returns "successfully added"
- ```slingshot --delete [keyword]```: calls the search function -> if keyword exists, deletes the keyword and returns "successfully deleted" / else return "cannot delete keyword"
- ```slingshot --search [keyword]```: searches for the keyword, returns "has keyword [True]" if exists / "does not have keyword [False]" if not. In addition, returns "does not have keyword [False] | has prefix [True]" if prefix exists but keyword does not - in context, this is interpretted as False.
- ```slingshot --suggest [keyword prefix]```: calls the search function -> if prefix exists, returns a list of suggested keywords on each line
- ```slingshot --display```: displays a list of objects, in form of "[reference #]: {[key]:[value]...}" on each line
