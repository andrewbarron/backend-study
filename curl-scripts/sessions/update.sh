# update session

API="http://localhost:4741"
URL_PATH="/sessions"

curl "${API}${URL_PATH}/${ID}/close" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "session": {
      "review": "'"${REVIEW}"'"
    }
  }'

echo
