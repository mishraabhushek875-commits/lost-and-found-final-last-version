# Lost and Found Management System (Frontend)

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-green)
![Vite](https://img.shields.io/badge/Vite-7.1.7-orange)

This is the **frontend** of the **Lost and Found Management System**, built with **React**, **Redux Toolkit**, **TailwindCSS**, and **Vite**. The system allows users to register as guests, login, report lost/found items, and for admins to manage all reports efficiently.

---

## Features

### User Features
- Guest user login/signup
- Submit lost or found items
- View items reported by others
- Update or delete own reports
- Notifications via `sonner` library for user actions

### Admin Features
- Admin login
- View all lost and found items
- Approve or reject reports
- Delete or update any item
- Full dashboard for easy management

### Tech Highlights
- **React 19**: Component-based frontend
- **Redux Toolkit**: State management for user sessions and items
- **Axios**: Communication with backend APIs
- **React Router v7**: Client-side routing
- **TailwindCSS**: Fast and responsive UI styling
- **Sonner**: Toast notifications
- **Vite**: Fast development server and optimized builds

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/lost-and-found-frontend.git
cd lost-and-found-frontend
  
  2. INSTALL DEPENDENCIES

  npm install

  3. CREATE .env FILE IN THE ROOT (if required by your backend):
   VITE_API_BASE_URL=http://localhost:5000/api

4. start the development

npm run dev 

5. open your browser:

 http://localhost:5173



** For guest users:

Signup or login as a guest.

Submit lost or found items via the respective forms.

Edit or delete your own reports.

Browse items reported by others.



 ** For admin users:

Login with admin credentials.

Access the dashboard to view all items.

Approve or reject reports.

Update or delete any item as necessary.





 Scripts

npm run dev - Starts the Vite development server

npm run build - Builds the production-ready frontend

npm run preview - Previews the production build locally

npm run lint - Runs ESLint for code quality


lost-and-found/
├─ public/
├─ src/
│  ├─ components/       # Reusable React components
│  ├─ features/         # Redux slices and state management
│  ├─ pages/            # Page-level components (Login, Dashboard, Admin)
│  ├─ services/         # API calls with Axios
│  ├─ App.jsx           # Root component
│  └─ main.jsx          # Entry point
├─ tailwind.config.js
├─ vite.config.js
└─ package.json

Backend Connection

The frontend communicates with a backend REST API using Axios. Make sure your backend is running and the API URL is correctly set in your .env file.

example:
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
   




 * State Management

Redux Toolkit is used for:

User authentication

Guest/Admin session management

Lost and found items state

Notifications and alerts




* Admin Dashboard

The admin dashboard includes:

Viewing all lost/found reports

Approving or rejecting reports

Updating or deleting items

Access restricted only to admin users


Contributing

Contributions are welcome!

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add new feature")

Push to the branch (git push origin feature/your-feature)

Open a Pull Request


License

This project is private and intended for learning or internal use.




## Author

**Abhishek Mishra** – [GitHub](https://github.com/your-username) | [Email](abhishek387mishra@gmail.com)

---

**Made with ❤️ by Abhishek Mishra**


 