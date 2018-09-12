#!/bin/bash

new_user(){
  echo "Enter your username:"
  echo -n ">> "
  read username
  echo "Entered $username"

 # Calls a webservice that to validate if the user exists
 # if exists -> propmts the password, else -> adds a new register

  curl -X POST -H "Content-Type: application/json" -d \
    '{"username": "'$username'"}' "http://127.0.0.1:3000/validateUser"
}


selection=
until [ "$selection" = "0" ]; do
    echo "
    User creation script
    1 - Create user
    2 - Show leaderboard

    0 - Exit program
"
    echo -n ">> "
    read selection
    echo ""
    case $selection in
        1 ) (new_user);;
        2 ) free ;;
        0 ) exit ;;
        * ) echo "Please enter 1, 2, or 0"
    esac
done

