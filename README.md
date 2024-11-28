# ISE-Pick

<img width="800" alt="Screenshot 2024-11-11 at 14 49 10" src="https://github.com/user-attachments/assets/fa5d71a8-ca4e-4bcd-8666-e3c5e87877bb">


A simple website for collecting and displaying residency (ISE co-op/internship) reviews.

Potential for more features further down the line (class notes, discussions, past papers, etc.)


## Architecture
- NextJS Frontend
- Tailwind CSS Framework
- Pocketbase as a single-binary backend (database, auth, file storage)
	Pocketbase can be extended using Go or Javascript, may be necessary if adding new features. [DOCS](https://pocketbase.io/docs/use-as-framework/)

## How to test/run locally for development
1. Pull the repo
2. Download the [pocketbase binary](https://pocketbase.io/docs/) for your OS/architecture
3. From the `frontend` directory, install dependencies (`npm i` or `bun i`) and then run it (`npm run dev` or `bun run dev`)
4. Serve the pocketbase binary locally (`./pocketbase serve`)
5. Add a file for dev environment variables `{project_dir}/.env.local`:
	```
	NEXT_PUBLIC_PB_URL="<ADDRESS + PORT OF POCKETBASE>"
	```
	Will probably look like this:
	```
	NEXT_PUBLIC_PB_URL="http://localhost:8090/"
	```
6. Database changes can be made through your local pocketbase Admin UI (default URL is http://127.0.0.1:8090/_/). Any backend change should result in a new migration file in `backend/pb_migrations/`. On each merge to main, a self-hosted GitHub Actions runner will deploy any new migration(s) to the VPS hosting the backend and restart Pocketbase so that they take effect. 
