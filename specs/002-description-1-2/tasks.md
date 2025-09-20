# Tasks: 川渝新能源招聘信息汇总网站

**Input**: Design documents from `/specs/002-description-1-2/`
**Prerequisites**: `plan.md`

---

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Paths are relative to the repository root.

---

## Phase 1: Project Setup
- [ ] **T001**: [Backend] In `backend/`, run `npm init -y` and install dependencies: `express`, `pg`, `sequelize`, `cheerio`, `cors`.
- [ ] **T002**: [Frontend] In `frontend/`, initialize a new React project using `npx create-react-app .` or `npx vite . --template react`.
- [ ] **T003**: [Frontend] Install dependencies: `antd`, `axios`.
- [ ] **T004**: [Infra] [P] Create a local PostgreSQL database instance (e.g., using Docker) and document the connection credentials.
- [ ] **T005**: [Backend] In `backend/src/config/database.js`, implement the Sequelize database connection logic using the credentials from T004.

## Phase 2: Backend Development
- [ ] **T006**: [Backend] In `backend/src/models/`, define the `JobPosting` and `Company` Sequelize models as specified in `plan.md`.
- [ ] **T007**: [Backend] Generate and run database migration scripts to create the `JobPostings` and `Companies` tables.
- [ ] **T008**: [Backend] In `backend/src/scraper/`, implement the initial web scraping service. Target one major job site first. The service should save data to the database using the Sequelize models.
- [ ] **T009**: [Backend] In `backend/src/services/jobService.js`, create a service function `getAllJobs({ filter, page, limit })` that retrieves jobs with filtering (by keyword/location) and pagination.
- [ ] **T010**: [Backend] In `backend/src/api/jobs.js`, create the `GET /api/jobs` Express route that calls the `jobService` and returns a JSON response.
- [ ] **T011**: [Backend] In `backend/src/api/stats.js`, create the `GET /api/stats` route to return basic statistics.
- [ ] **T012**: [Backend] In `backend/index.js`, configure the main Express app to use the API routes and enable CORS middleware.

## Phase 3: Frontend Development
- [ ] **T013**: [Frontend] [P] In `frontend/src/services/api.js`, create functions to fetch data from the backend's `/api/jobs` and `/api/stats` endpoints.
- [ ] **T014**: [Frontend] [P] In `frontend/src/components/`, create a `JobCard.js` component to display the details of a single job posting.
- [ ] **T015**: [Frontend] In `frontend/src/components/`, create a `SearchBar.js` component with input fields for keyword and location.
- [ ] **T016**: [Frontend] In `frontend/src/pages/`, create the `HomePage.js` that uses the components and services from previous tasks to fetch and display a list of jobs.
- [ ] **T017**: [Frontend] Implement state management in `HomePage.js` to handle search filters, pagination, and loading/error states.
- [ ] **T018**: [Frontend] [P] Add pagination controls to the `HomePage.js` and connect them to the API calls.

## Phase 4: Integration & Testing
- [ ] **T019**: [Backend] [P] In `backend/tests/`, write unit tests for the `jobService` filtering and pagination logic.
- [ ] **T020**: [Frontend] [P] In `frontend/src/components/`, write basic rendering tests for the `JobCard.js` and `SearchBar.js` components.
- [ ] **T021**: [Integration] Write a test script or manually verify the end-to-end data flow: run scraper -> start backend -> start frontend -> view data -> test search/filter.

## Phase 5: Polish & Deployment
- [ ] **T022**: [Frontend] [P] Review and refine the overall UI/UX using `antd`'s grid system, typography, and components for a polished, responsive layout.
- [ ] **T023**: [Backend] [P] Add robust error handling and structured logging to the backend, especially for the scraper and API endpoints.
- [ ] **T024**: [Infra] [P] In `backend/`, create a `Dockerfile` to containerize the Node.js application.
- [ ] **T025**: [Infra] [P] In `frontend/`, create a `Dockerfile` that builds the React app and serves the static files (e.g., using Nginx).
- [ ] **T026**: [Docs] [P] Create a root-level `docker-compose.yml` file to easily start the backend, frontend, and database services together.
- [ ] **T027**: [Docs] Create a comprehensive `README.md` at the project root, detailing the architecture, setup instructions, and how to run the application using Docker Compose.
