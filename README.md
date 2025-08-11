# HealthHive
HealthHive
HealthHive/
│
├── README.md                  # Overview, setup instructions
├── .gitignore                 # Ignore node_modules, env files, build, etc.
├── docker-compose.yml         # Multi-container setup (backend, db, redis, etc.)
├── .env.example               # Template for environment variables
│
├── mobile-app/                # React Native app for Patients & Doctors
│   ├── package.json
│   ├── app.json
│   ├── babel.config.js
│   ├── index.js
│   ├── metro.config.js
│   ├── android/
│   ├── ios/
│   ├── assets/                # Images, icons, fonts
│   ├── src/
│   │   ├── api/               # API calls to backend
│   │   ├── components/        # Reusable RN components
│   │   ├── contexts/          # Context API (Auth, BLE, Notifications)
│   │   ├── hooks/             # Custom hooks (BLE scanner, location)
│   │   ├── navigation/        # React Navigation setup
│   │   ├── screens/           # Patient screens, Doctor screens
│   │   │   ├── Patient/
│   │   │   ├── Doctor/
│   │   │   ├── Auth/
│   │   ├── services/          # BLE services, Google Fit/Fitbit SDK
│   │   ├── store/             # Redux/Zustand store
│   │   ├── utils/             # Helpers (formatters, validators)
│   │   ├── App.js
│   │   ├── theme.js           # Colors, typography
│
├── pwa-dashboard/             # Progressive Web App (Doctor/Admin dashboard)
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── api/               # API service layer
│   │   ├── components/        # UI components (Material UI/Tailwind)
│   │   ├── pages/             # Dashboard pages
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── store/             # State management
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│
├── backend/                   # FastAPI backend
│   ├── requirements.txt       # Python deps
│   ├── app/
│   │   ├── main.py             # FastAPI entry point
│   │   ├── config.py           # Settings loader from env
│   │   ├── db/                 # Database setup (SQLAlchemy, TimescaleDB)
│   │   │   ├── base.py
│   │   │   ├── models/         # SQLAlchemy models (Users, Vitals, Alerts, Prescriptions)
│   │   │   ├── schemas/        # Pydantic schemas
│   │   │   ├── migrations/     # Alembic migrations
│   │   ├── api/
│   │   │   ├── v1/             # Versioned API routes
│   │   │   │   ├── auth.py
│   │   │   │   ├── vitals.py
│   │   │   │   ├── alerts.py
│   │   │   │   ├── doctors.py
│   │   │   │   ├── pharmacy.py
│   │   │   │   ├── payments.py
│   │   ├── services/           # Business logic
│   │   │   ├── anomaly_detection.py # ML/Rule-based anomaly detection
│   │   │   ├── notifications.py     # Push, SMS, email
│   │   │   ├── location.py          # Google Maps API
│   │   │   ├── payment.py           # Payment gateway integration
│   │   ├── ws/                      # WebSockets handlers
│   │   ├── utils/                   # Helpers
│   │   ├── tests/                   # Unit & integration tests
│
├── ai-engine/                 # AI & ML models
│   ├── notebooks/             # Jupyter notebooks for experimentation
│   ├── models/                # Saved models (TF Lite, PyTorch)
│   ├── preprocessing/         # Data cleaning scripts
│   ├── inference/              # Model loading & inference functions
│
├── infra/                     # Deployment & DevOps
│   ├── k8s/                    # Kubernetes manifests
│   ├── terraform/              # Infra as code
│   ├── ci-cd/                  # GitHub Actions / Jenkins pipelines
│
├── docs/                      # Documentation
│   ├── architecture.md
│   ├── api-spec.yaml           # OpenAPI spec
│   ├── db-schema.png
│   ├── flows/
│
└── scripts/                   # Utility scripts
    ├── seed_db.py              # Seed demo data
    ├── backup_db.sh
