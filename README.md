# Bedroom Builder (Middle School Project)

This is a tiny website you can host with **GitHub Pages**.

## What students do

- Edit the JSON settings in the top half of the screen
- If the JSON has **no errors**, the bedroom updates in the bottom half
- Make the room look cool by changing colors, text, and turning items on/off

## Run it locally

Just open `index.html` in a browser.

## Host it on GitHub Pages

1. Create a new GitHub repo and upload these files:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
2. In GitHub, go to **Settings → Pages**
3. Under **Build and deployment**, choose:
   - **Source**: Deploy from a branch
   - **Branch**: `main` and `/ (root)`
4. Save. After a minute, GitHub will show your website link.

## Safe “starter changes”

In the JSON, try changing:

- `wallColor`, `floorColor`, `deskColor`, `rugColor`
- `bed.frameColor`, `bed.blanketColor`, `bed.pillowColor`
- `poster.text` (short message) and `poster.color`
- `extras.showLamp` / `extras.showPlant` (true/false)
- `window.show` / `window.skyColor`

### Color ideas

Students can use:

- Color names: `"skyblue"`, `"tomato"`, `"gold"`, `"hotpink"`, `"limegreen"`
- Hex colors: `"#ffcc00"`, `"#8b5cf6"`, `"#22c55e"`

## If something breaks

- If you see a red error message, the JSON probably has:
  - a missing comma
  - a missing quote
  - `true/false` spelled wrong

