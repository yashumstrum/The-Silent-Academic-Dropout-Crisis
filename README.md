PRISM: Adaptive Mastery & Knowledge Tracing System
A dynamic educational engine that identifies foundational gaps and personalizes learning paths in real-time.

1. Problem Statement
The Hidden Foundation Gap
India produces over 15 million graduates annually, yet a vast majority enter higher education with "hollow foundations." Traditional classrooms assume a uniform learning pace, leaving students who miss a single core concept (like basic algebra) unable to grasp advanced topics (like calculus).

Target Users: * Higher education students in Tier-2/3 cities.

Educators managing large-scale classrooms (60-80 students).

Institutional placement cells tracking student readiness.

Existing Gaps: Current platforms are passive video repositories. They do not track why a student is failing or intervene at the prerequisite level before academic burnout occurs.




2. Problem Understanding & Approach
Root Cause Analysis
The "Linear Syllabus" is the enemy. Education is currently treated as a checklist rather than a network. When a student fails an advanced module, the root cause is almost always an unaddressed weakness in a foundational module from months or even years prior.

Solution Strategy
We utilize Probabilistic Knowledge Tracing. By analyzing student interaction patterns, the system calculates the probability of mastery for specific concepts and "back-traces" through a dependency graph to find and fix the exact point where the student's understanding broke down.




3. Proposed Solution
Solution Overview
PRISM is an intelligent navigation layer for education. It doesn't just show content; it maps the student's brain.

Core Idea
To transition from "Time-based learning" to "Mastery-based learning." A student cannot unlock Chapter B until the system verifies a 90% mastery probability of Chapter A.

Key Features
Dynamic Knowledge Graph: Visualizes the subject as an interconnected web of skills.

Prerequisite Bridging: Automatically redirects students to "Refresher" content if a foundational gap is detected.

Real-time Heatmaps: Provides teachers with a live grid showing which students are "stuck" on specific concepts.

Adaptive Unlock Logic: High-stakes content remains locked until foundational competency is mathematically proven.






4. System Architecture
High-Level Flow
User → Frontend (React/Tailwind) → Backend (FastAPI) → Bayesian Engine → Database (PostgreSQL/JSON Graph) → Adaptive Response

Architecture Description
The system logic is split into three layers:

The Interaction Layer: Captures micro-behaviors (video watch time, quiz attempts).

The Inference Engine: Uses Bayesian logic to update the student's mastery state.

The Content Controller: Adjusts the UI and unlocks new nodes based on the inference results.




5. Database Design
ER Diagram Description
Users Table: Standard profile and authentication.

Knowledge_Nodes: Stores concept metadata, video IDs, and prerequisite links.

Student_States: Stores the current probability of mastery for every student-node pair.

Interaction_Logs: A high-frequency log of every right/wrong answer and click.

6. Dataset & Content Selection
Source: Curated STEM curriculum (Engineering/Programming focus).

Data Type: Structured Knowledge Components (KCs).

Selection Reason: High-impact subjects where foundational gaps lead to the highest dropout rates.



6. Dataset & Content Selection
Source: Curated STEM curriculum (Engineering/Programming focus).

Data Type: Structured Knowledge Components (KCs).

Selection Reason: High-impact subjects where foundational gaps lead to the highest dropout rates.




7. Model SelectedProbabilistic Knowledge Tracing (PKT)Reasoning: Unlike standard grading, PKT accounts for "Guessing" and "Slipping." It provides a statistically sound mastery probability rather than a raw percentage.Evaluation Metrics: $P(L_n)$ (Probability of learning at interaction $n$), Accuracy, and Log-loss.



8. Technology Stack
Frontend: React.js, Tailwind CSS, Lucide Icons, v0.dev components.

Backend: FastAPI (Python), PyBKT Library.

Database: PostgreSQL (Relational), JSON-based Dependency Graphs.

Deployment: Vercel (Frontend), Railway/Render (Backend).




9. API Documentation
Endpoints List
POST /sync-interaction: Sends quiz result (0 or 1) to the engine.

GET /get-user-map: Returns the current status (Mastered/Locked/Current) of all nodes.

GET /recommend-content: Fetches the specific video link based on the detected gap.




Gemini said
Here is the complete, professional README for your GitHub repository. It is formatted in Markdown so you can copy and paste it directly. I have structured it to highlight the logic, pedagogy, and engineering without using "AI" buzzwords, focusing instead on Adaptive Learning Systems and Knowledge Tracing.

PRISM: Adaptive Mastery & Knowledge Tracing System
A dynamic educational engine that identifies foundational gaps and personalizes learning paths in real-time.

1. Problem Statement
The Hidden Foundation Gap
India produces over 15 million graduates annually, yet a vast majority enter higher education with "hollow foundations." Traditional classrooms assume a uniform learning pace, leaving students who miss a single core concept (like basic algebra) unable to grasp advanced topics (like calculus).

Target Users: * Higher education students in Tier-2/3 cities.

Educators managing large-scale classrooms (60-80 students).

Institutional placement cells tracking student readiness.

Existing Gaps: Current platforms are passive video repositories. They do not track why a student is failing or intervene at the prerequisite level before academic burnout occurs.

2. Problem Understanding & Approach
Root Cause Analysis
The "Linear Syllabus" is the enemy. Education is currently treated as a checklist rather than a network. When a student fails an advanced module, the root cause is almost always an unaddressed weakness in a foundational module from months or even years prior.

Solution Strategy
We utilize Probabilistic Knowledge Tracing. By analyzing student interaction patterns, the system calculates the probability of mastery for specific concepts and "back-traces" through a dependency graph to find and fix the exact point where the student's understanding broke down.

3. Proposed Solution
Solution Overview
PRISM is an intelligent navigation layer for education. It doesn't just show content; it maps the student's brain.

Core Idea
To transition from "Time-based learning" to "Mastery-based learning." A student cannot unlock Chapter B until the system verifies a 90% mastery probability of Chapter A.

Key Features
Dynamic Knowledge Graph: Visualizes the subject as an interconnected web of skills.

Prerequisite Bridging: Automatically redirects students to "Refresher" content if a foundational gap is detected.

Real-time Heatmaps: Provides teachers with a live grid showing which students are "stuck" on specific concepts.

Adaptive Unlock Logic: High-stakes content remains locked until foundational competency is mathematically proven.

4. System Architecture
High-Level Flow
User → Frontend (React/Tailwind) → Backend (FastAPI) → Bayesian Engine → Database (PostgreSQL/JSON Graph) → Adaptive Response

Architecture Description
The system logic is split into three layers:

The Interaction Layer: Captures micro-behaviors (video watch time, quiz attempts).

The Inference Engine: Uses Bayesian logic to update the student's mastery state.

The Content Controller: Adjusts the UI and unlocks new nodes based on the inference results.

5. Database Design
ER Diagram Description
Users Table: Standard profile and authentication.

Knowledge_Nodes: Stores concept metadata, video IDs, and prerequisite links.

Student_States: Stores the current probability of mastery for every student-node pair.

Interaction_Logs: A high-frequency log of every right/wrong answer and click.

6. Dataset & Content Selection
Source: Curated STEM curriculum (Engineering/Programming focus).

Data Type: Structured Knowledge Components (KCs).

Selection Reason: High-impact subjects where foundational gaps lead to the highest dropout rates.

7. Model Selected
Probabilistic Knowledge Tracing (PKT)
Reasoning: Unlike standard grading, PKT accounts for "Guessing" and "Slipping." It provides a statistically sound mastery probability rather than a raw percentage.

Evaluation Metrics: P(L 
n
​
 ) (Probability of learning at interaction n), Accuracy, and Log-loss.

8. Technology Stack
Frontend: React.js, Tailwind CSS, Lucide Icons, v0.dev components.

Backend: FastAPI (Python), PyBKT Library.

Database: PostgreSQL (Relational), JSON-based Dependency Graphs.

Deployment: Vercel (Frontend), Railway/Render (Backend).

9. API Documentation
Endpoints List
POST /sync-interaction: Sends quiz result (0 or 1) to the engine.

GET /get-user-map: Returns the current status (Mastered/Locked/Current) of all nodes.

GET /recommend-content: Fetches the specific video link based on the detected gap.

10. Development Roadmap
Checkpoint 1: Syllabus Deconstruction & Graph Mapping.

Checkpoint 2: Bayesian Inference Engine implementation (Python).

Checkpoint 3: Adaptive Dashboard UI (React).

Checkpoint 4: Integration of Real-time Teacher Heatmaps.

Checkpoint 5: End-to-End Stress Testing.





11. End-to-End WorkflowStudent attempts a diagnostic check.System populates a visual Knowledge Map.Student watches a module; system monitors engagement.If a quiz score is $<90\%$, the system re-routes the path back to the prerequisite node.Teacher dashboard updates to show student progress and blockers.




12. Future Scope & Scalability
Short-Term: Multilingual support for regional language instruction.

Long-Term: Integration with national academic credit banks (ABC) to provide verified competency transcripts for employers.




13. Team Roles & Responsibilities

Yash Kumar :Lead Architect,"System design, Backend Logic & Knowledge Tracing"
Kritika Pandey :Frontend Engineer,"Adaptive UI, Map Visualizations & Dashboards"
Dakshraj Bole :Data & Content,"Curriculum Mapping, API Integration & Testing"





15. Impact
By identifying and fixing learning gaps in real-time, PRISM reduces student disengagement, lowers dropout rates, and ensures that "Degree Completion" actually signifies "Concept Mastery."









