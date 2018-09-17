#! /bin/bash
set -eo

sudo apt install -y python3-dev python3-venv libssl-dev libffi-dev
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

echo -e "You will need to reactivate the venv since this was installed via subshell"

deactivate
source venv/bin/activate
