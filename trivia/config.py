
import os

BASEDIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASEDIR, "trivia.sqlite")
DEBUG = True
SQLALCHEMY_TRACK_MODIFICATIONS = True


