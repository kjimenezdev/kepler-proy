"""
Python app to play trivia
"""

import getpass
import json
import requests

def parse_questions():
    """Reads a json file and prepares the questions"""
    try:
        with open("questions.json") as json_data:
            questions = json.load(json_data)
            # print(questions)
            return questions

    except  FileNotFoundError:
        print("File not found")
        return []

def instructions():
    """Prints the game instructions """
    print("\nChoose:"
          "\n\t 1. Play game"
          "\n\t 2. Show leaderboard"
          "\n\t 3. Exit game")

def play(user):
    """ Handles the playing game execution """
    score, current = 0, 0
    questions = parse_questions()

    while current < len(questions):
        question = questions[current]
        print('\n' + question["description"] + '\n')
        opts = question["options"]
        ans = question["correct"]

        for i, opt in enumerate(opts):
            print(i+1, "\t", opt)

        try:
            choice = int(input("> "))
            if 0 < choice <= len(opts):
                current += 1
                if choice-1 is ans:
                    score += 100
                    print("Correct")
                else:
                    print("WROOOONG")
            # else:
            #     print("Invalid choice")
        except Exception:
            print("Invalid choice HERE")

    print("\nWell done. Le's submit your score")
    sdict = {"user_id":user['id'], "score": score}
    rscore = requests.post("http://127.0.0.1:5000/score", json=sdict)
    if rscore.status_code == 200:
        print("\nGREAAAT")
        leaderboard()
    else:
        print("Something happened")



def leaderboard():
    """Shows the highest punctuations"""
    print("\nLeaderboard\n")
    rlboard = requests.get("http://127.0.0.1:5000/score")
    if rlboard.status_code == 200:
        scores = rlboard.json()
        for score in scores:
            print("\tScore: "
                   +  str(score['score'])
                   + " | " + "by"
                   + str(score['user_id'])
                   + " | " + score['created'])
    else:
        print("server errror")


def auth():
    """Authenticates the user"""
    logged = False
    while not logged:
        print("\nLet's get logged in:"
              "\n1\tReturning user"
              "\n2\tNew user")
        choice = 0
        while not choice:
            choice = int(input("> "))
            print("\nEnter your username: ")
            username = str(input("> "))
            print("\nEnter your password: ")
            password = getpass.getpass("> ")
            udict = {"username":username, "password":password}
            path = "/auth" if choice is 1 else ""
            req = requests.post("http://127.0.0.1:5000/user" + path, json=udict)
            if req.status_code == 200:
                user = req.json()
                logged = True
                play(user)

            elif req.status_code == 201:
                print("\nIncorrect password")
                choice = 0

            else:
                print("\nServer error")


def game():
    """Allows the user to play the trivia game """
    playing = True
    print("\nWelcome to kepler-trivia\n")
    while playing is True:
        try:
            instructions()
            choice = int(input("> "))
            if choice == 1:
                auth()
            elif choice == 2:
                leaderboard()
            elif choice == 3:
                playing = False
            else:
                instructions()
        except:
            print("Invalid choice")

if __name__ == "__main__":
    game()
