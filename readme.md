# hlogs

Hlogs is a npm package that helps on log creation and it's stored on root project. It's recommended to add "hlogs.log" on .gitignore to avoid commiting personal logs in versioning system.

## 📦 Installation

Use [npm](https://www.npmjs.com/package/hlogs) to install hlogs.

```bash
npm i hlogs
```

## 🚀 Usage

Import & Initialize
```javascript
import { Log } from "hlogs"

const log = new Log()
```

Add Logs
```javascript
log.add("Log message"); // Saves to file and prints to console (default)
log.add("Log message", false); // Saves to file and doesn't print to console
```

Find Logs by id
```javascript
const logEntry = log.find("LOG_ID"); // Returns log or "Log not found"
console.log(logEntry);
```

Log structure
```javascript
[DD/MM/YYYY HH:mm:ss] - UNIQUE_ID - Log message
```

## 🧑‍💻 Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## ⚖️ License

[MIT](https://choosealicense.com/licenses/mit/)