"""
Basic REST Backend to handle Trivia data.
"""
import os

from application.routes.user import USER
from flask import Flask
from application.routes.score import SCORE
from application.routes.index import BP
from application.routes.questions import QUESTION
from application.utils.extensions import DB, MA
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate

def create_app():
    """Initializes the flask app"""
    app = Flask(__name__, static_url_path="")
    register_config(app)
    register_blueprints(app)
    register_extensions(app)
    # register_commands(app)
    return app

def register_config(app):
    """Registers the configuration desired for the app"""
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "utils/trivia.sqlite")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

def register_blueprints(app):
    """Registers the desired routes"""
    app.register_blueprint(USER)
    app.register_blueprint(SCORE)
    app.register_blueprint(BP)
    app.register_blueprint(QUESTION)

def register_extensions(app):
    """Registers app extensions"""
    DB.init_app(app)
    MA.init_app(app)
    cors = CORS(app, resources={r"*": {"origins": "*"}})
    MIGRATE = Migrate(app, DB)

def register_commands(app):
    @app.cli.command()
    def create_db():
        DB.create_all()

if __name__ == "__main__":
    FLASK_APP = create_app()
    FLASK_APP.run(host="0.0.0.0", port=80)

# app.run(debug=True)gt
