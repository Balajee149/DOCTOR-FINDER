# DoctorFinder

DoctorFinder is a modern web application that simplifies finding and booking appointments with healthcare professionals. Users can search for doctors based on specialties, consultation types, and other criteria, then book and manage appointments seamlessly.

## Features

- 🔍 **Advanced Search**: Find doctors by specialty, name, and other filters
- 🩺 **Multiple Consultation Types**: Book video consultations or in-clinic appointments
- 📊 **Smart Sorting**: Sort doctors by fees or years of experience
- 📅 **Appointment Management**: Book, view, and cancel appointments
- 📱 **Responsive Design**: Works seamlessly across all devices

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS,
- **State Management**: React Context API
- **Routing**: React Router
- **Forms**: React Hook Form with Zod validation

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/doctor-finder.git
cd doctor-finder
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

## Usage

After starting the application, you can:
- Browse the homepage to see featured doctors
- Search for doctors using the search bar or filters
- Click on a doctor card to view detailed information
- Book appointments by selecting available slots
- Manage your appointments through the user dashboard

## Project Structure

```
doctor-finder/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Application pages
│   ├── services/       # API service functions
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Application entry point
└── README.md           # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.