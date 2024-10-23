#!/bin/bash

# Cổng mà bạn muốn đóng
port=8000

# Tìm quá trình đang sử dụng cổng
pid=$(lsof -i :$port -t)

if [ -z "$pid" ]; then
  echo "Không tìm thấy quá trình nào đang sử dụng cổng $port"
else
  # Dừng quá trình đang sử dụng cổng
  kill $pid
  echo "Đã dừng quá trình sử dụng cổng $port với ID: $pid"
fi
