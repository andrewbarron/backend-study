API="http://localhost:4741"
URL_PATH="/sessions"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
      "session": {
        "goals": "'"${GOALS}"'",
        "review": "'"${REVIEW}"'"
      }
  }'

echo