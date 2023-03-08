## ⁉️ Question Worksheet 📃

A question worksheet generation program, with configs.

![](https://img.shields.io/badge/Version-1.1-blue)
![](https://img.shields.io/badge/Created%20by-TriHydera-red)

-------------------------------------------
### Starting

- Unzip the contents of the zip to an empty folder
- Open the `index.html` file in the browser or a localhost server
- Use "id" parameter in the url to load the config that you want

-------------------------------------------
### Settings 

- To edit the questions just look for the `configs` folder
- Config most have values for following:

| Value     | Type   | About  |
| header | object | The page header |
|-----------|--------|--------|
| questions | number | Question count |
| line | boolean | Show or hides the line under the question |
| interactive | boolean | Make inputs interactive |
| start     | array | Question start options |
| middle    | array  | Question middle part |
| end       | array | Question end options |

-------------------------------------------
### Tips

- Make more options in the config compared to the question count
- Try to add as many possible choices of fillers

-------------------------------------------
### Planning

- Worksheet save codes

-------------------------------------------
### Librarys Used

- [jQuery](https://jquery.com/) **(via UNPKG CDN)**
- [Sweet Alert](https://sweetalert.js.org/) **(via UNPKG CDN)**
