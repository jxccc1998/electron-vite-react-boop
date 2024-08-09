Electron-vite-react-boop
---

### This is an offline script executor that imitates boop
![electron-boop](/public/electron-boop.gif)

## Start
Install `node_modules`:

```bash
npm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm run dev
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run build
```

Use
---
Open it, paste some text, run some scripts, optionally copy the text out.

To run scripts, simply open the script picker by pressing ⌘X or in the top menu under Scripts > Open Picker.

Make scripts
---
Each script starts with a declarative JSON document, describing the contents of that file, a name, a description. All that stuff is contained within a top level comment (with some extra asterisks) just like so:

```js
/**
{
"tag":"JsonFormat",
"name":"Format JSON",
"description":"xxxxxxx",
}
**/
```
Tags will be mapped to icons for display on the interface

Must include the main function
```js
const main = (state) => {
return state.trimStart();
};
```

State is the text content that needs to be converted

If it is not the result of converting text.There are also two return methods as follows
```js
return { type: "ERROR", content: "wrong" };

return {
    type: "SUCCESS",
    content: `total 100`,
};
```

Feature
---
Multi label switching is a worthwhile thing to achieve(It will be realized when there is time) -.-