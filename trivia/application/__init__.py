"""
Basic REST Backend to handle Trivia data.
"""
import os

from user import USER
from flask import Flask
from score import SCORE
from index import BP

from extensions import DB, MA

def create_app():
    """Initializes the flask app"""
    app = Flask(__name__, static_url_path="")
    register_config(app)
    register_blueprints(app)
    register_extensions(app)
    return app

def register_config(app):
    """Registers the configuration desired for the app"""
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "trivia.sqlite")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True


def register_blueprints(app):
    """Registers the desired routes"""
    app.register_blueprint(USER)
    app.register_blueprint(SCORE)
    app.register_blueprint(BP)

def register_extensions(app):
    """Registers app extensions"""
    DB.init_app(app)
    MA.init_app(app)

if __name__ == "__main__":
    FLASK_APP = create_app()
    FLASK_APP.run(host="0.0.0.0", port=80)

# app.run(debug=True)gt
