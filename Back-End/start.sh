#!/bin/bash

nohup npm run start:prod > bankend.log 2>&1 & echo $! > backend_id.txt

echo "Start bankend is listening on port 8000"
