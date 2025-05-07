# #!/bin/bash

# # Define the project root path
# PROJECT_ROOT="/Users/satyanandanthota/Documents/Personal Drive/Classes/sem 4/Satya/CS691-Spring2025-Team6"

# # Start frontend in a new terminal window
# osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/frontend' && nvm use 22 && npm start\""

# # Start backend in a new terminal window
# osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/backend/app' && source '$PROJECT_ROOT/backend/venv/bin/activate' && python3 main.py\""

#!/bin/bash

# Determine the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Navigate to the parent directory (project root)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Start frontend in a new terminal window
osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/CS691-Spring2025-Team6/frontend' && nvm use 22 && npm start\""

# Start backend in a new terminal window
osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/CS691-Spring2025-Team6/backend/app' && source '$PROJECT_ROOT/CS691-Spring2025-Team6/backend/venv/bin/activate' && python3 main.py\""
