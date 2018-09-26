export FLASK_APP=application
export FLASK_DEBUG=1
export FLASK_ENV=development
flask db init
flask db migrate
flask db upgrade
