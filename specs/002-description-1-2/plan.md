# Implementation Plan: 川渝新能源招聘信息汇总网站

**Branch**: `002-description-1-2` | **Date**: 2025-09-19 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-description-1-2/spec.md`

## Summary
根据功能规格，我们将构建一个Web应用，用于抓取、汇总并展示川渝地区的新能源公司招聘信息。技术方案将采用React前端、Node.js后端和PostgreSQL数据库，并包含一个独立的爬虫服务。

## Technical Context
**Language/Version**: `JavaScript (ES2022), Node.js 20.x`
**Primary Dependencies**: `React 18, antd, Express.js 4, Sequelize, Cheerio`
**Storage**: `PostgreSQL 15`
**Testing**: `Jest, React Testing Library`
**Target Platform**: `Web Browser (Desktop & Mobile)`
**Project Type**: `web`
**Performance Goals**: `页面加载时间 < 2s, 搜索响应时间 < 500ms p95`
**Constraints**: `需要处理主流招聘网站的反爬机制`
**Scale/Scope**: `初期支持 3-5 个主流招聘网站，每日更新`

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Check**: Conformance to project principles.
- **Result**: SKIPPED - The project constitution file (`.specify/memory/constitution.md`) is a template and does not contain specific rules yet.

## Project Structure

### Documentation (this feature)
```
specs/002-description-1-2/
├── plan.md              # This file (/plan command output)
├── spec.md              # The feature specification
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/         # Sequelize models for PostgreSQL
│   ├── services/       # Business logic (e.g., job searching)
│   ├── api/            # Express routes and controllers
│   └── scraper/        # Web scraping service with Cheerio
└── tests/

frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page-level components (e.g., HomePage)
│   └── services/       # API client for backend communication
└── tests/
```

**Structure Decision**: `Option 2: Web application` based on Technical Context.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context**:
   - Research Task: Investigate anti-scraping mechanisms for target job sites (e.g., dynamic rendering, CAPTCHAs, rate limiting) and evaluate solutions (e.g., headless browsers like Puppeteer, proxy rotation).
   - Research Task: Finalize list of 3-5 target job sites for initial launch.

2. **Consolidate findings** in `research.md`.

**Output**: `research.md` with decisions on scraping strategy.

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from `spec.md`** → `data-model.md`:
   - **JobPosting**: `id`, `title`, `companyName`, `salary`, `location`, `postedDate`, `descriptionLink`, `sourceSite`.
   - **Company**: `id`, `name`, `industry`.
   - Define relationships and validation rules.

2. **Generate API contracts** from functional requirements → `/contracts/`:
   - `GET /api/jobs`: Endpoint to retrieve a paginated list of jobs. Supports filtering by `location` and searching by `keyword`.
   - `GET /api/jobs/{id}`: Endpoint to get details for a single job (if needed).
   - `GET /api/stats`: Endpoint for basic stats like total jobs, companies count.

3. **Generate contract tests** from contracts.

4. **Extract test scenarios** from user stories → `quickstart.md`.

**Output**: `data-model.md`, `/contracts/openapi.yml`, failing contract tests, `quickstart.md`.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do.*

**Task Generation Strategy**:
- Generate tasks from Phase 1 design docs.
- Each API endpoint → Backend implementation task.
- Each UI component/page → Frontend implementation task.
- Each entity → Database model creation task.
- Each user story → Integration test task.

**Ordering Strategy**:
- **Backend**: Models → Services → API Routes
- **Frontend**: Services → Components → Pages
- **Overall**: Backend before Frontend, Tests before Implementation.

**Estimated Output**: ~20-25 numbered, ordered tasks in `tasks.md`.

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [ ] Phase 0: Research complete
- [ ] Phase 1: Design complete
- [ ] Phase 2: Task planning complete

**Gate Status**:
- [X] Initial Constitution Check: SKIPPED
- [ ] Post-Design Constitution Check: PENDING
- [ ] All NEEDS CLARIFICATION resolved: PENDING
